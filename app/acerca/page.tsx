"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Calendar,
  Users,
  Shield,
  BarChart3,
  Bell,
  Clock,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Sincronización con Google Calendar",
    desc: "Todo se actualiza automáticamente para que nunca haya conflictos.",
  },
  {
    icon: Shield,
    title: "Panel de administración fácil",
    desc: "Interfaz intuitiva diseñada para que configures todo en minutos.",
  },
  {
    icon: Clock,
    title: "Horarios personalizados",
    desc: "Adapta tu agenda por día, con bloques para almuerzo o descansos.",
  },
  {
    icon: Bell,
    title: "Recordatorios automáticos",
    desc: "Notificaciones por WhatsApp y email para reducir ausencias.",
  },
  {
    icon: BarChart3,
    title: "Analíticas y reportes",
    desc: "Insights mensuales para optimizar tu negocio con datos reales.",
  },
  {
    icon: Users,
    title: "Para cualquier negocio",
    desc: "De salones a clínicas: si usas citas, Agenda Connect es para ti.",
  },
];

export default function ClientAcerca() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C0C0C] via-[#0a0a0f] to-[#050507] text-white relative overflow-hidden">
      {/* GLOW EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-[150px] top-20 left-0" />
        <div className="absolute w-[500px] h-[500px] bg-pink-500/10 blur-[120px] bottom-40 right-0 animate-pulse" />
      </div>

      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        {/* HERO ABOUT */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 lg:space-y-10"
          >
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 text-sm font-medium border border-purple-500/30"
            >
              <Zap className="w-4 h-4" />
              La herramienta que simplifica tu día a día
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 bg-gradient-to-r from-white via-white/90 to-purple-400 bg-clip-text text-transparent"
            >
              Acerca de <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">Agenda Connect</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-gray-300 text-lg lg:text-xl max-w-lg leading-relaxed mb-8"
            >
              Somos un sistema inteligente de gestión de citas diseñado para negocios locales. Ayudamos a organizar tu tiempo, conectar con clientes de forma eficiente y sincronizar todo con <strong>Google Calendar</strong> sin complicaciones.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-gray-300 text-lg lg:text-xl max-w-lg leading-relaxed"
            >
              Nuestro objetivo: <strong>ahorrar tiempo, evitar confusiones y darte control total</strong>. Perfecto para barberías, salones, clínicas, gimnasios, consultorios y más.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link
                href="/precios"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:from-purple-700 hover:to-blue-700"
              >
                🚀 Probar Agenda Connect
                <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* IMÁGENES */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center lg:items-end gap-6"
          >
            {[
              { src: "/paneldecitas3.png", alt: "Panel de Citas Agenda Connect", title: "Gestión de Citas" },
              { src: "/admin4.png", alt: "Panel de Administración Avanzada", title: "Admin Pro" },
              { src: "/reserva2.png", alt: "Analítica de Negocio", title: "Insights Diarios" },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className="rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300"
                />
                <p className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* FEATURES */}
        <section className="max-w-6xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            ¿Qué hace único a Agenda Connect?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 text-center hover:bg-gradient-to-br from-purple-500/10 to-blue-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <feature.icon className="w-10 h-10 mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-3 text-white text-lg">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MISIÓN */}
        <section className="max-w-4xl mx-auto text-center mb-20 py-16 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl lg:text-4xl font-black mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
            >
              Nuestra Misión
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Ayudar a pequeños y medianos negocios a <strong>digitalizar su agenda de forma simple y moderna</strong>. Creemos que la tecnología debe ser accesible, no un dolor de cabeza. Únete a miles de emprendedores que ya confían en nosotros para crecer sin estrés.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex justify-center items-center gap-2 text-sm text-gray-400"
            >
              <FileText className="w-5 h-5 text-purple-400" />
              Fundado en 2023 · +5,000 usuarios activos
            </motion.div>
          </motion.div>
        </section>
      </section>
    </div>
  );
}