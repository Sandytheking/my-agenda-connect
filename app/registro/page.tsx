// app/registro/page.tsx
'use client';

import { Suspense } from 'react';
import RegistroForm from './RegistroForm';

export default function RegistroPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RegistroForm />
    </Suspense>
  );
}
