// app/registro/page.tsx
'use client';

import { Suspense } from 'react';
import RegistroForm from "./RegistroForm";

export default function RegistroPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center pt-28 px-4">
  <div className="max-w-md w-full bg-black text-white p-8 rounded-2xl shadow-lg">
        <Suspense fallback={<div>Cargando...</div>}>
          <RegistroForm />
        </Suspense>
      </div>
    </div>
  );
}