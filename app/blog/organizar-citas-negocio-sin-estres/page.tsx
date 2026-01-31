import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Cómo organizar las citas de tu negocio sin volverte loco | Guía 2026",
  description:
    "Aprende a organizar las citas de tu negocio de forma profesional. Evita confusiones, clientes olvidados y horas perdidas con un sistema moderno.",
  keywords: [
    "cómo organizar citas de clientes",
    "agenda de citas para negocios",
    "organizar citas salón de belleza",
    "cómo llevar agenda de citas",
    "software para organizar citas",
  ],
  alternates: {
    canonical: "https://www.agenda-connect.com/blog/organizar-citas-negocio-sin-estres",
  },
  openGraph: {
    title: "Cómo organizar las citas de tu negocio sin estrés (Guía 2026)",
    description:
      "Descubre cómo pasar del caos de WhatsApp y papel a una agenda organizada que trabaja por ti.",
    url: "https://www.agenda-connect.com/blog/organizar-citas-negocio-sin-estres",
    siteName: "Agenda Connect",
    locale: "es_DO",
    type: "article",
    images: [
      {
        url: "/blog/og-organizar-citas.jpg",
        width: 1200,
        height: 630,
        alt: "Dueña de negocio organizando citas en agenda digital",
      },
    ],
  },
};

export default function Article() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-200">
      <article className="prose prose-lg prose-invert max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-8">
          Cómo organizar las citas de tu negocio sin volverte loco  
          <span className="block text-2xl md:text-3xl text-gray-400 mt-3">
            Guía práctica 2026 para dueños de salones y servicios
          </span>
        </h1>

        <p className="lead text-xl text-gray-300 mb-10">
          ¿Sientes que tu día es un torbellino de mensajes, llamadas y "yo reservé por WhatsApp"? Ese caos cuesta tiempo, dinero y clientes. Pero hay una forma simple de organizarlo todo y que tu agenda trabaje por ti.
        </p>

        {/* Hero Image: Dueña revisando agenda */}
<figure className="my-12">
  <Image
    src="https://images.unsplash.com/photo-1712571674567-4f07ae60f467?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D"
    alt="Mujer dueña de salón revisando agenda digital en laptop"
    width={1200}
    height={800}
    priority
    fetchPriority="high"
    sizes="(max-width: 768px) 100vw, 1000px"
    className="w-full h-auto object-cover rounded-xl"
  />
  <figcaption className="text-center text-sm text-gray-500 mt-3">
    Del estrés manual a una agenda que fluye sola
  </figcaption>
</figure>


        <h2 className="text-3xl font-bold mt-12 mb-6 text-white flex items-center gap-3">
          El caos de la agenda "a la antigua" 😩
        </h2>
        <ul className="list-none space-y-4 mb-10">
          <li className="flex items-start gap-3">
            <span className="text-red-400 text-2xl">✗</span>
            <span>Mensajes perdidos en WhatsApp o Instagram</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-400 text-2xl">✗</span>
            <span>"Yo reservé" pero no hay registro</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-400 text-2xl">✗</span>
            <span>Horas vacías por olvidos o cancelaciones de última hora</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-400 text-2xl">✗</span>
            <span>Doble reserva o overbooking accidental</span>
          </li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-white flex items-center gap-3">
          Los 5 pasos para organizar tus citas como pro
        </h2>

        <div className="grid gap-8 md:grid-cols-2 my-10">
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold text-purple-400 mb-3">Paso 1: Deja de depender de tu memoria</h3>
            <p>Todas las citas en un solo lugar: fecha, hora, servicio, nombre y notas del cliente. Adiós a "creo que tenía a las 3".</p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold text-purple-400 mb-3">Paso 2: Cambia el papel por digital</h3>
            <p>Agenda en la nube: ve tu día/semana/mes en segundos, desde celular o PC, sin tachones ni pérdidas.</p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold text-purple-400 mb-3">Paso 3: Deja que los clientes reserven solos</h3>
            <p>Reservas online 24/7: muestran disponibilidad real y reservan sin esperarte. Tú solo confirmas.</p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold text-purple-400 mb-3">Paso 4: Activa recordatorios automáticos</h3>
            <p>WhatsApp/SMS/email 48h + 2h antes → reduce ausencias hasta 80%. Incluye botón para confirmar/cancelar.</p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 md:col-span-2">
            <h3 className="text-xl font-bold text-purple-400 mb-3">Paso 5: Mide y optimiza</h3>
            <p>Reportes: ve horas llenas, ausencias, servicios más pedidos. Ajusta precios/horarios para ganar más.</p>
          </div>
        </div>

        {/* Imagen agenda digital */}
        <figure className="my-12">
          <Image
            src="https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Calendario digital de reservas en múltiples dispositivos"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-xl"
          />
          <figcaption className="text-center text-sm text-gray-500 mt-3">
            Agenda organizada = más clientes y menos estrés
          </figcaption>
        </figure>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-white">
          Organizar bien = más ingresos y menos horas de trabajo
        </h2>
        <ul className="list-none space-y-4 mb-10">
          <li className="flex items-start gap-3">
            <span className="text-green-400 text-2xl">✓</span>
            <span>Llenas huecos que antes perdías</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 text-2xl">✓</span>
            <span>Reduces ausencias y cancelaciones</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 text-2xl">✓</span>
            <span>Atiendes más sin extender horarios</span>
          </li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-white">
          La forma más fácil en 2026
        </h2>
        <p className="text-lg mb-8">
          Sistemas como <strong>Agenda Connect</strong> lo hacen todo automático: reservas online, recordatorios WhatsApp, agenda multi-dispositivo y reportes. Pasas de correr detrás de los clientes… a que tu agenda te traiga clientes.
        </p>

        {/* CTA destacado */}
        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/40 p-10 rounded-3xl my-12 text-center shadow-xl">
          <h3 className="text-3xl font-bold mb-4 text-white">
            ✨ ¿Listo para una agenda que trabaje por ti?
          </h3>
          <p className="text-lg mb-8 text-gray-300">
            Prueba gratis y olvídate del caos de mensajes y olvidos.
          </p>
          <a
            href="/precios"
            className="inline-block bg-purple-600 hover:bg-purple-700 px-12 py-5 rounded-xl font-bold text-lg text-white transition shadow-lg"
          >
            Probar Agenda Connect Gratis →
          </a>
        </div>

        {/* Imagen final: Salón organizado */}
        <figure className="my-12">
          <Image
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Salón de belleza organizado con clientas y estilistas"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-xl"
          />
          <figcaption className="text-center text-sm text-gray-500 mt-3">
            Negocio organizado = clientas felices y agenda llena
          </figcaption>
        </figure>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-white">Conclusión</h2>
        <p className="text-lg mb-6">
          Organizar citas no es solo orden: es una estrategia para crecer, ganar tiempo y dar una experiencia top a tus clientes. Mientras más fácil sea reservar contigo, más fácil será llenar tu agenda.
        </p>
        <p className="font-medium text-xl text-purple-300">
          ¿Estás listo para dejar el estrés atrás y enfocarte en lo que amas?
        </p>
      </article>
    </main>
  );
}