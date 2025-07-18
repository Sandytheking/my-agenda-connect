import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; // este sí es cliente

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agenda Connect",
  description: "Sistema de reservas para negocios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar /> {/* navbar cliente */}
        {children}
      </body>
    </html>
  );
}
