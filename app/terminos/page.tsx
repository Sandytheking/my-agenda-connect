// app/terminos/page.tsx
'use client';

export default function TerminosPage() {
  return (
    <section className="max-w-3xl mx-auto py-12 px-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Términos y Condiciones de Uso</h1>
      <p><strong>Última actualización:</strong> 24/07/2025</p>

      <p className="mt-4">
        Bienvenido(a) a Agenda Connect. Al utilizar nuestros servicios, aceptas los siguientes Términos y Condiciones, los cuales rigen el uso del sistema tanto por parte de los negocios registrados como de los usuarios finales que realizan reservas.
      </p>

      <h2 className="text-xl font-semibold mt-8">1. Descripción del servicio</h2>
      <p>
        Agenda Connect es una plataforma web que permite a negocios locales gestionar sus reservas, mostrar disponibilidad en línea y sincronizar eventos con Google Calendar. El sistema ofrece un panel administrativo, funciones de visualización de citas, estadísticas de uso y exportación de datos.
      </p>

      <h2 className="text-xl font-semibold mt-6">2. Responsabilidades del negocio</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Configurar correctamente disponibilidad, duración de citas y horarios laborales.</li>
        <li>Conectar su cuenta de Google Calendar si desea sincronización automática.</li>
        <li>Gestionar adecuadamente las reservas y atender a los usuarios que las generen.</li>
        <li>Verificar que los datos de su cuenta estén actualizados y correctos.</li>
        <li>Responsabilizarse por la seguridad de su cuenta y sus credenciales.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">3. Reservas por parte de los usuarios</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Los usuarios deben proporcionar datos reales y verificables al reservar.</li>
        <li>La disponibilidad depende de la configuración del negocio y de Google Calendar.</li>
        <li>La plataforma no se responsabiliza por errores en la sincronización ajenos al sistema.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">4. Visualización y analítica de citas</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>El sistema almacena información de las reservas realizadas por los usuarios.</li>
        <li>Los negocios pueden visualizar las citas en su panel por día y por semana.</li>
        <li>Se ofrece un módulo de analíticas que presenta datos agregados de uso y citas.</li>
        <li>Los datos pueden ser exportados por el negocio en formatos PDF o Excel.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">5. Cancelaciones y modificaciones</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Las políticas de cancelación son responsabilidad exclusiva del negocio.</li>
        <li>Los usuarios deben comunicarse con el negocio para reprogramar o cancelar citas.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">6. Privacidad y uso de datos</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Solo recolectamos información necesaria para procesar reservas y mostrar disponibilidad.</li>
        <li>No compartimos datos con terceros ajenos al funcionamiento del sistema.</li>
        <li>Los negocios pueden acceder únicamente a los datos de sus propias reservas.</li>
        <li>Consulta nuestra <a href="/politica" className="text-blue-400 underline">Política de Privacidad</a> para más detalles.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">7. Seguridad</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Usamos medidas de seguridad como cifrado HTTPS y almacenamiento seguro de datos.</li>
        <li>No almacenamos contraseñas en texto plano ni compartimos tokens sensibles.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">8. Disponibilidad del sistema</h2>
      <p>
        Agenda Connect busca mantener la continuidad del servicio, pero no garantiza disponibilidad absoluta. No nos responsabilizamos por interrupciones causadas por mantenimiento, fallos técnicos o errores de servicios externos como Google Calendar.
      </p>

      <h2 className="text-xl font-semibold mt-6">9. Suscripciones y pagos</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>El sistema puede requerir una suscripción mensual para mantenerse activo.</li>
        <li>Los negocios deben mantenerse al día con sus pagos para conservar el acceso completo a las funcionalidades.</li>
        <li>Nos reservamos el derecho de suspender cuentas inactivas o vencidas.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">10. Cambios en estos Términos</h2>
      <p>
        Nos reservamos el derecho de modificar estos términos en cualquier momento. Los negocios registrados serán notificados por correo o mediante el panel administrativo.
      </p>

      <h2 className="text-xl font-semibold mt-6">11. Contacto</h2>
      <p>
        Si tienes preguntas sobre estos términos o necesitas soporte, puedes escribirnos a:{" "}
        <a href="mailto:contacto@agenda-connect.com" className="text-blue-400 underline">
          agendaconnectinfo@gmail.com
        </a>
      </p>
    </section>
  );
}
