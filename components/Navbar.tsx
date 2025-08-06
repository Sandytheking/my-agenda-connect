'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { navbarText } from '@/lib/translation/navbarText';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useLanguage(); // ← idioma actual
  const t = navbarText[language];    // ← traducciones actuales


  return (
    <header className="bg-[#4c2882] text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-3 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 ml-2"> {/* ← más a la izquierda */}
          <div className="rounded-full overflow-hidden w-10 h-10"> {/* ← círculo */}
            <Image
              src="/logo2.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="text-xl font-bold">Agenda Connect</span>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-400">Inicio</Link>
          <Link href="/precios" className="hover:text-blue-400">Registro</Link>
          <Link href="/login" className="hover:text-blue-400">Login</Link>
          <Link href="/precios" className="hover:text-blue-400">Planes</Link>
          <Link href="/guia" className="hover:text-blue-400">Guia</Link>
          <Link href="/terminos" className="hover:text-blue-400">Términos</Link>
          <Link href="/privacidad" className="hover:text-blue-400">Privacidad</Link>
        
          
        </nav>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
  <div className="md:hidden px-6 pb-4 space-y-2 bg-[#000000]">
    <Link href="/" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Inicio</Link>
    <Link href="/precios" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Registro</Link>
    <Link href="/login" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Login</Link>
    <Link href="/precios" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Planes</Link>
    <Link href="/guia" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Guia</Link>
    <Link href="/terminos" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Términos</Link>
    <Link href="/privacidad" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Privacidad</Link>
  

  </div>
)}

    </header>
  );
}

<Link href="/panel/cambiar-plan" className="text-sm text-blue-400 hover:underline">
  Cambiar plan
</Link>
