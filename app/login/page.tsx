"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMensaje("⚠️ Email y contraseña obligatorios.");
      return;
    }

    try {
      const res = await fetch("https://api.agenda-connect.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje("❌ " + (data.error || "Credenciales inválidas."));
        return;
      }

      sessionStorage.setItem("accessToken", data.access_token);
      sessionStorage.setItem("slug", data.slug);

      setMensaje("✅ Bienvenido. Redirigiendo...");
      setTimeout(() => router.push("/admin"), 1500);
    } catch (err) {
      setMensaje("❌ Error al conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] px-4 text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-6 bg-[#01257D] p-8 rounded-xl shadow-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo2.png"
            alt="Logo de Agenda Connect"
            width={90}
            height={90}
            className="rounded-full shadow-md"
          />
        </div>

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
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
