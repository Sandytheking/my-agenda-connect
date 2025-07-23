// 📁 /pages/restablecer-password/[token].tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function RestablecerPasswordPage() {
  const router = useRouter();
  const router = useRouter();
  const { token } = router.query;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [tokenValido, setTokenValido] = useState(false);

useEffect(() => {
  if (token) {
    fetch(`https://api.agenda-connect.com/api/validar-reset/${token}`)
      .then(res => res.json())
      .then(data => setTokenValido(data.valid))
      .catch(() => setTokenValido(false));
  }
}, [token]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    // 👇 Asegúrate de que `token` es un string
  if (!token || typeof token !== 'string') {
    setMensaje('Token inválido');
    return;
  }

    if (newPassword !== confirmPassword) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    setCargando(true);
    try {
      const res = await fetch('https://api.agenda-connect.com/api/restablecer-contrasena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, nuevaContrasena: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Contraseña restablecida. Ahora puedes iniciar sesión.');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setMensaje(data.error || 'Error al restablecer la contraseña');
      }
    } catch (err) {
      setMensaje('Error de red al intentar restablecer la contraseña');
    } finally {
      setCargando(false);
    }
  };

  if (!tokenValido) return <div className="text-white p-6">Token no válido o faltante</div>;

  return (
    <div className="min-h-screen bg-[#0C1A1A] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#112525] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Restablecer contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="w-full p-2 rounded bg-[#1A2E2E] text-white"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="w-full p-2 rounded bg-[#1A2E2E] text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            disabled={cargando}
          >
            {cargando ? 'Restableciendo...' : 'Guardar nueva contraseña'}
          </button>
        </form>
        {mensaje && <p className="mt-4 text-sm text-white text-center">{mensaje}</p>}
      </div>
    </div>
  );
}
