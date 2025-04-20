
import React, { createContext, useContext, useEffect } from 'react';
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
    refreshSubscription,
    openCustomerPortal
  } = useSubscription();

  const {
    descriptionCount,
    incrementDescriptionCount
  } = useDescriptionCount(user?.id);
  
  // Effect to refresh profile and subscription regularly
  useEffect(() => {
    // Refresh profile and subscription every 5 minutes when user is logged in
    if (user) {
      const refreshInterval = setInterval(() => {
        refreshProfile();
        refreshSubscription();
      }, 5 * 60 * 1000); // 5 minutes
      
      return () => clearInterval(refreshInterval);
    }
  }, [user, refreshProfile, refreshSubscription]);

  // Memoize these values to prevent unnecessary re-renders
  const isAdminUser = Boolean(profile?.role && isAdmin(profile.role));

  const isPremiumUser = Boolean(
    (profile?.role && isPremium(profile.role)) || 
    isAdminUser || 
    subscriptionTier === 'premium' || 
    subscriptionTier === 'admin'
  );

  const isBusinessUser = Boolean(
    (profile?.role && isBusiness(profile.role)) || 
    isPremiumUser || 
    subscriptionTier === 'business'
  );

  const isSubscribedUser = Boolean(subscriptionTier && subscriptionTier.toLowerCase() !== 'free');

  const canCreateMoreDescriptionsValue = isSubscribedUser || descriptionCount < 3;

  const hasRoleCallback = (role: string) => {
    return hasRole(profile?.role, role);
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
