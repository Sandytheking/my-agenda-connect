import type { Metadata } from "next";
import DentistasClient from "./DentistasClient";

export const metadata: Metadata = {
  title:
    "Agenda online para dentistas y clínicas | Sistema de citas | Agenda Connect",
  description:
    "Agenda online para dentistas y clínicas en República Dominicana. Agenda por doctor, confirma pacientes automáticamente y reduce ausencias.",
  keywords: [
    "agenda online para dentistas",
    "software de reservas clínicas",
    "agenda dental digital",
    "sistema de citas para clínicas RD",
  ],
  alternates: {
    canonical: "https://www.agenda-connect.com/agenda-para-dentistas",
  },
  openGraph: {
    title: "Agenda online para dentistas | Agenda Connect",
    description:
      "Optimiza la agenda de tu clínica con reservas online, recordatorios y control por doctor.",
    url: "https://www.agenda-connect.com/agenda-para-dentistas",
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
              "Agenda online para dentistas y clínicas en República Dominicana. Agenda por doctor, confirmación automática y recordatorios.",
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
              audienceType: "Dentistas y clínicas",
            },
            url: "https://www.agenda-connect.com/agenda-para-dentistas",
          }),
        }}
      />

      <DentistasClient />
    </>
  );
}
