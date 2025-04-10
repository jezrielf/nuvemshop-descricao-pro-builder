
import React, { createContext, useContext } from 'react';
import { authService } from '@/services/authService';
import { useAuthProvider } from '@/hooks/useAuthProvider';
import { hasRole, isAdmin, isPremium } from '@/utils/roleUtils';
import { AuthContextProps } from '@/types/authContext';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    session, 
    user, 
    profile, 
    loading, 
    descriptionCount, 
    setLoading, 
    setDescriptionCount, 
    toast, 
    navigate 
  } = useAuthProvider();

  const checkHasRole = (role: string): boolean => {
    return hasRole(profile, role);
  };

  const checkIsAdmin = (): boolean => {
    return isAdmin(profile);
  };

  const checkIsPremium = (): boolean => {
    return isPremium(profile);
  };

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

  const canCreateMoreDescriptions = () => {
    if (checkIsPremium()) return true; // Premium users have unlimited descriptions
    return descriptionCount < 3; // Free users can create up to 3 descriptions
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await authService.signIn(email, password);

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
      const { data, error } = await authService.signUp(email, password, nome);

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
      await authService.signOut();
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
        hasRole: checkHasRole,
        isAdmin: checkIsAdmin,
        isPremium: checkIsPremium,
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
