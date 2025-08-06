// hooks/useCitasCount.ts
import { useEffect, useState, useCallback, useRef } from 'react';

type CountResult = {
  totalCitas: number | null;
  limite: number;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
};

/**
 * useCitasCount
 * @param slug slug del negocio (string | null)
 * @param opts.pollInterval ms para re-poll (opcional)
 */
export default function useCitasCount(slug: string | null, opts?: { pollInterval?: number }): CountResult {
  const [totalCitas, setTotalCitas] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const limite = 10; // Límite para plan "free". Si quieres dinamizarlo, cámbialo.
  const pollRef = useRef<number | null>(null);

  const BASE = (process.env.NEXT_PUBLIC_API_URL as string) || ''; // si está vacío, usamos ruta relativa

  const fetchCount = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    try {
      const url = BASE
        ? `${BASE.replace(/\/$/, '')}/api/appointments/count?slug=${encodeURIComponent(slug)}`
        : `/api/appointments/count?slug=${encodeURIComponent(slug)}`;

      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Error al obtener conteo (${res.status})`);
      }
      const data = await res.json();
      setTotalCitas(typeof data.totalThisMonth === 'number' ? data.totalThisMonth : Number(data.totalThisMonth || 0));
    } catch (err: any) {
      console.error('useCitasCount fetch error:', err);
      setError(err);
      setTotalCitas(null);
    } finally {
      setLoading(false);
    }
  }, [slug, BASE]);

  useEffect(() => {
    if (!slug) return;

    fetchCount();

    if (opts?.pollInterval && opts.pollInterval > 0) {
      pollRef.current = window.setInterval(fetchCount, opts.pollInterval);
      return () => {
        if (pollRef.current) window.clearInterval(pollRef.current);
      };
    }

    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [slug, fetchCount, opts?.pollInterval]);

  const refresh = useCallback(() => {
    fetchCount();
  }, [fetchCount]);

  return { totalCitas, limite, loading, error, refresh };
}
