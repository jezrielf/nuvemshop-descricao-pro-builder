
import { useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Profile } from '@/types/auth';

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileFetched, setProfileFetched] = useState(false);
  const { toast } = useToast();

  // Memoize fetchProfile to prevent recreating this function on each render
  const fetchProfile = useCallback(async (userId: string) => {
    // Skip if we've already fetched the profile for this session to prevent loops
    if (profileFetched) {
      console.log('Profile already fetched, skipping');
      return;
    }
    
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

      setProfile(data as Profile);
      setProfileFetched(true);
      console.log("Perfil carregado:", data);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    }
  }, [profileFetched]);

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
                setProfileFetched(false);
                setTimeout(() => fetchProfile(authSession.user.id), 0);
              }
            } else if (_event === 'SIGNED_OUT') {
              setSession(null);
              setUser(null);
              setProfile(null);
              setProfileFetched(false);
            }
          }
        );

        // Then check for existing session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        
        if (initialSession?.user && !profileFetched) {
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
        throw new Error(error.message);
      }
      setSession(data.session);
      setUser(data.user);
      setProfileFetched(false);
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
      setProfileFetched(false);
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
    setProfile
  };
};
