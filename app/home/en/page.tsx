// HomePage English Version
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircleMore, Star, Calendar, HelpCircle } from "lucide-react";
import LanguageToggle from '@/components/LanguageToggle'

const images = [
  "/analitica.webp",
  "/adminavan.webp",
  "/panelcitas.webp"
];

export default function HomePageEn() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 🌌 Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 blur-[160px] rounded-full top-[-150px] left-[-200px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-[140px] rounded-full top-[300px] right-[-150px] animate-ping" />
      </div>
<LanguageToggle />
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* 🎯 HERO */}
          <section className="flex flex-col lg:flex-row items-center gap-12 mb-28">
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-purple-400 mb-4">
                Agenda Connect
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Manage your bookings smartly. Agenda Connect syncs with Google Calendar, sends instant notifications, and offers a full-featured admin panel.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  href="/registro"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  🚀 Start for Free
                </Link>
                <Link
                  href="/login"
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  🔐 I already have an account
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2 flex justify-center relative mt-10 lg:mt-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute w-[500px] h-[400px] sm:w-[600px] sm:h-[500px] bg-purple-600 opacity-20 blur-[120px] rounded-full z-0" />
              <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-white/5 z-10">
                <Image
                  src={images[current]}
                  alt="Preview image"
                  fill
                  className="object-cover rounded-3xl transition-opacity duration-700 ease-in-out"
                />
              </div>
            </motion.div>
          </section>

          {/* 📊 Comparison */}
          <motion.section
            className="bg-white/5 p-6 rounded-xl shadow-md mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-blue-300 mb-4 text-center flex justify-center items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Why choose Agenda Connect?
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-white/90 text-sm border border-white/10">
                <thead>
                  <tr className="bg-purple-700 text-white">
                    <th className="p-3 border border-white/10">Features</th>
                    <th className="p-3 border border-white/10">Agenda Connect</th>
                    <th className="p-3 border border-white/10">Competitors</th>
                    <th className="p-3 border border-white/10">Google Calendar</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Unlimited bookings", "✅", "❌", "❌"],
                    ["Admin panel", "✅", "✅", "❌"],
                    ["WhatsApp Integration", "🛠️ Coming soon", "❌", "❌"],
                    ["Automatic notifications", "✅", "✅", "✅"],
                    ["Support in Spanish", "✅", "✅", "❌"],
                    ["Export to Excel/PDF", "✅", "❌", "❌"],
                    ["Appointment analytics panel", "✅", "❌", "❌"]
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/5" : "bg-white/10"}>
                      {row.map((cell, j) => (
                        <td key={j} className="p-3 text-center border border-white/10">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* 🚀 How it works */}
          <section className="mb-28 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-blue-400 mb-12">
                How does Agenda Connect work?
              </h2>

              <div className="relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/10" />
                <div className="flex flex-col md:flex-row gap-8 overflow-x-auto md:overflow-visible scroll-smooth pb-4 md:pb-0 justify-center px-4">
                  {[
                    {
                      titulo: "1. Sign up",
                      descripcion: "Create your account and personalize your booking link.",
                      imagen: "/registro2.webp",
                    },
                    {
                      titulo: "2. Connect your Google Calendar",
                      descripcion: "Sync your bookings automatically with your calendar.",
                      imagen: "/sinc.webp",
                    },
                    {
                      titulo: "3. Receive bookings and alerts",
                      descripcion: "Your clients book, and you get notified instantly.",
                      imagen: "/notificacion2.webp",
                    },
                    {
                      titulo: "4. Check via panel or app",
                      descripcion: "View and export bookings from the panel or Google Calendar.",
                      imagen: "/admin2.webp",
                    },
                    {
                      titulo: "5. Share your link",
                      descripcion: "Clients can book easily from any device.",
                      imagen: "/mensaj.webp",
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="relative flex-shrink-0 md:flex-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-blue-500/30 transition-transform hover:scale-[1.03] min-w-[280px]"
                    >
                      <div className="absolute -inset-1 rounded-2xl bg-purple-600 blur-xl opacity-10 z-0 animate-pulse" />
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <Image
                          src={step.imagen}
                          alt={step.titulo}
                          width={120}
                          height={80}
                          className="rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-bold text-purple-300 mb-2">{step.titulo}</h3>
                        <p className="text-white/90 text-sm">{step.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ⭐ Testimonials */}
          <section className="py-20 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-blue-400 mb-12">
              What our users say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  nombre: "Carlos M.",
                  comentario: "Agenda Connect has transformed how I manage my bookings. Easy, fast, and professional.",
                  cargo: "Personal Coach",
                  imagen: "/hombre.webp",
                },
                {
                  nombre: "Laura P.",
                  comentario: "My clients are happy, and so am I. The notifications and panel are super helpful.",
                  cargo: "Esthetician",
                  imagen: "/mujer.webp",
                },
                {
                  nombre: "Andrés R.",
                  comentario: "Since using Agenda Connect, I have more free time and less stress. 100% recommended!",
                  cargo: "Nutritionist",
                  imagen: "/hombre1.webp",
                },
              ].map((testimonio, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-purple-500/30 transition duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonio.imagen}
                      alt={testimonio.nombre}
                      className="w-12 h-12 rounded-full border border-purple-400 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-purple-300">{testimonio.nombre}</p>
                      <p className="text-sm text-white/70">{testimonio.cargo}</p>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm italic">“{testimonio.comentario}”</p>
                </div>
              ))}
            </div>
          </section>

          {/* ❓ FAQs */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 text-white/90">
              <div>
                <h3 className="font-bold text-white">Do I need a Google account?</h3>
                <p>Yes, to sync your appointments automatically with Google Calendar.</p>
              </div>
              <div>
                <h3 className="font-bold text-white">Can I set custom schedules?</h3>
                <p>Yes. You can define your availability, appointment duration, and daily limits.</p>
              </div>
              <div>
                <h3 className="font-bold text-white">Do clients need to register?</h3>
                <p>No. Clients just fill out the booking form. You manage everything from the panel.</p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
