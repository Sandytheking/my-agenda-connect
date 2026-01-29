"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Bell, Users, ArrowRight, Zap, Star, Clock } from "lucide-react";
import Image from "next/image";

export default function BarberiasLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#05070f] to-[#000306] text-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Glow neón azul sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-blue-900/5" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-600/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-cyan-700/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto pt-20 pb-24 relative z-10">
        {/* Imagen hero de fondo sutil */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200"
            alt="Interior moderno de barbería con luces neón azules y sillas profesionales"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* HERO SEO */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 relative"
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-100 bg-clip-text text-transparent">
            Agenda online para barberías y barber shops modernos
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            Organiza turnos de barberos, evita ausencias y permite que tus clientes reserven cortes y barbas online 24/7.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/precios"
              className="inline-block bg-gradient-to-r from-blue-700 to-cyan-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-lg shadow-blue-900/30 hover:shadow-blue-600/50 transition-all duration-300"
            >
              Probar GRATIS 14 días
              <ArrowRight className="inline ml-3 w-6 h-6" />
            </Link>
          </motion.div>
        </motion.section>

        {/* PROBLEMAS */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24 grid md:grid-cols-3 gap-8"
        >
          <h2 className="text-4xl font-bold text-center mb-12 col-span-full bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Problemas comunes en barberías sin sistema de citas
          </h2>
          {[
            { title: "Clientes que no llegan", desc: "Huecos en la agenda que afectan ingresos diarios." },
            { title: "Desorden entre barberos", desc: "Choques de horarios o tiempos mal calculados." },
            { title: "Demasiados mensajes", desc: "Reservas por WhatsApp que quitan tiempo de trabajo." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-sm border border-blue-800/30 rounded-2xl p-8 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/20 transition-all group"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-300 group-hover:text-cyan-300">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* BENEFICIOS */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Lo que puedes hacer con nuestra agenda para barberías
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Calendar, text: "Reservas online para cortes y barbas" },
              { icon: Bell, text: "Recordatorios automáticos" },
              { icon: Users, text: "Historial de estilos y preferencias" },
              { icon: Clock, text: "Control de turnos por barbero" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.08, y: -8 }}
                className="text-center p-6 bg-gray-900/40 rounded-2xl border border-blue-900/20 hover:border-blue-500/40 hover:bg-blue-950/30 transition-all"
              >
                <item.icon className="w-12 h-12 mx-auto mb-5 text-blue-400 group-hover:text-cyan-300 transition-colors" />
                <p className="font-medium text-lg">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SERVICIOS */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
            Perfecto para servicios como
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Cortes fade y degradados", "Perfilado y diseño de barba", "Afeitado clásico", "Cortes infantiles y express"].map((s, i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl p-6 text-center border border-blue-800/20 hover:border-blue-600/40 transition">
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-24 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">Preguntas frecuentes</h2>
          <div className="space-y-8">
            {[
              { q: "¿Puedo asignar citas a distintos barberos?", a: "Sí, cada barbero puede tener su propio horario y servicios." },
              { q: "¿Reduce las ausencias?", a: "Sí, gracias a recordatorios automáticos antes de cada cita." },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-900/40 p-6 rounded-2xl border border-blue-900/20">
                <h3 className="font-semibold text-xl mb-3 text-blue-300">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-200 to-blue-100 bg-clip-text text-transparent">
            Haz crecer tu barbería sin caos
          </h2>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/precios"
              className="inline-block bg-gradient-to-r from-blue-700 to-cyan-600 px-12 py-6 rounded-2xl font-bold text-2xl shadow-2xl shadow-blue-900/40 hover:shadow-blue-600/60 transition-all duration-300"
            >
              Crear cuenta GRATIS
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}