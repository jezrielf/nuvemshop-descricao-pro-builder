
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
  
  // Define the refreshSubscription function if it doesn't exist in the provider
  const contextValue: AuthContextProps = {
    ...auth,
    signIn: auth.login,
    signUp: async (userData: any) => {
      console.warn('signUp not implemented, using login instead');
      return auth.login(userData);
    },
    session: { user: auth.profile },
    refreshSubscription: async () => {
      await auth.refreshProfile();
      console.log('Subscription refreshed');
    }
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
