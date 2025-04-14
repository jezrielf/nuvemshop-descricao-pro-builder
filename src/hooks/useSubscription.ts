
import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SubscriptionInfo } from '@/services/subscriptionService';

export const useSubscription = () => {
  const [subscriptionTier, setSubscriptionTier] = useState<string>('free');
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const refreshInProgressRef = useRef<boolean>(false);

  // Use this function to prevent unnecessary state updates
  const updateSubscriptionTier = useCallback((newTier: string) => {
    setSubscriptionTier(prevTier => {
      // Only update if different to prevent re-renders
      if (prevTier !== newTier) {
        return newTier;
      }
      return prevTier;
    });
  }, []);

  const updateSubscriptionEnd = useCallback((newEnd: string | null) => {
    setSubscriptionEnd(prevEnd => {
      // Only update if different to prevent re-renders
      if (prevEnd !== newEnd) {
        return newEnd;
      }
      return prevEnd;
    });
  }, []);

  const refreshSubscription = useCallback(async (): Promise<SubscriptionInfo> => {
    // Prevent concurrent refresh calls
    if (refreshInProgressRef.current) {
      console.log('Refresh already in progress, skipping');
      return { subscribed: subscriptionTier !== 'free', subscription_tier: subscriptionTier, subscription_end: subscriptionEnd };
    }
    
    refreshInProgressRef.current = true;
    setIsLoading(true);
    
    try {
      console.log('Refreshing subscription status');
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Erro ao verificar assinatura:', error);
        return { subscribed: false, subscription_tier: 'free', subscription_end: null };
      }
      
      if (data && data.subscription_tier) {
        console.log('Dados de assinatura recebidos:', data);
        
        // Only update state if the values are different
        if (data.subscription_tier !== subscriptionTier) {
          updateSubscriptionTier(data.subscription_tier);
        }
        
        if (data.subscription_end !== subscriptionEnd) {
          updateSubscriptionEnd(data.subscription_end);
        }
        
        return data;
      }
      
      return { subscribed: false, subscription_tier: 'free', subscription_end: null };
    } catch (error: any) {
      console.error('Erro ao verificar assinatura:', error);
      return { subscribed: false, subscription_tier: 'free', subscription_end: null };
    } finally {
      setIsLoading(false);
      refreshInProgressRef.current = false;
    }
  }, [subscriptionTier, subscriptionEnd, updateSubscriptionTier, updateSubscriptionEnd]);

  // Ensure we clean up the ref when unmounting
  useEffect(() => {
    return () => {
      refreshInProgressRef.current = false;
    };
  }, []);

  const openCustomerPortal = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw new Error(error.message);
      
      if (data && data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Erro ao abrir portal do cliente:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscriptionTier,
    subscriptionEnd,
    isLoading,
    setSubscriptionTier: updateSubscriptionTier,
    refreshSubscription,
    openCustomerPortal
  };
};
