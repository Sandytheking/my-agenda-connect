// 📁olvide-contrasena.tsx
import { useState } from "react";

export default function OlvideContrasena() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://api.agenda-connect.com/api/olvide-contrasena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setEnviado(true);
      } else {
        setError(data.error || "Error al enviar el correo");
      }
    } catch (err) {
      setError("Error del servidor");
    }
  };

  return (
    <div className="min-h-screen bg-[#0C1A1A] flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-white text-black p-6 rounded-2xl shadow-lg">
        {enviado ? (
          <p className="text-center text-green-600">📧 Si el correo está registrado, se ha enviado un enlace para restablecer la contraseña.</p>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">¿Olvidaste tu contraseña?</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Tu correo registrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded mb-4"
              />
              <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                Enviar enlace
              </button>
              {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
