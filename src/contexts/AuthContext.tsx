import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Profile } from '@/types/auth';
import { AuthContextProps } from '@/types/authContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [subscriptionTier, setSubscriptionTier] = useState<string>('free');
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => fetchProfile(session.user.id), 0);
          // Load description count from localStorage for this user
          const storedCount = localStorage.getItem(`descriptionCount_${session.user.id}`);
          if (storedCount) {
            setDescriptionCount(parseInt(storedCount, 10));
          }
        } else {
          setProfile(null);
          // For anonymous users, use a generic key
          const storedCount = localStorage.getItem('descriptionCount_anonymous');
          if (storedCount) {
            setDescriptionCount(parseInt(storedCount, 10));
          }
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
        // Load description count for logged in user
        const storedCount = localStorage.getItem(`descriptionCount_${session.user.id}`);
        if (storedCount) {
          setDescriptionCount(parseInt(storedCount, 10));
        }
      } else {
        // Load description count for anonymous user
        const storedCount = localStorage.getItem('descriptionCount_anonymous');
        if (storedCount) {
          setDescriptionCount(parseInt(storedCount, 10));
        }
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const fetchProfile = async (userId: string) => {
    try {
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
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    }
  };

  const hasRole = (role: string) => {
    return profile?.role === role;
  };

  const isAdmin = useCallback(() => {
    return profile?.role === 'admin';
  }, [profile?.role]);

  const isPremium = useCallback(() => {
    return subscriptionTier?.toLowerCase() === 'premium';
  }, [subscriptionTier]);

  const isBusiness = useCallback(() => {
    return subscriptionTier?.toLowerCase() === 'empresarial';
  }, [subscriptionTier]);

  const isSubscribed = useCallback(() => {
    return subscriptionTier && subscriptionTier.toLowerCase() !== 'free';
  }, [subscriptionTier]);

  const refreshSubscription = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) {
        throw new Error(error.message);
      }
      setSubscriptionTier(data.subscription_tier);
      setSubscriptionEnd(data.subscription_end);
    } catch (error: any) {
      console.error('Error refreshing subscription:', error);
      toast({
        title: 'Erro ao verificar assinatura',
        description: error.message,
        variant: 'destructive',
      });
      // Optionally, set a default subscription tier in case of error
      setSubscriptionTier('free');
      setSubscriptionEnd(null);
    }
  }, [toast]);

  const openCustomerPortal = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) {
        throw new Error(error.message);
      }
      window.location.href = data.url;
    } catch (error: any) {
      toast({
        title: 'Erro ao abrir portal do cliente',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const incrementDescriptionCount = () => {
    const newCount = descriptionCount + 1;
    setDescriptionCount(newCount);
    if (user) {
      localStorage.setItem(`descriptionCount_${user.id}`, newCount.toString());
    } else {
      localStorage.setItem('descriptionCount_anonymous', newCount.toString());
    }
  };

  const canCreateMoreDescriptions = useCallback(() => {
    if (isSubscribed()) {
      return true;
    }
    return descriptionCount < 3;
  }, [descriptionCount, isSubscribed]);

  useEffect(() => {
    if (user) {
      refreshSubscription();
    }
  }, [user, refreshSubscription]);

  const value = {
    session,
    user,
    profile,
    signIn,
    signUp,
    signOut,
    loading,
    hasRole,
    isAdmin,
    isPremium,
    isBusiness,
    isSubscribed,
    subscriptionTier,
    subscriptionEnd,
    refreshSubscription,
    openCustomerPortal,
    descriptionCount,
    incrementDescriptionCount,
    canCreateMoreDescriptions
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
