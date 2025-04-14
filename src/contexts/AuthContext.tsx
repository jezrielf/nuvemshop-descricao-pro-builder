
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextProps } from '@/types/authContext';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useSubscription } from '@/hooks/useSubscription';
import { useDescriptionCount } from '@/hooks/useDescriptionCount';
import { hasRole, isAdmin, isPremium, isBusiness } from '@/utils/roleUtils';

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

  // Update subscription tier based on user role
  useEffect(() => {
    if (profile?.role) {
      console.log("Verificação de role:", profile.role);
      
      if (isPremium(profile.role) && subscriptionTier !== 'premium') {
        console.log("Atualizando tier para premium");
        setSubscriptionTier('premium');
      } else if (isAdmin(profile.role) && subscriptionTier !== 'admin') {
        console.log("Atualizando tier para admin");
        setSubscriptionTier('admin');
      } else if (isBusiness(profile.role) && subscriptionTier !== 'business') {
        console.log("Atualizando tier para business");
        setSubscriptionTier('business');
      }
    }
  }, [profile, setSubscriptionTier, subscriptionTier]);

  const isAdminUser = () => {
    return isAdmin(profile?.role);
  };

  const isPremiumUser = () => {
    return isPremium(profile?.role) || 
           isAdminUser() || 
           subscriptionTier?.toLowerCase() === 'premium' || 
           subscriptionTier?.toLowerCase() === 'admin';
  };

  const isBusinessUser = () => {
    return isBusiness(profile?.role) || 
           isPremiumUser() || // Premium users get business features too
           subscriptionTier?.toLowerCase() === 'business';
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
    isAdmin: isAdminUser,
    isPremium: isPremiumUser,
    isBusiness: isBusinessUser,
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
