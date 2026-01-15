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
    canonical:
      "https://www.agenda-connect.com/agenda-para-dentistas",
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
  return <DentistasClient />;
}
