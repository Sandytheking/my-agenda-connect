import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "La Mejor Agenda para Peluquerías en 2026 | Guía para Elegir el Sistema Ideal",
  description:
    "Descubre cuál es la mejor agenda para peluquerías en 2026. Compara funciones, evita errores comunes y elige un sistema que reduzca ausencias y aumente tus ingresos.",
  keywords: [
    "mejor agenda para peluquerías",
    "software para peluquerías 2026",
    "agenda digital para salones de belleza",
    "sistema de reservas peluquería",
    "programa para agendar citas peluquería",
  ],
  alternates: {
    canonical: "https://www.agenda-connect.com/blog/mejor-agenda-para-peluquerias-2026",
  },
  openGraph: {
    title: "La Mejor Agenda para Peluquerías en 2026",
    description:
      "Guía completa para elegir una agenda online que reduzca ausencias, automatice reservas y haga crecer tu peluquería.",
    url: "https://www.agenda-connect.com/blog/mejor-agenda-para-peluquerias-2026",
    siteName: "Agenda Connect",
    locale: "es_DO",
    type: "article",
    images: [
      {
        url: "/blog/og-mejor-agenda-peluquerias.jpg",
        width: 1200,
        height: 630,
        alt: "Agenda digital para peluquerías moderna y llena",
      },
    ],
  },
};

export default function Article() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-950 text-gray-200">
      <article className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-a:text-purple-400 hover:prose-a:text-purple-300">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-8">
          La Mejor Agenda para Peluquerías en 2026  
          <span className="block text-2xl md:text-3xl text-gray-400 mt-3">
            Guía Completa para Elegir la Ideal y Llenar tu Agenda
          </span>
        </h1>

        {/* Hero Image: Salón moderno */}
        <figure className="my-10">
          <Image
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Interior moderno de peluquería con estilistas y clientas"
            width={1200}
            height={800}
            priority
            className="w-full h-auto object-cover rounded-xl"
          />
          <figcaption className="text-center text-sm text-gray-500 mt-3">
            Un salón organizado y profesional empieza con la agenda correcta
          </figcaption>
        </figure>

        <p className="lead text-xl text-gray-300 mb-10">
          Elegir la mejor agenda para tu peluquería en 2026 no es solo una actualización tecnológica: es la clave para dejar atrás el caos de WhatsApp y libretas, reducir ausencias y multiplicar ingresos.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-white flex items-center gap-3">
          💇‍♀️ ¿Por qué tu peluquería necesita una agenda digital YA?
        </h2>
        <p className="mb-6">
          En 2026, las clientas esperan comodidad, rapidez y profesionalismo. Sin una agenda digital adecuada:
        </p>
        <ul className="list-none space-y-4 mb-10">
          <li className="flex items-start gap-3">
            <span className="text-red-400 text-2xl">✗</span>
            <span>Duplicaciones de citas y overbooking involuntario</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-400 text-2xl">✗</span>
            <span>Pérdida de clientes por respuestas lentas o olvidos</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-400 text-2xl">✗</span>
            <span>Ausencias altas (hasta 30-40% sin recordatorios)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-400 text-2xl">✗</span>
            <span>No hay historial de colores, alergias o preferencias</span>
          </li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-white flex items-center gap-3">
          🔍 Características imprescindibles en 2026
        </h2>

        <div className="grid gap-8 md:grid-cols-2 my-10">
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold text-purple-400 mb-3">1. Reservas online 24/7</h3>
            <p>Clientas reservan corte, tinte o tratamientos cuando quieran, incluso de madrugada.</p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold text-purple-400 mb-3">2. Recordatorios automáticos</h3>
            <p>WhatsApp/SMS/email 48h + 2h antes → reduce ausencias hasta 80%.</p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold text-purple-400 mb-3">3. Gestión multi-estilista</h3>
            <p>Cada profesional con su agenda, servicios y disponibilidad independiente.</p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold text-purple-400 mb-3">4. Tiempos por servicio</h3>
            <p>Duración real: 30 min corte, 3h keratina → evita esperas y huecos muertos.</p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 md:col-span-2">
            <h3 className="text-xl font-bold text-purple-400 mb-3">5. Historial inteligente de clientas</h3>
            <p>Fórmulas de color, alergias, notas → fideliza y vende upsells personalizados.</p>
          </div>
        </div>

        {/* Imagen agenda digital */}
        <figure className="my-12">
          <Image
            src="https://images.unsplash.com/photo-1767788543684-811c14c3244b?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Mockup de agenda digital en laptop y móvil para reservas"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-xl"
          />
          <figcaption className="text-center text-sm text-gray-500 mt-3">
            Agenda moderna y sincronizada: llena tu horario sin esfuerzo
          </figcaption>
        </figure>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-white flex items-center gap-3">
          ⚠️ Errores comunes que te cuestan dinero
        </h2>
        <ul className="list-none space-y-4 mb-10">
          <li className="flex items-start gap-3">
            <span className="text-yellow-400 text-2xl">!</span>
            <span>Agenda solo para PC → clientas no reservan desde móvil</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-yellow-400 text-2xl">!</span>
            <span>Sin recordatorios → ausencias constantes</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-yellow-400 text-2xl">!</span>
            <span>Herramientas genéricas → no adaptadas a peluquerías</span>
          </li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-white flex items-center gap-3">
          🚀 ¿Cuál es la mejor agenda para peluquerías en 2026?
        </h2>
        <p className="mb-8 text-lg">
          La ideal automatiza todo, reduce ausencias, organiza equipo y mejora la experiencia de clientas. <strong>Agenda Connect</strong> está hecha para peluquerías: reservas 24/7, recordatorios WhatsApp, multi-estilista, historial y más.
        </p>

        {/* CTA destacado */}
        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/40 p-8 rounded-3xl my-12 text-center shadow-xl">
          <h3 className="text-3xl font-bold mb-4 text-white">
            ✨ Llena tu agenda y olvídate del caos
          </h3>
          <p className="text-lg mb-6 text-gray-300">
            Prueba gratis una agenda profesional diseñada para peluquerías como la tuya.
          </p>
          <a
            href="/precios"
            className="inline-block bg-purple-600 hover:bg-purple-700 px-10 py-5 rounded-xl font-bold text-lg text-white transition shadow-lg"
          >
            Probar Agenda Connect Gratis →
          </a>
        </div>

        {/* Imagen final motivacional */}
        <figure className="my-12">
          <Image
            src="https://images.unsplash.com/photo-1649433391719-2e784576d044?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Agenda llena en pantalla digital para salón de belleza"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-xl"
          />
          <figcaption className="text-center text-sm text-gray-500 mt-3">
            Agenda llena = más ingresos y menos estrés en 2026
          </figcaption>
        </figure>
      </article>
    </main>
  );
}