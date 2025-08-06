// components/AdvertenciaLimiteCitas.tsx
'use client';

import React from 'react';
import useCitasCount from '@/hooks/useCitasCount';

interface Props {
  slug: string | null;
  plan?: string | null;
}

export default function AdvertenciaLimiteCitas({ slug, plan }: Props) {
  // Llama al hook (no hará fetch si slug es null)
  const { totalCitas, limite, loading } = useCitasCount(slug, { pollInterval: 0 });

  // Si no hay slug o el plan no es free, no mostramos nada
  if (!slug) return null;
  if (!plan) return null;

  const normalizedPlan = plan.toLowerCase();

  // Define límites por plan (override si quieres otra lógica)
  const limitesPorPlan: Record<string, number> = {
    free: limite,    // 10 por defecto del hook
    pro: 100,
    business: Number.POSITIVE_INFINITY,
  };

  const planLimit = limitesPorPlan[normalizedPlan] ?? Number.POSITIVE_INFINITY;

  if (planLimit === Number.POSITIVE_INFINITY) return null;
  if (loading) return null;

  const count = totalCitas ?? 0;

  const nearThreshold = Math.max(0, planLimit - 2); // alerta cuando faltan 2 o menos
  const isNear = count >= nearThreshold && count < planLimit;
  const isAtLimit = count >= planLimit;

  if (!isNear && !isAtLimit) return null;

  return (
    <div className={`p-3 rounded mb-4 ${isAtLimit ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-yellow-100 border border-yellow-400 text-yellow-700'}`}>
      {isAtLimit ? (
        <div>
          <strong>Has alcanzado el límite de {planLimit} citas este mes.</strong>{' '}
          <a href="/panel/cambiar-plan" className="underline ml-2">Actualizar plan</a>
        </div>
      ) : (
        <div>
          <strong>Te estás acercando al límite ({count}/{planLimit})</strong>.{' '}
          <a href="/panel/cambiar-plan" className="underline ml-2">Ver planes</a>
        </div>
      )}
    </div>
  );
}
