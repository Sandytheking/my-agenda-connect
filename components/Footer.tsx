import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0C0C0C] text-gray-300 py-12 px-6 md:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">

        {/* 🟣 Columna 1 - Logo y descripción */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/logo.png"
            alt="Agenda Connect Logo"
            width={120}
            height={120}
            className="mb-4"
          />
          <p className="text-sm text-gray-400 max-w-sm text-center md:text-left">
            Agenda Connect es un sistema inteligente de gestión de citas que
            ayuda a negocios locales a optimizar su tiempo y ofrecer una
            experiencia moderna a sus clientes.
          </p>
        </div>

        {/* ⚪ Columna 2 - Enlaces rápidos */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h3 className="text-white font-semibold text-lg mb-2">Enlaces</h3>
          <Link href="/" className="hover:text-[#A020F0] transition">Inicio</Link>
          <Link href="/blog" className="hover:text-[#A020F0] transition">Blog</Link>
          <Link href="/agenda-para-peluquerias" className="hover:text-[#A020F0] transition">Agenda para barberias</Link>
          <Link href="/agenda-para-dentistas" className="hover:text-[#A020F0] transition">Agenda para dentistas</Link>
          <Link href="/agenda-para-salones-de-belleza" className="hover:text-[#A020F0] transition">Agenda para salones de belleza</Link>
          <Link href="/para-quien-es" className="hover:text-[#A020F0] transition">¿Para quién es Agenda Connect?</Link>
          <Link href="/software-de-reservas-republica-dominicana" className="hover:text-[#A020F0] transition">Software de reservas en República Dominicana</Link>
          
        </div>

        {/* ⚫ Columna 3 - Redes sociales */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-white font-semibold text-lg mb-2">Síguenos</h3>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/agenda_connect"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A020F0] transition"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61579874750346"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A020F0] transition"
            >
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a
              href="https://wa.me/8497851259"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A020F0] transition"
            >
              <i className="fab fa-whatsapp text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-semibold">Agenda Connect</span> — Todos los derechos reservados.
      </div>
    </footer>
  );
}
