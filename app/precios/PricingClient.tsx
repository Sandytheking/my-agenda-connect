// app/precios/PricingClient.tsx
"use client";

import { CheckCircle, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/pricing";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";


const planes = [
  {
    key: "free",
    nombre: "Gratis",
    precio: "$0",
    descripcion: "Ideal para probar el sistema.",
    beneficios: [
      "1 usuario administrador",
      "Hasta 20 citas al mes",
      "Acceso limitado al panel",
    ],
    destacado: false,
  },
  {
    key: "pro",
    nombre: "Pro",
    precio: "$0.00",
    descripcion: "Perfecto para negocios pequeños.",
    beneficios: [
      "Sin límite de citas",
      "Sincronización con Google Calendar",
      "Notificaciones automáticas",
      "Panel completo",
      "Exportar a PDF y Excel",
    ],
    destacado: true,
  },
  {
    key: "business",
    nombre: "Negocio",
    precio: "$0.00",
    descripcion: "Para equipos o empresas.",
    beneficios: [
      "Todo en el plan Pro",
      "Acceso al panel de analiticas",
      "Soporte prioritario",
      "Acceso a funciones futuras",
    ],
    destacado: false,
  },
];

export default function PricingClient() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const planesTraducidos = t.planes;

  const searchParams = useSearchParams();
  const planFromUrl = searchParams.get("plan");
  const validPlanKeys = planes.map((p) => p.key);
  const [selectedPlan, setSelectedPlan] = useState(
    validPlanKeys.includes(planFromUrl || "") ? planFromUrl : "free"
  );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-purple-400">
              {t.titulo}
            </h1>
            <p className="text-white/80 text-lg mt-2">{t.descripcion}</p>
          </div>

          <button
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-purple-600 text-sm font-medium"
          >
            {language === "es" ? "English" : "Español"}
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {planesTraducidos.map((plan, i) => (
            <div
              key={i}
              className={`rounded-3xl border border-white/10 p-8 relative shadow-lg transition-transform duration-300 hover:-translate-y-1 ${
                i === 1
                  ? "bg-purple-800/20 border-purple-500/30 scale-105"
                  : "bg-white/5"
              }`}
            >
              {i === 1 && (
                <div className="absolute top-4 right-4 text-xs px-3 py-1 bg-purple-500 text-white rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> {t.masPopular}
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
                href={`/registro?plan=${plan.key}`}
                className={`block text-center font-medium rounded-xl py-2 px-4 transition bg-purple-600 hover:bg-purple-700 ${
                  i === 1
                    ? "text-white"
                    : "bg-purple-700/20 text-purple-300"
                }`}
              >
                {t.empezar}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
