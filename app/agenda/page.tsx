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
import ExportButtons from "@/components/ExportButtons";
import { useParams } from 'next/navigation';
import Link from 'next/link';




type Cita = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  inicio: string;
  evento_id?: string;
  cancelada?: boolean;
};



export default function AgendaPage() {
  const [slug, setSlug] = useState<string | null>(null);
  const [plan, setPlan] = useState("");
  const [citas, setCitas] = useState<Cita[]>([]);
  const [nombreNegocio, setNombreNegocio] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [selectedDayOffset, setSelectedDayOffset] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");
  const router = useRouter();

  //Al cargar la página, obtenemos el slug o redirigimos
  useEffect(() => {
    const storedSlug = sessionStorage.getItem("slug");
    if (!storedSlug) {
      router.push("/login");
    } else {
      setSlug(storedSlug);
    }
  }, []);

  //Cuando `slug` esté listo, hacemos fetch al plan
  useEffect(() => {
    if (!slug) return;

    fetch(`https://api.agenda-connect.com/api/plan/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.plan) setPlan(data.plan);
        else console.warn("⚠️ Plan no encontrado en la respuesta:", data);
      })
      .catch((err) => {
        console.error("Error al obtener el plan:", err);
      });
  }, [slug]);

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
  .get(`https://api.agenda-connect.com/api/plan/${slug}`)
  .then((res) => setPlan(res.data?.plan || "free"))
  .catch((err) => {
    console.error("Error al obtener el plan:", err);
    setPlan("free");
  });


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

  const exportToPDF = async () => {
  try {
    const res = await fetch(`https://api.agenda-connect.com/api/export-pdf/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fecha: formattedDate }),
    });

    if (!res.ok) throw new Error('Error al generar el PDF');

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'citas.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exportando PDF:', error);
  }
};



  const exportToExcel = async () => {
  try {
    const res = await fetch(`https://api.agenda-connect.com/api/export-excel/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fecha: formattedDate }),
    });

    if (!res.ok) throw new Error('Error al generar el Excel');

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'citas.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exportando Excel:', error);
  }
};


 return (
  <>
    <div className="flex justify-between items-center px-6 pt-6">
      <button
        onClick={() => {
          sessionStorage.removeItem("slug");
          window.location.href = "/login";
        }}
        className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded"
      >
        🔒 Cerrar sesión
      </button>

      <button
        onClick={() => {
          window.location.href = "/analiticas";
        }}
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded"
      >
        📊 Ver analíticas
      </button>
    </div>

{slug && (
  <Link
    href="/panel/cambiar-plan"
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
  >
    Cambiar plan
  </Link>
)}



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

<ExportButtons
  citasFiltradas={citasFiltradas}
  formattedDate={formattedDate}
  slug={slug}
/>


            <div className="grid gap-4">
              {citasFiltradas.map((cita, index) => (
<div
  key={cita.id}
  className={`p-4 rounded shadow-md ${
    cita.cancelada
      ? 'bg-red-800 text-white'
      : 'bg-[#4c2882] text-white'
  }`}
>
  <p className="font-bold text-lg">
    {index + 1}. ⏰{" "}
    {DateTime.fromISO(cita.inicio, { zone: "utc" })
      .setZone("America/Santo_Domingo")
      .toFormat("hh:mm a")}{" "}
    - {cita.nombre}
  </p>
  <p>📧 {cita.email}</p>
  <p>📞 {cita.telefono}</p>

  {cita.cancelada && (
    <p className="mt-2 bg-white text-red-700 font-semibold px-2 py-1 rounded">
      ❌ Esta cita fue cancelada por el cliente
    </p>
  )}

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
