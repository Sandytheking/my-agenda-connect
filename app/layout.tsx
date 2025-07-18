// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agenda Connect',
  description: 'Sistema de reservas para negocios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        {/* Agregamos padding-top para dejar espacio al navbar fijo */}
        <main className="pt-20 px-4">{children}</main>
      </body>
    </html>
  );
}
