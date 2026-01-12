// SuperAdmin
'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, RefreshCw, LogOut, AlertCircle, CheckCircle, Clock } from 'lucide-react';

type Cliente = {
  id: string;
  nombre: string;
  slug: string;
  email: string;
  subscription_valid_until: string | null;
};

export default function SuperAdmin() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [refrescando, setRefrescando] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('superadmin_token');
    if (!token) {
      router.push('/superadmin/login');
      return;
    }
    cargarClientes();
  }, [router]);

  // Filtrado en tiempo real
  useEffect(() => {
    const termino = busqueda.toLowerCase();
    const filtrados = clientes.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(termino) ||
        cliente.email.toLowerCase().includes(termino) ||
        cliente.slug.toLowerCase().includes(termino)
    );
    setFilteredClientes(filtrados);
  }, [clientes, busqueda]);

  const cargarClientes = async () => {
    setCargando(true);
    setRefrescando(true);
    const token = sessionStorage.getItem('superadmin_token');
    if (!token) {
      setMensaje({ text: '❌ Token inválido. Redirigiendo al login...', type: 'error' });
      setTimeout(() => router.push('/superadmin/login'), 1500);
      return;
    }

    try {
      const res = await fetch('https://api.agenda-connect.com/api/clientes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error('Respuesta inválida del servidor');
      }

      // Ordenar por prioridad de expiración
      const ordenados = data.sort((a, b) => {
        const fechaA = a.subscription_valid_until ? new Date(a.subscription_valid_until).getTime() : null;
        const fechaB = b.subscription_valid_until ? new Date(b.subscription_valid_until).getTime() : null;
        const hoy = new Date().getTime();
        const diasA = fechaA ? Math.ceil((fechaA - hoy) / (1000 * 60 * 60 * 24)) : Infinity;
        const diasB = fechaB ? Math.ceil((fechaB - hoy) / (1000 * 60 * 60 * 24)) : Infinity;

        const prioridad = (dias: number) => {
          if (dias < 0) return 0; // Vencido
          if (dias <= 5) return 1; // Pronto vence
          if (dias === Infinity) return 3; // Sin fecha
          return 2; // Válido
        };

        return prioridad(diasA) - prioridad(diasB);
      });

      setClientes(ordenados);
      setMensaje(null);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      setMensaje({ text: `⛔ Error al cargar los clientes: ${errorMsg}. Verifica el token.`, type: 'error' });
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  const renovar = async (slug: string, nombre: string) => {
    const confirmar = confirm(
      `¿Renovar suscripción de "${nombre}" (${slug}) por 30 días? Esto extenderá la fecha de vencimiento.`
    );
    if (!confirmar) return;

    const token = sessionStorage.getItem('superadmin_token');
    if (!token) {
      setMensaje({ text: '❌ Token inválido.', type: 'error' });
      return;
    }

    try {
      const res = await fetch(`https://api.agenda-connect.com/api/clientes/${slug}/renovar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (res.ok) {
        setMensaje({
          text: `✅ "${nombre}" renovado hasta ${new Date(json.nuevaFecha).toLocaleDateString('es-ES')}`,
          type: 'success',
        });
        cargarClientes(); // Recargar para actualizar la tabla
      } else {
        throw new Error(json.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al renovar:', error);
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      setMensaje({ text: `⛔ Error al renovar: ${errorMsg}`, type: 'error' });
    }
  };

  const cerrarSesion = () => {
    sessionStorage.removeItem('superadmin_token');
    router.push('/superadmin/login');
  };

  // Resumen de estadísticas
  const resumen = useMemo(() => {
    const total = clientes.length;
    const vencidos = clientes.filter((c) => !c.subscription_valid_until || new Date(c.subscription_valid_until) < new Date()).length;
    const prontoVence = clientes.filter((c) => {
      if (!c.subscription_valid_until) return false;
      const dias = Math.ceil((new Date(c.subscription_valid_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return dias > 0 && dias <= 5;
    }).length;
    return { total, vencidos, prontoVence };
  }, [clientes]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#0C1A1A] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto h-8 w-8 text-white mb-4" />
          <p className="text-white">Cargando panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C1A1A] to-[#1A2A2A] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🔐 Panel SuperAdmin
          </h1>
          <p className="text-gray-400 mt-1">Gestiona las suscripciones de tus clientes</p>
        </div>
        <button
          onClick={cargarClientes}
          disabled={refrescando}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${refrescando ? 'animate-spin' : ''}`} />
          {refrescando ? 'Refrescando...' : 'Actualizar'}
        </button>
      </div>

      {/* Resumen de stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <h3 className="font-semibold">Total Clientes</h3>
          </div>
          <p className="text-2xl font-bold text-white">{resumen.total}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <h3 className="font-semibold">Vencidos</h3>
          </div>
          <p className="text-2xl font-bold text-white">{resumen.vencidos}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-yellow-400" />
            <h3 className="font-semibold">Pronta Vencimiento</h3>
          </div>
          <p className="text-2xl font-bold text-white">{resumen.prontoVence}</p>
        </div>
      </div>

      {/* Mensaje */}
      {mensaje && (
        <div
          className={`mb-6 p-4 rounded-xl border ${
            mensaje.type === 'success'
              ? 'bg-green-900/20 border-green-500 text-green-300'
              : 'bg-red-900/20 border-red-500 text-red-300'
          }`}
        >
          {mensaje.text}
        </div>
      )}

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o slug..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Tabla */}
      {filteredClientes.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
          <p className="text-gray-400">
            {busqueda ? 'No se encontraron clientes.' : 'No hay clientes disponibles.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
            <thead>
              <tr className="bg-gray-900/50">
                <th className="p-4 text-left font-semibold">Nombre</th>
                <th className="p-4 text-left font-semibold">Email</th>
                <th className="p-4 text-left font-semibold">Slug</th>
                <th className="p-4 text-left font-semibold">Vencimiento</th>
                <th className="p-4 text-center font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((c) => {
                const fecha = c.subscription_valid_until ? new Date(c.subscription_valid_until) : null;
                const hoy = new Date();
                const diasRestantes =
                  fecha && fecha > hoy
                    ? Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
                    : null;

                let estado = null;
                let icon = null;
                let color = '';

                if (!fecha) {
                  estado = 'Sin suscripción';
                  icon = <AlertCircle className="h-4 w-4" />;
                  color = 'text-red-400';
                } else if (fecha < hoy) {
                  estado = `Vencido (${fecha.toLocaleDateString('es-ES')})`;
                  icon = <AlertCircle className="h-4 w-4" />;
                  color = 'text-red-400';
                } else if (diasRestantes <= 5) {
                  estado = `${fecha.toLocaleDateString('es-ES')} (${diasRestantes} días)`;
                  icon = <Clock className="h-4 w-4" />;
                  color = 'text-yellow-400';
                } else {
                  estado = fecha.toLocaleDateString('es-ES');
                  icon = <CheckCircle className="h-4 w-4" />;
                  color = 'text-green-400';
                }

                return (
                  <tr key={c.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                    <td className="p-4 font-medium">{c.nombre}</td>
                    <td className="p-4">{c.email}</td>
                    <td className="p-4 font-mono text-sm">{c.slug}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {icon}
                        <span className={color}>{estado}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => renovar(c.slug, c.nombre)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        +30 días
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-8 text-center">
        <button
          onClick={cerrarSesion}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}