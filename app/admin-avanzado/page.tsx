//admin advanzado

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";
import { useUser } from "@/context/UserContext";

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
  const [conectadoGoogle, setConectadoGoogle] = useState(false);
  const { user } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);

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

  // ✅ Defaults: L-V 08:00–17:00, almuerzo 12:00–13:00 (S-D desactivado)
  const DEFAULT_WORK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const DEFAULT_PER_DAY_CONFIG: Record<string, any> = {
    Monday:    { start: "08:00", end: "17:00", enabled: true,  lunch: { start: "12:00", end: "13:00" } },
    Tuesday:   { start: "08:00", end: "17:00", enabled: true,  lunch: { start: "12:00", end: "13:00" } },
    Wednesday: { start: "08:00", end: "17:00", enabled: true,  lunch: { start: "12:00", end: "13:00" } },
    Thursday:  { start: "08:00", end: "17:00", enabled: true,  lunch: { start: "12:00", end: "13:00" } },
    Friday:    { start: "08:00", end: "17:00", enabled: true,  lunch: { start: "12:00", end: "13:00" } },
    Saturday:  { start: "08:00", end: "17:00", enabled: false, lunch: null },
    Sunday:    { start: "08:00", end: "17:00", enabled: false, lunch: null },
  };

  // 🛡️ Normalizador: acepta "8:00" y devuelve "08:00"; rechaza "", "null", "undefined", etc.
  const normalizeHHMM = (val: any): string => {
    if (typeof val !== "string") return "";
    const s = val.trim().toLowerCase();
    if (!s || s === "null" || s === "undefined" || s === "invalid date") return "";
    const m = s.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return "";
    const h = Number(m[1]);
    const mm = m[2];
    if (isNaN(h) || h < 0 || h > 23) return "";
    return `${h.toString().padStart(2, "0")}:${mm}`;
  };
  const safeTime = (v: any, fallback: string) => normalizeHHMM(v) || fallback;

  const fetchConfig = async (token: string) => {
    if (!token) {
      setMensaje("❌ Token no encontrado");
      return;
    }

    try {
      const res = await fetch(`https://api.agenda-connect.com/api/private-config`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        setMensaje("❌ Error: " + (data.error || "Error desconocido"));
        return;
      }

      setMaxPorHora(String(data.max_per_hour || 1));
      setMaxPorDia(String(data.max_per_day || 1));
      setDuracionCita(String(data.duration_minutes || 30));

      // Usa defaults si backend viene vacío
      const perDay =
        data.per_day_config && Object.keys(data.per_day_config).length > 0
          ? data.per_day_config
          : DEFAULT_PER_DAY_CONFIG;

      const workDays: string[] =
        data.work_days && data.work_days.length > 0
          ? data.work_days
          : DEFAULT_WORK_DAYS;

      const porDia: { [key: string]: any } = {};

      for (let i = 1; i <= 7; i++) {
        const diaKey = String(i);
        const dayName = dayNumberToName[diaKey];

        const fromServer = perDay[dayName] || {};
        const fromDefaults = DEFAULT_PER_DAY_CONFIG[dayName];

        const enabled =
          typeof fromServer.enabled === "boolean"
            ? fromServer.enabled
            : workDays.includes(dayName);

        const entrada = safeTime(
          fromServer.start ?? data.start_hour,
          fromDefaults.start
        );
        const salida = safeTime(
          fromServer.end ?? data.end_hour,
          fromDefaults.end
        );

        const lunchStart = safeTime(
          fromServer?.lunch?.start,
          fromDefaults?.lunch?.start ?? ""
        );
        const lunchEnd = safeTime(
          fromServer?.lunch?.end,
          fromDefaults?.lunch?.end ?? ""
        );

        porDia[diaKey] = {
          activo: !!enabled,
          entrada,
          salida,
          almuerzoInicio: fromServer.lunch === null ? "" : lunchStart,
          almuerzoFin: fromServer.lunch === null ? "" : lunchEnd,
        };
      }

      setConfigPorDia(porDia);
      setIsActivo(data.is_active !== false);
      setFechaVencimiento(data.expiration_date || "");
      setConectadoGoogle(!!data.refresh_token);
    } catch (error) {
      console.error("❌ Error al conectar con el servidor:", error);
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("accessToken");
    const sessionSlug = sessionStorage.getItem("slug");

    if (!sessionToken || !sessionSlug) {
      router.push("/login");
      return;
    }

    setToken(sessionToken);
    setSlug(sessionSlug);
    fetchConfig(sessionToken);
  }, []);

  const guardarConfiguracion = async () => {
    if (!token || !slug) return;

    const per_day_config = Object.entries(configPorDia).reduce(
      (acc, [key, val]) => {
        const name = dayNumberToName[key];
        const def = DEFAULT_PER_DAY_CONFIG[name];

        acc[name] = {
          start: safeTime(val.entrada, def.start),
          end: safeTime(val.salida, def.end),
          enabled: !!val.activo,
          lunch:
            val.almuerzoInicio?.trim() && val.almuerzoFin?.trim()
              ? {
                  start: safeTime(val.almuerzoInicio.trim(), def?.lunch?.start ?? ""),
                  end: safeTime(val.almuerzoFin.trim(), def?.lunch?.end ?? ""),
                }
              : null,
        };
        return acc;
      },
      {} as Record<string, any>
    );

    const work_days = Object.entries(configPorDia)
      .filter(([_, val]) => !!val.activo)
      .map(([key]) => dayNumberToName[key]);

    const payload = {
      max_per_day: Number(maxPorDia || 5),
      max_per_hour: Number(maxPorHora || 1),
      duration_minutes: Number(duracionCita || 30),
      work_days: work_days.length > 0 ? work_days : DEFAULT_WORK_DAYS,
      per_day_config:
        Object.keys(per_day_config).length > 0
          ? per_day_config
          : DEFAULT_PER_DAY_CONFIG,
      activo: isActivo,
    };

    console.log("📤 Enviando configuración al backend:", payload);

    try {
      const res = await fetch(`https://api.agenda-connect.com/api/private-config`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      setIsActivo(data.is_active !== false);
      setFechaVencimiento(data.expiration_date || "");
      setMensaje(
        res.ok
          ? "✅ Configuración guardada correctamente."
          : `❌ ${data.error || "No se pudo guardar."}`
      );
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

  const linkPublico = `https://api.agenda-connect.com/form.html?slug=${slug}`;

  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(linkPublico);
      setMensaje("✅ Enlace copiado");
      setTimeout(() => setMensaje(""), 2000);
    } catch (err) {
      console.error("Error copiando enlace", err);
      setMensaje("❌ No se pudo copiar");
    }
  };

  return (


  <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white p-4">
    <div className="bg-[#4c2882] p-10 rounded-2xl shadow-md w-full max-w-3xl border border-gray-700">
      <h1 className="text-3xl font-bold text-center mb-6">Panel Avanzado de Administración</h1>

{/* Contenedor de los dos botones superiores */}
<div className="flex justify-between items-center w-full max-w-md mx-auto mb-6 space-x-4">
  {/* Botón izquierda */}
  <a
    href={`https://api.agenda-connect.com/form.html?slug=${slug}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-[#ffffff] text-black font-semibold px-6 py-2 rounded-full hover:bg-[#bfff00] transition text-center flex-1 text-center"
  >
    Tu link
  </a>

  {/* Botón derecha */}
  <button
    onClick={irAgenda}
    className="bg-white text-black font-semibold px-7 py-2 rounded-full hover:bg-[#bfff00] hover:text-purple transition flex-1 text-center"
  >
    📅 Citas
  </button>
</div>

{/* Botón centrado (Google) */}
<div className="flex justify-center">
  <button
    onClick={conectarGoogle}
    className="bg-white text-black font-semibold px-6 py-2 rounded-full flex items-center gap-2 hover:bg-yellow-500 shadow-md transition"
  >
    <img src="/google-icon2.png" className="w-5 h-5" alt="Google" />
    Google Calendar
  </button>
</div>





      {/* Mensaje de suscripción vencida */}
      {(!isActivo || (fechaVencimiento && new Date(fechaVencimiento) < new Date())) && (
        <div className="bg-red-700 text-white px-4 py-2 rounded mb-6 text-center font-semibold">
          ⚠️ Tu suscripción ha vencido o está inactiva. Por favor contacta con el administrador.
        </div>
      )}

      {/* Configuración general */}
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

      {/* Configuración por día */}
      <div className="space-y-4">
        {dias.map((dia) => (
          <div key={dia.key} className="bg-[#3a2069] p-4 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{dia.nombre}</h3>
              <label className="flex items-center text-sm">
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

            {configPorDia[dia.key]?.activo && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-black">
                <div className="min-w-0">
                  <label className="text-white text-sm">Entrada</label>
                  <input
                    type="time"
                    value={configPorDia[dia.key]?.entrada || ""}
                    onChange={(e) =>
                      setConfigPorDia((prev) => ({
                        ...prev,
                        [dia.key]: { ...prev[dia.key], entrada: e.target.value },
                      }))
                    }
                    className="w-full text-green-500 bg-gray-900 border border-gray-700 px-2 py-1 rounded"
                  />
                </div>

                <div className="min-w-0">
                  <label className="text-white text-sm">Salida</label>
                  <input
                    type="time"
                    value={configPorDia[dia.key]?.salida || ""}
                    onChange={(e) =>
                      setConfigPorDia((prev) => ({
                        ...prev,
                        [dia.key]: { ...prev[dia.key], salida: e.target.value },
                      }))
                    }
                    className="w-full text-green-500 bg-gray-900 border border-gray-700 px-2 py-1 rounded"
                  />
                </div>

                <div className="min-w-0">
                  <label className="text-white text-sm">Almuerzo (Inicio)</label>
                  <input
                    type="time"
                    value={configPorDia[dia.key]?.almuerzoInicio || ""}
                    onChange={(e) =>
                      setConfigPorDia((prev) => ({
                        ...prev,
                        [dia.key]: { ...prev[dia.key], almuerzoInicio: e.target.value },
                      }))
                    }
                    className="w-full text-yellow-500 bg-gray-900 border border-yellow-700 px-2 py-1 rounded"
                  />
                </div>

                <div className="min-w-0">
                  <label className="text-white text-sm">Almuerzo (Fin)</label>
                  <input
                    type="time"
                    value={configPorDia[dia.key]?.almuerzoFin || ""}
                    onChange={(e) =>
                      setConfigPorDia((prev) => ({
                        ...prev,
                        [dia.key]: { ...prev[dia.key], almuerzoFin: e.target.value },
                      }))
                    }
                    className="w-full text-yellow-500 bg-gray-900 border border-yellow-700 px-2 py-1 rounded"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Estado conexión Google */}
      <div
        className={`text-sm mb-4 px-4 py-2 rounded font-semibold text-center ${
          conectadoGoogle
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {conectadoGoogle
          ? "✅ Google Calendar está conectado correctamente."
          : "❌ Google Calendar no está conectado."}
      </div>

      {/* Botones Google y Agenda */}
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
          className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-[#097969]"
        >
          📅 Ver Citas
        </button>
      </div>

      {mensaje && <p className="text-center mt-4 text-yellow-300 font-medium">{mensaje}</p>}

      {/* Botones guardar/cerrar */}
      <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={guardarConfiguracion}
          className="bg-green-400 text-black font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition"
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