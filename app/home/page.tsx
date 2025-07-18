import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const pasos = [
    {
      titulo: "1. Regístrate",
      descripcion: "Crea una cuenta y personaliza tu enlace de reservas.",
      imagen: "/paso-registro.png",
    },
    {
      titulo: "2. Configura tu disponibilidad",
      descripcion: "Define horarios, duración de citas y días laborales.",
      imagen: "/paso-agendar.png",
    },
    {
      titulo: "3. Conecta tu Google Calendar",
      descripcion: "Sincroniza automáticamente tus reservas con tu calendario.",
      imagen: "/paso-google.png",
    },
    {
      titulo: "4. Comparte tu enlace",
      descripcion: "Tus clientes podrán reservar fácilmente desde cualquier dispositivo.",
      imagen: "/paso-comparte.png",
    },
    {
      titulo: "5. Gestiona desde tu panel",
      descripcion: "Consulta y ajusta tu configuración en todo momento.",
      imagen: "/paso-admin.png",
    },
  ];

  return (
      <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/fondonegro.jpg')",
      }}
    >
      <main className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Encabezado */}
          <section className="text-center mb-16">
            <h1 className="text-5xl font-bold text-blue-400 mb-4">Agenda Connect</h1>
            <p className="text-xl text-white/90">
              Simplifica la gestión de tus citas. Sincroniza automáticamente con Google Calendar,
              personaliza tus horarios y recibe reservas en segundos.
            </p>
          </section>

          {/* Sección de pasos */}
          <section className="mb-20">
            <h2 className="text-3xl font-semibold text-blue-300 text-center mb-10">
              ¿Cómo funciona Agenda Connect?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pasos.map((paso, index) => (
                <div
                  key={index}
                  className="bg-black p-6 rounded-xl shadow-md flex flex-col items-center text-center transition duration-500 hover:scale-105"
                >
                  <Image
                    src={paso.imagen}
                    alt={paso.titulo}
                    width={200}
                    height={120}
                    className="mb-4 rounded-md"
                  />
                  <h3 className="text-lg font-bold text-blue-400 mb-2">{paso.titulo}</h3>
                  <p className="text-white/90 text-sm">{paso.descripcion}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Beneficios */}
          <section className="bg-black p-8 rounded-xl shadow-md mb-16">
            <h2 className="text-3xl font-semibold text-blue-300 mb-6">Beneficios de usar Agenda Connect</h2>
            <ul className="list-disc list-inside space-y-3 text-white/90">
              <li>Crea tu propio enlace de reservas personalizado.</li>
              <li>Configura tu horario, duración de citas y días laborales.</li>
              <li>Sincronización automática con Google Calendar.</li>
              <li>Recibe notificaciones por correo al instante.</li>
              <li>Panel de administración fácil de usar para negocios.</li>
            </ul>
          </section>

          {/* Acciones */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mb-16">
            <Link
              href="/registro"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Registrarse
            </Link>
            <Link
              href="/login"
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/terminos"
              className="text-blue-400 underline hover:text-blue-300 col-span-1 sm:col-span-2"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/privacidad"
              className="text-blue-400 underline hover:text-blue-300 col-span-1 sm:col-span-2"
            >
              Política de Privacidad
            </Link>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Preguntas Frecuentes</h2>
            <div className="space-y-6 text-white/90">
              <div>
                <h3 className="font-bold text-white">¿Necesito tener una cuenta de Google?</h3>
                <p>Sí, para que puedas sincronizar tus citas automáticamente con Google Calendar.</p>
              </div>
              <div>
                <h3 className="font-bold text-white">¿Puedo configurar mis horarios personalizados?</h3>
                <p>Sí. Puedes establecer tu disponibilidad, duración de citas, y límites diarios.</p>
              </div>
              <div>
                <h3 className="font-bold text-white">¿Mis clientes necesitan registrarse?</h3>
                <p>No. Tus clientes solo deben llenar el formulario de reservas. Tú gestionas el panel.</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-sm text-white/50 mt-12">
            © {new Date().getFullYear()} Agenda Connect. Todos los derechos reservados.
          </footer>
        </div>
      </main>
    </div>
  );
}
