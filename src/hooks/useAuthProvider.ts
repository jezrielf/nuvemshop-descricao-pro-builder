
import { useState, useEffect, useCallback } from 'react';
import { Profile } from '@/types/auth';
import { isPremium, isBusiness, isAdmin, hasRole } from '@/utils/roleUtils';

// Add getRoles function if it doesn't exist
export const getRoles = (roleData: string | string[]): string[] => {
  if (Array.isArray(roleData)) {
    return roleData;
  } else if (typeof roleData === 'string') {
    return roleData.split(',').map(r => r.trim());
  }
  return [];
};

// Add profile conversion utility
export const convertToProfile = (userData: any): Profile => {
  if (!userData) return null;
  
  // Handle the case where we get a profile in the legacy format
  if (userData.nome && !userData.name) {
    return {
      id: userData.id,
      email: userData.email || '',
      name: userData.nome, // Use nome as name
      role: userData.role,
      avatarUrl: userData.avatar_url || null,
      // Keep original properties for backward compatibility
      nome: userData.nome,
      criado_em: userData.criado_em,
      atualizado_em: userData.atualizado_em,
      avatar_url: userData.avatar_url,
      // Add User properties if they exist
      app_metadata: userData.app_metadata || {},
      user_metadata: userData.user_metadata || {},
      aud: userData.aud || '',
      created_at: userData.created_at || ''
    };
  }
  
  // Handle the standard format
  const profile: Profile = {
    ...userData,
    // Ensure name is always set
    name: userData.name || userData.nome || '',
    // Ensure avatarUrl is set if avatar_url exists
    avatarUrl: userData.avatarUrl || userData.avatar_url || null,
    // Ensure required User properties exist
    app_metadata: userData.app_metadata || {},
    user_metadata: userData.user_metadata || {},
    aud: userData.aud || '',
    created_at: userData.created_at || ''
  };
  
  return profile;
};

export const useAuthProvider = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState('free');
  const [descriptionCount, setDescriptionCount] = useState(0);

  useEffect(() => {
    // Check for stored profile on mount
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(convertToProfile(parsedProfile));
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error parsing stored profile:', err);
        localStorage.removeItem('userProfile');
      }
    }
    setLoading(false);
  }, []);
  
  // Update profile setter to use conversion utility
  const setUserProfile = useCallback((userData: any) => {
    if (!userData) {
      setProfile(null);
      return;
    }
    
    const convertedProfile = convertToProfile(userData);
    setProfile(convertedProfile);
  }, []);
  
  const login = useCallback(async (credentials?: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call for login
      const response = await new Promise<Profile>((resolve) => {
        setTimeout(() => {
          resolve({
            id: 'user-123',
            email: credentials?.email || 'user@example.com',
            name: 'Test User',
            role: 'premium',
            avatarUrl: 'https://i.pravatar.cc/150?img=3'
          });
        }, 1000);
      });
      
      setUserProfile(response);
      setIsAuthenticated(true);
      localStorage.setItem('userProfile', JSON.stringify(response));
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setUserProfile]);
  
  const logout = useCallback(() => {
    setProfile(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userProfile');
  }, []);
  
  const refreshProfile = useCallback(async () => {
    if (!profile?.id) return;
    
    setLoading(true);
    try {
      // Simulate API call to refresh profile
      const response = await new Promise<Profile>((resolve) => {
        setTimeout(() => {
          resolve({
            ...profile,
            // Add any updated fields here
          });
        }, 500);
      });
      
      setUserProfile(response);
      localStorage.setItem('userProfile', JSON.stringify(response));
      return response;
    } catch (err: any) {
      console.error('Error refreshing profile:', err);
      setError(err.message || 'Failed to refresh profile');
    } finally {
      setLoading(false);
    }
  }, [profile, setUserProfile]);
  
  const checkIsPremium = useCallback(() => {
    if (!profile?.role) return false;
    return isPremium(profile.role);
  }, [profile]);
  
  const checkIsBusiness = useCallback(() => {
    if (!profile?.role) return false;
    return isBusiness(profile.role);
  }, [profile]);
  
  const checkIsAdmin = useCallback(() => {
    if (!profile?.role) return false;
    return isAdmin(profile.role);
  }, [profile]);
  
  const checkHasRole = useCallback((requiredRole: string) => {
    if (!profile?.role) return false;
    return hasRole(profile.role, requiredRole);
  }, [profile]);
  
  const checkIsSubscribed = useCallback(() => {
    return checkIsPremium() || checkIsBusiness();
  }, [checkIsPremium, checkIsBusiness]);
  
  const canCreateMoreDescriptions = useCallback(() => {
    return checkIsSubscribed() || descriptionCount < 3;
  }, [checkIsSubscribed, descriptionCount]);
  
  const openCustomerPortal = useCallback(async () => {
    // Simulate opening customer portal
    window.open('https://example.com/customer-portal', '_blank');
    return Promise.resolve();
  }, []);
  
  return {
    profile,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    refreshProfile,
    isPremium: checkIsPremium,
    isBusiness: checkIsBusiness,
    isAdmin: checkIsAdmin,
    hasRole: checkHasRole,
    isSubscribed: checkIsSubscribed,
    subscriptionTier,
    descriptionCount,
    canCreateMoreDescriptions,
    openCustomerPortal,
    // Aliases for backward compatibility
    user: profile,
    signOut: logout,
  };
};
