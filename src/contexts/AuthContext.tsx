
import React, { createContext, useContext } from 'react';
import { AuthContextProps } from '@/types/authContext';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useSubscription } from '@/hooks/useSubscription';
import { useDescriptionCount } from '@/hooks/useDescriptionCount';
import { getRoles, hasRole, isAdmin, isPremium, isBusiness } from '@/utils/roleUtils';

interface AuthProviderProps {
  children: React.ReactNode;
}

// Create context with undefined as initial value
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    session,
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    fetchProfile,
    refreshProfile
  } = useAuthSession();

  const {
    subscriptionTier,
    subscriptionEnd,
    refreshSubscription,
    openCustomerPortal
  } = useSubscription();

  const {
    descriptionCount,
    incrementDescriptionCount
  } = useDescriptionCount(user?.id);
  
  // Effect to refresh profile and subscription regularly
  React.useEffect(() => {
    // Refresh profile and subscription every 5 minutes when user is logged in
    if (user) {
      const refreshInterval = setInterval(() => {
        refreshProfile();
        refreshSubscription();
      }, 5 * 60 * 1000); // 5 minutes
      
      return () => clearInterval(refreshInterval);
    }
  }, [user, refreshProfile, refreshSubscription]);

  // Corrigido: Verificação correta de papéis do usuário
  const isAdminUser = React.useMemo(() => {
    if (!profile?.role) return false;
    return isAdmin(profile.role);
  }, [profile?.role]);

  const isPremiumUser = React.useMemo(() => {
    // Verificar tanto o papel do usuário quanto o plano de assinatura
    if (!profile?.role) return subscriptionTier === 'premium' || subscriptionTier === 'admin';
    
    // Se tiver o papel premium ou admin nos perfis, é premium
    if (isPremium(profile.role) || isAdminUser) return true;
    
    // Se tiver uma assinatura premium, é premium
    return subscriptionTier === 'premium' || subscriptionTier === 'admin';
  }, [profile?.role, isAdminUser, subscriptionTier]);

  const isBusinessUser = React.useMemo(() => {
    // Verificar tanto o papel do usuário quanto o plano de assinatura
    if (!profile?.role) return subscriptionTier === 'business';
    
    // Se tiver o papel business, premium ou admin, é business
    if (isBusiness(profile.role) || isPremiumUser) return true;
    
    // Se tiver uma assinatura business, é business
    return subscriptionTier === 'business';
  }, [profile?.role, isPremiumUser, subscriptionTier]);

  const isSubscribedUser = React.useMemo(() => {
    // Se tiver qualquer papel premium ou superior, é assinante
    if (isPremiumUser || isBusinessUser) return true;
    
    // Ou se tiver um plano de assinatura diferente de 'free'
    return Boolean(subscriptionTier && subscriptionTier.toLowerCase() !== 'free');
  }, [isPremiumUser, isBusinessUser, subscriptionTier]);

  const canCreateMoreDescriptionsValue = isSubscribedUser || descriptionCount < 3;

  const hasRoleCallback = (role: string) => {
    if (!profile?.role) return false;
    return hasRole(profile.role, role);
  };

  const value = {
    session,
    user,
    profile,
    signIn,
    signUp,
    signOut,
    loading,
    hasRole: hasRoleCallback,
    isAdmin: () => isAdminUser,
    isPremium: () => isPremiumUser,
    isBusiness: () => isBusinessUser,
    isSubscribed: () => isSubscribedUser,
    subscriptionTier,
    subscriptionEnd,
    refreshSubscription,
    openCustomerPortal,
    descriptionCount,
    incrementDescriptionCount,
    canCreateMoreDescriptions: () => canCreateMoreDescriptionsValue,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Make sure this is exported and used correctly
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
