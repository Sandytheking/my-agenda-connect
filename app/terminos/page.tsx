// app/terminos/page.tsx
export default function TerminosPage() {
  return (
    <section className="max-w-3xl mx-auto py-12 px-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Términos y Condiciones de Uso</h1>
      <p><strong>Última actualización:</strong> 03/07/2025</p>

      <p className="mt-4">
        Bienvenido(a) a nuestra plataforma de reservas online. Al utilizar nuestros servicios, aceptas los siguientes Términos y Condiciones, los cuales rigen el uso del sistema tanto por parte de los dueños de negocios (clientes) como de sus usuarios finales (reservantes).
      </p>

      <h2 className="text-xl font-semibold mt-8">1. Descripción del servicio</h2>
      <p>Nuestra plataforma ofrece a negocios locales una solución para gestionar citas, mostrar disponibilidad a sus clientes y sincronizar eventos con su calendario de Google. Cada negocio puede personalizar su enlace de reservas, horarios, duración de citas y otros parámetros operativos.</p>

      <h2 className="text-xl font-semibold mt-6">2. Responsabilidades del negocio (cliente registrado)</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Es responsabilidad del negocio configurar correctamente su disponibilidad, duración de citas, límites diarios y horarios laborales.</li>
        <li>El negocio debe asegurar que su cuenta de Google Calendar esté correctamente conectada y sincronizada.</li>
        <li>El negocio es responsable de brindar atención a los usuarios que reserven mediante el sistema.</li>
        <li>El enlace personalizado provisto al momento del registro debe ser compartido solo con sus clientes reales.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">3. Reservas por parte de los usuarios</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Los usuarios deben brindar información verídica al reservar (nombre, correo electrónico, etc.).</li>
        <li>La disponibilidad mostrada depende de la configuración del negocio y sincronización con su calendario.</li>
        <li>No garantizamos disponibilidad si hay cambios en el horario del negocio o eventos de Google Calendar.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">4. Cancelaciones y modificaciones</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Cada negocio define sus propias políticas de cancelación o reprogramación.</li>
        <li>El sistema no modifica citas directamente. Los usuarios deben comunicarse con el negocio.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">5. Uso de datos y privacidad</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Solo se recolecta la información necesaria para gestionar la reserva.</li>
        <li>Los datos no se comparten con terceros ajenos al proceso.</li>
        <li>El negocio tiene acceso a los datos de sus reservas para fines administrativos.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">6. Seguridad</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>El sistema protege el acceso mediante credenciales y encriptación segura.</li>
        <li>Los tokens y datos sensibles se almacenan con buenas prácticas de seguridad.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">7. Disponibilidad del sistema</h2>
      <p>Nos esforzamos por mantener el servicio activo, pero no garantizamos disponibilidad continua. No nos responsabilizamos por fallos técnicos ni errores derivados de servicios de terceros como Google Calendar.</p>

      <h2 className="text-xl font-semibold mt-6">8. Cambios en estos Términos</h2>
      <p>Nos reservamos el derecho de actualizar estos términos en cualquier momento. Notificaremos los cambios a los negocios registrados por correo electrónico o desde su panel.</p>

      <h2 className="text-xl font-semibold mt-6">9. Contacto</h2>
      <p>
        Si tienes dudas o necesitas soporte, puedes escribirnos a:{" "}
        <a href="mailto:contacto@agenda-connect.com" className="text-blue-400 underline">
          contacto@agenda-connect.com
        </a>
      </p>
    </section>
  );
}
