import type { Metadata } from "next";
import PeluqueriasClient from "./PeluqueriasClient";

export const metadata: Metadata = {
  title:
    "Agenda online para peluquerías | Sistema de reservas | Agenda Connect",
  description:
    "Agenda online para peluquerías en República Dominicana. Permite que tus clientes reserven 24/7, reduce ausencias y automatiza recordatorios con Agenda Connect.",
  keywords: [
    "agenda online para peluquerías",
    "software de reservas peluquerías",
    "agenda digital para salones",
    "sistema de citas peluquería RD",
  ],
  alternates: {
    canonical: "https://www.agenda-connect.com/agenda-para-peluquerias",
  },
  openGraph: {
    title: "Agenda online para peluquerías | Agenda Connect",
    description:
      "Automatiza la agenda de tu peluquería con reservas online y recordatorios automáticos.",
    url: "https://www.agenda-connect.com/agenda-para-peluquerias",
    siteName: "Agenda Connect",
    locale: "es_DO",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Agenda Connect",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Agenda online para peluquerías en República Dominicana con reservas 24/7 y recordatorios automáticos.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "DOP",
            },
            areaServed: {
              "@type": "Country",
              name: "República Dominicana",
            },
            audience: {
              "@type": "Audience",
              audienceType: "Peluquerías",
            },
            url: "https://www.agenda-connect.com/agenda-para-peluquerias",
          }),
        }}
      />

      <PeluqueriasClient />
    </>
  );
}
