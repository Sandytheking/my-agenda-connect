"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [maxPerHour, setMaxPerHour] = useState("1");
  const [maxPerDay, setMaxPerDay] = useState("1");
  const [duration, setDuration] = useState("30");
  const [startHour, setStartHour] = useState("09:00");
  const [endHour, setEndHour] = useState("17:00");
  const [workDays, setWorkDays] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState("");

  // ✅ Cargar slug y token del sessionStorage una vez montado
  useEffect(() => {
    const sToken = sessionStorage.getItem("accessToken");
    const sSlug = sessionStorage.getItem("slug");

    if (!sToken || !sSlug) {
      router.push("/login");
    } else {
      setToken(sToken);
      setSlug(sSlug);
    }
  }, []);

  // ✅ Cuando token y slug ya están cargados, entonces hacer el fetch
  useEffect(() => {
    if (!token || !slug) return;

    const fetchConfig = async () => {
      try {
        const res = await fetch(`https://api.agenda-connect.com/api/config/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) return setMensaje("❌ Error: " + (data.error || "Error desconocido"));

        const dayMap: { [key: string]: string } = {
          Sunday: "7",
          Monday: "1",
          Tuesday: "2",
          Wednesday: "3",
          Thursday: "4",
          Friday: "5",
          Saturday: "6",
        };

        setMaxPerHour(String(data.max_per_hour || 1));
        setMaxPerDay(String(data.max_per_day || 1));
        setDuration(String(data.duration_minutes || 30));
        setStartHour(data.start_hour || "09:00");
        setEndHour(data.end_hour || "17:00");
        setWorkDays((data.work_days || []).map((d: string) => dayMap[d]).filter(Boolean));
      } catch {
        setMensaje("❌ Error al conectar con el servidor");
      }
    };

    fetchConfig();
  }, [token, slug]); // 👈 importante: solo se ejecuta cuando ambos están listos


  const toggleDay = (value: string) => {
    setWorkDays((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const desconectar = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("slug");
    router.push("/login");
  };

  const conectarGoogle = () => {
    if (!slug) return setMensaje("❌ No se encontró el negocio.");
    window.location.href = https://api.agenda-connect.com/api/oauth/start?slug=${slug};
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white">
      <div className="bg-[#0C1A1A] p-10 rounded-2xl shadow-md w-full max-w-2xl border border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-10">Panel de Administración</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Max por hora:</label>
              <input
                type="number"
                value={maxPerHour}
                onChange={(e) => setMaxPerHour(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>
            <div>
              <label className="block mb-1">Max por día:</label>
              <input
                type="number"
                value={maxPerDay}
                onChange={(e) => setMaxPerDay(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>
            <div>
              <label className="block mb-1">Duración de cita (min):</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label className="block mb-1">Hora de entrada</label>
                <input
                  type="time"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  className="px-4 py-2 rounded bg-white text-black"
                />
              </div>
              <div>
                <label className="block mb-1">Hora de salida</label>
                <input
                  type="time"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                  className="px-4 py-2 rounded bg-white text-black"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 font-semibold">Días Laborables</p>
            <div className="space-y-2">
              {daysOptions.map((day) => (
                <label key={day.value} className="block">
                  <input
                    type="checkbox"
                    checked={workDays.includes(day.value)}
                    onChange={() => toggleDay(day.value)}
                    className="mr-2"
                  />
                  {day.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-center text-yellow-400 font-semibold">
          Conectar a
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={conectarGoogle}
            className="bg-[#ffffff] text-black rounded-full flex items-center gap-2 px-4 py-2"
          >
            <img src="/google-icon2.png" alt="Google" className="w-5 h-5" />
            Google Calendar
          </button>
        </div>

        {mensaje && (
          <p className="text-center mt-4 text-red-400 font-medium">{mensaje}</p>
        )}

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={guardarConfig}
            className="bg-white text-black font-semibold py-2 px-6 rounded"
          >
            Guardar
          </button>
          <button
            onClick={desconectar}
            className="bg-white text-black font-semibold py-2 px-6 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}