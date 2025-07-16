export default function PoliticaPrivacidad() {
  return (
    <section className="max-w-3xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">Política de Privacidad</h1>
      <p className="mb-6">
        En <strong>Agenda Connect</strong>, nos comprometemos a proteger la privacidad de los usuarios que utilizan nuestra plataforma de reservas y gestión de citas.
      </p>

      <h2 className="text-xl font-semibold mb-2">¿Qué información recopilamos?</h2>
      <p className="mb-4">Cuando conectas tu cuenta de Google Calendar, solicitamos acceso limitado a los siguientes datos:</p>
      <ul className="list-disc list-inside mb-6">
        <li>Tu dirección de correo electrónico de Google</li>
        <li>Permiso para crear eventos en tu calendario</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">¿Cómo usamos esta información?</h2>
      <p className="mb-4">Utilizamos estos permisos exclusivamente para:</p>
      <ul className="list-disc list-inside mb-6">
        <li>Agendar automáticamente las citas creadas por tus clientes</li>
        <li>Mostrar tu disponibilidad en tiempo real</li>
      </ul>
      <p className="mb-6">
        No usamos, leemos, compartimos ni eliminamos eventos existentes.<br />
        No accedemos a tu correo electrónico, archivos, ni otra información personal de Google.
      </p>

      <h2 className="text-xl font-semibold mb-2">Seguridad</h2>
      <p className="mb-6">
        Todos los datos se transmiten de forma segura y son almacenados en servidores confiables. No compartimos tu información con terceros.
      </p>

      <h2 className="text-xl font-semibold mb-2">¿Cómo revocar el acceso?</h2>
      <p className="mb-6">
        Puedes quitar el acceso desde tu cuenta de Google en cualquier momento:<br />
        <a
          href="https://myaccount.google.com/permissions"
          target="_blank"
          className="text-blue-400 underline"
        >
          https://myaccount.google.com/permissions
        </a>
      </p>

      <h2 className="text-xl font-semibold mb-2">Contacto</h2>
      <p className="mb-6">
        Si tienes preguntas sobre esta política, contáctanos a:<br />
        📧 sandypavonacosta@gmail.com
      </p>
    </section>
  );
}
