"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Bell,
  Shield,
  ArrowRight,
  Star,
  User,
  Clock,
  MapPin,
  Briefcase,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Agenda online 24/7",
    desc: "Tus clientes reservan citas en cualquier momento desde su celular o computadora.",
  },
  {
    icon: Bell,
    title: "Recordatorios automáticos",
    desc: "Reduce ausencias con confirmaciones y recordatorios por email o SMS.",
  },
  {
    icon: Clock,
    title: "Control total de horarios",
    desc: "Define disponibilidad, duración de citas y bloques de descanso fácilmente.",
  },
  {
    icon: Shield,
    title: "Datos seguros",
    desc: "Tu información y la de tus clientes siempre protegida en la nube.",
  },
];

const testimonials = [
  {
    quote:
      "Desde que usamos Agenda Connect, nuestras citas están organizadas y los clientes llegan puntuales.",
    author: "María Pérez, Salón de Belleza – Santo Domingo",
  },
  {
    quote:
      "Ahora los clientes reservan solos y mi negocio se ve mucho más profesional.",
    author: "Carlos Rodríguez, Consultorio Dental – Santiago",
  },
];

export default function SoftwareReservasRD() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B12] via-[#0a0a0f] to-[#050507] text-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-[150px] top-20 left-0 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-[120px] bottom-40 right-0 animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto pt-20 lg:pt-32 pb-20">
        {/* HERO */}
        <section className="relative h-[80vh] lg:h-[90vh] flex items-center justify-center overflow-hidden mb-24 lg:mb-32">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/rd-business-bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-4xl text-center px-4"
          >
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-sm font-medium border border-blue-500/30 mb-6"
            >
              <MapPin className="w-4 h-4" />
              República Dominicana
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] mb-6 bg-gradient-to-r from-white via-white/90 to-blue-400 bg-clip-text text-transparent"
            >
              Software de reservas para negocios
              <br />
              en República Dominicana
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Automatiza las citas de tu negocio, reduce cancelaciones y ofrece
              una experiencia moderna a tus clientes con Agenda Connect.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link
                href="/precios"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Probar gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* PROBLEMAS */}
        <section className="max-w-6xl mx-auto mb-24 lg:mb-32">
          <motion.h2 className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-gray-300 to-white/80 bg-clip-text text-transparent">
            Problemas comunes en negocios dominicanos
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Citas anotadas en papel o WhatsApp",
              "Clientes que no se presentan",
              "Agenda desordenada y doble reserva",
              "Mucho tiempo perdido confirmando citas",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
              >
                <Briefcase className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                <p className="text-gray-300 text-sm">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="max-w-7xl mx-auto mb-24 lg:mb-32">
          <motion.h2 className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Agenda Connect lo soluciona
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-gradient-to-br from-blue-500/10 to-cyan-500/10 transition-all"
              >
                <feature.icon className="w-10 h-10 mx-auto mb-4 text-blue-400" />
                <h3 className="font-bold mb-3 text-white text-lg">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="max-w-6xl mx-auto mb-24 lg:mb-32">
          <motion.h2 className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Negocios dominicanos que ya confían en nosotros
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="italic mb-4">"{t.quote}"</p>
                <p className="text-gray-400 text-sm">— {t.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto text-center py-16 bg-white/5 rounded-3xl border border-white/10">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Empieza hoy mismo
          </h2>
          <p className="text-gray-300 mb-10">
            Digitaliza la agenda de tu negocio en República Dominicana con Agenda
            Connect.
          </p>
          <Link
            href="/precios"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 px-12 py-5 rounded-2xl font-bold text-lg"
          >
            Crear cuenta gratis
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="mt-8 flex justify-center gap-4 text-sm text-gray-400">
            <User className="w-5 h-5 text-blue-400" />
            Configuración en minutos · Soporte local
          </div>
        </section>
      </div>
    </div>
  );
}
