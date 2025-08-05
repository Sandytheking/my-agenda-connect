'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from './supabase/singleton';

// ✅ Cliente de Supabase para componentes cliente
const supabase = createClientComponentClient();

export async function getPlanActual() {
  const supabase = createBrowserSupabaseClient();

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
  const token = sessionStorage.getItem("accessToken");
  const slug = sessionStorage.getItem("slug");

  if (!token || !slug) throw new Error("Token o slug faltante");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ slug, nuevoPlan }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error actualizando el plan");
  }

  return data;
}
