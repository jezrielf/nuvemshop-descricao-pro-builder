
import { createContext, useContext, ReactNode } from 'react';
import { Profile } from '@/types/auth';
import { useAuthProvider } from '@/hooks/useAuthProvider';

export interface AuthContextProps {
  profile: Profile | null;
  user: Profile | null; // Alias for profile
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials?: { email: string; password: string }) => Promise<Profile>;
  signIn: (credentials?: { email: string; password: string }) => Promise<Profile>; // Alias for login
  signUp: (userData: any) => Promise<any>;
  logout: () => void;
  signOut: () => void; // Alias for logout
  refreshProfile: () => Promise<Profile | undefined>;
  isPremium: () => boolean;
  isBusiness: () => boolean;
  isAdmin: () => boolean;
  hasRole: (requiredRole: string) => boolean;
  isSubscribed: () => boolean;
  subscriptionTier: string;
  descriptionCount: number;
  canCreateMoreDescriptions: () => boolean;
  openCustomerPortal: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
  session: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider();
  
  // Create a compatible context value
  const contextValue: AuthContextProps = {
    profile: auth.user,
    user: auth.user,
    loading: auth.isLoading,
    error: auth.error,
    isAuthenticated: !!auth.user,
    login: auth.signIn,
    signIn: auth.signIn,
    signUp: async (userData: any) => {
      console.warn('signUp not implemented, using signIn instead');
      if (auth.signIn) return auth.signIn({ email: userData.email, password: userData.password });
      throw new Error('Not implemented');
    },
    logout: auth.signOut,
    signOut: auth.signOut,
    refreshProfile: auth.refreshProfile || (async () => undefined),
    isPremium: auth.isPremium,
    isBusiness: auth.isBusiness,
    isAdmin: auth.isAdmin,
    hasRole: (role: string) => !!auth.user?.role && (
      typeof auth.user.role === 'string' 
        ? auth.user.role === role
        : auth.user.role.includes(role)
    ),
    isSubscribed: auth.isSubscribed,
    subscriptionTier: 'free', // Default value
    descriptionCount: 0, // Default value
    canCreateMoreDescriptions: () => true, // Default implementation
    openCustomerPortal: async () => { console.warn('openCustomerPortal not implemented'); },
    refreshSubscription: async () => {
      if (auth.refreshProfile) await auth.refreshProfile();
      console.log('Subscription refreshed');
    },
    session: auth.session || { user: auth.user }
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
