"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Hash, Check, AlertCircle } from "lucide-react";
import { useRegistro } from "./useRegistro";

export default function RegistroForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    nombre,
    setNombre,
    slug,
    setSlug,
    aceptado,
    setAceptado,
    mensaje,
    cargando,
    slugStatus,
    slugMensaje,
    validarSlug,
    handleSubmit,
    botonDeshabilitado,
  } = useRegistro();

  const domains = [
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "icloud.com",
    "aol.com",
    "protonmail.com",
    "yahoo.es",
    "live.com",
    "zoho.com",
  ];

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredDomains, setFilteredDomains] = useState(domains);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const atIndex = value.lastIndexOf("@");
    if (atIndex !== -1) {
      const domainPart = value.substring(atIndex + 1).toLowerCase();
      const filtered = domains.filter((d) =>
        d.toLowerCase().startsWith(domainPart)
      );
      setFilteredDomains(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectDomain = (domain) => {
    const atIndex = email.lastIndexOf("@");
    const localPart = atIndex !== -1 ? email.substring(0, atIndex) : email;
    setEmail(localPart + "@" + domain);
    setShowSuggestions(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md space-y-6 bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl relative z-10"
    >
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-black mb-1 bg-gradient-to-r from-white via-white/90 to-purple-400 bg-clip-text text-transparent">
          Registro de Negocio
        </h1>
        <p className="text-gray-400 text-sm">Crea tu cuenta y agenda en minutos</p>
      </motion.div>
      {/* Input Nombre */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Nombre del negocio"
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </motion.div>
      {/* Input Email */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative"
      >
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          required
        />
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl mt-1 max-h-40 overflow-y-auto"
          >
            {filteredDomains.map((domain, index) => (
              <motion.div
                key={domain}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="p-3 text-white hover:bg-white/20 cursor-pointer rounded-lg transition-colors flex items-center gap-2"
                onClick={() => selectDomain(domain)}
              >
                {domain}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
      {/* Input Password */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative"
      >
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </motion.div>
      {/* Input Slug */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative"
      >
        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="(Slug) Ej: maria-salon"
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          onBlur={validarSlug}
          required
        />
        {slugMensaje && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-1 text-sm flex items-center gap-1 ${
              slugStatus === "ok"
                ? "text-green-400"
                : slugStatus === "error"
                ? "text-red-400"
                : "text-gray-400"
            }`}
          >
            {slugStatus === "ok" && <Check className="w-4 h-4" />}
            {slugStatus === "error" && <AlertCircle className="w-4 h-4" />}
            {slugMensaje}
          </motion.p>
        )}
      </motion.div>
      {/* Checkbox Términos */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex items-center space-x-2 text-sm text-gray-300"
      >
        <input
          type="checkbox"
          checked={aceptado}
          onChange={(e) => setAceptado(e.target.checked)}
          className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          required
        />
        <label>
          Acepto los{" "}
          <a
            href="/terminos"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-purple-400 hover:text-purple-300 transition-colors"
          >
            Términos y Condiciones
          </a>
        </label>
      </motion.div>
      {/* Mensaje */}
      {mensaje && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-sm text-center font-medium flex items-center justify-center gap-2 py-3 px-4 rounded-xl ${
            mensaje.includes("✅") ? "bg-green-600/20 border border-green-500/30 text-green-300" :
            "bg-red-600/20 border border-red-500/30 text-red-300"
          }`}
        >
          {mensaje.includes("✅") ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {mensaje}
        </motion.div>
      )}
      {/* Botón Submit */}
      <motion.button
        type="submit"
        disabled={botonDeshabilitado || cargando}
        whileHover={!cargando ? { scale: 1.02 } : {}}
        whileTap={!cargando ? { scale: 0.98 } : {}}
        className={`w-full py-3 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
          botonDeshabilitado || cargando
            ? "bg-gray-600 cursor-not-allowed text-gray-400"
            : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-green-500/25 text-white"
        }`}
      >
        {cargando ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
            Registrando...
          </>
        ) : (
          <>
            <User className="w-5 h-5" />
            Registrarse
          </>
        )}
      </motion.button>
    </motion.form>
  );
}