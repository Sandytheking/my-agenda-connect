'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/singleton';
import { useSupabase } from '@/components/SupabaseProvider';

export type User = {
  id: string;
  email: string;
  slug: string;
  plan: string;
  [key: string]: any;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { session } = useSupabase(); // 🔑 sesión única
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      // 🚫 No hay sesión → no hay usuario
      if (!session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      // 🔎 Buscar perfil extendido
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error || !data) {
        console.error('❌ Error cargando perfil del cliente:', error);
        setUser(null);
      } else {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          ...data,
        });
      }

      setLoading(false);
    };

    loadUser();
  }, [session]);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
