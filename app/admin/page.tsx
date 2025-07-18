"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [mensaje, setMensaje] = useState("");
  const [maxPerHour, setMaxPerHour] = useState("1");
  const [maxPerDay, setMaxPerDay] = useState("1");
  const [duration, setDuration] = useState("30");
  const [startHour, setStartHour] = useState("09:00");
  const [endHour, setEndHour] = useState("17:00");
  const [workDays, setWorkDays] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const slug = sessionStorage.getItem("slug");

    if (!token || !slug) {
      router.push("/login");
      return;
    }

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
  }, []);

  const guardarConfig = async () => {
    const token = sessionStorage.getItem("accessToken");
    const slug = sessionStorage.getItem("slug");

    if (!token || !slug) {
      setMensaje("❌ Sesión inválida. Inicia sesión nuevamente.");
      router.push("/login");
      return;
    }

    const dayNames: { [key: string]: string } = {
      "1": "Monday",
      "2": "Tuesday",
      "3": "Wednesday",
      "4": "Thursday",
      "5": "Friday",
      "6": "Saturday",
      "7": "Sunday",
    };

    const configData = {
      max_per_hour: Number(maxPerHour),
      max_per_day: Number(maxPerDay),
      duration_minutes: Number(duration),
      start_hour: startHour,
      end_hour: endHour,
      work_days: workDays.map((d) => dayNames[d]),
    };

    try {
      const res = await fetch(`https://api.agenda-connect.com/api/config/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(configData),
      });

      const data = await res.json();

      if (!res.ok) return setMensaje("❌ " + (data.error || "Error al guardar."));

      setMensaje("✅ Configuración guardada correctamente.");
    } catch {
      setMensaje("❌ Error al conectar con el servidor.");
    }
  };

  const toggleDay = (day: string) => {
    setWorkDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const cerrarSesion = () => {
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0C1A1A] text-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-[#01257D] p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Panel de Configuración</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            value={maxPerHour}
            onChange={(e) => setMaxPerHour(e.target.value)}
            placeholder="Máximo por hora"
            className="p-2 rounded-md text-black"
          />
          <input
            type="number"
            value={maxPerDay}
            onChange={(e) => setMaxPerDay(e.target.value)}
            placeholder="Máximo por día"
            className="p-2 rounded-md text-black"
          />
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duración (min)"
            className="p-2 rounded-md text-black"
          />
          <input
            type="time"
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
            className="p-2 rounded-md text-black"
          />
          <input
            type="time"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            className="p-2 rounded-md text-black"
          />
        </div>

        <div>
          <p className="font-semibold mb-2">Días laborables:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: "Lunes", value: "1" },
              { label: "Martes", value: "2" },
              { label: "Miércoles", value: "3" },
              { label: "Jueves", value: "4" },
              { label: "Viernes", value: "5" },
              { label: "Sábado", value: "6" },
              { label: "Domingo", value: "7" },
            ].map((day) => (
              <label key={day.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={workDays.includes(day.value)}
                  onChange={() => toggleDay(day.value)}
                />
                <span>{day.label}</span>
              </label>
            ))}
          </div>
        </div>

        {mensaje && <p className="text-center font-medium text-sm">{mensaje}</p>}

        <div className="flex justify-between gap-4 mt-4">
          <button
            onClick={guardarConfig}
            className="flex-1 py-2 rounded-md bg-green-600 hover:bg-green-500 transition duration-200 font-semibold"
          >
            Guardar
          </button>
          <button
            onClick={cerrarSesion}
            className="flex-1 py-2 rounded-md bg-red-600 hover:bg-red-500 transition duration-200 font-semibold"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
