"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scissors,
  Stethoscope,
  Sparkles,
  ArrowRight,
  Calendar,
  Users,
  Clock,
} from "lucide-react";
import Image from "next/image";

const niches = [
  {
    icon: Scissors,
    title: "Peluquerías",
    desc: "Automatiza reservas, reduce ausencias y permite que tus clientes agenden 24/7 sin llamadas.",
    href: "/agenda-para-peluquerias",
  },
  {
    icon: Sparkles,
    title: "Salones de belleza",
    desc: "Gestiona múltiples servicios, profesionales y horarios desde una sola agenda digital.",
    href: "/agenda-para-salones-de-belleza",
  },
  {
    icon: Stethoscope,
    title: "Dentistas y clínicas",
    desc: "Agenda citas por doctor, confirma pacientes automáticamente y mejora la experiencia clínica.",
    href: "/agenda-para-dentistas",
  },
];

export default function ParaQuienEsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001a1a] via-[#002626] to-[#001111] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow teal/neón vibrante */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-teal-500/25 blur-[180px] top-[-100px] left-[-100px] animate-pulse-slow" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/15 blur-[140px] bottom-[-50px] right-[-150px] animate-pulse delay-800" />
      </div>

      {/* Fondo sutil abstracto teal */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1200"
          alt="Fondo abstracto teal neón para software de reservas"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto pt-24 pb-24 relative z-10">
        {/* HERO */}
        <section className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-teal-300 via-cyan-200 to-teal-100 bg-clip-text text-transparent"
          >
            ¿Para quién es Agenda Connect?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-200 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Agenda Connect es un software de reservas diseñado para negocios y
            profesionales en República Dominicana que desean automatizar su
            agenda, reducir ausencias y ofrecer una experiencia moderna a sus
            clientes.
          </motion.p>
        </section>

        {/* PARA QUIÉN - Tarjetas más modernas */}
        <section className="mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent"
          >
            Ideal para estos negocios
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {niches.map((niche, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.05, rotate: 1 }}
              >
                <Link
                  href={niche.href}
                  className="group block h-full bg-gradient-to-br from-teal-950/40 to-cyan-950/30 border border-teal-500/30 rounded-3xl p-8 overflow-hidden hover:border-teal-400/60 hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-400 backdrop-blur-sm"
                >
                  <niche.icon className="w-14 h-14 text-teal-400 mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all" />
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-teal-300 transition-colors">
                    {niche.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-base">
                    {niche.desc}
                  </p>
                  <span className="inline-flex items-center gap-3 text-teal-400 font-semibold group-hover:gap-5 transition-all">
                    Ver solución
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BENEFICIOS GENERALES - Tarjetas con glow */}
        <section className="mb-32 max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-teal-300 to-cyan-200 bg-clip-text text-transparent"
          >
            ¿Por qué usar Agenda Connect?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Calendar, title: "Reservas 24/7", desc: "Tus clientes pueden agendar desde cualquier dispositivo, sin llamadas." },
              { icon: Clock, title: "Menos ausencias", desc: "Confirmaciones y recordatorios automáticos reducen cancelaciones." },
              { icon: Users, title: "Mejor experiencia", desc: "Una agenda moderna transmite profesionalismo y confianza." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-gradient-to-br from-teal-900/30 to-cyan-900/20 border border-teal-600/30 rounded-3xl p-8 hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-500/20 transition-all backdrop-blur-md"
              >
                <item.icon className="w-14 h-14 mx-auto mb-6 text-teal-400" />
                <h3 className="font-bold text-xl mb-3 text-white">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-20 bg-gradient-to-b from-teal-950/40 to-transparent rounded-3xl border border-teal-500/20 max-w-4xl mx-auto backdrop-blur-sm">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-teal-200 to-cyan-100 bg-clip-text text-transparent"
          >
            Empieza gratis hoy
          </motion.h2>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg">
            Si tu negocio agenda citas, Agenda Connect puede ayudarte a crecer
            con menos esfuerzo.
          </p>
          <Link
            href="/precios"
            className="inline-flex items-center gap-4 bg-gradient-to-r from-teal-600 to-cyan-600 px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 hover:shadow-2xl hover:shadow-teal-600/40 transition-all"
          >
            Crear cuenta gratis
            <ArrowRight className="w-6 h-6" />
          </Link>
        </section>
      </div>
    </div>
  );
}