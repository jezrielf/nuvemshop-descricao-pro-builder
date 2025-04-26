
import React, { 
  createContext, 
  useState, 
  useEffect, 
  useContext, 
  useCallback 
} from 'react';
import { isPremium, isBusiness, isAdmin, getRoles, hasRole } from '@/utils/roleUtils';

interface AuthContextProps {
  profile: {
    id: string;
    email: string;
    name: string;
    role: string | string[] | undefined;
    avatarUrl?: string | null;
    nome?: string;
    criado_em?: string;
  } | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => void;
  isPremium: () => boolean;
  isBusiness: () => boolean;
  isAdmin: () => boolean;
  hasRole: (role: string) => boolean;
  // Add these properties to match what's used in the components
  user: any;
  signOut: () => void;
  isSubscribed: () => boolean;
  subscriptionTier: string;
  descriptionCount: number;
  canCreateMoreDescriptions: () => boolean;
  openCustomerPortal: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  profile: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: () => {},
  isPremium: () => false,
  isBusiness: () => false,
  isAdmin: () => false,
  hasRole: () => false,
  // Add these properties to match what's used in the components
  user: null,
  signOut: () => {},
  isSubscribed: () => false,
  subscriptionTier: '',
  descriptionCount: 0,
  canCreateMoreDescriptions: () => false,
  openCustomerPortal: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<{
    id: string;
    email: string;
    name: string;
    role: string | string[] | undefined;
    avatarUrl?: string | null;
    nome?: string;
    criado_em?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Add these properties to match what's used in the components
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [subscriptionTier, setSubscriptionTier] = useState('');

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    setLoading(false);
  }, []);

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate fetching user profile
      const mockProfile = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
        nome: 'Test User', // Add this for backward compatibility
      };
      setProfile(mockProfile);
      localStorage.setItem('userProfile', JSON.stringify(mockProfile));
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setProfile(null);
    localStorage.removeItem('userProfile');
  };
  
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

  // Add these methods to match what's used in the components
  const checkIsSubscribed = useCallback(() => {
    return checkIsPremium() || checkIsBusiness();
  }, [checkIsPremium, checkIsBusiness]);

  const canCreateMoreDescriptions = useCallback(() => {
    return checkIsSubscribed() || descriptionCount < 3;
  }, [checkIsSubscribed, descriptionCount]);

  const refreshProfile = async () => {
    // Mock implementation
    return Promise.resolve();
  };

  const openCustomerPortal = async () => {
    // Mock implementation
    return Promise.resolve();
  };

  const contextValue = {
    profile,
    loading,
    error,
    login,
    logout,
    isPremium: checkIsPremium,
    isBusiness: checkIsBusiness,
    isAdmin: checkIsAdmin,
    hasRole: checkHasRole,
    // Add these properties to match what's used in the components
    user: profile,
    signOut: logout,
    isSubscribed: checkIsSubscribed,
    subscriptionTier: 'free',
    descriptionCount: descriptionCount,
    canCreateMoreDescriptions,
    openCustomerPortal,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
