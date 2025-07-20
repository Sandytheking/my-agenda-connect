'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginSuperadmin() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('https://api.agenda-connect.com/api/superadmin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password }),
    });

    const json = await res.json();

    if (res.ok) {
      sessionStorage.setItem('superadmin_token', json.token);
      router.push('/superadmin');
    } else {
      setError(json.error || 'Error desconocido');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C1A1A] text-white px-6">
      <div className="w-full max-w-md bg-[#1a2b2b] p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">🔐 Superadmin Login</h1>

        <div className="mb-4">
          <label className="block text-sm mb-1">Usuario</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-white font-semibold"
        >
          Iniciar sesión
        </button>

        {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
