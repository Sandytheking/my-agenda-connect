import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Cómo Reducir las Ausencias en tu Salón de Belleza | Guía Completa 2026",
  description:
    "Descubre estrategias probadas para reducir hasta un 70-80% las ausencias en tu salón. Recordatorios automáticos, reservas online 24/7, políticas inteligentes y más.",
  keywords: [
    "reducir ausencias salón de belleza",
    "no shows salón belleza",
    "evitar clientes que no llegan a citas",
    "software salón de belleza 2026",
    "agenda online salón belleza",
    "recordatorios WhatsApp salón",
  ],
  alternates: {
    canonical: "https://www.agenda-connect.com/blog/reducir-ausencias-salon-belleza",
  },
  openGraph: {
    title: "Cómo Reducir las Ausencias en tu Salón de Belleza (Guía 2026)",
    description:
      "Guía práctica para dueños de salones que quieren decir adiós a los huecos en la agenda y aumentar ingresos con herramientas modernas.",
    url: "https://www.agenda-connect.com/blog/reducir-ausencias-salon-belleza",
    siteName: "Agenda Connect",
    locale: "es_DO",
    type: "article",
    images: [
      {
        url: "/blog/og-reducir-ausencias.jpg", // Sube esta imagen a /public/blog
        width: 1200,
        height: 630,
        alt: "Agenda de salón llena gracias a menos ausencias",
      },
    ],
  },
};

export default function BlogPost() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <article className="prose prose-lg prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:underline prose-img:rounded-xl prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 max-w-none">
        {/* Hero / Introducción */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black-700 mb-6">
          Cómo Reducir las Ausencias en tu Salón de Belleza
          <span className="block text-2xl md:text-3xl text-gray-600 mt-3">
            Guía práctica y actualizada para 2026
          </span>
        </h1>

        <p className="lead text-xl text-gray-700 mb-8">
          ¿Te ha pasado que abres la agenda y ves huecos que antes estaban reservados? Una clienta que no llega puede costarte fácilmente RD$2,500–5,000 por cita perdida (dependiendo del servicio).  
          Multiplica eso por 8–15 ausencias al mes… y el impacto duele.
        </p>

        <p>
          La buena noticia: <strong>la mayoría de las ausencias se pueden prevenir</strong>. Con las estrategias correctas puedes reducirlas entre un <strong>60% y 80%</strong>. Vamos paso a paso.
        </p>

        <figure className="my-10">
          <Image
            src="https://images.unsplash.com/photo-1675034743339-0b0747047727?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Salón de belleza moderno con clientas y estilistas trabajando"
            width={1200}
            height={800}
            priority
            className="w-full h-auto object-cover rounded-xl"
          />
          <figcaption className="text-center text-sm text-gray-500 mt-2">
            Un salón bien organizado atrae clientas que sí llegan a sus citas
          </figcaption>
        </figure>

        <h2>¿Por qué las clientas faltan a sus citas? (Las 4 razones principales)</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Olvido genuino</strong> – la vida diaria es agitada.</li>
          <li><strong>Falta de recordatorio efectivo</strong> – sin mensaje previo, se les pasa.</li>
          <li><strong>Dificultad para cancelar/reprogramar</strong> – si es complicado, mejor no aparecen.</li>
          <li><strong>Reserva muy anticipada</strong> – cuanto más lejos la fecha, más probable el no-show.</li>
        </ul>

        <figure className="my-10">
          <Image
            src="https://images.unsplash.com/photo-1623331520717-f447bebc7294?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
           alt="Mujer revisando notificaciones en su celular – ideal para representar recordatorios de citas"
           width={1200}
           height={800}
            className="w-full h-auto object-cover rounded-xl"
          />
          <figcaption className="text-center text-sm text-gray-500 mt-2">
            Un recordatorio en WhatsApp 48 horas antes cambia todo
          </figcaption>
        </figure>

        <h2>Las 6 estrategias más efectivas para 2026</h2>

        <div className="not-prose grid gap-8 md:grid-cols-2 my-10">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
            <h3 className="text-xl font-bold text-blue-900 mb-3">1. Recordatorios automáticos (el arma #1)</h3>
            <p className="text-gray-900">48 h + 2 h antes por WhatsApp/SMS. Reduce ausencias hasta 70–80%.</p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-gray-800">
              <li>Fecha, hora y servicio</li>
              <li>Dirección + cómo llegar</li>
              <li>Botones: confirmar / reprogramar / cancelar</li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm">
            <h3 className="text-xl font-bold text-green-900 mb-3">2. Reservas online 24/7</h3>
            <p className="text-gray-900">Clientas reservan cuando quieran y reciben confirmación inmediata.</p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-gray-800">
              <li>Disponibilidad real-time</li>
              <li>Menos errores humanos</li>
              <li>Confirmación automática</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 shadow-sm">
            <h3 className="text-xl font-bold text-purple-900 mb-3">3. Confirmación activa con 1 clic</h3>
            <p className="text-gray-900">Mensaje 24–48 h antes: “¿Confirmas tu cita?”. Quien dice sí casi siempre llega.</p>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 shadow-sm">
            <h3 className="text-xl font-bold text-orange-900 mb-3">4. Reprogramación sin fricción</h3>
            <p className="text-gray-900">Botón directo en el mensaje para cambiar hora. Menos faltas, más reprogramaciones.</p>
          </div>

          <div className="bg-teal-50 p-6 rounded-xl border border-teal-200 shadow-sm md:col-span-2">
            <h3 className="text-xl font-bold text-teal-900 mb-3">5. Políticas inteligentes para servicios premium</h3>
            <p className="text-gray-900">Para keratina, coloraciones complejas, uñas acrílicas largas:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-800">
              <li>Anticipo reembolsable (RD$500–1,000 o 50%)</li>
              <li>Cancelación gratis con 24–48 h de aviso</li>
              <li>Excepciones por emergencia con empatía</li>
            </ul>
          </div>

          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200 shadow-sm md:col-span-2">
            <h3 className="text-xl font-bold text-indigo-900 mb-3">6. Incentivos para clientas fieles</h3>
            <p className="text-gray-900">10–15% de descuento en el próximo servicio si cumplen sus últimas 3 citas sin fallar.</p>
          </div>
        </div>

      <figure className="my-10">
  <Image
    src="https://images.unsplash.com/photo-1706648568426-66c073d7de5c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Calendario digital y agenda online en laptop y teléfono"
    width={1200}
    height={800}
    className="w-full h-auto object-cover rounded-xl"
  />
  <figcaption className="text-center text-sm text-gray-500 mt-2">
    Agenda online 24/7: clientas reservan cuando les conviene y tú llenas horarios
  </figcaption>
</figure>

        <h2>La forma más sencilla y efectiva en 2026</h2>
        <p>
          Usa un sistema todo-en-uno como <strong>Agenda Connect</strong>:
        </p>
        <ul className="list-none space-y-3 text-lg">
          <li className="flex items-center"><span className="text-green-600 mr-3 text-2xl">✓</span> Agenda online con reservas 24/7</li>
          <li className="flex items-center"><span className="text-green-600 mr-3 text-2xl">✓</span> Recordatorios automáticos por WhatsApp + SMS + email</li>
          <li className="flex items-center"><span className="text-green-600 mr-3 text-2xl">✓</span> Confirmaciones con 1 clic</li>
          <li className="flex items-center"><span className="text-green-600 mr-3 text-2xl">✓</span> Reprogramación fácil desde el celular</li>
          <li className="flex items-center"><span className="text-green-600 mr-3 text-2xl">✓</span> Anticipos automáticos (opcional)</li>
          <li className="flex items-center"><span className="text-green-600 mr-3 text-2xl">✓</span> Reportes de ausencias y rendimiento</li>
        </ul>

        <div className="bg-gray-50 p-8 rounded-2xl my-12 text-center border border-gray-200 shadow-md">
          <p className="text-xl font-semibold mb-6">
            ¿Quieres ver cómo se ve una agenda sin huecos y llena de clientas fieles?
          </p>
          <a
            href="https://www.agenda-connect.com/precios"
            className="inline-block bg-blue-600 text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg"
          >
            Solicita tu demo gratuita ahora →
          </a>
        </div>

        <h2>Conclusión: Las ausencias no son “mala suerte”</h2>
        <p>
          Son un problema de sistema… y los sistemas se pueden mejorar.  
          Empieza hoy con recordatorios automáticos y reservas online: en 2–4 semanas verás la diferencia.
        </p>
        <p className="font-medium text-lg">
          Tu tiempo y tu talento valen demasiado como para regalarlos.  
          ¿Estás lista para llenar tu agenda de verdad en 2026?
        </p>

        <figure className="my-10">
          <Image
            src="https://images.unsplash.com/photo-1717160675643-53a7a2ebaa9f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Clienta recibiendo tratamiento facial relajante en salón de belleza"
            width={800}
            height={534}
            className="w-full h-auto object-cover rounded-xl"
          />
          <figcaption className="text-center text-sm text-gray-500 mt-2">
            Clientas felices, puntuales y recurrentes: el resultado de un buen sistema
          </figcaption>
        </figure>
      </article>
    </main>
  );
}