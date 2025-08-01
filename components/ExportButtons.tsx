//components/ExportButtons.tsx
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DateTime } from "luxon";
import { BadgeDollarSign, Crown, Gem } from "lucide-react";

interface Props {
  citasFiltradas: any[];
  formattedDate: string;
  slug: string;
}

const ExportButtons: React.FC<Props> = ({ citasFiltradas = [], formattedDate, slug }) => {
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    if (!slug) return;

    fetch(`https://api.agenda-connect.com/api/plan/${slug}`)
  .then((res) => res.json())
  .then((data) => {
    setPlan(data.plan || "free");
  })
  .catch(() => {
    setPlan("free");
  });
  }, [slug]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Citas del ${formattedDate}`, 14, 22);

    const tableColumn = ["N°", "Hora", "Nombre", "Email", "Teléfono"];
    const tableRows = citasFiltradas.map((cita, index) => {
      const hora = DateTime.fromISO(cita.inicio, { zone: 'utc' })
        .setZone('America/Santo_Domingo')
        .toFormat('hh:mm a');

      const nombre = cita.cancelada ? `${cita.nombre} (CANCELADA)` : cita.nombre;

      return [
        index + 1,
        hora,
        { content: nombre, styles: { textColor: cita.cancelada ? '#888888' : '#000000' } },
        cita.email,
        cita.telefono,
      ];
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
    });

    doc.save("citas.pdf");
  };

  const exportToExcel = () => {
    const datosFiltrados = citasFiltradas.map((cita, index) => ({
      "N°": index + 1,
      Hora: DateTime.fromISO(cita.inicio, { zone: 'utc' })
        .setZone('America/Santo_Domingo')
        .toFormat('hh:mm a'),
      Nombre: cita.cancelada ? `${cita.nombre} (CANCELADA)` : cita.nombre,
      Email: cita.email,
      Teléfono: cita.telefono,
    }));

    const worksheet = XLSX.utils.json_to_sheet(datosFiltrados);
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
      {plan && (
        <div className="flex items-center gap-2 mb-2">
          {/* Ícono según el plan */}
          {plan === "free" && <BadgeDollarSign className="text-gray-500 w-5 h-5" />}
          {plan === "pro" && <Crown className="text-blue-600 w-5 h-5" />}
          {plan === "business" && <Gem className="text-yellow-600 w-5 h-5" />}

          {/* Badge de plan */}
          <span
            className={`inline-block px-3 py-1 text-sm rounded-full font-semibold ${
              plan === "free"
                ? "bg-gray-200 text-gray-700"
                : plan === "pro"
                ? "bg-blue-100 text-blue-700"
                : plan === "business"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Plan: {plan.toUpperCase()}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-4">
        {/* Botón PDF (solo PRO y BUSINESS) */}
        <button
          onClick={exportToPDF}
          disabled={!(plan === "pro" || plan === "business")}
          className={`p-2 rounded text-white ${
            plan === "pro" || plan === "business"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Exportar PDF
        </button>

        {/* Botón Excel (todos los planes) */}
        <button
          onClick={exportToExcel}
          className="p-2 rounded text-white bg-green-600 hover:bg-green-700"
        >
          Exportar Excel
        </button>

        {/* Mensaje si PDF está deshabilitado */}
        {plan === "free" && (
          <p className="text-sm text-red-500">
            El botón de PDF está disponible solo para clientes PRO o BUSINESS.
          </p>
        )}
      </div>
    </>
  );
};

export default ExportButtons;
