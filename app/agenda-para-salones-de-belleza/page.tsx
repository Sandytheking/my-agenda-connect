import type { Metadata } from "next";
import SalonesClient from "./SalonesClient";

export const metadata: Metadata = {
  title:
    "Agenda online para salones de belleza | Software de reservas | Agenda Connect",
  description:
    "Agenda online para salones de belleza en República Dominicana. Gestiona servicios, profesionales y reservas 24/7 con Agenda Connect.",
  keywords: [
    "agenda online para salones de belleza",
    "software de reservas salón de belleza",
    "agenda digital estética",
    "sistema de citas belleza RD",
  ],
  alternates: {
    canonical: "https://www.agenda-connect.com/agenda-para-salones-de-belleza",
  },
  openGraph: {
    title: "Agenda online para salones de belleza | Agenda Connect",
    description:
      "Automatiza las reservas de tu salón con agenda digital, recordatorios y control por profesional.",
    url: "https://www.agenda-connect.com/agenda-para-salones-de-belleza",
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
              "Software de reservas para salones de belleza en República Dominicana. Gestiona servicios, profesionales y citas en una sola agenda digital.",
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
              audienceType: "Salones de belleza",
            },
            url: "https://www.agenda-connect.com/agenda-para-salones-de-belleza",
          }),
        }}
      />

      <SalonesClient />
    </>
  );
}
