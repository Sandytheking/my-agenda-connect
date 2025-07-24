// 📁 restablecer-password

'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function RestablecerPasswordPage() {
  const { token } = useParams(); // Obtienes el token desde la URL
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [tokenValido, setTokenValido]= useState(false);

  useEffect(() => {
    if (token) {
      fetch(`https://api.agenda-connect.com/api/validar-reset/${token}`)
        .then(res => res.json())
        .then(data => setTokenValido(data.valid))
        .catch(() => setTokenValido(false));
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setMensaje('✅ Contraseña restablecida. Redirigiendo...');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setMensaje(data.error || 'Error al restablecer la contraseña');
      }
    } catch {
      setMensaje('Error de red al intentar restablecer la contraseña');
    } finally {
      setCargando(false);
    }
  };

  if (!tokenValido) {
    return <div className="text-white p-6">Token no válido o expirado.</div>;
  }

  return (
    <div className="min-h-screen bg-[#0C1A1A] flex items-center justify-center px-4">
      {/* ... */}
    </div>
  );
}
