'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// Si necesitas usar el singleton para otros fines, puedes renombrarlo:
import { supabase as supabaseSingleton } from './supabase/singleton';

// ✅ Cliente de Supabase para componentes cliente
const supabase = createClientComponentClient();

export async function getPlanActual() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error('No hay sesión activa');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-plan`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (!res.ok) throw new Error('No se pudo obtener el plan');

  return await res.json(); // { plan: 'pro' }
}

export async function updatePlanCliente(nuevoPlan: string) {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null;
  const slug = typeof window !== "undefined" ? sessionStorage.getItem("slug") : null;

  
  if (!token || !slug) throw new Error("Token o slug faltante");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
    body: JSON.stringify({ slug, nuevoPlan }),
  }).finally(() => clearTimeout(timeout));

  console.log('updatePlanCliente -> fetch status:', res.status, res.statusText);

  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (!res.ok) throw new Error(data.error || 'Error actualizando');
    return data;
  } catch (err) {
    console.error('updatePlanCliente -> response raw:', text);
    throw new Error('Respuesta inválida del servidor al actualizar plan');
  }
}
