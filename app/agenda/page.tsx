// Agenda
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DateTime } from "luxon";

type Cita = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  inicio: string;
  evento_id?: string;
};

export default function AgendaPage() {
  const router = useRouter();

  const [citas, setCitas] = useState<Cita[]>([]);
  const [nombreNegocio, setNombreNegocio] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedDayOffset, setSelectedDayOffset] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const storedSlug = sessionStorage.getItem("slug");
    if (!storedSlug) {
      router.push("/login");
    } else {
      setSlug(storedSlug);
    }
  }, []);

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + selectedDayOffset);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateString = date.toLocaleDateString("es-ES", options);
    setFormattedDate(dateString.charAt(0).toUpperCase() + dateString.slice(1));
  }, [selectedDayOffset]);

  useEffect(() => {
    if (!slug) return;

    axios
      .get(`https://api.agenda-connect.com/api/citas?slug=${slug}`)
      .then((res) => setCitas(res.data))
      .catch((err) => {
        console.error("Error al cargar citas:", err);
        setMensaje("❌ Error al cargar las citas.");
      });

    axios
      .get(`https://api.agenda-connect.com/api/negocio/${slug}`)
      .then((res) => {
        const nombre = res.data?.nombre_negocio || "";
        setNombreNegocio(nombre);
      })
      .catch((err) => {
        console.error("Error al cargar nombre del negocio:", err);
        setNombreNegocio("");
      });
  }, [slug]);

  const citasFiltradas = citas.filter((cita) => {
    const citaDate = new Date(cita.inicio);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    citaDate.setHours(0, 0, 0, 0);

    const diffInDays =
      Math.floor((citaDate.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays === selectedDayOffset;
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Citas del ${formattedDate}`, 14, 22);

    const tableColumn = ["Hora", "Nombre", "Email", "Teléfono"];
    const tableRows = citasFiltradas.map((cita) => [
      DateTime.fromISO(cita.inicio, { zone: 'utc' })
        .setZone('America/Santo_Domingo')
        .toFormat('hh:mm a'),
      cita.nombre,
      cita.email,
      cita.telefono,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
    });

    doc.save("citas.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(citasFiltradas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Citas");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(data, "citas.xlsx");
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            sessionStorage.removeItem("slug");
            window.location.href = "/login";
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded"
        >
          🔒 Cerrar sesión
        </button>
      </div>

<div className="flex justify-left mb-4">
      <button
        onClick={() => {
          window.location.href = "/analiticas";
        }}
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded"
      >
        📊 Ver analíticas
      </button>
      </div>

      <div className="min-h-screen bg-[#000000] text-white px-6 py-10">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Agenda de {nombreNegocio || "Agenda Connect"}
        </h1>

        <h2 className="text-xl text-white font-semibold text-center mb-6">
          📅 Citas para {formattedDate}
        </h2>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {[...Array(7)].map((_, i) => {
            const fecha = new Date();
            fecha.setDate(fecha.getDate() + i);
            const dia = fecha.toLocaleDateString("es-ES", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });
            const label = i === 0 ? "Hoy" : i === 1 ? "Mañana" : dia;
            return (
              <button
                key={i}
                onClick={() => setSelectedDayOffset(i)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedDayOffset === i
                    ? "bg-purple-600 text-white"
                    : "bg-white text-black hover:bg-gray-300"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {mensaje && (
          <div className="bg-red-600 text-white px-4 py-3 rounded mb-6 text-center font-medium">
            {mensaje}
          </div>
        )}

        {citasFiltradas.length === 0 ? (
          <p className="text-center text-gray-300">
            No hay citas para este día.
          </p>
        ) : (
          <>
            <div className="flex justify-end gap-4 mb-4">
              <button
                onClick={exportToPDF}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                📄 Exportar PDF
              </button>
              <button
                onClick={exportToExcel}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                📊 Exportar Excel
              </button>
            </div>

            <div className="grid gap-4">
              {citasFiltradas.map((cita) => (
                <div
                  key={cita.id}
                  className="bg-[#4c2882] text-white p-4 rounded shadow-md"
                >
                  <p className="font-bold text-lg">
                    ⏰{" "}
                    {DateTime.fromISO(cita.inicio, { zone: "utc" })
                      .setZone("America/Santo_Domingo")
                      .toFormat("hh:mm a")}{" "}
                    - {cita.nombre}
                  </p>
                  <p>📧 {cita.email}</p>
                  <p>📞 {cita.telefono}</p>
                  <p
                    className={`mt-2 inline-block px-2 py-1 rounded text-sm font-semibold ${
                      cita.evento_id
                        ? "bg-gray-800 text-green-600"
                        : "bg-gray-800 text-yellow-400"
                    }`}
                  >
                    {cita.evento_id
                      ? "✅ Sincronizada con Google Calendar"
                      : "⚠️ No sincronizada"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
