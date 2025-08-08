// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SupabaseProvider from '@/components/SupabaseProvider';
import { LanguageProvider } from '@/context/LanguageContext';


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
    <html lang="es" className="dark">
      <body className={inter.className}>
        <LanguageProvider>
          <SupabaseProvider>
            <Navbar />
            <main className="pt-20 px-4">{children}</main>
          </SupabaseProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
