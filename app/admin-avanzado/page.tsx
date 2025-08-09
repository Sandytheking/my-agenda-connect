// 📄 AdminAvanzado.tsx
// 📄 AdminAvanzado.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { DateTime } from "luxon";

export default function AdminAvanzado() {
  const router = useRouter();
  const { user } = useUser();

  // 📅 Días en español
  const dias = [
    { nombre: "Lunes", key: "1" },
    { nombre: "Martes", key: "2" },
    { nombre: "Miércoles", key: "3" },
    { nombre: "Jueves", key: "4" },
    { nombre: "Viernes", key: "5" },
    { nombre: "Sábado", key: "6" },
    { nombre: "Domingo", key: "7" },
  ];

  // 📅 Mapas de conversión día-numero ↔ día-inglés
  const dayNumberToName: Record<string, string> = {
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
    "7": "Sunday",
  };

  const dayNameToNumber = Object.fromEntries(
    Object.entries(dayNumberToName).map(([num, eng]) => [eng, num])
  );

  // 🔹 Estados principales
  const [configPorDia, setConfigPorDia] = useState<Record<string, any>>({});
  const [maxPorHora, setMaxPorHora] = useState("1");
  const [maxPorDia, setMaxPorDia] = useState("1");
  const [duracionCita, setDuracionCita] = useState("30");
  const [mensaje, setMensaje] = useState("");
  const [isActivo, setIsActivo] = useState(true);
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [conectadoGoogle, setConectadoGoogle] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Autenticación
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // ---------- Helpers ----------
  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    try {
      return DateTime.fromISO(iso).toLocaleString(DateTime.DATE_MED);
    } catch {
      return iso;
    }
  };

  // 📡 Obtener configuración privada (usa user_id como query param)
  const fetchConfigPrivada = async (tokenParam: string, userIdParam: string) => {
    if (!tokenParam || !userIdParam) {
      setMensaje("❌ Token o User ID no encontrado");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://api.agenda-connect.com/api/private-config?user_id=${encodeURIComponent(
          userIdParam
        )}`,
        { headers: { Authorization: `Bearer ${tokenParam}` } }
      );

      const data = await res.json();

      if (!res.ok) {
        setMensaje("❌ Error: " + (data.error || "Error desconocido"));
        setLoading(false);
        return;
      }

      // Configuración general
      setMaxPorHora(String(data.max_per_hour ?? 1));
      setMaxPorDia(String(data.max_per_day ?? 1));
      setDuracionCita(String(data.duration_minutes ?? 30));

      // Configuración por día (asegurando shape consistente)
      const porDia: Record<string, any> = {};
      for (let i = 1; i <= 7; i++) {
        const diaKey = String(i);
        const dayName = dayNumberToName[diaKey];
        const configDelDia = data.per_day_config?.[dayName];

        porDia[diaKey] = {
          activo:
            configDelDia?.enabled ??
            (data.work_days || []).includes(dayName),
          entrada: configDelDia?.start ?? data.start_hour ?? "08:00",
          salida: configDelDia?.end ?? data.end_hour ?? "17:00",
          almuerzoInicio:
            configDelDia?.lunch?.start ??
            (configDelDia?.lunch === null ? "" : "12:00"),
          almuerzoFin:
            configDelDia?.lunch?.end ??
            (configDelDia?.lunch === null ? "" : "13:00"),
        };
      }

      setConfigPorDia(porDia);
      setIsActivo(data.is_active !== false);
      setFechaVencimiento(data.expiration_date ?? "");
      setConectadoGoogle(Boolean(data.refresh_token));
      setConfig(data);
      setMensaje("");
    } catch (error) {
      console.error("❌ Error al conectar con el servidor:", error);
      setMensaje("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // 📡 Guardar configuración (PUT con user_id)
  const guardarConfiguracion = async () => {
    if (!token || !userId) {
      setMensaje("❌ Token o User ID no disponible");
      return;
    }

    const per_day_config = Object.entries(configPorDia).reduce(
      (acc, [key, val]) => {
        acc[dayNumberToName[key]] = {
          start: val.entrada,
          end: val.salida,
          enabled: val.activo,
          lunch:
            val.almuerzoInicio?.trim() && val.almuerzoFin?.trim()
              ? {
                  start: val.almuerzoInicio.trim(),
                  end: val.almuerzoFin.trim(),
                }
              : null,
        };
        return acc;
      },
      {} as Record<string, any>
    );

    const work_days = Object.entries(configPorDia)
      .filter(([_, val]) => val.activo)
      .map(([key]) => dayNumberToName[key]);

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
      const res = await fetch(
        `https://api.agenda-connect.com/api/private-config?user_id=${encodeURIComponent(
          userId
        )}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setMensaje(`❌ ${data.error || "No se pudo guardar."}`);
      } else {
        setIsActivo(data.is_active !== false);
        setFechaVencimiento(data.expiration_date ?? "");
        setMensaje("✅ Configuración guardada correctamente.");
      }
    } catch (err) {
      console.error("❌ Error guardando configuración:", err);
      setMensaje("❌ Error al conectar con el servidor.");
    }

    setTimeout(() => setMensaje(""), 8000);
  };

  // 🔗 Conexión con Google (redirige al backend con user_id)
  const conectarGoogle = () => {
    // Preferimos user context si está disponible, sino la sessionStorage
    const uid = (user && (user as any).id) || userId;
    if (!uid) {
      console.error("❌ No se encontró el user_id");
      setMensaje("❌ No se encontró user_id. Reingresa y vuelve a intentar.");
      return;
    }

    // Redirige al endpoint que inicia OAuth (backend debe aceptar user_id)
    window.location.href = `https://api.agenda-connect.com/api/oauth/start?user_id=${encodeURIComponent(
      uid
    )}`;
  };

  // 🚪 Cerrar sesión (limpia sessionStorage)
  const desconectar = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("slug");
    router.push("/login");
  };

  const irAgenda = () => router.push("/agenda");

  // ---------- Inicialización ----------
  // 1) Si el context user ya está, usar su id y evitar redirección innecesaria
  useEffect(() => {
    // si user viene del context, preferirlo
    const uidFromContext = (user && (user as any).id) || null;
    const tokenFromStorage =
      typeof window !== "undefined"
        ? sessionStorage.getItem("accessToken")
        : null;
    const uidFromStorage =
      typeof window !== "undefined"
        ? sessionStorage.getItem("user_id")
        : null;

    // Preferir context -> storage
    const resolvedUserId = uidFromContext ?? uidFromStorage;
    setToken(tokenFromStorage);
    setUserId(resolvedUserId);

    // Si ya tenemos token y uid, cargar configuración
    if (tokenFromStorage && resolvedUserId) {
      fetchConfigPrivada(tokenFromStorage, resolvedUserId);
    } else {
      // Si no hay token/uid, redirigir al login (mantén la UX que tenías)
      if (!tokenFromStorage || !resolvedUserId) {
        router.push("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);

  // Si quieres que se refresque cuando cambien token/userId manualmente
  useEffect(() => {
    if (token && userId) {
      fetchConfigPrivada(token, userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

  // ⏳ Loader mientras carga
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Cargando configuración...</p>
      </div>
    );
  }

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-[#0C1A1A] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Administración Avanzada</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={irAgenda}
              className="bg-gray-700 px-3 py-1 rounded text-sm"
            >
              Ir a Agenda
            </button>
            <button
              onClick={desconectar}
              className="bg-red-600 px-3 py-1 rounded text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {mensaje && (
          <div className="mb-4 text-sm text-yellow-300">{mensaje}</div>
        )}

        <section className="bg-[#111827] p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Estado: {isActivo ? "Activo" : "Inactivo"}</p>
              <p className="text-sm text-gray-400">Vencimiento: {fechaVencimiento ? formatDate(fechaVencimiento) : "-"}</p>
              <p className="text-sm text-gray-400">Conectado Google: {conectadoGoogle ? "Sí" : "No"}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={conectarGoogle}
                className="bg-blue-600 px-4 py-2 rounded text-sm"
              >
                Conectar Google Calendar
              </button>
              <button
                onClick={() => setConectadoGoogle(false)}
                className="bg-gray-600 px-3 py-1 rounded text-sm"
              >
                Desconectar (solo UI)
              </button>
            </div>
          </div>
        </section>

        {/* Controles generales */}
        <section className="bg-[#0b1220] p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300">Max por hora</label>
            <input
              value={maxPorHora}
              onChange={(e) => setMaxPorHora(e.target.value)}
              className="mt-1 w-full p-2 rounded bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Max por día</label>
            <input
              value={maxPorDia}
              onChange={(e) => setMaxPorDia(e.target.value)}
              className="mt-1 w-full p-2 rounded bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Duración (min)</label>
            <input
              value={duracionCita}
              onChange={(e) => setDuracionCita(e.target.value)}
              className="mt-1 w-full p-2 rounded bg-gray-800"
            />
          </div>
        </section>

        {/* Configuración por día */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Configuración por día</h2>
          <div className="grid gap-4">
            {dias.map((d) => {
              const conf = configPorDia[d.key] ?? {
                activo: true,
                entrada: "08:00",
                salida: "17:00",
                almuerzoInicio: "",
                almuerzoFin: "",
              };

              return (
                <div
                  key={d.key}
                  className="bg-[#0b1220] p-4 rounded-lg flex flex-col md:flex-row md:items-center gap-3"
                >
                  <div className="w-full md:w-40">
                    <div className="flex items-center justify-between">
                      <strong>{d.nombre}</strong>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={Boolean(conf.activo)}
                          onChange={(e) =>
                            setConfigPorDia((prev) => ({
                              ...prev,
                              [d.key]: { ...conf, activo: e.target.checked },
                            }))
                          }
                        />
                        <span className="text-xs text-gray-300">laborable</span>
                      </label>
                    </div>
                    <div className="text-xs text-gray-400">{conf.activo ? "Disponible" : "No disponible"}</div>
                  </div>

                  <div className="flex gap-2 items-center w-full">
                    <label className="text-xs text-gray-400">Entrada</label>
                    <input
                      type="time"
                      value={conf.entrada}
                      onChange={(e) =>
                        setConfigPorDia((prev) => ({
                          ...prev,
                          [d.key]: { ...conf, entrada: e.target.value },
                        }))
                      }
                      className="p-1 rounded bg-gray-800"
                    />
                    <label className="text-xs text-gray-400">Salida</label>
                    <input
                      type="time"
                      value={conf.salida}
                      onChange={(e) =>
                        setConfigPorDia((prev) => ({
                          ...prev,
                          [d.key]: { ...conf, salida: e.target.value },
                        }))
                      }
                      className="p-1 rounded bg-gray-800"
                    />

                    <div className="ml-auto text-xs text-gray-400">
                      Almuerzo:
                      <input
                        type="time"
                        value={conf.almuerzoInicio ?? ""}
                        onChange={(e) =>
                          setConfigPorDia((prev) => ({
                            ...prev,
                            [d.key]: { ...conf, almuerzoInicio: e.target.value },
                          }))
                        }
                        className="mx-2 p-1 rounded bg-gray-800"
                      />
                      -
                      <input
                        type="time"
                        value={conf.almuerzoFin ?? ""}
                        onChange={(e) =>
                          setConfigPorDia((prev) => ({
                            ...prev,
                            [d.key]: { ...conf, almuerzoFin: e.target.value },
                          }))
                        }
                        className="mx-2 p-1 rounded bg-gray-800"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="flex gap-3">
          <button
            onClick={guardarConfiguracion}
            className="bg-emerald-600 px-4 py-2 rounded"
          >
            Guardar configuración
          </button>

          <button
            onClick={() => {
              // restablecer UI a la última config cargada
              if (config && token && userId) {
                fetchConfigPrivada(token, userId);
              }
            }}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Revertir
          </button>
        </div>

        <footer className="mt-8 text-sm text-gray-400">
          <p>
            Conexión Google: {conectadoGoogle ? "Activada" : "No conectada"}
          </p>
        </footer>
      </div>
    </div>
  );
}
