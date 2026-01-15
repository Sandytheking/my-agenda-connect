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
    canonical:
      "https://www.agenda-connect.com/agenda-para-peluquerias",
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
  return <PeluqueriasClient />;
}
