// app/superadmin/login.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SuperAdminLogin() {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    // Puedes cambiar estos valores por los tuyos
    if (email === 'admin@agenda.com' && clave === '1234supersegura') {
      sessionStorage.setItem('superadmin', 'true');
      router.push('/superadmin');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center p-4">
      <form onSubmit={login} className="bg-gray-900 p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">🔐 Acceso Super Admin</h1>
        {error && <p className="text-red-400 mb-3">{error}</p>}
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          placeholder="Clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-800 p-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
