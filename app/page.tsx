// HomePage
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Bell,
  BarChart3,
  FileDown,
  Star,
  ArrowRight,
  HelpCircle,
  Users,
  Zap,
  Shield,
} from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";

const images = [
  "/form1.png",
  "/admin23.png",
  "/calendario.png",
  "/agenda04.png",
  "/agenda05.png",
];

const testimonials = [
  {
    quote: "Ahora todo está organizado y no pierdo citas.",
    author: "María G., Salón de Belleza",
  },
  {
    quote: "Mis clientes reservan solos y yo trabajo tranquilo.",
    author: "Carlos R., Gimnasio",
  },
  {
    quote: "Por fin tengo control de mis horarios.",
    author: "Ana L., Consultora",
  },
];

const features = [
  {
    icon: Calendar,
    title: "Reservas 24/7",
    desc: "Tus clientes reservan solos desde cualquier dispositivo, sin esperas ni complicaciones.",
  },
  {
    icon: Bell,
    title: "Recordatorios automáticos",
    desc: "Envíos inteligentes por WhatsApp y email para reducir ausencias al mínimo.",
  },
  {
    icon: BarChart3,
    title: "Analítica real",
    desc: "Dashboards intuitivos con métricas clave para optimizar tu negocio en tiempo real.",
  },
  {
    icon: FileDown,
    title: "Exporta todo",
    desc: "Genera reportes en PDF o Excel con un clic, siempre listos para tu contabilidad.",
  },
];

const pains = [
  {
    title: "Clientes que no llegan y no avisan",
    desc: "Pierdes tiempo y dinero en citas fantasmas.",
  },
  {
    title: "Mensajes de WhatsApp a todas horas",
    desc: "Tu teléfono no para, y tú no descansas.",
  },
  {
    title: "No sabes cuántas citas realmente tienes",
    desc: "Falta visibilidad para planificar tu día.",
  },
];

const faqs = [
  {
    q: "¿Necesito tarjeta para empezar?",
    a: "No. Prueba gratis por 14 días sin compromisos ni datos de pago.",
  },
  {
    q: "¿Mis clientes deben registrarse?",
    a: "No, solo eligen hora y confirman. Todo en segundos.",
  },
  {
    q: "¿Funciona para cualquier negocio?",
    a: "Sí, ideal para salones, gimnasios, consultorías o cualquier servicio por citas.",
  },
  {
    q: "¿Integra con WhatsApp?",
    a: "Absolutamente. Recordatorios directos y reservas vía enlace compartido.",
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050507] via-[#0a0a0f] to-[#050507] text-white relative overflow-hidden">
      {/* GLOW EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 blur-[200px] -top-48 -left-48 animate-pulse" />
        <div className="absolute w-[700px] h-[700px] bg-gradient-to-l from-blue-600/30 via-indigo-600/30 to-blue-600/30 blur-[180px] bottom-0 right-0 animate-pulse delay-1000" />
        <div className="absolute w-[500px] h-[500px] bg-pink-500/10 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
      </div>

      <LanguageToggle />

      <main className="relative z-10 px-4 sm:px-6 lg:px-8">
        {/* ================= HERO ================= */}
        <section className="max-w-7xl mx-auto pt-20 lg:pt-32 pb-20 lg:pb-40 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
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
              Hecho para negocios que trabajan por citas
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.9] mb-6 bg-gradient-to-r from-white via-white/90 to-gray-300 bg-clip-text text-transparent"
            >
              Sistema de Reservas Online para Negocios
              <br />
             

            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-gray-300 text-lg lg:text-xl max-w-lg leading-relaxed"
            >
              Agenda Connect automatiza reservas y recordatorios online para salones, clínicas, barberías y más. Reserva 24/7 con integración a Google Calendar.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/precios"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:from-purple-700 hover:to-blue-700"
              >
                Probar gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border-2 border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-semibold"
              >
                Ya tengo cuenta
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex items-center gap-2 text-green-400 text-sm font-medium"
            >
              <Shield className="w-4 h-4" />
              Sin tarjeta · Configuración en <span className="text-green-300">2 minutos</span>
            </motion.p>
          </motion.div>

<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 0 }}
  className="sr-only"
>
  Agenda Connect es un software de reservas para negocios en República Dominicana,
  ideal para salones de belleza, clínicas, barberías y profesionales de servicios.
</motion.p>

          {/* CARRUSEL MEJORADO */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative lg:order-first"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 blur-xl rounded-3xl -z-10" />
            <div className="relative w-full max-w-md mx-auto lg:max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="relative"
                >
                  <Image
                    src={images[current]}
                    alt={`Vista previa ${current + 1}`}
                    width={600}
                    height={800}
                    className="w-full h-[500px] lg:h-[600px] object-cover transition-all duration-700"
                    priority
                  />
                  {/* Indicadores del carrusel */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === current ? "bg-purple-400" : "bg-white/30"
                        }`}
                        animate={{ scale: i === current ? 1.2 : 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* ================= PROBLEMAS ================= */}
        <section className="max-w-6xl mx-auto mb-24 lg:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-gray-300 to-white/80 bg-clip-text text-transparent"
          >
            ¿Te suena familiar en tu negocio?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {pains.map((pain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-red-300 transition-colors">{pain.title}</h3>
                <p className="text-gray-400 text-sm">{pain.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= SOLUCIÓN ================= */}
        <section className="max-w-7xl mx-auto mb-24 lg:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Agenda Connect lo resuelve todo por ti
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
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 text-center hover:bg-gradient-to-br from-purple-500/10 to-blue-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <feature.icon className="w-10 h-10 mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-24 text-center">
  <p className="text-gray-400 text-sm">
    ¿Tienes un negocio en República Dominicana? Descubre nuestro{" "}
    <Link
      href="/software-de-reservas-republica-dominicana"
      className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
    >
      software de reservas diseñado para negocios dominicanos
    </Link>.
  </p>
</section>




        {/* ================= TESTIMONIOS ================= */}
        <section className="max-w-6xl mx-auto mb-24 lg:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-black text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
          >
            Negocios como el tuyo ya transformaron su día a día
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
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
                    <Star key={j} className={`w-4 h-4 ${j < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                  ))}
                </div>
                <p className="text-white/90 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-gray-400 text-sm font-medium">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </section>


<section className="max-w-4xl mx-auto mb-24 text-center">
  <p className="text-gray-400 text-sm">
    Agenda Connect es ideal para{" "}
    <Link href="/peluqueria" className="underline">
      peluquerías
    </Link>
    ,{" "}
    <Link href="/salones" className="underline">
      salones de belleza
    </Link>{" "}
    y{" "}
    <Link href="/dentistas" className="underline">
      consultorios dentales
    </Link>
    .
  </p>
</section>
        

        {/* ================= CTA FINAL ================= */}
        <section className="max-w-4xl mx-auto text-center mb-24 lg:mb-40 py-16 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-white via-white/90 to-gray-300 bg-clip-text text-transparent"
          >
            Empieza hoy a dominar tus citas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-300 text-lg lg:text-xl mb-10 max-w-2xl mx-auto"
          >
            Configura en minutos y deja que la magia ocurra. Miles de negocios ya confían en nosotros.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              href="/precios"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
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
            <Users className="w-5 h-5 text-green-400" />
            +5,000 negocios activos · Soporte 24/7
          </motion.div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto mb-20 lg:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 flex items-center gap-3 justify-center text-purple-300"
          >
            <HelpCircle className="w-8 h-8" />
            Preguntas frecuentes
          </motion.h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: "auto" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <h4 className="font-semibold mb-2 text-white">{faq.q}</h4>
                <p className="text-gray-300 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}