
import React, { createContext, useContext, useEffect } from 'react';
import { authService } from '@/services/authService';
import { useAuthProvider } from '@/hooks/useAuthProvider';
import { hasRole, isAdmin, isPremium } from '@/utils/roleUtils';
import { AuthContextProps } from '@/types/authContext';
import { subscriptionService } from '@/services/subscriptionService';

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
    subscriptionTier,
    setSubscriptionTier,
    subscriptionEnd,
    setSubscriptionEnd,
    toast, 
    navigate 
  } = useAuthProvider();

  const checkHasRole = (role: string): boolean => {
    return hasRole(profile?.role, role);
  };

  const checkIsAdmin = (): boolean => {
    return isAdmin(profile?.role);
  };

  const checkIsPremium = (): boolean => {
    // Check both role and subscription
    return isPremium(profile?.role) || subscriptionTier === 'premium' || subscriptionTier === 'business';
  };

  const checkIsBusiness = (): boolean => {
    // Check if user has business/enterprise plan
    return subscriptionTier === 'business';
  };

  const checkIsSubscribed = (): boolean => {
    // Check if user has any paid plan
    return subscriptionTier === 'premium' || subscriptionTier === 'business';
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
    if (checkIsSubscribed()) return true; // Paid users have unlimited descriptions
    return descriptionCount < 3; // Free users can create up to 3 descriptions
  };

  const refreshSubscription = async () => {
    if (!user) return;
    
    try {
      const subInfo = await subscriptionService.checkSubscription();
      setSubscriptionTier(subInfo.subscription_tier);
      setSubscriptionEnd(subInfo.subscription_end);
    } catch (error) {
      console.error('Failed to refresh subscription info:', error);
    }
  };

  // Check subscription status on mount and when user changes
  useEffect(() => {
    if (user) {
      refreshSubscription();
    } else {
      // Reset to free tier when logged out
      setSubscriptionTier('free');
      setSubscriptionEnd(null);
    }
  }, [user]);

  const openCustomerPortal = async () => {
    try {
      setLoading(true);
      const url = await subscriptionService.openCustomerPortal();
      window.location.href = url;
    } catch (error: any) {
      toast({
        title: 'Erro ao abrir portal',
        description: error.message || 'Não foi possível abrir o portal de gerenciamento',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
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
        isBusiness: checkIsBusiness,
        isSubscribed: checkIsSubscribed,
        subscriptionTier,
        subscriptionEnd,
        refreshSubscription,
        openCustomerPortal,
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
