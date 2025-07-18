"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMensaje("⚠️ Email y contraseña obligatorios.");
      return;
    }

    setCargando(true);
    setMensaje("Verificando...");

    try {
      const res = await fetch("https://api.agenda-connect.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje("❌ " + (data.error || "Credenciales inválidas."));
      } else {
        sessionStorage.setItem("accessToken", data.access_token);
        sessionStorage.setItem("slug", data.slug);

        setMensaje("✅ Bienvenido. Redirigiendo...");
        setTimeout(() => router.push("/admin"), 1500);
      }
    } catch (err) {
      setMensaje("❌ Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
     <div
      className="min-h-screen flex items-center justify-center px-4 text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/azul34.webp')" }}
    >
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-6 bg-[#01257D] p-8 rounded-xl shadow-md bg-opacity-90"
      >
        <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {mensaje && (
          <div className="text-sm text-center text-red-400 font-medium">{mensaje}</div>
        )}

        <button
          type="submit"
          disabled={cargando}
          className={`w-full py-2 font-semibold rounded-md transition flex items-center justify-center ${
            cargando
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          {cargando && (
            <svg
              className="animate-spin mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              ></path>
            </svg>
          )}
          {cargando ? "Ingresando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}
