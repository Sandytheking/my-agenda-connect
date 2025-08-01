// app/registro/RegistroForm.tsx
"use client";

import { useRegistro } from "./useRegistro";

export default function RegistroForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    nombre,
    setNombre,
    slug,
    setSlug,
    aceptado,
    setAceptado,
    mensaje,
    cargando,
    slugStatus,
    slugMensaje,
    validarSlug,
    handleSubmit,
    botonDeshabilitado,
  } = useRegistro();

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 bg-[#4c2882] p-8 rounded-xl shadow-md"
    >
      <h1 className="text-2xl font-bold text-center">Registro de Negocio</h1>

      <input
        type="text"
        placeholder="Nombre del negocio"
        className="w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-black"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>
        <input
          type="text"
          placeholder="(Slug) Ej: maria-salon"
          className="w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-black"
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

      {mensaje && <div className="text-sm text-center text-red-400 font-medium">{mensaje}</div>}

      <button
        type="submit"
        disabled={botonDeshabilitado || cargando}
        className={`w-full py-2 font-semibold rounded-md flex items-center justify-center transition-transform duration-200 ${
          botonDeshabilitado || cargando
            ? "bg-gray-500 text-white cursor-not-allowed"
            : "bg-green-400 text-white hover:bg-green-600 hover:scale-105 active:scale-95"
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
  );
}
