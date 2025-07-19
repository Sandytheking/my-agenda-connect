import Image from "next/image";

const pasos = [
  {
    titulo: "1. Regístrate gratis",
    descripcion:
      "Crea una cuenta en segundos. Solo necesitas tu correo, nombre del negocio y una contraseña segura.",
    imagen: "/registro2.webp",
  },
  {
    titulo: "2. Accede a tu panel de administración",
    descripcion:
      "Ingresa a tu panel donde podrás personalizar tus horarios, días laborales y capacidad máxima. Desde aqui podras sincronizar tus citas con Google Calander",
    imagen: "/admin2.webp",
  },
  {
    titulo: "3. Conecta tu Google Calendar",
    descripcion:
      "Sincroniza automáticamente tus reservas con tu calendario de Google en solo un clic.",
    imagen: "/sinc.webp",
  },
  {
    titulo: "4. Personaliza tu mensaje de WhatsApp",
    descripcion:
      "Configura un mensaje automático con el link para que tus clientes agenden por WhatsApp.",
    imagen: "/mensaj.webp",
  },
  {
    titulo: "5. Recibe notificaciones automáticas",
    descripcion:
      "Cada vez que alguien agenda una cita, recibirás una notificación instantánea en tu correo y una notificacion via la app de Google Calander.",
    imagen: "/notificacion2.webp",
  },
  {
    titulo: "6. Accede fácilmente con tu cuenta",
    descripcion:
      "Puedes volver cuando quieras, iniciar sesión y seguir recibiendo reservas sin complicaciones.",
    imagen: "/login3.webp",
  },
];

export default function GuiaPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-400">
          Guía detallada de uso
        </h1>

        {pasos.map((paso, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/2">
              <Image
                src={paso.imagen}
                alt={paso.titulo}
                width={800}
                height={600}
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-blue-300 mb-4">
                {paso.titulo}
              </h2>
              <p className="text-white/90 text-lg">{paso.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
