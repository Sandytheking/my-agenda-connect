"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { useUser } from "@/context/UserContext";
import { Copy, Calendar, LogOut, Save } from "lucide-react"; // Íconos de Lucide para consistencia

export default function AdminAvanzado() {
  const router = useRouter();
  const { user } = useUser();
  const dias = [
    { nombre: "Lunes", key: "1" },
    { nombre: "Martes", key: "2" },
    { nombre: "Miércoles", key: "3" },
    { nombre: "Jueves", key: "4" },
    { nombre: "Viernes", key: "5" },
    { nombre: "Sábados", key: "6" },
    { nombre: "Domingos", key: "7" },
  ];

  // States (sin cambios)
  const [configPorDia, setConfigPorDia] = useState<{ [key: string]: any }>({});
  const [maxPorHora, setMaxPorHora] = useState("1");
  const [maxPorDia, setMaxPorDia] = useState("1");
  const [duracionCita, setDuracionCita] = useState("30");
  const [mensaje, setMensaje] = useState("");
  const [isActivo, setIsActivo] = useState(true);
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [conectadoGoogle, setConectadoGoogle] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Para loader

  // Constantes (sin cambios)
  const dayNumberToName: { [key: string]: string } = {
    "1": "Monday", "2": "Tuesday", "3": "Wednesday", "4": "Thursday",
    "5": "Friday", "6": "Saturday", "7": "Sunday",
  };
  const dayNameToNumber: { [key: string]: string } = Object.fromEntries(
    Object.entries(dayNumberToName).map(([k, v]) => [v, k])
  );
  const DEFAULT_WORK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const DEFAULT_PER_DAY_CONFIG: Record<string, any> = {
    Monday: { start: "08:00", end: "17:00", enabled: true, lunch: { start: "12:00", end: "13:00" } },
    Tuesday: { start: "08:00", end: "17:00", enabled: true, lunch: { start: "12:00", end: "13:00" } },
    Wednesday: { start: "08:00", end: "17:00", enabled: true, lunch: { start: "12:00", end: "13:00" } },
    Thursday: { start: "08:00", end: "17:00", enabled: true, lunch: { start: "12:00", end: "13:00" } },
    Friday: { start: "08:00", end: "17:00", enabled: true, lunch: { start: "12:00", end: "13:00" } },
    Saturday: { start: "08:00", end: "17:00", enabled: false, lunch: null },
    Sunday: { start: "08:00", end: "17:00", enabled: false, lunch: null },
  };

  // Funciones de normalización y fetch/save (sin cambios)
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
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`https://api.agenda-connect.com/api/private-config`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setMensaje("❌ Error: " + (data.error || "Error desconocido"));
        setLoading(false);
        return;
      }
      setMaxPorHora(String(data.max_per_hour || 1));
      setMaxPorDia(String(data.max_per_day || 1));
      setDuracionCita(String(data.duration_minutes || 30));
      const perDay = data.per_day_config && Object.keys(data.per_day_config).length > 0 ? data.per_day_config : DEFAULT_PER_DAY_CONFIG;
      const workDays: string[] = data.work_days && data.work_days.length > 0 ? data.work_days : DEFAULT_WORK_DAYS;
      const porDia: { [key: string]: any } = {};
      for (let i = 1; i <= 7; i++) {
        const diaKey = String(i);
        const dayName = dayNumberToName[diaKey];
        const fromServer = perDay[dayName] || {};
        const fromDefaults = DEFAULT_PER_DAY_CONFIG[dayName];
        const enabled = typeof fromServer.enabled === "boolean" ? fromServer.enabled : workDays.includes(dayName);
        const entrada = safeTime(fromServer.start ?? data.start_hour, fromDefaults.start);
        const salida = safeTime(fromServer.end ?? data.end_hour, fromDefaults.end);
        const lunchStart = safeTime(fromServer?.lunch?.start, fromDefaults?.lunch?.start ?? "");
        const lunchEnd = safeTime(fromServer?.lunch?.end, fromDefaults?.lunch?.end ?? "");
        porDia[diaKey] = {
          activo: !!enabled,
          entrada, salida,
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
    setLoading(false);
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
    const per_day_config = Object.entries(configPorDia).reduce((acc, [key, val]) => {
      const name = dayNumberToName[key];
      const def = DEFAULT_PER_DAY_CONFIG[name];
      acc[name] = {
        start: safeTime(val.entrada, def.start),
        end: safeTime(val.salida, def.end),
        enabled: !!val.activo,
        lunch: val.almuerzoInicio?.trim() && val.almuerzoFin?.trim() ? {
          start: safeTime(val.almuerzoInicio.trim(), def?.lunch?.start ?? ""),
          end: safeTime(val.almuerzoFin.trim(), def?.lunch?.end ?? ""),
        } : null,
      };
      return acc;
    }, {} as Record<string, any>);
    const work_days = Object.entries(configPorDia).filter(([_, val]) => !!val.activo).map(([key]) => dayNumberToName[key]);
    const payload = {
      max_per_day: Number(maxPorDia || 5),
      max_per_hour: Number(maxPorHora || 1),
      duration_minutes: Number(duracionCita || 30),
      work_days: work_days.length > 0 ? work_days : DEFAULT_WORK_DAYS,
      per_day_config: Object.keys(per_day_config).length > 0 ? per_day_config : DEFAULT_PER_DAY_CONFIG,
      activo: isActivo,
    };
    console.log("📤 Enviando configuración al backend:", payload);
    try {
      const res = await fetch(`https://api.agenda-connect.com/api/private-config`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050507] to-[#0a0a0f] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (Object.keys(configPorDia).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050507] to-[#0a0a0f] flex items-center justify-center text-white">
        <p className="text-xl">Cargando configuración...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-[#050507] via-[#0a0a0f] to-[#050507] text-white relative overflow-hidden p-2 sm:p-4">
      {/* Glow effects para consistencia con agenda */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/10 blur-[150px] top-20 left-0 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[120px] bottom-40 right-0 animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto w-full"
      >
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
        >
          <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-white/90 to-purple-400 bg-clip-text text-transparent text-center sm:text-left">
            Panel Avanzado de Administración
          </h1>
          {/* Barra de acciones superior: Link + Copiar + Agenda */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex gap-2 flex-1 sm:flex-none">
              <a
                href={linkPublico}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black font-semibold px-4 py-2 rounded-xl hover:bg-[#bfff00] transition flex-1 text-center flex items-center justify-center gap-2"
              >
                Tu Link
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copiarEnlace}
                className="bg-white text-black font-semibold p-2 rounded-xl hover:bg-[#bfff00] transition"
                title="Copiar enlace"
              >
                <Copy className="w-5 h-5" />
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={irAgenda}
              className="bg-white text-black font-semibold px-6 py-2 rounded-xl hover:bg-[#097969] transition flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <Calendar className="w-4 h-4" />
              Ver Citas
            </motion.button>
          </div>
        </motion.header>

        {/* Alerta de suscripción */}
        {(!isActivo || (fechaVencimiento && new Date(fechaVencimiento) < new Date())) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-600/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-center font-medium flex items-center justify-center gap-2"
          >
            ⚠️ Tu suscripción ha vencido o está inactiva. Por favor contacta con el administrador.
          </motion.div>
        )}

        {/* Mensaje general */}
        {mensaje && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center px-4 py-3 rounded-xl mb-6 font-medium flex items-center justify-center gap-2 ${
              mensaje.includes("✅") ? "bg-green-600/20 border border-green-500/30 text-green-300" :
              mensaje.includes("❌") ? "bg-red-600/20 border border-red-500/30 text-red-300" :
              "bg-yellow-600/20 border border-yellow-500/30 text-yellow-300"
            }`}
          >
            {mensaje}
          </motion.div>
        )}

        {/* Configuración general */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 sm:p-6 mb-6"
        >
          <h2 className="text-xl font-bold mb-4 text-center sm:text-left">Configuración General</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Máx. por hora</label>
              <input
                value={maxPorHora}
                onChange={(e) => setMaxPorHora(e.target.value)}
                type="number"
                min="1"
                className="w-full px-3 py-2 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Máx. por día</label>
              <input
                value={maxPorDia}
                onChange={(e) => setMaxPorDia(e.target.value)}
                type="number"
                min="1"
                className="w-full px-3 py-2 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Duración cita (min)</label>
              <input
                value={duracionCita}
                onChange={(e) => setDuracionCita(e.target.value)}
                type="number"
                min="15"
                className="w-full px-3 py-2 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.section>

        {/* Configuración por día */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 sm:p-6 mb-6 space-y-4"
        >
          <h2 className="text-xl font-bold mb-4 text-center sm:text-left">Horarios por Día</h2>
          {dias.map((dia) => (
            <motion.div
              key={dia.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * parseInt(dia.key) }}
              className="bg-[#3a2069]/80 backdrop-blur-sm p-4 rounded-xl border border-purple-500/30"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                <h3 className="font-semibold text-lg flex-1">{dia.nombre}</h3>
                <label className="flex items-center text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configPorDia[dia.key]?.activo || false}
                    onChange={() =>
                      setConfigPorDia((prev) => ({
                        ...prev,
                        [dia.key]: { ...prev[dia.key], activo: !prev[dia.key]?.activo },
                      }))
                    }
                    className="mr-2 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-300">Laborable</span>
                </label>
              </div>
              {configPorDia[dia.key]?.activo && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Entrada</label>
                    <input
                      type="time"
                      value={configPorDia[dia.key]?.entrada || ""}
                      onChange={(e) =>
                        setConfigPorDia((prev) => ({ ...prev, [dia.key]: { ...prev[dia.key], entrada: e.target.value } }))
                      }
                      className="w-full px-2 py-2 rounded-xl bg-gray-900/50 text-green-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Salida</label>
                    <input
                      type="time"
                      value={configPorDia[dia.key]?.salida || ""}
                      onChange={(e) =>
                        setConfigPorDia((prev) => ({ ...prev, [dia.key]: { ...prev[dia.key], salida: e.target.value } }))
                      }
                      className="w-full px-2 py-2 rounded-xl bg-gray-900/50 text-green-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Almuerzo Inicio</label>
                    <input
                      type="time"
                      value={configPorDia[dia.key]?.almuerzoInicio || ""}
                      onChange={(e) =>
                        setConfigPorDia((prev) => ({ ...prev, [dia.key]: { ...prev[dia.key], almuerzoInicio: e.target.value } }))
                      }
                      className="w-full px-2 py-2 rounded-xl bg-gray-900/50 text-yellow-400 border border-yellow-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Almuerzo Fin</label>
                    <input
                      type="time"
                      value={configPorDia[dia.key]?.almuerzoFin || ""}
                      onChange={(e) =>
                        setConfigPorDia((prev) => ({ ...prev, [dia.key]: { ...prev[dia.key], almuerzoFin: e.target.value } }))
                      }
                      className="w-full px-2 py-2 rounded-xl bg-gray-900/50 text-yellow-400 border border-yellow-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.section>

        {/* Estado Google */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`text-sm px-4 py-3 rounded-xl font-medium text-center border ${
            conectadoGoogle
              ? "bg-green-600/20 border-green-500/30 text-green-300"
              : "bg-red-600/20 border-red-500/30 text-red-300"
          } mb-6`}
        >
          {conectadoGoogle ? "✅ Google Calendar está conectado correctamente." : "❌ Google Calendar no está conectado."}
        </motion.div>

        {/* Barra de acciones Google */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={conectarGoogle}
            className="bg-white text-black font-semibold px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition shadow-lg hover:shadow-purple-500/25"
          >
            <img src="/google-icon2.png" className="w-5 h-5" alt="Google" />
            Conectar Google Calendar
          </motion.button>
        </motion.div>

        {/* Botones principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={guardarConfiguracion}
            className="bg-green-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-green-700 transition shadow-lg hover:shadow-green-500/25 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar Configuración
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={desconectar}
            className="bg-red-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-red-700 transition shadow-lg hover:shadow-red-500/25 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}