"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="https://wa.me/8497851259?text=Hola!%20Estoy%20interesado%20en%20Agenda%20Connect%20y%20quiero%20más%20información."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg shadow-green-500/40 transition-transform hover:scale-110"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
      </Link>
    </motion.div>
  );
}
