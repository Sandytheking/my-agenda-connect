"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Bell, Users, ArrowRight, Zap, Star, Clock, Sparkles } from "lucide-react";
import Image from "next/image";

export default function SalonesLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f051a] via-[#0a0412] to-[#05030a] text-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Glow rosa/violeta suave */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-pink-900/5" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-600/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-700/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto pt-20 pb-24 relative z-10">
        {/* Imagen hero sutil */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image
            src="https://thumbs.dreamstime.com/b/empty-modern-hair-salon-interior-design-featuring-pink-turquoise-neon-lights-white-furniture-large-mirrors-372289963.jpg"
            alt="Interior elegante de salón de belleza con luces rosas y espejos grandes"
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
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-pink-300 via-purple-200 to-pink-100 bg-clip-text text-transparent">
            Agenda online para salones de belleza y centros de estética
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            Automatiza reservas, recordatorios y fichas de clientes en tu salón de belleza, spa o centro estético. Reduce ausencias y llena tu agenda 24/7 con Agenda Connect.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/precios"
              className="inline-block bg-gradient-to-r from-pink-700 to-purple-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-lg shadow-pink-900/30 hover:shadow-pink-600/50 transition-all duration-300"
            >
              Probar GRATIS 14 días
              <ArrowRight className="inline ml-3 w-6 h-6" />
            </Link>
          </motion.div>
        </motion.section>

        {/* PROBLEMAS SEO */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24 grid md:grid-cols-3 gap-8"
        >
          <h2 className="text-4xl font-bold text-center mb-12 col-span-full bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
            Problemas comunes en salones de belleza sin agenda digital
          </h2>
          {[
            { title: "Ausencias que te hacen perder dinero", desc: "Clientas que olvidan su cita de tinte, uñas o faciales y dejan huecos imposibles de llenar." },
            { title: "Demasiados mensajes y llamadas", desc: "Pasas el día respondiendo WhatsApp en vez de enfocarte en atender y vender más servicios." },
            { title: "Desorden en horarios y cabinas", desc: "Errores al agendar cabinas, sillones o especialistas generan retrasos y mala experiencia." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-purple-950/60 to-pink-950/40 backdrop-blur-sm border border-pink-800/30 rounded-2xl p-8 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-900/20 transition-all group"
            >
              <h3 className="text-xl font-semibold mb-4 text-pink-300 group-hover:text-purple-300">{item.title}</h3>
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
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
            Cómo nuestra agenda online transforma tu salón
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Calendar, text: "Reservas online 24/7 sin intervención manual" },
              { icon: Bell, text: "Recordatorios automáticos por WhatsApp y email" },
              { icon: Users, text: "Historial de color, tratamientos y preferencias" },
              { icon: Clock, text: "Control de tiempos por servicio y profesional" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.08, y: -8 }}
                className="text-center p-6 bg-purple-950/40 rounded-2xl border border-pink-900/20 hover:border-pink-500/40 hover:bg-pink-950/30 transition-all"
              >
                <item.icon className="w-12 h-12 mx-auto mb-5 text-pink-400 group-hover:text-purple-300 transition-colors" />
                <p className="font-medium text-lg">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SERVICIOS ESPECÍFICOS */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-300 to-pink-200 bg-clip-text text-transparent">
            Ideal para gestionar servicios de belleza como
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Tintes, balayage y mechas", "Manicure, pedicure y uñas acrílicas", "Faciales, limpiezas e hidrataciones", "Depilación, cejas y pestañas"].map((s, i) => (
              <div key={i} className="bg-purple-950/50 rounded-xl p-6 text-center border border-pink-800/20 hover:border-pink-600/40 transition">
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="mb-24 text-center">
          <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-pink-300 to-purple-200 bg-clip-text text-transparent">Cómo funciona Agenda Connect en tu salón</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["1️⃣ Configuras servicios, duraciones y horarios", "2️⃣ Tus clientas reservan online en segundos", "3️⃣ El sistema envía recordatorios y organiza tu agenda"].map((step, i) => (
              <div key={i} className="bg-pink-950/40 p-8 rounded-2xl border border-purple-800/20 hover:border-purple-500/40 transition">
                {step}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SEO */}
        <section className="mb-24 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-300 to-pink-200 bg-clip-text text-transparent">Preguntas frecuentes</h2>
          <div className="space-y-8">
            {[
              { q: "¿Sirve para spas y centros de estética?", a: "Sí, puedes configurar cabinas, terapeutas y distintos tipos de tratamientos." },
              { q: "¿Puedo enviar recordatorios automáticos?", a: "Sí, por WhatsApp y email para reducir ausencias." },
              { q: "¿Necesito conocimientos técnicos?", a: "No, se configura en minutos sin conocimientos técnicos." },
            ].map((faq, i) => (
              <div key={i} className="bg-purple-950/40 p-6 rounded-2xl border border-pink-900/20">
                <h3 className="font-semibold text-xl mb-3 text-pink-300">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-200 to-purple-100 bg-clip-text text-transparent">
            Haz crecer tu salón con una agenda inteligente
          </h2>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/precios"
              className="inline-block bg-gradient-to-r from-pink-700 to-purple-600 px-12 py-6 rounded-2xl font-bold text-2xl shadow-2xl shadow-pink-900/40 hover:shadow-pink-600/60 transition-all duration-300"
            >
              Crear cuenta GRATIS
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}