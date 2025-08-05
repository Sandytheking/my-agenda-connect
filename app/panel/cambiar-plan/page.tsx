
//panel/cambiar-plan

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updatePlanCliente } from '@/utils/api';
import { useUser } from '@/context/UserContext';

// util para decodificar JWT sin verificar (solo UI)
function parseJwt(token?: string | null) {
  if (!token) return null;
  try {
    const base64 = token.split('.')[1];
    const json = decodeURIComponent(
      atob(base64.replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const planes = [
  {
    nombre: 'Free',
    descripcion: 'Ideal para comenzar',
    precio: 'Gratis',
    caracteristicas: [
      'Hasta 20 citas por mes',
      '1 usuario',
      'Sin integración con Google Calendar',
      'Sin exportar a PDF',
    ],
  },
  {
    nombre: 'Pro',
    descripcion: 'Funciones avanzadas',
    precio: '$9.99/mes',
    caracteristicas: [
      'Citas ilimitadas',
      '1 usuario',
      'Integración con Google Calendar',
      'Exportar citas a Excel y PDF',
      'Soporte prioritario por correo',
    ],
  },
  {
    nombre: 'Business',
    descripcion: 'Para equipos grandes',
    precio: '$19/mes',
    caracteristicas: [
      'Citas ilimitadas',
      '1 usuarios',
      'Google Calendar + Sincronización en tiempo real',
      'Exportar citas a Excel y PDF',
      'Soporte premium por WhatsApp y correo',
      'Panel de analítica avanzada',
    ],
  },
];

export default function CambiarPlan() {
  const router = useRouter();
  const { user, loading, setUser } = useUser();
  const [mensaje, setMensaje] = useState('');
  const [loadingPlanChange, setLoadingPlanChange] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string | null>(user?.plan ?? null);
  const [fetchingCurrentPlan, setFetchingCurrentPlan] = useState(false);

  // Redirect si no hay token ni user
  useEffect(() => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
    if (!loading && !user && !token) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Reconstruir user desde JWT para poblar UI si aún no existe
  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        const decoded = parseJwt(token);
        if (decoded && decoded.id) {
         
const slugFromStorage = typeof window !== 'undefined' ? sessionStorage.getItem('slug') || '' : '';
setUser({
  id: decoded.id,
  email: decoded.email || '',
  plan: '',
  slug: slugFromStorage,
});

        }
      }
    }
  }, [user, setUser]);

  // Obtener plan actual desde backend si no lo tenemos
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const slug = sessionStorage.getItem('slug');
    const token = sessionStorage.getItem('accessToken');

    if (!slug || !token) return;
    // si ya tenemos, no pedir otra vez
    if (currentPlan) return;

    (async () => {
      try {
        setFetchingCurrentPlan(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plan/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => null);
          console.warn('No se pudo obtener plan desde backend', res.status, txt);
          return;
        }

        const data = await res.json();
        const planFromServer = (data?.plan || data?.config?.plan || data?.plan_name || '').toString().toLowerCase();
        if (planFromServer) {
          setCurrentPlan(planFromServer);
          setUser((prev) => (prev ? { ...prev, plan: planFromServer } : prev));
        }
      } catch (err) {
        console.error('Error fetch plan:', err);
      } finally {
        setFetchingCurrentPlan(false);
      }
    })();
  }, [currentPlan, setUser]);

  // Handler para cambiar plan (declarado dentro del componente)
  const handleSeleccionarPlan = async (nuevoPlan: string) => {
    if (loadingPlanChange) return;
    try {
      setMensaje('Actualizando tu plan...');
      setLoadingPlanChange(true);
      await updatePlanCliente(nuevoPlan);
      // actualizar contexto user si existe
      setUser((prev) => (prev ? { ...prev, plan: nuevoPlan } : prev));
      setCurrentPlan(nuevoPlan);
      setMensaje('¡Plan actualizado con éxito!');
    } catch (err) {
      console.error('❌ Error al actualizar plan:', err);
      setMensaje('Hubo un error al actualizar el plan.');
    } finally {
      setLoadingPlanChange(false);
    }
  };

  // guard: si sigue en loading y no hay token mostramos carga
  const tokenExists = typeof window !== 'undefined' ? !!sessionStorage.getItem('accessToken') : false;
  if (loading || (!user && !tokenExists)) {
    return <div className="text-white text-center mt-10">Cargando sesión...</div>;
  }

  const effectivePlan = (currentPlan || user?.plan || '').toLowerCase();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Cambiar Plan</h1>

      <div className="w-full max-w-5xl mb-6 text-center">
        {fetchingCurrentPlan ? (
          <div className="text-sm text-gray-300">Cargando plan actual...</div>
        ) : (
          <div className="text-sm text-gray-300">
            Plan actual: <span className="font-semibold text-white">{effectivePlan || '—'}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {planes.map((planItem) => {
          const planNormalized = planItem.nombre.toLowerCase();
          const esActual = planNormalized === effectivePlan;

          return (
            <div
              key={planItem.nombre}
              className={`relative bg-[#1a1a1a] p-6 rounded-xl text-center border ${
                esActual ? 'border-green-500' : 'border-purple-500'
              } flex flex-col justify-between`}
            >
              {esActual && (
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs rounded-full">
                  Plan actual
                </div>
              )}

              <h2 className="text-xl font-semibold mb-2">{planItem.nombre}</h2>
              <p className="text-sm mb-2 text-gray-400">{planItem.descripcion}</p>
              <p className="text-lg font-bold mb-4">{planItem.precio}</p>

              <ul className="text-sm text-left mb-4 list-disc list-inside text-gray-300">
                {planItem.caracteristicas.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <button
                onClick={() => handleSeleccionarPlan(planNormalized)}
                disabled={esActual || loadingPlanChange}
                className={`mt-auto px-4 py-2 rounded text-white ${
                  esActual ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {loadingPlanChange ? 'Actualizando...' : esActual ? 'Seleccionado' : 'Seleccionar'}
              </button>
            </div>
          );
        })}
      </div>

      {mensaje && <p className="mt-6 text-green-400">{mensaje}</p>}
    </div>
  );
}
