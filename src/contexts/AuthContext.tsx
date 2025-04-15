
import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
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
    fetchProfile,
    refreshProfile
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

  // Prevent infinite loops by adding dependency array for profile fetch
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          // Use setTimeout to prevent blocking the auth state change handler
          setTimeout(() => fetchProfile(session.user.id), 0);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  // Only update subscription tier when profile or tier actually changes
  useEffect(() => {
    if (!profile?.role) return;
    
    const shouldUpdateTier = 
      (isPremium(profile.role) && subscriptionTier !== 'premium') ||
      (isAdmin(profile.role) && subscriptionTier !== 'admin') ||
      (isBusiness(profile.role) && subscriptionTier !== 'business');
    
    if (shouldUpdateTier) {
      if (isPremium(profile.role)) {
        setSubscriptionTier('premium');
      } else if (isAdmin(profile.role)) {
        setSubscriptionTier('admin');
      } else if (isBusiness(profile.role)) {
        setSubscriptionTier('business');
      }
    }
  }, [profile?.role, setSubscriptionTier, subscriptionTier]);

  // Memoize these values to prevent unnecessary re-renders
  const isAdminUser = useMemo(() => {
    return Boolean(profile?.role && isAdmin(profile.role));
  }, [profile?.role]);

  const isPremiumUser = useMemo(() => {
    return Boolean(
      (profile?.role && isPremium(profile.role)) || 
      isAdminUser || 
      subscriptionTier === 'premium' || 
      subscriptionTier === 'admin'
    );
  }, [profile?.role, isAdminUser, subscriptionTier]);

  const isBusinessUser = useMemo(() => {
    return Boolean(
      (profile?.role && isBusiness(profile.role)) || 
      isPremiumUser || 
      subscriptionTier === 'business'
    );
  }, [profile?.role, isPremiumUser, subscriptionTier]);

  const isSubscribedUser = useMemo(() => {
    return Boolean(subscriptionTier && subscriptionTier.toLowerCase() !== 'free');
  }, [subscriptionTier]);

  const canCreateMoreDescriptionsValue = useMemo(() => {
    if (isSubscribedUser) {
      return true;
    }
    return descriptionCount < 3;
  }, [isSubscribedUser, descriptionCount]);

  // Create stable function references with useCallback
  const hasRoleCallback = useCallback((role: string) => {
    return hasRole(profile?.role, role);
  }, [profile?.role]);

  // Create a stable context value with useMemo
  const value = useMemo(() => ({
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
  }), [
    session, 
    user, 
    profile, 
    loading, 
    signIn, 
    signUp, 
    signOut, 
    hasRoleCallback,
    isAdminUser, 
    isPremiumUser, 
    isBusinessUser, 
    isSubscribedUser,
    subscriptionTier, 
    subscriptionEnd, 
    refreshSubscription,
    openCustomerPortal,
    descriptionCount,
    incrementDescriptionCount,
    canCreateMoreDescriptionsValue,
    refreshProfile
  ]);

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
