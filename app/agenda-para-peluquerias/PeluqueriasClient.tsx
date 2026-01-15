"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Bell, Users, ArrowRight, Zap, Star, Scissors, Clock } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Reservas 24/7",
    desc: "Tus clientes reservan solos desde su móvil, sin esperas ni llamadas.",
  },
  {
    icon: Bell,
    title: "Recordatorios automáticos",
    desc: "Mensajes por WhatsApp y email para reducir ausencias al 0%.",
  },
  {
    icon: Users,
    title: "Clientes organizados",
    desc: "Perfiles simples y historial de citas para un servicio personalizado.",
  },
  {
    icon: Clock,
    title: "Control total de horarios",
    desc: "Bloquea pausas, define servicios y evita solapamientos.",
  },
];

const testimonials = [
  {
    quote: "Mis clientas ahora reservan solas y no pierdo ni una cita.",
    author: "Laura M., Peluquería Urbana",
  },
  {
    quote: "Adiós al WhatsApp eterno. Todo fluye mejor.",
    author: "Carlos S., Spa Relax",
  },
];

export default function SalonesLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B12] via-[#0a0a0f] to-[#050507] text-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* GLOW EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-pink-600/20 to-purple-600/20 blur-[150px] top-20 left-0 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-pink-500/10 blur-[120px] bottom-40 right-0 animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto pt-20 lg:pt-32 pb-20">
        {/* HERO CON FONDO */}
       <section className="relative h-[80vh] lg:h-[90vh] flex items-center justify-center overflow-hidden mb-24 lg:mb-32">
  {/* Imagen fondo */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/peluqueria.jpg')" }}
  />
  {/* Overlay CLARO, sin blur */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />  {/* Más claro: /30 en lugar de /50 */}
  {/* Glow adicional */}
  <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-pink-500/30 blur-[120px] animate-bounce" />
  {/* Contenido */}
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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 text-sm font-medium border border-pink-500/30 mb-6"
            >
              <Scissors className="w-4 h-4" />
              Para salones, spas y barberias
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.9] mb-6 bg-gradient-to-r from-white via-white/90 to-pink-400 bg-clip-text text-transparent"
            >
              Agenda online para barberias
              <br />
             
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Permite que tus clientes reserven solos, reciban recordatorios inteligentes y no falten a sus citas. Gana tiempo para lo que amas: cortar, peinar y brillar.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link
                href="/precios"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-purple-700"
              >
                Probar gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* PROBLEMAS */}
        <section className="max-w-6xl mx-auto mb-24 lg:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-gray-300 to-white/80 bg-clip-text text-transparent"
          >
            ¿Te suena en tu barberia?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Citas perdidas por olvidos", desc: "Clientes que no avisan y dejan huecos en tu agenda." },
              { title: "WhatsApp 24/7", desc: "Mensajes constantes que roban tu tiempo personal." },
              { title: "Horarios desorganizados", desc: "Solapamientos y estrés al coordinar servicios." },
              { title: "Falta de recordatorios", desc: "Ausencias que afectan tu flujo y ganancias." },
            ].map((pain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-500 transition-colors">{pain.title}</h3>
                <p className="text-gray-400 text-sm">{pain.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SOLUCIONES */}
        <section className="max-w-7xl mx-auto mb-24 lg:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
          >
            Agenda Connect lo transforma todo
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 text-center hover:bg-gradient-to-br from-blue-500/10 to-purple-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-600/20 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <feature.icon className="w-10 h-10 mx-auto mb-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-3 text-white text-lg">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="max-w-6xl mx-auto mb-24 lg:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-green-400 to-pink-400 bg-clip-text text-transparent"
          >
            Barberias como la tuya ya lo usan
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 relative hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/90 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-gray-400 text-sm font-medium">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto text-center mb-20 py-16 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-white via-white/90 to-pink-400 bg-clip-text text-transparent"
          >
            Tu barberia merece verse profesional
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-300 text-lg lg:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Deja atrás el caos de WhatsApp y automatiza tus reservas en minutos. ¡Empieza hoy y ve cómo crece tu negocio!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              href="/precios"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
            >
              Crear cuenta gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex justify-center items-center gap-6 text-sm text-gray-400"
          >
            <Zap className="w-5 h-5 text-pink-400" />
            Configuración en 2 min · Sin tarjeta
          </motion.div>
        </section>
      </div>
    </div>
  );
}