
//HomePage
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircleMore, Star, Calendar, HelpCircle } from "lucide-react";
import LanguageToggle from '@/components/LanguageToggle'



const images = [
  "/analitica.webp",
  "/adminavan.webp",
  "/panelcitas.webp"
];

export default function HomePage() {
 
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 🌌 Partículas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 blur-[160px] rounded-full top-[-150px] left-[-200px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-[140px] rounded-full top-[300px] right-[-150px] animate-ping" />
      </div>

     <LanguageToggle />

      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* 🎯 HERO */}
          <section className="flex flex-col lg:flex-row items-center gap-12 mb-28">
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-purple-400 mb-4">
                Agenda Connect
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Gestiona tus reservas de forma inteligente. Agenda Connect sincroniza tus citas con Google Calendar, envía notificaciones instantáneas y te ofrece un panel administrativo para tener el control total.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  href="/precios"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  🚀 Comenzar gratis
                </Link>
                <Link
                  href="/login"
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  🔐 Ya tengo cuenta
                </Link>
              </div>
              <p className="text-green-400 font-semibold mt-4">
  
              </p>
            </motion.div>

<motion.div
  className="w-full lg:w-1/2 flex justify-center relative mt-10 lg:mt-0"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  {/* Glow efecto detrás de la imagen */}
  <div className="absolute w-[500px] h-[400px] sm:w-[600px] sm:h-[500px] bg-purple-600 opacity-20 blur-[120px] rounded-full z-0" />

  {/* Imagen con carrusel adaptativa */}
  <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-white/5 z-10">
    <Image
      src={images[current]}
      alt="Vista previa"
      fill
      className="object-cover rounded-3xl transition-opacity duration-700 ease-in-out"
    />
  </div>
</motion.div>

 
          </section>

          {/* 📊 Comparativa */}
          <motion.section
            className="bg-white/5 p-6 rounded-xl shadow-md mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-blue-300 mb-4 text-center flex justify-center items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              ¿Por qué elegir Agenda Connect?
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-white/90 text-sm border border-white/10">
                <thead>
                  <tr className="bg-purple-700 text-white">
                    <th className="p-3 border border-white/10">Características</th>
                    <th className="p-3 border border-white/10">Agenda Connect</th>
                    <th className="p-3 border border-white/10">Competidores</th>
                    <th className="p-3 border border-white/10">La Competencia</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Citas ilimitadas", "✅", "❌", "❌"],
                    ["Panel administrativo", "✅", "✅", "❌"],
                    ["Integración WhatsApp", "🛠️ En camino", "❌", "❌"],
                    ["Notificaciones automáticas", "✅", "✅", "✅"],
                    ["Soporte en español", "✅", "✅", "❌"],
                    ["Exportar citas a Excel/PDF", "✅", "❌", "❌"],
                    ["Panel de analíticas de citas", "✅", "❌", "❌"]
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/5" : "bg-white/10"}>
                      {row.map((cell, j) => (
                        <td key={j} className="p-3 text-center border border-white/10">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

{/* 🚀 Cómo funciona - Sección moderna tipo timeline centrada */}
<section className="mb-28 px-4">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center text-blue-400 mb-12">
      ¿Cómo funciona Agenda Connect?
    </h2>

    <div className="relative">
      {/* Línea central decorativa */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/10" />

      <div className="flex flex-col md:flex-row gap-8 overflow-x-auto md:overflow-visible scroll-smooth pb-4 md:pb-0 justify-center px-4">

        {[
          {
            titulo: "1. Regístrate",
            descripcion: "Crea tu cuenta y personaliza tu enlace de reservas.",
            imagen: "/registro2.webp",
          },
          {
            titulo: "2. Conecta tu Google Calendar",
            descripcion: "Sincroniza automáticamente tus reservas con tu calendario.",
            imagen: "/sinc.webp",
          },
          {
            titulo: "3. Recibe citas y notificaciones",
            descripcion: "Tus clientes agendan y tú recibes alertas al instante.",
            imagen: "/notificacion2.webp",
          },
          {
            titulo: "4. Consulta en tu panel o app",
            descripcion: "Visualiza y exporta tus citas desde el panel o Google Calendar.",
            imagen: "/admin2.webp",
          },
          {
            titulo: "5. Comparte tu enlace",
            descripcion: "Tus clientes reservan fácil desde cualquier dispositivo.",
            imagen: "/mensaj.webp",
          },
        ].map((paso, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 md:flex-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-blue-500/30 transition-transform hover:scale-[1.03] min-w-[280px]"
          >
            {/* Glow animado detrás */}
            <div className="absolute -inset-1 rounded-2xl bg-purple-600 blur-xl opacity-10 z-0 animate-pulse" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <Image
                src={paso.imagen}
                alt={paso.titulo}
                width={120}
                height={80}
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-purple-300 mb-2">{paso.titulo}</h3>
              <p className="text-white/90 text-sm">{paso.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* ⭐ Testimonios - Sección profesional */}
<section className="py-20 px-4 max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold text-center text-blue-400 mb-12">
    Lo que dicen nuestros usuarios
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        nombre: "Carlos M.",
        comentario: "Agenda Connect ha transformado la forma en que gestiono mis citas. Fácil, rápido y profesional.",
        cargo: "Coach Personal",
        imagen: "/hombre.webp",
      },
      {
        nombre: "Laura P.",
        comentario: "Mis clientes están felices, y yo también. Las notificaciones y el panel son súper útiles.",
        cargo: "Esteticista",
        imagen: "/mujer.webp",
      },
      {
        nombre: "Andrés R.",
        comentario: "Desde que uso Agenda Connect, tengo más tiempo libre y menos estrés. ¡Recomendado 100%!",
        cargo: "Nutricionista",
        imagen: "/hombre1.webp",
      },
    ].map((testimonio, i) => (
      <div
        key={i}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-purple-500/30 transition duration-300"
      >
        <div className="flex items-center gap-4 mb-4">
          <img
            src={testimonio.imagen}
            alt={testimonio.nombre}
            className="w-12 h-12 rounded-full border border-purple-400 object-cover"
          />
          <div>
            <p className="font-semibold text-purple-300">{testimonio.nombre}</p>
            <p className="text-sm text-white/70">{testimonio.cargo}</p>
          </div>
        </div>
        <p className="text-white/90 text-sm italic">“{testimonio.comentario}”</p>
      </div>
    ))}
  </div>
</section>



          {/* ❓ FAQs */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6 text-white/90">
              <div>
                <h3 className="font-bold text-white">¿Necesito tener una cuenta de Google?</h3>
                <p>Sí, para que puedas sincronizar tus citas automáticamente con Google Calendar.</p>
              </div>
              <div>
                <h3 className="font-bold text-white">¿Puedo configurar mis horarios personalizados?</h3>
                <p>Sí. Puedes establecer tu disponibilidad, duración de citas, y límites diarios.</p>
              </div>
              <div>
                <h3 className="font-bold text-white">¿Mis clientes necesitan registrarse?</h3>
                <p>No. Tus clientes solo deben llenar el formulario de reservas. Tú gestionas el panel.</p>
              </div>
            </div>
          </motion.section>


<div className="w-full max-w-2xl mx-auto p-6 bg-black rounded-2xl">
  {/* Título con glow */}
  <h2
    className="text-3xl font-bold text-center mb-6 
               text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 
               animate-glow"
  >
  Contáctanos
  </h2>

  <form
    className="grid gap-6"
    onSubmit={async (e) => {
      e.preventDefault();

      const form = e.target;
      const name = form[0].value;
      const email = form[1].value;
      const message = form[2].value;

      const res = await fetch("https://api.agenda-connect.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Tu mensaje fue enviado con éxito");
        form.reset();
      } else {
        alert("❌ Hubo un error al enviar tu mensaje");
      }
    }}
  >
    <div className="grid md:grid-cols-2 gap-6">
      <input
        type="text"
        placeholder="Tu nombre"
        className="p-4 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
        required
      />
      <input
        type="email"
        placeholder="Tu correo"
        className="p-4 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
        required
      />
    </div>

    <textarea
      placeholder="Escribe tu mensaje..."
      rows={5}
      className="p-4 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
      required
    />

    <motion.button
      type="submit"
      className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-xl 
                 transition shadow-lg animate-glow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Enviar mensaje
    </motion.button>
  </form>
</div>



  
        </div>
      </main>
    </div>
  );
}
