import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Profile } from '@/types/auth';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, nome: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  hasRole: (role: string) => boolean;
  isAdmin: () => boolean;
  isPremium: () => boolean;
  descriptionCount: number;
  incrementDescriptionCount: () => void;
  canCreateMoreDescriptions: () => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Configura o listener de mudança de estado de autenticação
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

    // Verifica se já existe uma sessão
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

  const fetchProfile = async (userId: string) => {
    try {
      // Using explicit type assertion to resolve the TypeScript error
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

  // Função para verificar se o usuário possui determinada role
  const hasRole = (role: string): boolean => {
    if (!profile) return false;
    return profile.role === role;
  };

  // Função para verificar se o usuário é admin
  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  // Função para verificar se o usuário é premium
  const isPremium = (): boolean => {
    if (isAdmin()) return true; // Admins are always premium
    return hasRole('premium');
  };

  // Função para incrementar o contador de descrições criadas
  const incrementDescriptionCount = () => {
    const newCount = descriptionCount + 1;
    setDescriptionCount(newCount);
    
    // Save to localStorage
    if (user) {
      localStorage.setItem(`descriptionCount_${user.id}`, newCount.toString());
    } else {
      localStorage.setItem('descriptionCount_anonymous', newCount.toString());
    }
  };

  // Função para verificar se o usuário pode criar mais descrições
  const canCreateMoreDescriptions = () => {
    if (isPremium()) return true; // Premium users have unlimited descriptions
    return descriptionCount < 3; // Free users can create up to 3 descriptions
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Login realizado com sucesso!',
        description: `Bem-vindo de volta!`,
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer login',
        description: error.message || 'Por favor, verifique suas credenciais',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, nome: string) => {
    try {
      setLoading(true);
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
        throw error;
      }

      toast({
        title: 'Registro realizado com sucesso!',
        description: 'Sua conta foi criada.',
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Erro no registro',
        description: error.message || 'Não foi possível criar sua conta',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast({
        title: 'Logout realizado',
        description: 'Você foi desconectado',
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer logout',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
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
        descriptionCount,
        incrementDescriptionCount,
        canCreateMoreDescriptions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
