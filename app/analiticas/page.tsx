'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FaUserPlus } from 'react-icons/fa';
import * as XLSX from 'xlsx';
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
  Legend,
} from 'chart.js';
import { Bar, Pie, Radar } from 'react-chartjs-2';
import { Users, Clock, CalendarDays, FileDown, Download, Calendar } from 'lucide-react';
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
// --- Types
type AnaliticaCliente = {
  nombre?: string;
  email: string;
  count: number;
  first_appointment?: string | null;
};
type AnalyticsData = {
  totalCitas: number;
  citasPorMes: Record<string, number>;
  sincronizadas: number;
  noSincronizadas: number;
  clientesRecurrentes: AnaliticaCliente[];
  citasPorDia: Record<string, number>;
  totalClientesNuevos: number;
  porcentajeClientesNuevos: number;
  clientesNuevos: AnaliticaCliente[];
};
// Reusable tables component (tipado de props)
function ClientesTablas({
  clientesRecurrentes = [],
  clientesNuevos = [],
}: {
  clientesRecurrentes?: AnaliticaCliente[];
  clientesNuevos?: AnaliticaCliente[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
    >
      {/* Tabla de clientes recurrentes */}
      <motion.div
        whileHover={{ y: -2 }}
        className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
        <h2 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-400" />
          Clientes Recurrentes
        </h2>
        {clientesRecurrentes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-3 font-semibold text-gray-300">Nombre</th>
                  <th className="p-3 font-semibold text-gray-300">Email</th>
                  <th className="p-3 font-semibold text-gray-300">Citas</th>
                </tr>
              </thead>
              <tbody>
                {clientesRecurrentes.map((c: AnaliticaCliente, index: number) => (
                  <motion.tr
                    key={c.email ?? `recurrente-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-3">{c.nombre || '-'}</td>
                    <td className="p-3 text-gray-300">{c.email}</td>
                    <td className="p-3 font-semibold text-purple-400">{c.count}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-center py-8"
          >
            No hay clientes recurrentes
          </motion.p>
        )}
      </motion.div>
      {/* Tabla de clientes nuevos */}
      <motion.div
        whileHover={{ y: -2 }}
        className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
        <h2 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
          <FaUserPlus className="w-5 h-5 text-green-400" />
          Clientes Nuevos
        </h2>
        {clientesNuevos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-3 font-semibold text-gray-300">Nombre</th>
                  <th className="p-3 font-semibold text-gray-300">Email</th>
                  <th className="p-3 font-semibold text-gray-300">Primera Cita</th>
                </tr>
              </thead>
              <tbody>
                {clientesNuevos.map((c: AnaliticaCliente, index: number) => (
                  <motion.tr
                    key={c.email ?? `nuevo-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-3">{c.nombre || '-'}</td>
                    <td className="p-3 text-gray-300">{c.email}</td>
                    <td className="p-3 text-green-400">{c.first_appointment ?? '-'}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-center py-8"
          >
            No hay clientes nuevos
          </motion.p>
        )}
      </motion.div>
    </motion.div>
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
  // fetch auxiliares (comentados temporalmente para evitar 404; descomenta cuando crees las rutas /api/*)
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
    // Fetchs comentados para evitar 404; descomenta y crea las rutas /api/metricas, /api/dias, /api/horas cuando estén listas
    /*
    fetch('/api/metricas')
      .then((res) => res.json())
      .then((d) => setMetricas(d.metricas || []))
      .catch(() => setMetricas([]));
    fetch('/api/dias')
      .then((res) => res.json())
      .then((d) => setDiasData(d.dias || []))
      .catch(() => setDiasData([]));
    fetch('/api/horas')
      .then((res) => res.json())
      .then((d) => setHorasData(d.horas || []))
      .catch(() => setHorasData([]));
    */
  }, []);
  const construirURL = () => {
    let url = `https://api.agenda-connect.com/api/analytics/${slug}`;
    const params: string[] = [];
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
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        setData(json as AnalyticsData);
      } catch (err) {
        console.error('Error cargando analíticas:', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, desde, hasta, accessToken]);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050507] via-[#0a0a0f] to-[#050507] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-300"
        >
          <CalendarDays className="w-12 h-12 mx-auto mb-4 text-purple-400 animate-spin" />
          <p>Cargando analíticas...</p>
        </motion.div>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050507] via-[#0a0a0f] to-[#050507] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-red-400"
        >
          <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
          <p className="text-xl">❌ Error cargando datos</p>
        </motion.div>
      </div>
    );
  }
  if (data.totalCitas === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050507] via-[#0a0a0f] to-[#050507] text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-white via-white/90 to-purple-400 bg-clip-text text-transparent">
            📊 Panel de Analíticas
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            <div className="flex flex-col">
              <label htmlFor="desde" className="text-sm text-gray-300 mb-1">
                📅 Desde
              </label>
              <input
                type="date"
                id="desde"
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
                className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-xl border border-white/20 focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="hasta" className="text-sm text-gray-300 mb-1">
                📅 Hasta
              </label>
              <input
                type="date"
                id="hasta"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
                className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-xl border border-white/20 focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-lg"
          >
            Aún no hay citas agendadas para mostrar estadísticas.
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Desestructuramos todo (con defaults por seguridad)
  const {
    totalCitas,
    citasPorMes = {},
    sincronizadas = 0,
    noSincronizadas = 0,
    clientesRecurrentes = [],
    clientesNuevos = [],
    citasPorDia = {},
    totalClientesNuevos = 0,
    porcentajeClientesNuevos = 0,
  } = data;
  // Preparar datos para gráficos/tablas
  const meses = Object.keys(citasPorMes || {}).sort();
  const cantidades = meses.map((m) => citasPorMes?.[m] ?? 0);
  // Alineamos dias con getDay() (0=Domingo)
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const cantidadesPorDia = dias.map((d) => citasPorDia?.[d] ?? 0);
  const exportClientesPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Clientes Recurrentes', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Email', 'Cantidad de Citas']],
      body: (clientesRecurrentes || []).map((c) => [c.email, c.count]),
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
        ['Clientes nuevos', totalClientesNuevos ?? 0],
        ['% de nuevos', `${porcentajeClientesNuevos ?? 0}%`],
        ['Meses con citas registradas', Object.keys(citasPorMes || {}).length],
        ['Días únicos con citas', Object.keys(citasPorDia || {}).length],
      ],
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
      ['Clientes nuevos', totalClientesNuevos ?? 0],
      ['% de nuevos Usuarios', `${porcentajeClientesNuevos ?? 0}%`],
      ['Meses con citas registradas', Object.keys(citasPorMes || {}).length],
      ['Días únicos con citas', Object.keys(citasPorDia || {}).length],
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(resumen);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Resumen');
    XLSX.writeFile(workbook, 'resumen_analiticas.xlsx');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050507] via-[#0a0a0f] to-[#050507] text-white relative overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* GLOW EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-[150px] top-20 left-0 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-green-500/5 blur-[120px] bottom-40 right-0 animate-pulse delay-1000" />
      </div>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end mb-8 gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={exportResumenPDF}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          <Download className="w-4 h-4" />
          Exportar PDF
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={exportResumenExcel}
          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all"
        >
          <FileDown className="w-4 h-4" />
          Exportar Excel
        </motion.button>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-white via-white/90 to-purple-400 bg-clip-text text-transparent">
          📊 Panel de Analíticas
        </h1>
      </motion.div>

      {/* Métricas Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
      >
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
          <CalendarDays className="w-10 h-10 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
          <p className="text-sm text-gray-300 mb-1">Citas sincronizadas</p>
          <p className="text-3xl font-bold text-white">{sincronizadas}</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
          <Users className="w-10 h-10 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
          <p className="text-sm text-gray-300 mb-1">Clientes recurrentes</p>
          <p className="text-3xl font-bold text-white">{clientesRecurrentes?.length ?? 0}</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
          <FaUserPlus className="w-10 h-10 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
          <p className="text-sm text-gray-300 mb-1">Clientes nuevos</p>
          <p className="text-3xl font-bold text-white">{totalClientesNuevos}</p>
          <p className="text-sm text-blue-400 mt-1">{porcentajeClientesNuevos}%</p>
        </motion.div>
      </motion.div>

      {/* Gráfico Meses */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2 justify-center">
          📅 Citas por mes
        </h2>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden max-w-4xl mx-auto"
        >
          <Bar 
            data={{ labels: meses, datasets: [{ label: 'Citas', data: cantidades, backgroundColor: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', borderRadius: 8 }] }} 
            options={{ 
              plugins: { legend: { display: false } },
              scales: { y: { ticks: { color: 'white' }, grid: { color: 'white/10' } }, x: { ticks: { color: 'white' }, grid: { color: 'white/10' } } },
              backgroundColor: 'transparent'
            }} 
          />
        </motion.div>
      </motion.section>

      {/* Gráfico Sincronización */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2 justify-center">
          🔁 Estado de sincronización
        </h2>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden max-w-sm mx-auto"
        >
          <Pie 
            data={{ labels: ['Sincronizadas', 'No sincronizadas'], datasets: [{ data: [sincronizadas, noSincronizadas], backgroundColor: ['#22c55e', '#facc15'], borderWidth: 0 }] }} 
            options={{ 
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: 'white', padding: 20 } } },
              backgroundColor: 'transparent'
            }} 
          />
        </motion.div>
      </motion.section>

      {/* Gráfico Días */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2 justify-center">
          📆 Citas por día de la semana
        </h2>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden max-w-4xl mx-auto"
        >
          <Radar 
            data={{ labels: dias, datasets: [{ label: 'Citas', data: cantidadesPorDia, backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6', pointBackgroundColor: '#fff', pointBorderColor: '#8b5cf6' }] }} 
            options={{ 
              scales: { r: { ticks: { color: 'white' }, grid: { color: 'white/10' }, angleLines: { color: 'white/10' } } },
              plugins: { legend: { labels: { color: 'white' } } },
              backgroundColor: 'transparent'
            }} 
          />
          <div className="mt-6 space-y-2 text-sm text-gray-300">
            {dias.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex justify-between py-2 border-b border-white/10 last:border-b-0"
              >
                <span>{d}</span>
                <span className="font-semibold text-purple-400">{citasPorDia[d] ?? 0}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Tablas: nuevos y recurrentes */}
      <ClientesTablas clientesRecurrentes={clientesRecurrentes} clientesNuevos={clientesNuevos} />
    </div>
  );
}