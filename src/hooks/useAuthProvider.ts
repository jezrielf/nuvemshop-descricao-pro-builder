import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { convertProfileToUser } from '@/utils/typeConversion';

interface AuthState {
  user: Profile | null;
  session: any | null;
  isLoading: boolean;
  isPremium: () => boolean;
  isBusiness: () => boolean;
  isSubscribed: () => boolean;
  isSubscriptionLoading: boolean;
  error: string | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
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

  // Update this function to include all required properties
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

  const signIn = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
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
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async (userId: string, email: string): Promise<Profile> => {
    // Create a complete profile with all required properties
    const newProfile = createEmptyProfile(userId, email);
    
    // Persist to database
    const { error } = await supabase
      .from('profiles')
      .insert([newProfile]);
      
    if (error) {
      console.error('Error creating profile:', error);
    }
    
    return newProfile;
  };

  return {
    user,
    session,
    isLoading,
    isPremium,
    isBusiness,
    isSubscribed,
    isSubscriptionLoading,
    error,
    signIn,
    signOut
  };
};
