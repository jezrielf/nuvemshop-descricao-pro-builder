
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { convertProfileToUser, getRoleAsString } from '@/utils/typeConversion';

interface AuthState {
  user: Profile | null;
  session: any | null;
  isLoading: boolean;
  isPremium: () => boolean;
  isBusiness: () => boolean;
  isAdmin: () => boolean;
  isSubscribed: () => boolean;
  isSubscriptionLoading: boolean;
  error: string | null;
  signIn: (credentials: { email: string; password?: string }) => Promise<Profile>;
  signOut: () => Promise<void>;
  refreshProfile?: () => Promise<Profile | undefined>;
}

export const useAuthProvider = (): AuthState => {
  const [user, setUser] = useState<Profile | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPremiumUser, setIsPremiumUser] = useState<boolean>(false);
  const [isBusinessUser, setIsBusinessUser] = useState<boolean>(false);
  const [isSubscribedUser, setIsSubscribedUser] = useState<boolean>(false);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);

  useEffect(() => {
    const loadSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user as Profile || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();

    supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user as Profile || null);
    });
  }, []);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!user?.id) {
        setIsSubscriptionLoading(false);
        return;
      }

      setIsSubscriptionLoading(true);
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('status, price_id')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching subscription:', error);
          setIsPremiumUser(false);
          setIsBusinessUser(false);
          setIsSubscribedUser(false);
        } else if (data) {
          setIsSubscribedUser(data.status === 'active' || data.status === 'trialing');
          setIsPremiumUser(data.price_id === process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_PRICE_ID);
          setIsBusinessUser(data.price_id === process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PLAN_PRICE_ID);
        } else {
          setIsPremiumUser(false);
          setIsBusinessUser(false);
          setIsSubscribedUser(false);
        }

        // Check if user has admin role
        const userRole = getRoleAsString(user);
        setIsAdminUser(userRole === 'admin');
        
      } catch (err: any) {
        console.error('Error processing subscription:', err);
        setIsPremiumUser(false);
        setIsBusinessUser(false);
        setIsSubscribedUser(false);
      } finally {
        setIsSubscriptionLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [user?.id]);

  const isPremium = useCallback(() => isPremiumUser, [isPremiumUser]);
  const isBusiness = useCallback(() => isBusinessUser, [isBusinessUser]);
  const isSubscribed = useCallback(() => isSubscribedUser, [isSubscribedUser]);
  const isAdmin = useCallback(() => isAdminUser, [isAdminUser]);

  // Create a complete profile with all required properties
  const createEmptyProfile = (userId: string, email: string): Profile => {
    return {
      id: userId,
      email,
      name: email.split('@')[0],
      role: 'user',
      avatarUrl: null,
      app_metadata: {},
      user_metadata: {},
      aud: '',
      created_at: new Date().toISOString()
    };
  };

  const signIn = async (credentials: { email: string; password?: string }): Promise<Profile> => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email: credentials.email });
      if (error) throw error;
      
      // This is a placeholder since we can't actually return the profile immediately after OTP request
      const tempProfile = createEmptyProfile('pending-auth', credentials.email);
      return tempProfile;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async (): Promise<Profile | undefined> => {
    if (!user?.id) return undefined;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return undefined;
      }
      
      if (data) {
        // Merge with existing user data
        const updatedUser: Profile = {
          ...user,
          ...data,
          app_metadata: user.app_metadata,
          user_metadata: user.user_metadata,
          aud: user.aud,
          created_at: user.created_at
        };
        setUser(updatedUser);
        return updatedUser;
      }
      
      return user;
    } catch (err) {
      console.error('Error refreshing profile:', err);
      return undefined;
    }
  };

  return {
    user,
    session,
    isLoading,
    isPremium,
    isBusiness,
    isAdmin,
    isSubscribed,
    isSubscriptionLoading,
    error,
    signIn,
    signOut,
    refreshProfile
  };
};
