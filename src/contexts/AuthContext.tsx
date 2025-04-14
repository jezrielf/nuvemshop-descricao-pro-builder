
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
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

  // Update subscription tier based on user role - once per profile change
  useEffect(() => {
    if (profile?.role) {
      if (isPremium(profile.role) && subscriptionTier !== 'premium') {
        setSubscriptionTier('premium');
      } else if (isAdmin(profile.role) && subscriptionTier !== 'admin') {
        setSubscriptionTier('admin');
      } else if (isBusiness(profile.role) && subscriptionTier !== 'business') {
        setSubscriptionTier('business');
      }
    }
  }, [profile, setSubscriptionTier, subscriptionTier]);

  // Memoize role check functions to prevent rerenders
  const isAdminUser = useMemo(() => {
    return isAdmin(profile?.role);
  }, [profile?.role]);

  const isPremiumUser = useMemo(() => {
    return isPremium(profile?.role) || 
           isAdminUser || 
           subscriptionTier?.toLowerCase() === 'premium' || 
           subscriptionTier?.toLowerCase() === 'admin';
  }, [profile?.role, isAdminUser, subscriptionTier]);

  const isBusinessUser = useMemo(() => {
    return isBusiness(profile?.role) || 
           isPremiumUser || // Premium users get business features too
           subscriptionTier?.toLowerCase() === 'business';
  }, [profile?.role, isPremiumUser, subscriptionTier]);

  const isSubscribed = useMemo(() => {
    return subscriptionTier && subscriptionTier.toLowerCase() !== 'free';
  }, [subscriptionTier]);

  const canCreateMoreDescriptions = useMemo(() => {
    if (isSubscribed) {
      return true;
    }
    return descriptionCount < 3;
  }, [isSubscribed, descriptionCount]);

  const value = {
    session,
    user,
    profile,
    signIn,
    signUp,
    signOut,
    loading,
    hasRole: (role: string) => hasRole(profile?.role, role),
    isAdmin: () => isAdminUser,
    isPremium: () => isPremiumUser,
    isBusiness: () => isBusinessUser,
    isSubscribed: () => isSubscribed,
    subscriptionTier,
    subscriptionEnd,
    refreshSubscription,
    openCustomerPortal,
    descriptionCount,
    incrementDescriptionCount,
    canCreateMoreDescriptions: () => canCreateMoreDescriptions
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
