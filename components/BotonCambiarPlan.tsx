'use client';
import Link from 'next/link';

export default function BotonCambiarPlan() {
  return (
    <Link
      href="/panel/cambiar-plan"
       className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
    >
      Cambiar plan
    </Link>
  );
}
