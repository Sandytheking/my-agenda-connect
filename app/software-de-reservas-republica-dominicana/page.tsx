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
import Image from "next/image";

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
    <div className="min-h-screen bg-gradient-to-br from-[#0f001a] via-[#0a0026] to-[#050014] text-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Glow púrpura/indigo elegante */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-purple-700/20 blur-[200px] top-[-150px] right-[-100px] animate-pulse-slow" />
        <div className="absolute w-[600px] h-[600px] bg-indigo-600/15 blur-[160px] bottom-[-100px] left-[-150px] animate-pulse delay-1200" />
      </div>

      {/* Fondo sutil abstracto púrpura premium */}
      <div className="absolute inset-0 opacity-12 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=1200"
          alt="Fondo abstracto púrpura indigo para software reservas RD"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto pt-20 lg:pt-32 pb-20 relative z-10">
        {/* HERO - Más lujoso */}
        <section className="relative h-[85vh] lg:h-[95vh] flex items-center justify-center overflow-hidden mb-28 lg:mb-40">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 max-w-4xl text-center px-5"
          >
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/25 to-indigo-600/25 text-purple-300 text-base font-medium border border-purple-500/40 mb-8"
            >
              <MapPin className="w-5 h-5" />
              República Dominicana
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent"
            >
              Software de reservas para negocios
              <br />
              en República Dominicana
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9 }}
              className="text-gray-200 text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Automatiza las citas de tu negocio, reduce cancelaciones y ofrece
              una experiencia moderna a tus clientes con Agenda Connect.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
              <Link
                href="/precios"
                className="group inline-flex items-center gap-4 bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-600 px-10 py-6 rounded-3xl font-bold text-xl hover:scale-105 hover:shadow-2xl hover:shadow-purple-700/40 transition-all duration-400"
              >
                Probar gratis
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* PROBLEMAS - Tarjetas más premium */}
        <section className="max-w-6xl mx-auto mb-28 lg:mb-40">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-center mb-16 bg-gradient-to-r from-purple-300 to-indigo-200 bg-clip-text text-transparent"
          >
            Problemas comunes en negocios dominicanos
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              "Citas anotadas en papel o WhatsApp",
              "Clientes que no se presentan",
              "Agenda desordenada y doble reserva",
              "Mucho tiempo perdido confirmando citas",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-gradient-to-br from-indigo-950/50 to-purple-950/40 border border-indigo-500/30 rounded-3xl p-8 text-center hover:border-indigo-400/60 hover:shadow-xl hover:shadow-indigo-600/20 transition-all backdrop-blur-sm"
              >
                <Briefcase className="w-10 h-10 mx-auto mb-5 text-indigo-400" />
                <p className="text-gray-200 text-base font-medium">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="max-w-7xl mx-auto mb-28 lg:mb-40">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent"
          >
            Agenda Connect lo soluciona
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.04 }}
                className="bg-gradient-to-br from-purple-950/40 to-indigo-950/30 border border-purple-500/30 rounded-3xl p-8 text-center hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-600/20 transition-all backdrop-blur-md"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-6 text-purple-400" />
                <h3 className="font-bold text-xl mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300 text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="max-w-6xl mx-auto mb-28 lg:mb-40">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent"
          >
            Negocios dominicanos que ya confían en nosotros
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-gradient-to-br from-indigo-950/50 to-purple-950/40 border border-indigo-500/30 rounded-3xl p-10 backdrop-blur-sm hover:shadow-2xl hover:shadow-indigo-600/20 transition-all"
              >
                <div className="flex mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="italic text-lg mb-6 text-gray-100">"{t.quote}"</p>
                <p className="text-gray-300 font-medium">— {t.author}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto text-center py-20 bg-gradient-to-b from-purple-950/40 to-transparent rounded-4xl border border-purple-500/20 backdrop-blur-md">
          <motion.h2
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-purple-200 to-indigo-100 bg-clip-text text-transparent"
          >
            Empieza hoy mismo
          </motion.h2>
          <p className="text-gray-200 mb-12 text-xl">
            Digitaliza la agenda de tu negocio en República Dominicana con Agenda
            Connect.
          </p>
          <Link
            href="/precios"
            className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-700 to-indigo-600 px-14 py-6 rounded-3xl font-bold text-2xl hover:scale-105 hover:shadow-2xl hover:shadow-purple-700/40 transition-all"
          >
            Crear cuenta gratis
            <ArrowRight className="w-6 h-6" />
          </Link>
          <div className="mt-10 flex justify-center gap-6 text-base text-gray-300">
            <User className="w-6 h-6 text-purple-400" />
            Configuración en minutos · Soporte local
          </div>
        </section>
      </div>
    </div>
  );
}