//components/ExportButtons.tsx
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DateTime } from "luxon";

interface Props {
  citasFiltradas: any[];
  formattedDate: string;
  slug: string;
}

const ExportButtons: React.FC<Props> = ({ citasFiltradas, formattedDate, slug }) => {
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    fetch(`/api/public-config/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPlan(data.plan || "free");
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

      {/* Botón Excel (disponible para todos) */}
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
  );
};

export default ExportButtons;
