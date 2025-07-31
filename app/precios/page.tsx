//pagina de los precios

"use client";

import { CheckCircle, Star } from "lucide-react";
import Link from "next/link";

const planes = [
  {
    nombre: "Gratis",
    precio: "$0",
    descripcion: "Ideal para probar el sistema.",
    beneficios: [
      "1 usuario administrador",
      "Hasta 10 citas al mes",
      "Acceso limitado al panel",
    ],
    destacado: false,
    link: "/registro",
  },
  {
    nombre: "Pro",
    precio: "$9.99",
    descripcion: "Perfecto para negocios pequeños.",
    beneficios: [
      "Sin límite de citas",
      "Sincronización con Google Calendar",
      "Notificaciones automáticas",
      "Panel completo",
      "Exportar a PDF y Excel",
    ],
    destacado: true,
    link: "/registro",
  },
  {
    nombre: "Negocio",
    precio: "$19.99",
    descripcion: "Para equipos o empresas.",
    beneficios: [
      "Todo en el plan Pro",
      "Múltiples usuarios",
      "Soporte prioritario",
      "Acceso a funciones futuras",
    ],
    destacado: false,
    link: "/registro",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
          Elige el plan perfecto para ti
        </h1>
        <p className="text-white/80 text-lg">
          Comienza gratis y crece a tu ritmo. Cancela cuando quieras.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {planes.map((plan, i) => (
          <div
            key={i}
            className={`rounded-3xl border border-white/10 p-8 relative shadow-lg transition-transform duration-300 hover:-translate-y-1 ${
              plan.destacado
                ? "bg-purple-800/20 border-purple-500/30 scale-105"
                : "bg-white/5"
            }`}
          >
            {plan.destacado && (
              <div className="absolute top-4 right-4 text-xs px-3 py-1 bg-purple-500 text-white rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" /> Más popular
              </div>
            )}

            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              {plan.nombre}
            </h2>
            <p className="text-3xl font-bold mb-4">{plan.precio}/mes</p>
            <p className="text-white/70 mb-6">{plan.descripcion}</p>

            <ul className="text-white/90 space-y-2 mb-6 text-sm">
              {plan.beneficios.map((beneficio, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  {beneficio}
                </li>
              ))}
            </ul>

            <Link
              href={plan.link}
              className={`block text-center font-medium rounded-xl py-2 px-4 transition bg-purple-600 hover:bg-purple-700 ${
                plan.destacado ? "text-white" : "bg-purple-700/20 text-purple-300"
              }`}
            >
              Empezar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
