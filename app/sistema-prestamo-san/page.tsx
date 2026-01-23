'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Heart, X } from 'lucide-react';

const features = [
  {
    title: 'Gestión de Clientes',
    desc: 'Registro completo con historial detallado de préstamos, pagos y notas personales.',
  },
  {
    title: 'Préstamos y Cobros',
    desc: 'Control automático de cuotas, intereses compuestos, abonos parciales y balance en tiempo real.',
  },
  {
    title: 'Reportes Avanzados',
    desc: 'Filtros por fechas, cobrador, estado, cliente + exportación a Excel y PDF.',
  },
  {
    title: 'Activación por HWID',
    desc: 'Licencia anual vinculada al hardware. Fácil renovación desde el mismo programa.',
  },
  {
    title: 'Seguridad Reforzada',
    desc: 'Acceso protegido por PIN de 6 dígitos + bloqueo automático tras inactividad.',
  },
  {
    title: '100% Offline',
    desc: 'Base de datos local encriptada. No depende de internet para el uso diario.',
  },
];

export default function SistemaPrestamoSAN() {
  const [so, setSo] = useState<'windows' | 'mac' | 'other'>('windows');
  const [mostrarDonar, setMostrarDonar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('mac') || platform.includes('os x')) setSo('mac');
    else if (platform.includes('win')) setSo('windows');
    else setSo('other');

    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

const isWindows = so === 'windows'

const downloadUrl = isWindows
  ? 'https://github.com/Sandytheking/san-pro-desktop/releases/download/v2.1.0/San-Pro-Setup-v2.1.0.exe'
  : '#'



  return (
    <div className={darkMode ? 'dark bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}>
      <section className="relative min-h-screen max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24">
        {/* Fondo decorativo sutil */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-3xl" />
        </div>

        {/* HERO - más limpio y directo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            SAN PRO 2026
          </h1>

          <p className="text-lg sm:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            El sistema de préstamos más rápido, confiable y sencillo para prestamistas dominicanos.
            <br className="hidden sm:block" />
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              100% offline • Gratis para siempre • Sin suscripciones
            </span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-6 mb-6">
            {isWindows ? (
              <a
                href={downloadUrl}
                className="group inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <Download className="w-6 h-6 group-hover:animate-bounce-short" />
                Descargar SAN PRO v2.1.0
              </a>
            ) : (
              <div className="px-8 py-5 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-semibold text-lg rounded-2xl">
                Próximamente disponible para macOS
              </div>
            )}

            <button
              onClick={() => setMostrarDonar(true)}
              className="inline-flex items-center gap-3 px-8 py-5 border-2 border-indigo-500/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 font-semibold text-lg rounded-2xl transition-all hover:border-indigo-600 hover:shadow-lg"
            >
              <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
              Apoyar el proyecto
            </button>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm">
            <p className="text-green-600 dark:text-green-400 font-medium">
              ✔️ Sin virus • ✔️ Sin spyware • ✔️ Instalador firmado digitalmente
            </p>
            {isWindows && (
              <p className="text-gray-500 dark:text-gray-400">
                Requiere Windows 10 o superior • 64 bits
              </p>
            )}
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Versión actual • Gratuita • Donación voluntaria
            </p>
          </div>
        </motion.div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-7 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
        
 <div className="text-center space-y-6">
  {/* Botón que muestra el changelog */}
  <button
    onClick={() =>
      alert(
        `Changelog v2.1.0 – Enero 2026

✨ Nuevas funciones
- Sistema 100% gratuito con opción de donaciones
- Modal de donación integrado (PayPal + Banreservas)
- Términos y Condiciones obligatorios con aceptación registrada
- Activación de licencia anual por HWID
- Recordatorio mensual de apoyo al proyecto

🔐 Seguridad
- Acceso protegido por PIN de 6 dígitos
- Bloqueo automático por inactividad
- Validación local sin conexión a internet

📊 Préstamos y Cobros
- Gestión avanzada de clientes
- Control de préstamos, cuotas y balances en tiempo real
- Estados automáticos: Al Día, Moroso, Pagado
- Filtros por fecha, cobrador y estado
- Exportación a Excel y PDF

🛠 Correcciones
- Solucionado problema visual donde la tabla cubría el menú
- Mejoras de rendimiento en tablas grandes
- Correcciones menores de interfaz`
      )
    }
    className="text-indigo-400 hover:text-indigo-300 underline text-sm transition"
  >
    SAN PRO v2.1.0 – Ver Changelog
  </button>

  {/* Texto fijo del footer */}
  <div className="text-xs text-slate-500">
    Sistema de Préstamos Offline<br />
    © 2026 – Sandy Pavon
  </div>
</div>

        {/* MODAL DONACIÓN */}
        {mostrarDonar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 w-full max-w-lg shadow-2xl border border-gray-200/50 dark:border-gray-800"
            >
              <button
                onClick={() => setMostrarDonar(false)}
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-7 h-7" />
              </button>

              <div className="text-center mb-8">
                <Heart className="w-14 h-14 text-red-500 mx-auto mb-5" fill="currentColor" />
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Gracias por apoyar SAN PRO
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Tu ayuda mantiene el software gratuito y permite seguir mejorándolo.
                </p>
              </div>

              <div className="space-y-6">
                <a
                  href="https://www.paypal.me/sandypavon0329"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-center transition shadow-lg shadow-blue-500/20"
                >
                  Donar con PayPal o tarjeta →
                </a>

                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl text-center text-sm">
                  <p className="font-semibold text-base mb-3">Transferencia bancaria (Rep. Dominicana)</p>
                  <p>Banco: Banreservas</p>
                  <p>Tipo: Ahorro</p>
                  <p className="font-mono text-lg my-2">9601016551</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                    Nombre: Sandy Pavón
                  </p>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
                ¡Cualquier monto hace la diferencia! ❤️
              </p>
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
}