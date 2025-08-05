'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie, Radar } from 'react-chartjs-2';
import { Users, Clock, CalendarDays, FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type Cliente = {
  email: string;
  count: number;
};

type AnalyticsData = {
  totalCitas: number;
  citasPorMes: Record<string, number>;
  sincronizadas: number;
  noSincronizadas: number;
  clientesRecurrentes: Cliente[];
  citasPorDia: Record<string, number>;
  duracionPromedio: number; // en minutos
};



export default function AnaliticasPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const slug = typeof window !== 'undefined' ? sessionStorage.getItem('slug') : null;
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');


const construirURL = () => {
  let url = `https://api.agenda-connect.com/api/analytics/${slug}`;
  const params = [];

  if (desde) params.push(`desde=${desde}`);
  if (hasta) params.push(`hasta=${hasta}`);

  if (params.length) url += `?${params.join('&')}`;
  return url;
};


  useEffect(() => {
  if (!slug) return;

  setLoading(true);

  fetch(construirURL())
    .then((res) => res.json())
    .then(setData)
    .catch(console.error)
    .finally(() => setLoading(false));
}, [slug, desde, hasta]);


  if (loading) return <p className="p-8 text-white">Cargando analíticas...</p>;
  if (!data) return <p className="p-8 text-red-500">❌ Error cargando datos</p>;
  if (data.totalCitas === 0) {
  return (
    <div className="bg-[#0C1A1A] min-h-screen text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">📊 Panel de Analíticas</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
  <div className="flex flex-col">
    <label htmlFor="desde" className="text-sm text-gray-300 mb-1">📅 Desde</label>
    <input
      type="date"
      id="desde"
      value={desde}
      onChange={(e) => setDesde(e.target.value)}
      className="bg-[#1e293b] text-white p-2 rounded border border-gray-600"
    />
  </div>
  <div className="flex flex-col">
    <label htmlFor="hasta" className="text-sm text-gray-300 mb-1">📅 Hasta</label>
    <input
      type="date"
      id="hasta"
      value={hasta}
      onChange={(e) => setHasta(e.target.value)}
      className="bg-[#1e293b] text-white p-2 rounded border border-gray-600"
    />
  </div>
</div>

        <p className="text-gray-400">Aún no hay citas agendadas para mostrar estadísticas.</p>
      </div>
    </div>
  );
}


  const {
    totalCitas,
    citasPorMes,
    sincronizadas,
    noSincronizadas,
    clientesRecurrentes,
    citasPorDia,
    duracionPromedio
  } = data;

  const meses = Object.keys(citasPorMes || {}).sort();
  const cantidades = meses.map((m) => citasPorMes?.[m] ?? 0);


  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const cantidadesPorDia = dias.map((d) => (citasPorDia?.[d] ?? 0));

  const exportClientesPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Clientes Recurrentes', 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Email', 'Cantidad de Citas']],
      body: clientesRecurrentes.map((c) => [c.email, c.count]),
    });

    doc.save('clientes_recurrentes.pdf');
  };


const exportResumenPDF = () => {
  if (!data) return;

  const totalCitasTexto = totalCitas ?? 0;
  const sincronizadasTexto = sincronizadas ?? 0;
  const noSincronizadasTexto = noSincronizadas ?? 0;
  const clientesTexto = clientesRecurrentes?.length ?? 0;
  const duracionTexto = duracionPromedio ?? 0;
  const mesesConCitas = citasPorMes ? Object.keys(citasPorMes).length : 0;
  const diasConCitas = citasPorDia ? Object.keys(citasPorDia).length : 0;

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Resumen de Analíticas', 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [['Métrica', 'Valor']],
    body: [
      ['Total de citas recibidas', totalCitasTexto],
      ['Citas sincronizadas con Google Calendar', sincronizadasTexto],
      ['Citas no sincronizadas', noSincronizadasTexto],
      ['Clientes recurrentes (únicos)', clientesTexto],
      ['Duración promedio de las citas', `${duracionTexto} minutos`],
      ['Cantidad de meses con citas registradas', mesesConCitas],
      ['Cantidad de días únicos con citas', diasConCitas],
    ]
  });

  doc.save('resumen_analiticas.pdf');
};



const exportResumenExcel = () => {
  if (!data) return;

  const resumen = [
    ['Métrica', 'Valor'],
    ['Total de citas recibidas', totalCitas ?? 0],
    ['Citas sincronizadas con Google Calendar', sincronizadas ?? 0],
    ['Citas no sincronizadas', noSincronizadas ?? 0],
    ['Clientes recurrentes (únicos)', clientesRecurrentes?.length ?? 0],
    ['Duración promedio de las citas', `${duracionPromedio ?? 0} minutos`],
    ['Cantidad de meses con citas registradas', Object.keys(citasPorMes || {}).length],
    ['Cantidad de días únicos con citas', Object.keys(citasPorDia || {}).length],

  ];

  const worksheet = XLSX.utils.aoa_to_sheet(resumen);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Resumen');

  XLSX.writeFile(workbook, 'resumen_analiticas.xlsx');
};



  return (

    <div className="bg-[#0C1A1A] min-h-screen text-white p-6">
    <div className="flex justify-end mb-6 gap-4">


  <button
    onClick={exportResumenPDF}
    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 text-sm"
  >
    📄 Exportar PDF
  </button>
  <button
    onClick={exportResumenExcel}
    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 text-sm"
  >
    📊 Exportar Excel
  </button>
</div>

      <h1 className="text-3xl font-bold text-center mb-8">📊 Panel de Analíticas</h1>

      {/* RESUMEN */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#1e293b] p-5 rounded-xl flex items-center gap-4">
          <CalendarDays size={32} className="text-purple-400" />
          <div>
            <p className="text-sm text-gray-300">Citas sincronizadas</p>
            <p className="text-xl font-bold">{sincronizadas}</p>
          </div>
        </div>
        <div className="bg-[#1e293b] p-5 rounded-xl flex items-center gap-4">
          <Users size={32} className="text-green-400" />
          <div>
            <p className="text-sm text-gray-300">Clientes recurrentes</p>
            <p className="text-xl font-bold">{clientesRecurrentes?.length || 0}</p>
          </div>
        </div>
        <div className="bg-[#1e293b] p-5 rounded-xl flex items-center gap-4">
          <Clock size={32} className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-300">Duración promedio</p>
            <p className="text-xl font-bold">{duracionPromedio} min</p>
          </div>
        </div>
      </div>

      {/* Citas por mes */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">📅 Citas por mes</h2>
        <Bar
          data={{
            labels: meses,
            datasets: [
              {
                label: 'Citas',
                data: cantidades,
                backgroundColor: '#9333ea'
              }
            ]
          }}
          options={{
            plugins: {
              legend: { display: false }
            }
          }}
        />
      </div>

 {/* Estado de sincronización */}
<div className="mb-12">
  <h2 className="text-2xl font-semibold mb-4">🔁 Estado de sincronización</h2>

  <div className="max-w-sm mx-auto">
    <Pie
      data={{
        labels: ['Sincronizadas', 'No sincronizadas'],
        datasets: [
          {
            data: [sincronizadas, noSincronizadas],
            backgroundColor: ['#22c55e', '#facc15']
          }
        ]
      }}
      options={{
        maintainAspectRatio: false
      }}
      height={250}

    />
  </div>
</div>


      {/* Citas por día de la semana */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">📆 Citas por día de la semana</h2>
        <Radar
          data={{
            labels: dias,
            datasets: [
              {
                label: 'Citas',
                data: cantidadesPorDia,
                backgroundColor: 'rgba(139, 92, 246, 0.4)',
                borderColor: '#8b5cf6',
                pointBackgroundColor: '#fff'
              }
            ]
          }}
        />
      </div>

      {/* Clientes recurrentes */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">👤 Clientes recurrentes</h2>
          {clientesRecurrentes?.length > 0 && (
            <button
              onClick={exportClientesPDF}
              className="flex items-center bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition text-sm"
            >
              <FileDown size={16} className="mr-2" /> Exportar PDF
            </button>
          )}
        </div>
       {!clientesRecurrentes?.length ? (
  <p className="text-gray-300">No hay datos todavía.</p>
) : (
  <div className="overflow-x-auto">
    <table className="w-full table-auto border border-white">
      <thead>
        <tr className="bg-white text-black">
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Cantidad de citas</th>
        </tr>
      </thead>
      <tbody>
        {clientesRecurrentes.map((c) => (
          <tr key={c.email} className="border-t border-white">
            <td className="p-2">{c.email}</td>
            <td className="p-2">{c.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
