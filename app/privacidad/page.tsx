
export default function PoliticaPrivacidad() {
  return (
    <section className="max-w-3xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6 text-left">Política de Privacidad</h1>

      <p className="mb-6">
        En <strong>Agenda Connect</strong>, nos comprometemos a proteger la privacidad de los usuarios que utilizan nuestra plataforma de reservas, gestión de citas y sincronización con Google Calendar.
      </p>

      <h2 className="text-xl font-semibold mb-2"> ¿Qué información recopilamos?</h2>
      <p className="mb-4">Cuando conectas tu cuenta de Google Calendar, solicitamos acceso limitado a los siguientes datos:</p>
      <ul className="list-disc list-inside mb-6">
        <li>Tu dirección de correo electrónico de Google</li>
        <li>Permiso para crear, mostrar y editar eventos en tu calendario</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2"> ¿Cómo usamos esta información?</h2>
      <p className="mb-4">La información que solicitamos se utiliza únicamente para:</p>
      <ul className="list-disc list-inside mb-6">
        <li>Agendar automáticamente las citas que tus clientes crean</li>
        <li>Mostrar tu disponibilidad en tiempo real</li>
        <li>Visualizar tus citas agendadas dentro del panel administrativo</li>
        <li>Brindar estadísticas y analíticas personalizadas sobre tus citas</li>
      </ul>
      <p className="mb-6">
        No usamos, leemos, compartimos ni eliminamos eventos que no hayan sido creados por nuestra plataforma.<br />
        No accedemos a tu correo electrónico, archivos ni a ningún otro dato personal de Google.
      </p>

      <h2 className="text-xl font-semibold mb-2"> Seguridad</h2>
      <p className="mb-6">
        Todos los datos se transmiten de forma segura mediante conexiones cifradas (HTTPS) y se almacenan en servidores protegidos. No compartimos tu información con terceros.
      </p>

      <h2 className="text-xl font-semibold mb-2"> ¿Cómo revocar el acceso?</h2>
      <p className="mb-6">
        Puedes quitar el acceso a Agenda Connect desde tu cuenta de Google en cualquier momento accediendo a:
        <br />
        <a
          href="https://myaccount.google.com/permissions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          https://myaccount.google.com/permissions
        </a>
      </p>

      <h2 className="text-xl font-semibold mb-2">📬 Contacto</h2>
      <p>
        Si tienes preguntas sobre esta política de privacidad o el uso de tus datos, puedes escribirnos a:
        <br />
        ✉️ <strong>agendacoonectinfo@gmail.com</strong>
      </p>
    </section>
  );
}
