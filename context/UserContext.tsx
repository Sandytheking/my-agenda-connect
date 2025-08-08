'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/singleton';

const UserContext = createContext({
  user: null,
  loading: true,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;

    if (session?.user) {
      console.log('📡 Sesión activa en Supabase:', session);

      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      console.log('📋 Resultado de buscar en clients:', { data, error });

      if (error || !data) {
        console.error('❌ Error al obtener cliente o no se encontró:', error);
        setUser(null);
      } else {
        setUser({
          id: session.user.id, // aseguramos que siempre esté presente
          email: session.user.email,
          slug: data.slug || '',
          plan: data.plan || '',
          ...data,
        });
      }
    } else {
      console.log('🔍 No hay sesión en Supabase, buscando token en sessionStorage...');
      const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;

      if (token) {
        try {
          const res = await fetch('https://api.agenda-connect.com/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUser({
              id: data.user?.id || data.user?.user_id || '',
              email: data.user?.email || '',
              slug: data.user?.slug || '',
              plan: data.user?.plan || '',
              ...data.user,
            });
          } else {
            console.warn('⚠️ Token inválido al recuperar usuario desde backend.');
            sessionStorage.clear();
            setUser(null);
          }
        } catch (error) {
          console.error('❌ Error al rehidratar desde backend:', error);
          setUser(null);
        }
      } else {
        console.log('🚫 No hay token en sessionStorage.');
        setUser(null);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('🔄 Cambio en la sesión:', session);
      if (session) {
        fetchUserData();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
