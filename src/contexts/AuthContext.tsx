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
  } | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => void;
  isPremium: () => boolean;
  isBusiness: () => boolean;
  isAdmin: () => boolean;
  hasRole: (role: string) => boolean;
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
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<{
    id: string;
    email: string;
    name: string;
    role: string | string[] | undefined;
    avatarUrl?: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    return isPremium(profile?.role);
  }, [profile]);
  
  const checkIsBusiness = useCallback(() => {
    return isBusiness(profile?.role);
  }, [profile]);
  
  const checkIsAdmin = useCallback(() => {
    return isAdmin(profile?.role);
  }, [profile]);
  
  const checkHasRole = useCallback((requiredRole: string) => {
    return hasRole(profile?.role, requiredRole);
  }, [profile]);

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
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
