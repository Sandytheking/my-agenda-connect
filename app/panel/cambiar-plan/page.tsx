'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updatePlanCliente } from '@/utils/api';
import { useUser } from '@/context/UserContext';

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

 useEffect(() => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null;

  if (!loading && !user && !token) {
    router.push("/login");
  }
}, [user, loading, router]);

if (loading || (!user && typeof window !== "undefined" && sessionStorage.getItem("accessToken"))) {
  return <div className="text-white text-center mt-10">Cargando sesión...</div>;
}

  const handleSeleccionarPlan = async (nuevoPlan: string) => {
    try {
      setMensaje('Actualizando tu plan...');
      await updatePlanCliente(nuevoPlan);
      setUser({ ...user!, plan: nuevoPlan }); // ✅ actualiza el contexto también
      setMensaje('¡Plan actualizado con éxito!');
    } catch (err) {
      console.error('❌ Error al actualizar plan:', err);
      setMensaje('Hubo un error al actualizar el plan.');
    }
  };

  if (loading || !user) {
    return <div className="text-white text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-8">Cambiar Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {planes.map((plan) => {
          const esActual = plan.nombre.toLowerCase() === user.plan;

          return (
            <div
              key={plan.nombre}
              className={`relative bg-[#1a1a1a] p-6 rounded-xl text-center border ${
                esActual ? 'border-green-500' : 'border-purple-500'
              } flex flex-col justify-between`}
            >
              {esActual && (
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs rounded-full">
                  Plan actual
                </div>
              )}

              <h2 className="text-xl font-semibold mb-2">{plan.nombre}</h2>
              <p className="text-sm mb-2 text-gray-400">{plan.descripcion}</p>
              <p className="text-lg font-bold mb-4">{plan.precio}</p>

              <ul className="text-sm text-left mb-4 list-disc list-inside text-gray-300">
                {plan.caracteristicas.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <button
                onClick={() => handleSeleccionarPlan(plan.nombre.toLowerCase())}
                disabled={esActual}
                className={`mt-auto px-4 py-2 rounded text-white ${
                  esActual
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {esActual ? 'Seleccionado' : 'Seleccionar'}
              </button>
            </div>
          );
        })}
      </div>

      {mensaje && <p className="mt-6 text-green-400">{mensaje}</p>}
    </div>
  );
}
