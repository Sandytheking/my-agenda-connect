"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DateTime } from 'luxon';

export default function AdminAvanzado() {
  const router = useRouter();

  const dias = [
    { nombre: "Lunes", key: "1" },
    { nombre: "Martes", key: "2" },
    { nombre: "Miércoles", key: "3" },
    { nombre: "Jueves", key: "4" },
    { nombre: "Viernes", key: "5" },
    { nombre: "Sábados", key: "6" },
    { nombre: "Domingos", key: "7" },
  ];

  const [configPorDia, setConfigPorDia] = useState<{ [key: string]: any }>({});
  const [maxPorHora, setMaxPorHora] = useState("1");
  const [maxPorDia, setMaxPorDia] = useState("1");
  const [duracionCita, setDuracionCita] = useState("30");
  const [mensaje, setMensaje] = useState("");
  const [isActivo, setIsActivo] = useState(true);
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  

  const token = typeof window !== "undefined" && sessionStorage.getItem("accessToken");
  const slug = typeof window !== "undefined" && sessionStorage.getItem("slug");

  const dayNumberToName: { [key: string]: string } = {
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
    "7": "Sunday",
  };

  const dayNameToNumber: { [key: string]: string } = Object.fromEntries(
    Object.entries(dayNumberToName).map(([k, v]) => [v, k])
  );

useEffect(() => {
  if (!token || !slug) {
    router.push("/login");
    return;
  }

  const fetchConfig = async () => {
    console.log("🚀 Iniciando fetchConfig...");
    try {
      const res = await fetch(`https://api.agenda-connect.com/api/config/${slug}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("🔍 config recibido del backend:", data);

      if (!res.ok) {
        setMensaje("❌ Error: " + (data.error || "Error desconocido"));
        return;
      }

      setMaxPorHora(String(data.max_per_hour || 1));
      setMaxPorDia(String(data.max_per_day || 1));
      setDuracionCita(String(data.duration_minutes || 30));

      const porDia: { [key: string]: any } = {};

      for (let i = 1; i <= 7; i++) {
        const diaKey = String(i);
        const dayName = dayNumberToName[diaKey];
        const configDelDia = data.per_day_config?.[dayName];
        const isLaborable = configDelDia?.enabled ?? (data.work_days || []).includes(dayName);

        porDia[diaKey] = {
          activo: isLaborable,
          entrada: configDelDia?.start ?? data.start_hour ?? "08:00",
          salida: configDelDia?.end ?? data.end_hour ?? "17:00",
          almuerzoInicio:
            configDelDia?.lunch?.start ?? (configDelDia?.lunch === null ? "" : "12:00"),
          almuerzoFin:
            configDelDia?.lunch?.end ?? (configDelDia?.lunch === null ? "" : "13:00"),
        };
      }

      console.log("✅ configPorDia generado y listo:", porDia);

      setConfigPorDia(porDia);
      setIsActivo(data.is_active !== false);
      setFechaVencimiento(data.expiration_date || "");
    } catch (error) {
      console.error("❌ Error al conectar con el servidor:", error);
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  fetchConfig();
}, []);

  const guardarConfiguracion = async () => {
  if (!token || !slug) return;

  const per_day_config = Object.entries(configPorDia).reduce((acc, [key, val]) => {
    acc[dayNumberToName[key]] = {
      start: val.entrada,
      end: val.salida,
      enabled: val.activo,
      lunch:
  val.almuerzoInicio?.trim() && val.almuerzoFin?.trim()
    ? { start: val.almuerzoInicio.trim(), end: val.almuerzoFin.trim() }
    : null,

    };
    return acc;
  }, {} as any);

  const work_days = Object.entries(configPorDia)
    .filter(([_, val]) => val.activo)
    .map(([key]) => dayNumberToName[key]);

  // ✅ MOSTRAR EXACTAMENTE LO QUE SE ENVÍA AL BACKEND
  const payload = {
    max_per_day: Number(maxPorDia),
    max_per_hour: Number(maxPorHora),
    duration_minutes: Number(duracionCita),
    work_days,
    per_day_config,
    activo: isActivo,
  };

  console.log("📤 Enviando configuración al backend:", payload);

  try {
    const res = await fetch(`https://api.agenda-connect.com/api/config/${slug}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("✅ data recibida del backend:", data); 

    setIsActivo(data.is_active !== false);
    setFechaVencimiento(data.expiration_date || "");

    setMensaje(res.ok ? "✅ Configuración guardada correctamente." : `❌ ${data.error || "No se pudo guardar."}`);
  } catch {
    setMensaje("❌ Error al conectar con el servidor.");
  }

  setTimeout(() => setMensaje(""), 8000);
};


  const conectarGoogle = () => {
    if (!slug) return;
    window.location.href = `https://api.agenda-connect.com/api/oauth/start?slug=${slug}`;
  };

  const desconectar = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("slug");
    router.push("/login");
  };

  const irAgenda = () => router.push("/agenda");

if (Object.keys(configPorDia).length === 0) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Cargando configuración...</p>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white p-4">
      <div className="bg-[#4c2882] p-10 rounded-2xl shadow-md w-full max-w-3xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6">Panel Avanzado de Administración</h1>

        {(!isActivo || (fechaVencimiento && new Date(fechaVencimiento) < new Date())) && (
          <div className="bg-red-700 text-white px-4 py-2 rounded mb-6 text-center font-semibold">
            ⚠️ Tu suscripción ha vencido o está inactiva. Por favor contacta con el administrador.
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Máx. por hora:</label>
            <input value={maxPorHora} onChange={(e) => setMaxPorHora(e.target.value)} type="number" className="w-full px-3 py-2 rounded bg-[#ffffff] text-black" />
          </div>
          <div>
            <label>Máx. por día:</label>
            <input value={maxPorDia} onChange={(e) => setMaxPorDia(e.target.value)} type="number" className="w-full px-3 py-2 rounded bg-[#ffffff] text-black" />
          </div>
          <div>
            <label>Duración cita (min):</label>
            <input value={duracionCita} onChange={(e) => setDuracionCita(e.target.value)} type="number" className="w-full px-3 py-2 rounded bg-[#ffffff] text-black" />
          </div>
        </div>

        <div className="space-y-4">
          {dias.map((dia) => (
            <div key={dia.key} className="bg-[#3a2069] p-4 rounded-md">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{dia.nombre}</h3>
                <label>
                  <input
                    type="checkbox"
                    checked={configPorDia[dia.key]?.activo || false}
                    onChange={() =>
                      setConfigPorDia((prev) => ({
                        ...prev,
                        [dia.key]: {
                          ...prev[dia.key],
                          activo: !prev[dia.key]?.activo,
                        },
                      }))
                    }
                    className="mr-2"
                  />
                  Laborable
                </label>
              </div>

              {configPorDia[dia.key] && configPorDia[dia.key].activo && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-black">
                  <div>
                    <label className="text-white text-sm">Entrada</label>
                    <input
                      type="time"
                      value={configPorDia[dia.key]?.entrada}
                      onChange={(e) =>

                        setConfigPorDia((prev) => ({
                          ...prev,
                          [dia.key]: { ...prev[dia.key], entrada: e.target.value },
                        }))
                      }
                      className="text-green-500 bg-gray-900 border border-gray-700 px-2 py-1 rounded"

                    />
                  </div>
                  <div>
                   <label className="text-white text-sm">Entrada</label>
<input
  type="time"
  value={configPorDia[dia.key]?.salida}
  onChange={(e) =>
    setConfigPorDia((prev) => ({
      ...prev,
      [dia.key]: { ...prev[dia.key], salida: e.target.value },
    }))
  }
  className="text-green-500 bg-gray-900 border border-gray-700 px-2 py-1 rounded"
/>

                  </div>
                  <div>
                    <label className="text-white text-sm">Almuerzo (Inicio)</label>
                    <input
                      type="time"
                      value={configPorDia[dia.key]?.almuerzoInicio}
                      onChange={(e) =>
                        setConfigPorDia((prev) => ({
                          ...prev,
                          [dia.key]: { ...prev[dia.key], almuerzoInicio: e.target.value },
                        }))
                      }
                      className="text-yellow-500 bg-gray-900 border border-yellow-700 px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm">Almuerzo (Fin)</label>
                    <input
                      type="time"
                      value={configPorDia[dia.key]?.almuerzoFin}
                      onChange={(e) =>
                        setConfigPorDia((prev) => ({
                          ...prev,
                          [dia.key]: { ...prev[dia.key], almuerzoFin: e.target.value },
                        }))
                      }
                      className="text-yellow-500 bg-gray-900 border border-yellow-700 px-2 py-1 rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={conectarGoogle}
            className="bg-white text-black font-semibold px-6 py-2 rounded-full flex items-center gap-2 hover:bg-yellow-500"
          >
            <img src="/google-icon2.png" className="w-5 h-5" alt="Google" />
            Google Calendar
          </button>
          <button
            onClick={irAgenda}
            className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-green-400"
          >
            📅 Ver mis citas
          </button>
        </div>

        {mensaje && <p className="text-center mt-4 text-yellow-300 font-medium">{mensaje}</p>}

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={guardarConfiguracion}
            className="bg-green-500 text-black font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition"
          >
            Guardar
          </button>
          <button
            onClick={desconectar}
            className="bg-red-700 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-800 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
