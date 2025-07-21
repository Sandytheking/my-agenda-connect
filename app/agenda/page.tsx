
//Agenda
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type Cita = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  inicio: string; // formato ISO
};

const AgendaPage = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [busqueda, setBusqueda] = useState("");

  // Agrupar citas por fecha
  const citasAgrupadas = citas.reduce<Record<string, Cita[]>>((acc, cita) => {
    const fecha = cita.inicio.slice(0, 10); // YYYY-MM-DD
    if (!acc[fecha]) acc[fecha] = [];
    acc[fecha].push(cita);
    return acc;
  }, {});

  // Obtener citas desde API
  useEffect(() => {
    const slug = sessionStorage.getItem("slug");
    if (!slug) return;

    axios
      .get(`https://api.agenda-connect.com/api/citas?slug=${slug}`)
      .then((res) => setCitas(res.data))
      .catch((err) => console.error("Error al cargar citas:", err));
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Citas del Día", 14, 22);

    const tableColumn = ["Hora", "Nombre", "Email", "Teléfono"];
    const tableRows = citasFiltradas.map((cita) => [
      cita.inicio.slice(11, 16),
      cita.nombre,
      cita.email,
      cita.telefono,
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
    });

    doc.save("citas.pdf");
  };

  const exportToExcel = () => {
    const worksheetData = citasFiltradas.map((cita) => ({
      Hora: cita.inicio.slice(11, 16),
      Nombre: cita.nombre,
      Email: cita.email,
      Teléfono: cita.telefono,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Citas");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "citas.xlsx");
  };

  const imprimir = () => {
    window.print();
  };

  // Filtro por nombre/email/teléfono
  const citasFiltradas = citas.filter(
    (cita) =>
      cita.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cita.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      cita.telefono.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-[#0C1A1A] text-white min-h-screen py-10 px-4 print:bg-white print:text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          📋 Agenda de <span className="text-purple-300">Agenda Connect</span>
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar cliente..."
            className="px-4 py-2 rounded bg-[#ffffff] text-black border border-gray-400 placeholder-gray-400 w-64"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button
            onClick={exportToPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            📤 Exportar PDF
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            📊 Exportar Excel
          </button>
          <button
            onClick={imprimir}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            🖨️ Imprimir
          </button>
        </div>

        {Object.entries(citasAgrupadas).map(([fecha, citasDelDia]) => (
          <div key={fecha} className="mb-8 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-2 border-b border-gray-500 pb-1">
              📅 {new Date(fecha).toLocaleDateString()}
            </h2>
            <div className="grid gap-4">
              {citasDelDia
                .filter((cita) => citasFiltradas.includes(cita))
                .map((cita) => (
                  <div
                    key={cita.id}
                    className="bg-white text-black p-4 rounded shadow"
                  >
                    <p className="font-bold text-lg">
                      🕐 {cita.inicio.slice(11, 16)} - {cita.nombre}
                    </p>
                    <p>📧 {cita.email}</p>
                    <p>📱 {cita.telefono}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}

        <div className="mt-10">
          <a
            href="/admin"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
          >
            Volver al Panel
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;
