"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [slug, setSlug] = useState("");
  const [aceptado, setAceptado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const [slugStatus, setSlugStatus] = useState<null | "ok" | "error" | "checking">(null);
  const [slugMensaje, setSlugMensaje] = useState("");

  const router = useRouter();

  const validarSlug = async () => {
    const limpio = slug.trim().toLowerCase();
    if (!limpio) {
      setSlugStatus(null);
      setSlugMensaje("");
      return;
    }

    setSlugStatus("checking");
    setSlugMensaje("Verificando...");

    try {
      const res = await fetch(`https://api.agenda-connect.com/api/slug-exists/${limpio}`);
      const data = await res.json();

      if (data.exists) {
        setSlugStatus("error");
        setSlugMensaje(`⛔ “${limpio}” ya está en uso`);
      } else {
        setSlugStatus("ok");
        setSlugMensaje(`✅ “${limpio}” está disponible`);
      }
    } catch (error) {
      setSlugStatus("error");
      setSlugMensaje("⛔ Error al verificar el slug.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !nombre || !slug) {
      setMensaje("⚠️ Todos los campos son obligatorios");
      return;
    }

    if (!aceptado) {
      setMensaje("Debes aceptar los Términos y Condiciones.");
      return;
    }

    setCargando(true);
    setMensaje("Creando cuenta...");

    try {
      const res = await fetch("https://api.agenda-connect.com/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          nombre,
          slug,
          accepted_terms: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setMensaje("⚠️ El slug ya está en uso. Elige otro.");
        } else if (data?.error) {
          setMensaje(`⚠️ ${data.error}`);
        } else {
          setMensaje("❌ Error desconocido al registrar");
        }
      } else {
        setMensaje("✅ Registro exitoso. Redirigiendo...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error en registro:", error);
      setMensaje("❌ Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  const botonDeshabilitado = slugStatus !== "ok" || !aceptado;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-[#01257D] p-8 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold text-center">Registro de Negocio</h1>

        <input
          type="text"
          placeholder="Nombre del negocio"
          className="w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

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

        <div>
          <input
            type="text"
            placeholder="(Slug) Ej: maria-salon"
            className="w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onBlur={validarSlug}
          />
          {slugMensaje && (
            <p
              className={`mt-1 text-sm ${
                slugStatus === "ok"
                  ? "text-green-500"
                  : slugStatus === "error"
                  ? "text-red-500"
                  : "text-gray-300"
              }`}
            >
              {slugMensaje}
            </p>
          )}
        </div>

        <label className="flex items-center text-sm text-gray-300">
          <input
            type="checkbox"
            checked={aceptado}
            onChange={(e) => setAceptado(e.target.checked)}
            className="mr-2"
          />
          Acepto los{" "}
          <a href="/terminos" className="ml-1 underline text-blue-400 hover:text-blue-300">
            Términos y Condiciones
          </a>
        </label>

        {mensaje && (
          <div className="text-sm text-center text-red-400 font-medium">{mensaje}</div>
        )}

        <button
          type="submit"
          disabled={botonDeshabilitado || cargando}
          className={`w-full py-2 font-semibold rounded-md flex items-center justify-center transition-transform duration-200 ${
            botonDeshabilitado || cargando
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 active:scale-95"
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
          {cargando ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
