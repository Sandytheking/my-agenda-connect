"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Bell, Users, ArrowRight } from "lucide-react";

export default function SalonesLanding() {
  return (
    <div className="min-h-screen bg-[#0B0B12] text-white px-6">
      <div className="max-w-6xl mx-auto pt-28 pb-32">

       {/* HERO CON FONDO */}
<section className="relative h-[90vh] flex items-center justify-center overflow-hidden">

  {/* Imagen fondo */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/salon1-bg.jpg')" }}
  />

  {/* Overlay oscuro */}
  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

  {/* Glow */}
  <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-500/30 blur-[160px]" />

  {/* Contenido */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 max-w-4xl text-center px-6"
  >
    <span className="inline-block mb-4 px-4 py-2 rounded-full bg-pink-500/20 text-pink-300 text-sm">
      Para salones, spas y peluquerías
    </span>

    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
      Agenda tu salón
      <br />
      <span className="text-pink-400">sin usar WhatsApp</span>
    </h1>

    <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
      Permite que tus clientes reserven solos, reciban recordatorios
      y no falten a sus citas.
    </p>

    <a
      href="/precios"
      className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
    >
      Probar gratis
    </a>
  </motion.div>
</section>


        {/* SOLUCIONES */}
        <section className="mt-32 grid md:grid-cols-4 gap-6">
          <Feature icon={Calendar} title="Reservas 24/7" />
          <Feature icon={Bell} title="Recordatorios automáticos" />
          <Feature icon={Users} title="Clientes organizados" />
          <Feature icon={Calendar} title="Control de horarios" />
        </section>

        {/* CTA */}
        <section className="mt-40 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Tu salón merece verse profesional
          </h2>
          <p className="text-white/70 mb-8">
            Deja atrás el caos y automatiza tus reservas.
          </p>
          <Link
            href="/precios"
            className="inline-flex items-center gap-2 bg-pink-500 px-10 py-5 rounded-2xl font-bold"
          >
            Crear cuenta gratis
            <ArrowRight />
          </Link>
        </section>

      </div>
    </div>
  );
}

function Feature({ icon: Icon, title }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
      <Icon className="mx-auto mb-4 text-pink-400" />
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}
