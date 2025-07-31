//components/PanelBotones.tsx
import React from "react";
import { useRouter } from "next/navigation";

const PanelBotones = ({ plan }: { plan: string }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row gap-2 mt-6">
      {/* Botón para ir a Analíticas - solo disponible en business */}
      {plan === "business" && (
        <button
          onClick={() => router.push("/panel/analiticas")}
          className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
        >
          Ver Analíticas
        </button>
      )}

      {/* Botón para ir a Configuración Avanzada (todos los planes) */}
      <button
        onClick={() => router.push("/admin-avanzado")}
        className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900"
      >
        Configuración Avanzada
      </button>
    </div>
  );
};

export default PanelBotones;
