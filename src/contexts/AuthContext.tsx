
import React, { createContext, useContext, useEffect, useState } from 'react';
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

  // Fix for infinite loop: Add dependency check to avoid updating state repeatedly
  useEffect(() => {
    if (profile?.role) {
      console.log("Verificação de role:", profile.role);
      
      // Check if role is an array and use the first item, or use the role string directly
      const roles = Array.isArray(profile.role) ? profile.role : [profile.role];
      
      if (roles.includes('premium') && subscriptionTier !== 'premium') {
        console.log("Atualizando tier para premium");
        setSubscriptionTier('premium');
      } else if (roles.includes('admin') && subscriptionTier !== 'admin') {
        console.log("Atualizando tier para admin");
        setSubscriptionTier('admin');
      }
    }
  }, [profile, setSubscriptionTier, subscriptionTier]);

  const isAdmin = () => {
    return hasRole(profile?.role, 'admin');
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
