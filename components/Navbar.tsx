"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#0C1A1A] text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-3 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/logo2.png" alt="Logo" width={40} height={40} />
          <div className="rounded-full mr-3">
          <span className="text-xl font-bold">Agenda Connect</span>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-400">Inicio</Link>
          <Link href="/registro" className="hover:text-blue-400">Registro</Link>
          <Link href="/login" className="hover:text-blue-400">Login</Link>
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
        <div className="md:hidden px-6 pb-4 space-y-2 bg-[#0C1A1A]">
          <Link href="/" className="block hover:text-blue-400">Inicio</Link>
          <Link href="/registro" className="block hover:text-blue-400">Registro</Link>
          <Link href="/login" className="block hover:text-blue-400">Login</Link>
          <Link href="/terminos" className="block hover:text-blue-400">Términos</Link>
          <Link href="/privacidad" className="block hover:text-blue-400">Privacidad</Link>
        </div>
      )}
    </header>
  );

