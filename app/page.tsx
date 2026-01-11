
// HomePage
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Bell,
  BarChart3,
  FileDown,
  Star,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";

const images = [
  "/agenda01.png",
  "/agenda02.png",
  "/agenda03.png",
  "/agenda04.png",
  "/agenda05.png",
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
      {/* GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-purple-600/20 blur-[180px] -top-40 -left-40" />
        <div className="absolute w-[600px] h-[600px] bg-blue-600/20 blur-[160px] bottom-0 right-0" />
      </div>

      <LanguageToggle />

      <main className="relative z-10 px-6">
        {/* ================= HERO ================= */}
        <section className="max-w-7xl mx-auto pt-28 pb-32 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 px-4 py-2 rounded-full bg-purple-500/15 text-purple-300 text-sm">
              Hecho para negocios que trabajan por citas
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Menos citas perdidas.
              <br />
              <span className="text-purple-400">
                Más control de tu negocio.
              </span>
            </h1>

            <p className="text-white/80 text-lg max-w-xl mb-10">
              Agenda Connect automatiza tus reservas, envía recordatorios y te
              muestra datos reales de tu negocio para que tomes mejores
              decisiones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/precios"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
              >
                Probar gratis
                <ArrowRight />
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition"
              >
                Ya tengo cuenta
              </Link>
            </div>

            <p className="text-green-400 mt-4 text-sm">
              ✔ Sin tarjeta · ✔ Configuración rápida
            </p>
          </motion.div>

          {/* IMAGEN / CARRUSEL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-purple-600/20 blur-[120px] rounded-full" />
            <div className="relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5">
  <Image
    src={images[current]}
    alt="Vista previa"
    width={600}
    height={750}
    className="w-full h-auto object-contain transition-opacity duration-700"
    priority
  />
</div>

          </motion.div>
        </section>

        {/* ================= DOLOR ================= */}
        <section className="max-w-6xl mx-auto mb-32">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Te pasa esto en tu negocio?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              "Clientes que no llegan y no avisan",
              "Mensajes de WhatsApp a todas horas",
              "No sabes cuántas citas realmente tienes",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <p className="text-white/80">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SOLUCIÓN ================= */}
        <section className="max-w-7xl mx-auto mb-32">
          <h2 className="text-3xl font-bold text-center mb-14">
            Agenda Connect lo soluciona por ti
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <Feature
              icon={Calendar}
              title="Reservas 24/7"
              desc="Tus clientes reservan solos desde cualquier dispositivo."
            />
            <Feature
              icon={Bell}
              title="Recordatorios automáticos"
              desc="Menos ausencias, más citas cumplidas."
            />
            <Feature
              icon={BarChart3}
              title="Analítica real"
              desc="Mira cuántas citas tienes y cómo va tu negocio."
            />
            <Feature
              icon={FileDown}
              title="Exporta todo"
              desc="Descarga tus citas en PDF o Excel cuando quieras."
            />
          </div>
        </section>

        {/* ================= PRUEBA SOCIAL ================= */}
        <section className="max-w-6xl mx-auto mb-32">
          <h2 className="text-3xl font-bold text-center mb-12">
            Negocios como el tuyo ya lo usan
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Ahora todo está organizado y no pierdo citas.",
              "Mis clientes reservan solos y yo trabajo tranquilo.",
              "Por fin tengo control de mis horarios.",
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <Star className="text-yellow-400 mb-4" />
                <p className="text-white/80 italic">“{t}”</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section className="max-w-5xl mx-auto text-center mb-40">
          <h2 className="text-4xl font-extrabold mb-6">
            Empieza hoy a trabajar más organizado
          </h2>
          <p className="text-white/70 mb-10">
            Agenda Connect se configura en minutos y empieza a trabajar por ti.
          </p>

          <Link
            href="/precios"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition"
          >
            Crear cuenta gratis
            <ArrowRight />
          </Link>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto mb-32">
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <HelpCircle className="text-purple-400" />
            Preguntas frecuentes
          </h2>

          <div className="space-y-6 text-white/80">
            <p>
              <strong>¿Necesito tarjeta?</strong> No. Puedes probar gratis.
            </p>
            <p>
              <strong>¿Mis clientes deben registrarse?</strong> No, solo reservan.
            </p>
            <p>
              <strong>¿Funciona para cualquier negocio?</strong> Sí, si trabajas
              por citas.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:scale-105 transition">
      <Icon className="mx-auto mb-4 text-purple-400" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{desc}</p>
    </div>
  );
}
