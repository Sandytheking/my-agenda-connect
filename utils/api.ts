// utils/api.ts
'use client';

// ✅ Reemplaza createClientComponentClient con tu singleton (fixea el error de deprecación)
import { supabase as supabaseSingleton } from './supabase/singleton';

// Usa el singleton para todas las operaciones de Supabase
const supabase = supabaseSingleton;

// **BASE_API**: usa la env inyectada en build, si no existe usa el dominio público
const BASE_API = (process.env.NEXT_PUBLIC_API_URL as string) || 'https://api.agenda-connect.com';
console.log('CLIENT BASE_API =', BASE_API); // temporal: borra esto cuando confirmes que funciona

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