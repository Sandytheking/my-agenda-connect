"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const router = useRouter();

  // 🔐 Si ya está logueado, ir directo a agenda
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const slug = sessionStorage.getItem("slug");

    if (token && slug) {
      router.replace("/agenda");
    }
  }, [router]);

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

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setMensaje("❌ " + (data?.error || "Credenciales inválidas."));
        return;
      }

      const token =
        data?.token ||
        data?.access_token ||
        data?.session?.access_token ||
        data?.session?.accessToken;

      const slug = data?.slug || data?.config?.slug || data?.user?.slug;

      if (!token) {
        setMensaje("❌ Login exitoso pero no se recibió token.");
        return;
      }

      sessionStorage.setItem("accessToken", token);
      if (slug) sessionStorage.setItem("slug", slug);

      setMensaje("✅ Bienvenido. Redirigiendo...");
      setTimeout(() => router.push("/agenda"), 700);
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-6 bg-[#4c2882] p-8 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full px-4 py-2 rounded-md bg-white text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full px-4 py-2 rounded-md bg-white text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {mensaje && (
          <div className="text-sm text-center text-green-300 font-medium">
            {mensaje}
          </div>
        )}

        <button
          type="submit"
          disabled={cargando}
          className={`w-full py-2 font-semibold rounded-md transition ${
            cargando
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-400 hover:bg-green-600"
          }`}
        >
          {cargando ? "Ingresando..." : "Iniciar Sesión"}
        </button>

        <div className="text-center mt-4">
          <a href="/olvide-contrasena" className="text-sm text-blue-400 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </div>
  );
}
