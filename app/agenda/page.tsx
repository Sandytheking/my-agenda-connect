// app/agenda/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DateTime } from 'luxon';
import ExportButtons from '@/components/ExportButtons';
import Link from 'next/link';
import AdvertenciaLimiteCitas from '@/components/AdvertenciaLimiteCitas';
import { useUser } from '@/context/UserContext';

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
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(0);
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [totalCitasMes, setTotalCitasMes] = useState<number | null>(null);

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

  // opcional: refrescar cada X ms (descomenta si quieres auto-refresh)
  // const interval = window.setInterval(fetchCount, 60_000);

  return () => {
    cancelled = true;
    // clearInterval(interval);
  };
}, [slug, BASE_API]);

// ---- formatted date from selectedDayOffset
useEffect(() => {
  const date = new Date();
  date.setDate(date.getDate() + selectedDayOffset);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dateString = date.toLocaleDateString('es-ES', options);
  setFormattedDate(dateString.charAt(0).toUpperCase() + dateString.slice(1));
}, [selectedDayOffset]);

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

  // ---- filtered citas for the selected day
  const citasFiltradas = React.useMemo(() => {
    return citas.filter((cita) => {
      const citaDate = new Date(cita.inicio);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      citaDate.setHours(0, 0, 0, 0);
      const diffInDays = Math.floor((citaDate.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
      return diffInDays === selectedDayOffset;
    });
  }, [citas, selectedDayOffset]);

  // ---- export helpers
  const exportToPDF = async () => {
    if (!slug) return;
    try {
      const res = await fetch(`${BASE_API}/api/export-pdf/${encodeURIComponent(slug)}`, {
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
    if (!slug) return;
    try {
      const res = await fetch(`${BASE_API}/api/export-excel/${encodeURIComponent(slug)}`, {
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

  // ---- render guards
  if (userLoading) {
    return <div className="text-white text-center mt-10">Cargando sesión...</div>;
  }

  // You can also show a spinner while data is fetching:
  // if (loadingData) return <div className="text-white text-center mt-10">Cargando datos...</div>;

  return (
    <>
      <div className="flex justify-between items-center px-6 pt-6">
        <button
          onClick={() => {
            if (typeof window !== 'undefined') sessionStorage.removeItem('slug');
            window.location.href = '/login';
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded"
        >
          🔒 Cerrar sesión
        </button>



        <button
          onClick={() => {
            window.location.href = '/analiticas';
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded"
        >
          📊 Ver analíticas
        </button>
      </div>

      <div className="min-h-screen bg-[#000000] text-white px-6 py-10">
        <h1 className="text-4xl font-bold mb-4 text-center">Agenda de {nombreNegocio || 'Agenda Connect'}</h1>
        
{totalCitasMes !== null && (
  <p className="text-center text-lg text-gray-300 mb-4">
    📆 Citas este mes: <span className="font-semibold">{totalCitasMes}</span>
  </p>
)}


        <h2 className="text-xl text-white font-semibold text-center mb-6">📅 Citas para {formattedDate}</h2>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {[...Array(7)].map((_, i) => {
            const fecha = new Date();
            fecha.setDate(fecha.getDate() + i);
            const dia = fecha.toLocaleDateString('es-ES', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            });
            const label = i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : dia;
            return (
              <button
                key={i}
                onClick={() => setSelectedDayOffset(i)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedDayOffset === i ? 'bg-purple-600 text-white' : 'bg-white text-black hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>


        {slug && (
  <div className="flex justify-left items-left gap-4 mb-4">
    <Link
      href="/panel/cambiar-plan"
      className="bg-green-600 hover:bg-purple-600 text-white font-medium px-4 py-2 rounded-full"
    >
      Cambiar plan
    </Link>

    <AdvertenciaLimiteCitas slug={slug} plan={plan} />
  </div>
)}



        {mensaje && <div className="bg-red-600 text-white px-4 py-3 rounded mb-6 text-center font-medium">{mensaje}</div>}

        {citasFiltradas.length === 0 ? (
          <p className="text-center text-gray-300">No hay citas para este día.</p>
        ) : (
          <>
            {slug && <ExportButtons citasFiltradas={citasFiltradas} formattedDate={formattedDate} slug={slug} />}

            <div className="grid gap-4 mt-6">
              {citasFiltradas.map((cita, index) => (
                <div key={cita.id} className={`p-4 rounded shadow-md ${cita.cancelada ? 'bg-red-800 text-white' : 'bg-[#4c2882] text-white'}`}>
                  <p className="font-bold text-lg">
                    {index + 1}. ⏰{' '}
                    {DateTime.fromISO(cita.inicio, { zone: 'utc' })
                      .setZone('America/Santo_Domingo')
                      .toFormat('hh:mm a')}{' '}
                    - {cita.nombre}
                  </p>
                  <p>📧 {cita.email}</p>
                  <p>📞 {cita.telefono}</p>

                  {cita.cancelada && <p className="mt-2 bg-white text-red-700 font-semibold px-2 py-1 rounded">❌ Esta cita fue cancelada por el cliente</p>}

                  <p
                    className={`mt-2 inline-block px-2 py-1 rounded text-sm font-semibold ${
                      cita.evento_id ? 'bg-gray-800 text-green-600' : 'bg-gray-800 text-yellow-400'
                    }`}
                  >
                    {cita.evento_id ? '✅ Sincronizada con Google Calendar' : '⚠️ No sincronizada'}
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
