
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SubscriptionInfo } from '@/services/subscriptionService';

export const useSubscription = () => {
  const [subscriptionTier, setSubscriptionTier] = useState<string>('free');
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshSubscription = useCallback(async (): Promise<SubscriptionInfo> => {
    setIsLoading(true);
    try {
      console.log('Refreshing subscription status');
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Erro ao verificar assinatura:', error);
        return { tier: 'free', end_date: null, error: error.message };
      }
      
      if (data && data.tier) {
        console.log('Dados de assinatura recebidos:', data);
        // Prevent unnecessary state updates if the tier hasn't changed
        if (data.tier !== subscriptionTier) {
          setSubscriptionTier(data.tier);
        }
        if (data.end_date !== subscriptionEnd) {
          setSubscriptionEnd(data.end_date);
        }
        return data;
      }
      
      return { tier: 'free', end_date: null };
    } catch (error: any) {
      console.error('Erro ao verificar assinatura:', error);
      return { tier: 'free', end_date: null, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [subscriptionTier, subscriptionEnd]);

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
    setSubscriptionTier,
    refreshSubscription,
    openCustomerPortal
  };
};
