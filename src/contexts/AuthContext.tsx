
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AuthContextProps } from '@/types/authContext';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useSubscription } from '@/hooks/useSubscription';
import { useDescriptionCount } from '@/hooks/useDescriptionCount';
import { hasRole, isAdmin, isPremium, isBusiness, getRoles } from '@/utils/roleUtils';

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
  
  // Add a state to track the last refresh time
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  
  // Combine refresh functions into one for better control
  const refreshAll = useCallback(async () => {
    if (user) {
      await refreshProfile();
      await refreshSubscription();
      setLastRefresh(new Date());
    }
  }, [user, refreshProfile, refreshSubscription]);
  
  // Effect to refresh profile and subscription regularly
  useEffect(() => {
    // Refresh profile and subscription every 5 minutes when user is logged in
    if (user) {
      // Initial refresh when component mounts or user changes
      refreshAll();
      
      const refreshInterval = setInterval(() => {
        refreshAll();
      }, 5 * 60 * 1000); // 5 minutes
      
      return () => clearInterval(refreshInterval);
    }
  }, [user, refreshAll]);

  // Get roles from profile as array for easier handling
  const userRoles = profile?.role ? getRoles(profile.role) : ['user'];
  
  // Memoize these values to prevent unnecessary re-renders
  const isAdminUser = userRoles.includes('admin');

  const isPremiumUser = userRoles.includes('premium') || 
                        isAdminUser || 
                        subscriptionTier === 'premium' || 
                        subscriptionTier === 'admin';

  const isBusinessUser = userRoles.includes('business') || 
                         isPremiumUser || 
                         subscriptionTier === 'business';

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
    refreshProfile: refreshAll,
    lastRefresh
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
