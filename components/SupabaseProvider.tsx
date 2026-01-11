// components/SupabaseProvider.tsx
"use client";

import React, { useState, useEffect, createContext, useContext } from 'react'; // ← Fix: Import React explícitamente
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase/singleton'; // Tu singleton (ajusta ruta si es necesario)
import { LanguageProvider } from "@/context/LanguageContext";
import { UserProvider } from "@/context/UserContext";

interface SupabaseContextType {
  supabase: typeof supabase;
  session: Session | null;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Obtén la sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Escucha cambios de auth (reemplaza SessionContextProvider)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      <LanguageProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </LanguageProvider>
    </SupabaseContext.Provider>
  );
}

// Hook para usar en componentes (reemplaza useSession de la vieja lib)
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};