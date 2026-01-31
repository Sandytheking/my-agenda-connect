// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SupabaseProvider from '@/components/SupabaseProvider';
import { LanguageProvider } from '@/context/LanguageContext';
import Footer from '@/components/Footer'; // 👈 Importa el footer
import WhatsAppButton from '@/components/WhatsAppButton';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script'; // 👈 Importante Google anality

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.agenda-connect.com'),

  title: 'Sistema de Reservas Online para Negocios | Agenda Connect',
  description:
    'Agenda Connect es un sistema de reservas online para negocios de servicios. Automatiza citas, recordatorios y sincroniza con Google Calendar.',

  icons: {
    icon: '/favicon.png',
  },

  openGraph: {
    title: 'Sistema de Reservas Online para Negocios | Agenda Connect',
    description:
      'Automatiza citas, reduce ausencias y permite reservas online 24/7 con Agenda Connect.',
    url: 'https://www.agenda-connect.com',
    siteName: 'Agenda Connect',
    locale: 'es_DO',
    type: 'website',
    images: [
      {
        url: '/og-home.jpg', // esta irá en /public
        width: 1200,
        height: 630,
        alt: 'Sistema de reservas online Agenda Connect',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Sistema de Reservas Online para Negocios | Agenda Connect',
    description:
      'Reservas online 24/7, recordatorios automáticos y agenda profesional para tu negocio.',
    images: ['/og-home.jpg'],
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

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M4F715H5QP"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M4F715H5QP');
          `}
        </Script>
        
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
        <SpeedInsights />
      </body>
    </html>
  );
}
