
//SuperAdmin

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Cliente = {
  id: string;
  nombre: string;
  slug: string;
  email: string;
  subscription_valid_until: string | null;
};

export default function SuperAdmin() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const router = useRouter();

  useEffect(() => {
    const superadmin = sessionStorage.getItem('superadmin');
    if (!superadmin) {
      router.push('/superadmin/login');
    } else {
      cargarClientes();
    }
  }, []);

  const cargarClientes = async () => {
    setCargando(true);
    const res = await fetch('https://api.agenda-connect.com/api/clientes');
    let data: Cliente[] = await res.json();

    // Ordenar por prioridad visual
    data = data.sort((a, b) => {
      const fechaA = a.subscription_valid_until ? new Date(a.subscription_valid_until).getTime() : null;
      const fechaB = b.subscription_valid_until ? new Date(b.subscription_valid_until).getTime() : null;
      const hoy = new Date().getTime();

      const diasA = fechaA !== null ? Math.ceil((fechaA - hoy) / (1000 * 60 * 60 * 24)) : Infinity;
      const diasB = fechaB !== null ? Math.ceil((fechaB - hoy) / (1000 * 60 * 60 * 24)) : Infinity;

      const prioridad = (dias: number | null) => {
        if (dias === Infinity) return 3;
        if (dias < 0) return 0;
        if (dias <= 5) return 1;
        return 2;
      };

      return prioridad(diasA) - prioridad(diasB);
    });

    setClientes(data);
    setCargando(false);
  };

  const renovar = async (slug: string) => {
    const confirmar = confirm(`¿Deseas renovar la suscripción de ${slug} por 30 días?`);
    if (!confirmar) return;

    const res = await fetch(`https://api.agenda-connect.com/api/clientes/${slug}/renovar`, {
      method: 'POST',
    });

    const json = await res.json();

    if (res.ok) {
      setMensaje(`✅ ${slug} renovado hasta ${new Date(json.nuevaFecha).toLocaleDateString()}`);
      cargarClientes();
    } else {
      setMensaje(`⛔ Error: ${json.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C1A1A] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">🔐 Panel SuperAdmin</h1>

      {mensaje && <div className="mb-4 text-green-400">{mensaje}</div>}

      {cargando ? (
        <p>Cargando clientes...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Slug</th>
              <th className="p-2 text-left">Vence</th>
              <th className="p-2">Renovar</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} className="border-b border-gray-700">
                <td className="p-2">{c.nombre}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.slug}</td>
                <td className="p-2">
                  {(() => {
                    if (!c.subscription_valid_until)
                      return <span className="text-red-400">⛔ No tiene fecha</span>;

                    const fecha = new Date(c.subscription_valid_until);
                    const hoy = new Date();
                    const diasRestantes = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));

                    if (diasRestantes < 0) {
                      return <span className="text-red-400">❌ Vencido ({fecha.toLocaleDateString()})</span>;
                    } else if (diasRestantes <= 5) {
                      return (
                        <span className="text-yellow-400">
                          ⚠️ {fecha.toLocaleDateString()} ({diasRestantes} días)
                        </span>
                      );
                    } else {
                      return <span className="text-green-400">✅ {fecha.toLocaleDateString()}</span>;
                    }
                  })()}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => renovar(c.slug)}
                    className="bg-blue-600 hover:bg-blue-800 px-3 py-1 rounded text-sm"
                  >
                    +30 días
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={() => {
          sessionStorage.removeItem('superadmin');
          router.push('/superadmin/login');
        }}
        className="mt-6 bg-red-600 hover:bg-red-800 px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
