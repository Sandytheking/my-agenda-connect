import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agenda Connect",
  description: "Gestión de citas sincronizada con Google Calendar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#0C1A1A] text-white`}>
        <Navbar />
        <main className="pt-24 px-4">{children}</main>
      </body>
    </html>
  );
}
