"use client";

import Image from "next/image";

const pasos = [
  {
    titulo: "1. Regístrate gratis",
    descripcion:
      "Crea una cuenta en segundos. Solo necesitas tu correo, nombre del negocio y una contraseña segura.",
    imagen: "/registro2.webp",
  },
  {
    titulo: "2. Accede a tu panel de administración",
    descripcion:
      "Desde aquí puedes personalizar horarios, días laborales y sincronizar tus citas con Google Calendar. También verás tus reservas en un panel fácil de usar.",
    imagen: "/admin3.webp",
  },
  {
    titulo: "3. Descarga la app Google Calendar",
    descripcion:
      "En la app de Google Calendar podrás ver todas tus citas organizadas, estés donde estés.",
    imagen: "/calendario.webp",
  },
  {
    titulo: "4. Conecta tu Google Calendar",
    descripcion:
      "Sincroniza automáticamente tus reservas con tu calendario de Google en solo un clic.",
    imagen: "/sinc.webp",
  },

  {
    titulo: "5. Panel de Citas",
    descripcion:
      "En este panel podrás ver todas tus citas agendadas, así como aquellas que hayan sido canceladas.",
    imagen: "/panelcitas.webp",
  },
  {
    titulo: "6. Recibe notificaciones automáticas",
    descripcion:
      "Recibirás notificaciones instantáneas en tu correo y en la app de Google Calendar cuando se agende una cita.",
    imagen: "/notificacion2.webp",
  },
  {
    titulo: "7. Accede fácilmente con tu cuenta",
    descripcion:
      "Vuelve cuando quieras. Inicia sesión y sigue recibiendo reservas sin complicaciones.",
    imagen: "/login3.webp",
  },
];

export default function GuiaPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-purple-400">
          Guía paso a paso para comenzar
        </h1>

        {/* Carrusel en móvil */}
        <div className="block md:hidden overflow-x-auto snap-x snap-mandatory flex space-x-6 pb-8">
          {pasos.map((paso, index) => (
            <div
              key={index}
              className="min-w-[85%] bg-white/5 rounded-3xl p-6 snap-center shrink-0 border border-white/10 shadow-xl relative z-10"
            >
              {/* Glow detrás de la imagen */}
              <div className="relative w-full mb-4">
                <div className="absolute inset-0 rounded-2xl bg-purple-500 blur-2xl opacity-20 animate-pulse" />
                <Image
                  src={paso.imagen}
                  alt={paso.titulo}
                  width={700}
                  height={400}
                  className="rounded-2xl relative z-10"
                />
              </div>

              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                {paso.titulo}
              </h2>
              <p className="text-white/90 text-base leading-relaxed">
                {paso.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* Layout normal para desktop */}
        <div className="hidden md:block">
          {pasos.map((paso, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-10 mb-20 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2 relative">
                {/* Glow detrás de la imagen */}
                <div className="absolute inset-0 rounded-3xl bg-purple-500 blur-2xl opacity-20 animate-pulse" />
                <Image
                  src={paso.imagen}
                  alt={paso.titulo}
                  width={800}
                  height={500}
                  className="rounded-3xl shadow-2xl border border-white/10 relative z-10"
                />
              </div>

              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-4">
                  {paso.titulo}
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  {paso.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
