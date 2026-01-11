"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Shield, Bell, ArrowRight } from "lucide-react";

export default function DentistasLanding() {
  return (
    <div className="min-h-screen bg-[#0B0B12] text-white px-6">
      <div className="max-w-6xl mx-auto pt-28 pb-32">

        {/* HERO CON FONDO */}
<section className="relative h-[90vh] flex items-center justify-center overflow-hidden">

  {/* Imagen fondo */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/dentista-bg.jpg')" }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

  {/* Glow */}
  <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/30 blur-[160px]" />

  {/* Contenido */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 max-w-4xl text-center px-6"
  >
    <span className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm">
      Para dentistas y clínicas
    </span>

    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
      Reduce ausencias
      <br />
      <span className="text-blue-400">y confirma citas automáticamente</span>
    </h1>

    <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
      Automatiza tu agenda, confirma pacientes y mejora la experiencia clínica.
    </p>

    <a
      href="/precios"
      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
    >
      Probar gratis
    </a>
  </motion.div>
</section>


        {/* FEATURES */}
        <section className="mt-32 grid md:grid-cols-4 gap-6">
          <Feature icon={Calendar} title="Agenda digital" />
          <Feature icon={Bell} title="Confirmaciones automáticas" />
          <Feature icon={Shield} title="Datos protegidos" />
          <Feature icon={Calendar} title="Control por doctor" />
        </section>

        {/* CTA */}
        <section className="mt-40 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Profesionaliza tu clínica
          </h2>
          <p className="text-white/70 mb-8">
            Una agenda moderna mejora la experiencia del paciente.
          </p>
          <Link
            href="/precios"
            className="inline-flex items-center gap-2 bg-blue-500 px-10 py-5 rounded-2xl font-bold"
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
      <Icon className="mx-auto mb-4 text-blue-400" />
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}
