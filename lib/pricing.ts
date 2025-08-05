//lib/pricing.ts

export const translations = {
  es: {
    titulo: "Elige tu plan",
    descripcion: "Comienza con el que mejor se adapte a tu negocio.",
    empezar: "Empezar",
    masPopular: "Más popular",
    planes: [
      {
        key: "free",
        nombre: "Gratis",
        precio: "$0",
        descripcion: "Ideal para probar el sistema.",
        beneficios: [
          "1 usuario administrador",
          "Hasta 10 citas al mes",
          "Acceso limitado al panel",
        ],
        destacado: false,
      },
      {
        key: "pro",
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
      },
      {
        key: "business",
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
      },
    ],
  },

  en: {
    titulo: "Choose your plan",
    descripcion: "Start with the one that best suits your business.",
    empezar: "Get started",
    masPopular: "Most popular",
    planes: [
      {
        key: "free",
        nombre: "Free",
        precio: "$0",
        descripcion: "Great for trying things out.",
        beneficios: [
          "1 admin user",
          "Up to 10 appointments per month",
          "Limited panel access",
        ],
        destacado: false,
      },
      {
        key: "pro",
        nombre: "Pro",
        precio: "$9.99",
        descripcion: "Perfect for small businesses.",
        beneficios: [
          "Unlimited appointments",
          "Google Calendar sync",
          "Automatic notifications",
          "Full dashboard access",
          "Export to PDF and Excel",
        ],
        destacado: true,
      },
      {
        key: "business",
        nombre: "Business",
        precio: "$19.99",
        descripcion: "For teams or companies.",
        beneficios: [
          "Everything in Pro",
          "Multiple users",
          "Priority support",
          "Access to future features",
        ],
        destacado: false,
      },
    ],
  },
};
