// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SupabaseProvider from '@/components/SupabaseProvider';
import { LanguageProvider } from '@/context/LanguageContext';
import Footer from '@/components/Footer'; // 👈 Importa el footer
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agenda Connect',
  description: 'Sistema de gestión de citas para negocios',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        {/* 👇 Enlace a los íconos Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>

      <body className={inter.className}>
        <LanguageProvider>
          <SupabaseProvider>
            <Navbar />
            <main className="pt-20 px-4">{children}</main>
            <Footer /> {/* 👈 Aquí agregas el Footer */}
            <WhatsAppButton />
          </SupabaseProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
