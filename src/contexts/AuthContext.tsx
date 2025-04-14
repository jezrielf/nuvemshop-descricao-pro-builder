
import React, { createContext, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextProps } from '@/types/authContext';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useSubscription } from '@/hooks/useSubscription';
import { useDescriptionCount } from '@/hooks/useDescriptionCount';
import { hasRole } from '@/utils/roleUtils';

interface AuthProviderProps {
  children: React.ReactNode;
}

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
    fetchProfile
  } = useAuthSession();

  const {
    subscriptionTier,
    subscriptionEnd,
    setSubscriptionTier,
    refreshSubscription,
    openCustomerPortal
  } = useSubscription();

  const {
    descriptionCount,
    incrementDescriptionCount
  } = useDescriptionCount(user?.id);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setTimeout(() => fetchProfile(session.user.id), 0);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile?.role) {
      const userRole = Array.isArray(profile.role) ? profile.role[0] : profile.role;
      console.log("Role detectado:", userRole);
      if (userRole === 'premium') {
        setSubscriptionTier('premium');
      } else if (userRole === 'admin') {
        setSubscriptionTier('admin');
        console.log("Usuário é admin, configurando tier como admin");
      }
    }
  }, [profile, setSubscriptionTier]);

  const isAdmin = () => {
    const hasAdminRole = hasRole(profile?.role, 'admin');
    console.log("isAdmin check:", hasAdminRole, "profile:", profile);
    return hasAdminRole;
  };

  const isPremium = () => {
    return hasRole(profile?.role, 'premium') || 
           isAdmin() || 
           subscriptionTier?.toLowerCase() === 'premium' || 
           subscriptionTier?.toLowerCase() === 'admin';
  };

  const isBusiness = () => {
    return subscriptionTier?.toLowerCase() === 'empresarial';
  };

  const isSubscribed = () => {
    return subscriptionTier && subscriptionTier.toLowerCase() !== 'free';
  };

  const canCreateMoreDescriptions = () => {
    if (isSubscribed()) {
      return true;
    }
    return descriptionCount < 3;
  };

  const value = {
    session,
    user,
    profile,
    signIn,
    signUp,
    signOut,
    loading,
    hasRole: (role: string) => hasRole(profile?.role, role),
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
