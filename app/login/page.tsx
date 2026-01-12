"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react"; // Íconos para consistencia

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  // Lógica sin cambios
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const slug = sessionStorage.getItem("slug");
    if (token && slug) {
      router.replace("/agenda");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMensaje("⚠️ Email y contraseña obligatorios.");
      return;
    }
    setCargando(true);
    setMensaje("Verificando...");
    try {
      const res = await fetch("https://api.agenda-connect.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMensaje("❌ " + (data?.error || "Credenciales inválidas."));
        return;
      }
      const token =
        data?.token ||
        data?.access_token ||
        data?.session?.access_token ||
        data?.session?.accessToken;
      const slug = data?.slug || data?.config?.slug || data?.user?.slug;
      if (!token) {
        setMensaje("❌ Login exitoso pero no se recibió token.");
        return;
      }
      sessionStorage.setItem("accessToken", token);
      if (slug) sessionStorage.setItem("slug", slug);
      setMensaje("✅ Bienvenido. Redirigiendo...");
      setTimeout(() => router.push("/agenda"), 700);
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050507] via-[#0a0a0f] to-[#050507] px-2 sm:px-4 text-white relative overflow-hidden">
      {/* Glow effects para consistencia */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/10 blur-[150px] top-20 left-0 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[120px] bottom-40 right-0 animate-pulse delay-1000" />
      </div>

      <motion.form
        onSubmit={handleLogin}
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
          className="text-center"
        >
          <h1 className="text-2xl sm:text-3xl font-black mb-2 bg-gradient-to-r from-white via-white/90 to-purple-400 bg-clip-text text-transparent">
            Iniciar Sesión
          </h1>
          <p className="text-gray-400 text-sm">Accede a tu panel de agenda</p>
        </motion.div>

        {/* Input Email */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Correo electrónico"
          />
        </motion.div>

        {/* Input Password */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
            aria-label="Contraseña"
          />
        </motion.div>

        {/* Mensaje */}
        {mensaje && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-sm text-center font-medium flex items-center justify-center gap-2 py-3 px-4 rounded-xl ${
              mensaje.includes("✅") ? "bg-green-600/20 border border-green-500/30 text-green-300" :
              mensaje.includes("❌") || mensaje.includes("⚠️") ? "bg-red-600/20 border border-red-500/30 text-red-300" :
              "bg-yellow-600/20 border border-yellow-500/30 text-yellow-300"
            }`}
          >
            {mensaje.includes("❌") && <AlertCircle className="w-4 h-4" />}
            {mensaje}
          </motion.div>
        )}

        {/* Botón Submit */}
        <motion.button
          type="submit"
          disabled={cargando}
          whileHover={!cargando ? { scale: 1.02 } : {}}
          whileTap={!cargando ? { scale: 0.98 } : {}}
          className={`w-full py-3 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
            cargando
              ? "bg-gray-600 cursor-not-allowed text-gray-400"
              : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-green-500/25 text-white"
          }`}
        >
          {cargando ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              Ingresando...
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              Iniciar Sesión
            </>
          )}
        </motion.button>

        {/* Enlace Olvidé contraseña */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="/olvide-contrasena"
            className="text-sm text-purple-400 hover:text-purple-300 underline transition-colors inline-flex items-center gap-1"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </motion.div>
      </motion.form>
    </div>
  );
}