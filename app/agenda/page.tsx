// app/agenda/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DateTime } from 'luxon';
import { motion, AnimatePresence } from 'framer-motion';
import ExportButtons from '@/components/ExportButtons';
import Link from 'next/link';
import AdvertenciaLimiteCitas from '@/components/AdvertenciaLimiteCitas';
import { useUser } from '@/context/UserContext';
import {
  LogOut,
  BarChart3,
  Calendar as CalendarIcon,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  User,
  Clock,
  Mail,
  Phone,
  CheckCircle,
  AlertTriangle,
  Calendar as SyncIcon,
} from 'lucide-react';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Importa el CSS base
import { Calendar, dateFnsLocalizer, Views, type View } from 'react-big-calendar';



import type { Event as RBCEvent } from 'react-big-calendar';

interface CalendarEvent extends RBCEvent {
  id: string;
  canceled: boolean;
  syncId?: string;
}


// Configuración para react-big-calendar con date-fns
const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  // ---- state (todos declarados siempre)
  const [slug, setSlug] = useState<string | null>(null);
  const [plan, setPlan] = useState<string>('');
  const [citas, setCitas] = useState<Cita[]>([]);
  const [nombreNegocio, setNombreNegocio] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [totalCitasMes, setTotalCitasMes] = useState<number | null>(null);
  const [view, setView] = useState<View>(Views.DAY); // Vista por defecto: día
  const [calendarDate, setCalendarDate] = useState<Date>(new Date()); // Fecha central del calendario
  // ---- Nuevo estado para modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
  const BASE_API = (process.env.NEXT_PUBLIC_API_URL as string) || 'https://api.agenda-connect.com';

  // ---- derive slug & plan from user context or sessionStorage (client-only)
  useEffect(() => {
    if (user) {
      setSlug(user.slug ?? null);
      setPlan(user.plan ?? '');
      return;
    }
    // fallback to sessionStorage (client)
    if (typeof window !== 'undefined') {
      const storedSlug = sessionStorage.getItem('slug');
      const storedPlan = sessionStorage.getItem('plan');
      if (storedSlug) {
        setSlug(storedSlug);
        setPlan(storedPlan || '');
        return;
      }
      // no user and no slug -> redirect to login
      router.push('/login');
    }
  }, [user, router]);

  // ---- fetch appointments count WHEN slug is available
  useEffect(() => {
    if (!slug) {
      setTotalCitasMes(null);
      return;
    }
    let cancelled = false;
    const fetchCount = async () => {
      try {
        const url = `${BASE_API.replace(/\/$/, '')}/api/appointments/count?slug=${encodeURIComponent(slug)}`;
        const res = await axios.get(url);
        if (!cancelled) setTotalCitasMes(res.data?.totalThisMonth ?? 0);
      } catch (err) {
        console.error('Error al obtener total de citas del mes:', err);
        if (!cancelled) setTotalCitasMes(0);
      }
    };
    fetchCount();
    return () => {
      cancelled = true;
    };
  }, [slug, BASE_API]);

  // ---- formatted date from selectedDayOffset (mantenido para compatibilidad, pero ahora usamos calendarDate)
  //codigo eliminado aqui

  // ---- fetch plan, citas y nombre cuando slug cambia (unificado)
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoadingData(true);
    setMensaje('');
    const fetchAll = async () => {
      try {
        // Plan
        try {
          const planRes = await axios.get(`${BASE_API}/api/plan/${encodeURIComponent(slug)}`);
          if (!cancelled) setPlan(planRes.data?.plan || 'free');
        } catch (err) {
          console.warn('No se pudo obtener plan, usando "free":', err);
          if (!cancelled) setPlan('free');
        }
        // Citas
        try {
          const citasRes = await axios.get(`${BASE_API}/api/citas?slug=${encodeURIComponent(slug)}`);
          if (!cancelled) setCitas(citasRes.data || []);
        } catch (err) {
          console.error('Error al cargar citas:', err);
          if (!cancelled) {
            setCitas([]);
            setMensaje('❌ Error al cargar las citas.');
          }
        }
        // Nombre del negocio
        try {
          const negocioRes = await axios.get(`${BASE_API}/api/negocio/${encodeURIComponent(slug)}`);
          if (!cancelled) setNombreNegocio(negocioRes.data?.nombre_negocio || '');
        } catch (err) {
          console.error('Error al cargar nombre del negocio:', err);
          if (!cancelled) setNombreNegocio('');
        }
      } finally {
        if (!cancelled) setLoadingData(false);
      }
    };
    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [slug, BASE_API]);

// ---- Mapear citas a eventos de calendario (DEBE IR ANTES DEL return)
const events: CalendarEvent[] = citas.map((cita) => {
  const start = new Date(cita.inicio);
  const end = new Date(start.getTime() + 30 * 60 * 1000);

  return {
    id: cita.id,
    title: `${cita.nombre} - ${DateTime.fromJSDate(start).toFormat('hh:mm a')}`,
    start,
    end,
    canceled: cita.cancelada ?? false,
    syncId: cita.evento_id,
    allDay: false,
  };
});



  // ---- EventStyleGetter para personalizar eventos
  const eventStyleGetter = (event: CalendarEvent) => {
  const isDayView = view === Views.DAY;

  const style = {
    backgroundColor: event.canceled ? '#ef4444' : '#8b5cf6',
    borderRadius: '10px',
    opacity: 0.9,
    color: 'white',
    border: '0px',
    fontSize: isDayView ? '14px' : '12px',
    padding: isDayView ? '6px 10px' : '4px 6px',
    width: isDayView ? '100%' : undefined,
    minWidth: isDayView ? '220px' : undefined,
    whiteSpace: 'normal' as const,
    lineHeight: '1.2',
  };

  return { style };
};


  // ---- Handlers para navegación del calendario
 const handleNavigate = (newDate: Date) => {
  setCalendarDate(newDate);
};


const handleViewChange = (newView: View) => {
  setView(newView);
};


  // ---- Handler para seleccionar evento y abrir modal
  const handleSelectEvent = (event: CalendarEvent) => {
    const cita = citas.find(c => c.id === event.id);
    if (cita) {
      setSelectedEvent(event);
      setSelectedCita(cita);
      setIsModalOpen(true);
    }
  };

  // ---- Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedCita(null);
  };

  // ---- render guards
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050507] to-[#0a0a0f] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050507] to-[#0a0a0f] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-300"
        >
          <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-purple-400 animate-pulse" />
          <p>Cargando tu agenda...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050507] via-[#0a0a0f] to-[#050507] text-white relative overflow-hidden">
      {/* GLOW EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/10 blur-[150px] top-20 left-0 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[120px] bottom-40 right-0 animate-pulse delay-1000" />
      </div>

      {/* HEADER */}
  <motion.header
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="px-2 sm:px-4 lg:px-6 pt-4 pb-3 sm:pt-6 sm:pb-4 border-b border-white/10"
>
  <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (typeof window !== 'undefined') sessionStorage.removeItem('slug');
        router.push('/login');
      }}
      className="w-full sm:w-auto flex-1 sm:flex-none min-h-12 px-3 py-2 sm:px-4 sm:py-2 bg-red-600/20 hover:bg-red-600/30 text-white font-medium rounded-xl border border-red-500/30 transition-colors text-sm sm:text-base flex items-center justify-center sm:justify-start gap-1 sm:gap-2"
    >
      <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
      <span className="sm:inline hidden">Cerrar sesión</span>
      <span className="sm:hidden">Cerrar</span>
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push('/analiticas')}
      className="w-full sm:w-auto flex-1 sm:flex-none min-h-12 px-3 py-2 sm:px-4 sm:py-2 bg-purple-600/20 hover:bg-purple-600/30 text-white font-medium rounded-xl border border-purple-500/30 transition-colors text-sm sm:text-base flex items-center justify-center gap-1 sm:gap-2"
    >
      <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
      <span className="sm:inline hidden">Ver analíticas</span>
      <span className="sm:hidden">Analíticas</span>
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push('/admin-avanzado')}
      className="w-full sm:w-auto flex-none min-h-12 px-3 py-2 sm:px-4 sm:py-2 bg-purple-600/20 hover:bg-purple-600/30 text-white font-medium rounded-xl border border-purple-500/30 transition-colors text-sm sm:text-base flex items-center justify-center gap-1 sm:gap-2"
    >
      <span className="sm:hidden">⚙️</span>
      <span className="hidden sm:inline">⚙️ Configuración</span>
    </motion.button>
  </div>
</motion.header>

      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        {/* TITLE & STATS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-white via-white/90 to-purple-400 bg-clip-text text-transparent">
            Agenda de {nombreNegocio || 'Agenda Connect'}
          </h1>
          {totalCitasMes !== null && (
            <motion.p
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-lg text-gray-300 flex items-center justify-center gap-2"
            >
              <CalendarIcon className="w-5 h-5 text-purple-400" />
              Citas este mes: <span className="font-bold text-purple-400">{totalCitasMes}</span>
            </motion.p>
          )}
        </motion.div>

        {/* PLAN & WARNING */}
        {slug && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
          >
            <Link
              href="/panel/cambiar-plan"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Cambiar plan
            </Link>
            <AdvertenciaLimiteCitas slug={slug} plan={plan} />
          </motion.div>
        )}

        {/* MESSAGE */}
        {mensaje && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-600/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-center font-medium flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-5 h-5" />
            {mensaje}
          </motion.div>
        )}
{/* CALENDARIO */}
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-3 sm:p-4 lg:p-6 overflow-hidden w-full"
  style={{ height: 'calc(70vh - 1rem)' }}
>
  {slug && (
    <ExportButtons
      citasFiltradas={citas.filter((cita) => {
        const citaDate = new Date(cita.inicio);
        if (view === 'day') {
          return citaDate.toDateString() === calendarDate.toDateString();
        } else if (view === 'week') {
          const startOfWeekDate = startOfWeek(calendarDate, { weekStartsOn: 1 });
          const endOfWeekDate = new Date(startOfWeekDate);
          endOfWeekDate.setDate(endOfWeekDate.getDate() + 6);
          return citaDate >= startOfWeekDate && citaDate <= endOfWeekDate;
        } else {
          const startOfMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
          const endOfMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);
          return citaDate >= startOfMonth && citaDate <= endOfMonth;
        }
      })}
      formattedDate={format(calendarDate, 'MMMM yyyy', { locale: es })}
      slug={slug}
    />
  )}

  <div className="h-full overflow-hidden flex flex-col">
    <div className="flex-1 overflow-x-auto overflow-y-auto"> {/* Agregué overflow-y-auto para vertical en día/semana */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        culture="es"
        endAccessor="end"
        style={{ 
          height: '100%', 
          width: '100%',
          minWidth: view === Views.MONTH ? '1000px' : 'auto' // ¡Clave! Fuerza ancho en mes para activar scroll horizontal
        }}
        view={view}
        date={calendarDate}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        eventPropGetter={eventStyleGetter}
        messages={{
          next: 'Siguiente',
          previous: 'Anterior',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
        }}
        popup
        onSelectEvent={handleSelectEvent}
      />
    </div>
  </div>
</motion.section>

{/* Controles adicionales para navegación (incluyendo Día) */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-3 sm:mt-4 px-2 text-xs sm:text-sm text-gray-400"
>
  <button
    onClick={() => setView('day')}
    className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all ${view === 'day' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'bg-white/10 hover:bg-white/20 border border-white/20'}`}
  >
    Día
  </button>
  <button
    onClick={() => setView('week')}
    className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all ${view === 'week' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'bg-white/10 hover:bg-white/20 border border-white/20'}`}
  >
    Semana
  </button>
  <button
    onClick={() => setView('month')}
    className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all ${view === 'month' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'bg-white/10 hover:bg-white/20 border border-white/20'}`}
  >
    Mes
  </button>
  <button
    onClick={() => setCalendarDate(new Date())}
    className="px-2 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
  >
    Hoy
  </button>
</motion.div>
</main>

      {/* MODAL DE DETALLES DE CITA */}
      <AnimatePresence>
        {isModalOpen && selectedCita && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl border border-white/10 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Evitar cerrar al click dentro
            >
              {/* Header del modal */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Detalles de la cita</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-4">
                {/* Hora */}
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Hora</p>
                    <p className="font-semibold text-white">
                      {DateTime.fromJSDate(selectedEvent?.start || new Date()).toFormat('hh:mm a')}
                    </p>
                  </div>
                </div>

                {/* Cliente */}
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Cliente</p>
                    <p className="font-semibold text-white">{selectedCita.nombre}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-gray-300">{selectedCita.email}</p>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Teléfono</p>
                    <p className="text-gray-300">{selectedCita.telefono}</p>
                  </div>
                </div>

                {/* Status de cancelación */}
                {selectedCita.cancelada && (
                  <div className="flex items-center gap-3 bg-red-500/20 border border-red-500/30 p-3 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <p className="text-sm text-red-300">Esta cita fue cancelada por el cliente</p>
                  </div>
                )}

                {/* Status de sincronización */}
                <div className="flex items-center gap-3">
                  <SyncIcon className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Sincronización</p>
                    <p className={`font-semibold ${selectedCita.evento_id ? 'text-green-400' : 'text-yellow-400'}`}>
                      {selectedCita.evento_id ? (
                        <>
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Sincronizada con Google Calendar
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 inline mr-1" />
                          No sincronizada
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}