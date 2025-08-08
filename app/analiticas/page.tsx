'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from "react";
import { useUser } from '../../context/UserContext';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaUserPlus } from 'react-icons/fa';
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
  nombre: string;
  count: number;
  first_appointment?: string;
};

type ClienteRecurrente = {
  nombre: string;
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
  totalClientesNuevos: number;
  porcentajeClientesNuevos: number;
  clientesNuevos: Cliente[];
};

function ClientesTablas({ clientesRecurrentes = [], clientesNuevos = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Tabla de clientes recurrentes */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Clientes Recurrentes</h2>
        {clientesRecurrentes.length > 0 ? (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-white">
                <th className="p-2">Email</th>
                <th className="p-2">Citas</th>
              </tr>
            </thead>
            <tbody>
              {clientesRecurrentes.map((c, index) => (
                <tr key={`${c.email}-${index}`} className="border-t border-white">
                  <td className="p-2">{c.nombre || '-'}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{c.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">No hay clientes recurrentes</p>
        )}
      </div>

      {/* Tabla de clientes nuevos */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Clientes Nuevos</h2>
        {clientesNuevos.length > 0 ? (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-white">
                <th className="p-2">Email</th>
                <th className="p-2">Primera Cita</th>
              </tr>
            </thead>
            <tbody>
              {clientesNuevos.map((c, index) => (
                <tr key={`${c.email}-${index}`} className="border-t border-white">
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{c.first_appointment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">No hay clientes nuevos</p>
        )}
      </div>
    </div>
  );
}

export default function AnaliticasPage() {
  const { user } = useUser();
  const router = useRouter();

  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  // Asumiendo que usas estas variables (metricas, diasData, horasData) por el fetch en useEffect, defínelas así para evitar errores:
  const [metricas, setMetricas] = useState<any[]>([]);
  const [diasData, setDiasData] = useState<any[]>([]);
  const [horasData, setHorasData] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setSlug(user.slug ?? null);
      setAccessToken(user.access_token ?? null);
      return;
    }

    if (typeof window !== 'undefined') {
      const storedSlug = sessionStorage.getItem('slug');
      const storedToken = sessionStorage.getItem('accessToken');

      if (storedSlug) {
        setSlug(storedSlug);
        setAccessToken(storedToken);
        return;
      }

      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    // Tu lógica para cargar métricas
    fetch("/api/metricas")
      .then((res) => res.json())
      .then((data) => setMetricas(data.metricas));

    fetch("/api/dias")
      .then((res) => res.json())
      .then((data) => setDiasData(data.dias));

    fetch("/api/horas")
      .then((res) => res.json())
      .then((data) => setHorasData(data.horas));
  }, []);

  const construirURL = () => {
    let url = `https://api.agenda-connect.com/api/analytics/${slug}`;
    const params = [];
    if (desde) params.push(`desde=${desde}`);
    if (hasta) params.push(`hasta=${hasta}`);
    if (params.length) url += `?${params.join('&')}`;
    return url;
  };

  useEffect(() => {
    if (!slug || !accessToken) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(construirURL(), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Error cargando analíticas:', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, desde, hasta, accessToken]);

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
              <input type="date" id="desde" value={desde} onChange={(e) => setDesde(e.target.value)} className="bg-[#1e293b] text-white p-2 rounded border border-gray-600" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="hasta" className="text-sm text-gray-300 mb-1">📅 Hasta</label>
              <input type="date" id="hasta" value={hasta} onChange={(e) => setHasta(e.target.value)} className="bg-[#1e293b] text-white p-2 rounded border border-gray-600" />
            </div>
          </div>

          <p className="text-gray-400">Aún no hay citas agendadas para mostrar estadísticas.</p>
        </div>
      </div>
    );
  }

  const { totalCitas, citasPorMes, sincronizadas, noSincronizadas, clientesRecurrentes, citasPorDia, duracionPromedio, totalClientesNuevos, porcentajeClientesNuevos, clientesNuevos } = data;
  const [clientesRecurrentes, setClientesRecurrentes] = useState<Cliente[]>([]);
   \const [clientesNuevos, setClientesNuevos] = useState<Cliente[]>([]);
  const meses = Object.keys(citasPorMes || {}).sort();
  const cantidades = meses.map((m) => citasPorMes?.[m] ?? 0);

  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
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
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Resumen de Analíticas', 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Métrica', 'Valor']],
      body: [
        ['Total de citas recibidas', totalCitas ?? 0],
        ['Citas sincronizadas con Google Calendar', sincronizadas ?? 0],
        ['Citas no sincronizadas', noSincronizadas ?? 0],
        ['Clientes recurrentes (únicos)', clientesRecurrentes?.length ?? 0],
        ['Duración promedio de las citas', `${duracionPromedio ?? 0} minutos`],
        ['Clientes nuevos', totalClientesNuevos ?? 0],
        ['% de nuevos', `${porcentajeClientesNuevos ?? 0}%`],
        ['Meses con citas registradas', Object.keys(citasPorMes || {}).length],
        ['Días únicos con citas', Object.keys(citasPorDia || {}).length],
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
      ['Clientes nuevos', totalClientesNuevos ?? 0],
      ['% de nuevos Usuarios', `${porcentajeClientesNuevos ?? 0}%`],
      ['Meses con citas registradas', Object.keys(citasPorMes || {}).length],
      ['Días únicos con citas', Object.keys(citasPorDia || {}).length]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(resumen);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Resumen');
    XLSX.writeFile(workbook, 'resumen_analiticas.xlsx');
  };

  return (
    <div className="bg-[#0C1A1A] min-h-screen text-white p-6">
      <div className="flex justify-end mb-6 gap-4">
        <button onClick={exportResumenPDF} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 text-sm">
          📄 Exportar PDF
        </button>
        <button onClick={exportResumenExcel} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 text-sm">
          📊 Exportar Excel
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">📊 Panel de Analíticas</h1>

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
        <div className="bg-[#1d2433] p-4 rounded-lg">
          <div className="text-blue-400 text-2xl mb-2"><FaUserPlus /></div>
          <p className="text-sm text-white">Clientes nuevos</p>
          <p className="text-2xl font-bold text-white">{totalClientesNuevos}</p>
          <p className="text-sm text-white mt-1">{porcentajeClientesNuevos}%</p>
        </div>
        <div className="bg-[#1e293b] p-5 rounded-xl flex items-center gap-4">
          <Clock size={32} className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-300">Duración promedio</p>
            <p className="text-xl font-bold">{duracionPromedio} min</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">📅 Citas por mes</h2>
        <Bar
          data={{ labels: meses, datasets: [{ label: 'Citas', data: cantidades, backgroundColor: '#9333ea' }] }}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🔁 Estado de sincronización</h2>
        <div className="max-w-sm mx-auto">
          <Pie
            data={{ labels: ['Sincronizadas', 'No sincronizadas'], datasets: [{ data: [sincronizadas, noSincronizadas], backgroundColor: ['#22c55e', '#facc15'] }] }}
            options={{ maintainAspectRatio: false }}
            height={250}
          />
        </div>
      </div>

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
            pointBackgroundColor: '#fff',
          },
        ],
      }}
    />
    {/* Opcional: mostrar listado con keys únicas para evitar warnings */}
    <div className="mt-4 space-y-1 text-sm text-gray-300">
      {dias.map(d => (
        <div key={d} className="flex justify-between border-b border-gray-600 py-1">
          <span>{d}</span>
          <span>{citasPorDia[d] ?? 0}</span>
        </div>
      ))}
    </div>
  </div>

{/* Tabla de clientes nuevos */}
<div className="bg-gray-800 p-4 rounded-lg shadow-md">
  <h2 className="text-lg font-semibold mb-4">Clientes Nuevos</h2>
  {clientesNuevos.length > 0 ? (
    <table className="w-full text-sm text-left border-collapse">
      <thead>
        <tr className="border-b border-white">
          <th className="p-2">Nombre</th>
          <th className="p-2">Email</th>
          <th className="p-2">Primera Cita</th>
        </tr>
      </thead>
      <tbody>
        {clientesNuevos.map((c, index) => (
          <tr key={`${c.email}-${index}`} className="border-t border-white">
            <td className="p-2">{c.nombre || '-'}</td>
            <td className="p-2">{c.email}</td>
            <td className="p-2">{c.first_appointment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-400">No hay clientes nuevos</p>
  )}
</div>

{/* Separación visual entre tablas */}
<div className="mt-8 border-t border-gray-600" />

{/* Tabla de clientes recurrentes */}
<div className="bg-gray-800 p-4 rounded-lg shadow-md mt-8">
  <h2 className="text-lg font-semibold mb-4">Clientes Recurrentes</h2>
  {clientesRecurrentes.length > 0 ? (
    <table className="w-full text-sm text-left border-collapse">
      <thead>
        <tr className="border-b border-white">
          <th className="p-2">Nombre</th>
          <th className="p-2">Email</th>
          <th className="p-2"># Citas</th>
        </tr>
      </thead>
      <tbody>
        {clientesRecurrentes.map((c, index) => (
          <tr key={`${c.email}-${index}`} className="border-t border-white">
            <td className="p-2">{c.nombre || '-'}</td>
            <td className="p-2">{c.email}</td>
            <td className="p-2">{c.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-400">No hay clientes recurrentes</p>
  )}
</div>
    </div>
  );
}