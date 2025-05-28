
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Profile } from '@/types/auth';

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const profileFetchedRef = useRef<boolean>(false);
  const { toast } = useToast();

  // Memoize fetchProfile to prevent recreating this function on each render
  const fetchProfile = useCallback(async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erro ao buscar perfil:', error);
        return;
      }

      console.log("Perfil carregado:", data);
      setProfile(data as Profile);
      profileFetchedRef.current = true;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    }
  }, []);
  
  const refreshProfile = useCallback(async () => {
    if (user) {
      console.log("Atualizando perfil do usuário...");
      profileFetchedRef.current = false;
      return fetchProfile(user.id);
    }
    return Promise.resolve();
  }, [user, fetchProfile]);

  useEffect(() => {
    // Reset profileFetchedRef when component unmounts
    return () => {
      profileFetchedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const setupAuth = async () => {
      try {
        // First, set up the auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, authSession) => {
            console.log('Auth state changed:', _event);
            if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') {
              setSession(authSession);
              setUser(authSession?.user ?? null);
              
              // Reset profileFetched when auth state changes
              if (authSession?.user) {
                profileFetchedRef.current = false;
                // Use setTimeout to prevent blocking the auth state change handler
                setTimeout(() => fetchProfile(authSession.user.id), 0);
              }
            } else if (_event === 'SIGNED_OUT') {
              setSession(null);
              setUser(null);
              setProfile(null);
              profileFetchedRef.current = false;
            }
          }
        );

        // Then check for existing session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        
        if (initialSession?.user && !profileFetchedRef.current) {
          await fetchProfile(initialSession.user.id);
        }
        
        setLoading(false);
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error setting up auth:', error);
        setLoading(false);
      }
    };
    
    setupAuth();
  }, [fetchProfile]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // Verificar se é erro de conta não confirmada
        if (error.message?.includes('email_not_confirmed') || 
            error.message?.includes('Email not confirmed') ||
            error.message?.includes('not confirmed')) {
          throw new Error('Você precisa ativar sua conta através do e-mail enviado. Verifique sua caixa de entrada e spam.');
        }
        throw new Error(error.message);
      }
      setSession(data.session);
      setUser(data.user);
      profileFetchedRef.current = false;
      await fetchProfile(data.user.id);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a) de volta!`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao realizar login",
        description: error.message,
      });
      throw error; // Re-throw para que o componente possa tratar
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, nome: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome,
          },
        },
      });
      if (error) {
        throw new Error(error.message);
      }
      setSession(data.session);
      setUser(data.user);
      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Bem-vindo(a), ${nome}!`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao realizar cadastro",
        description: error.message,
      });
      throw error; // Re-throw para que o componente possa tratar
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setProfile(null);
      profileFetchedRef.current = false;
      toast({
        title: "Logout realizado com sucesso!",
        description: "Você foi desconectado(a) com segurança.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao realizar logout",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    fetchProfile,
    refreshProfile,
    setProfile
  };
};
