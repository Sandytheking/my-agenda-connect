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
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B12] via-[#0a0a0f] to-[#050507] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[150px] top-20 left-0 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] bottom-40 right-0 animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto pt-24 pb-24 relative z-10">
        {/* HERO */}
        <section className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
          >
            ¿Para quién es Agenda Connect?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Agenda Connect es un software de reservas diseñado para negocios y
            profesionales en República Dominicana que desean automatizar su
            agenda, reducir ausencias y ofrecer una experiencia moderna a sus
            clientes.
          </motion.p>
        </section>

        {/* PARA QUIÉN */}
        <section className="mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Ideal para estos negocios
          </motion.h2>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {niches.map((niche, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* CARD 100% CLICKEABLE */}
      <Link
        href={niche.href}
        className="group block h-full relative z-20 bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden hover:bg-gradient-to-br from-blue-500/10 to-cyan-500/10 transition-all duration-300 hover:shadow-2xl"
      >
        {/* Glow interno (no bloquea clicks) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <niche.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />

        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">
          {niche.title}
        </h3>

        <p className="text-gray-300 text-sm mb-6">
          {niche.desc}
        </p>

        <span className="inline-flex items-center gap-2 text-blue-400 font-medium group-hover:gap-3 transition-all">
          Ver solución
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </motion.div>
  ))}
</div>
 </section>

        {/* BENEFICIOS GENERALES */}
        <section className="mb-32 max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            ¿Por qué usar Agenda Connect?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Calendar,
                title: "Reservas 24/7",
                desc: "Tus clientes pueden agendar desde cualquier dispositivo, sin llamadas.",
              },
              {
                icon: Clock,
                title: "Menos ausencias",
                desc: "Confirmaciones y recordatorios automáticos reducen cancelaciones.",
              },
              {
                icon: Users,
                title: "Mejor experiencia",
                desc: "Una agenda moderna transmite profesionalismo y confianza.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-blue-400" />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black mb-6"
          >
            Empieza gratis hoy
          </motion.h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Si tu negocio agenda citas, Agenda Connect puede ayudarte a crecer
            con menos esfuerzo.
          </p>
          <Link
            href="/precios"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl"
          >
            Crear cuenta gratis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
