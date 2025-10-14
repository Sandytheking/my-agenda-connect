import Image from "next/image";

export const metadata = {
  title: "Acerca de | Agenda Connect",
  description:
    "Conoce cómo Agenda Connect ayuda a negocios locales a gestionar sus citas y sincronizar su agenda con Google Calendar.",
};

export default function AcercaPage() {
  return (
    <section className="bg-[#0C0C0C] text-white py-20 px-6 md:px-16 min-h-screen">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Texto a la izquierda */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#A020F0]">
            Acerca de Agenda Connect
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            <strong>Agenda Connect</strong> es un sistema inteligente de gestión
            de citas diseñado para ayudar a negocios locales a organizar su
            tiempo y conectar con sus clientes de forma eficiente. Tus clientes
            pueden reservar citas en línea en segundos, mientras tú mantienes
            todo sincronizado con <strong>Google Calendar</strong>, sin
            complicaciones ni papeleo.
          </p>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Nuestro objetivo es ayudarte a <strong>ahorrar tiempo</strong>,
            evitar confusiones y mantener tu agenda siempre bajo control.
            Agenda Connect se adapta a cualquier negocio que dependa de citas
            diarias — desde barberías, salones, clínicas y gimnasios, hasta
            consultorios y talleres.
          </p>

          <ul className="space-y-2 text-gray-200 mb-8">
            <li>✅ Sincronización con Google Calendar</li>
            <li>✅ Panel de administración fácil de usar</li>
            <li>✅ Horarios personalizados por día</li>
            <li>✅ Bloqueo de almuerzo y días libres</li>
            <li>✅ Recordatorios automáticos</li>
            <li>✅ Analíticas y reportes mensuales</li>
          </ul>

          <p className="text-gray-400 italic mb-8">
            Nuestra misión: ayudar a pequeños y medianos negocios a digitalizar
            su agenda de forma simple y moderna.
          </p>

          <a
            href="/precios"
            className="inline-block bg-[#A020F0] hover:bg-[#7C15C0] text-white font-semibold px-8 py-3 rounded-full transition"
          >
            🚀 Probar Agenda Connect
          </a>
        </div>

        {/* Imágenes al lado derecho */}
        <div className="flex flex-col items-center md:items-end gap-6">
           <Image
            src="/paneldecitas3.png"
            alt="Panel de Citas Agenda Connect"
            width={380}
            height={280}
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="/admin4.png"
            alt="Panel de Administración Avanzada"
            width={380}
            height={280}
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="/reserva2.png"
            alt="Analítica de Negocio"
            width={380}
            height={280}
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}
