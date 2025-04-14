
import { useState, useCallback } from 'react';
import { subscriptionService } from '@/services/subscriptionService';

export const useSubscription = () => {
  const [subscriptionTier, setSubscriptionTier] = useState<string>('free');
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);

  const refreshSubscription = useCallback(async () => {
    try {
      const subscriptionInfo = await subscriptionService.checkSubscription();
      setSubscriptionTier(subscriptionInfo.subscription_tier);
      setSubscriptionEnd(subscriptionInfo.subscription_end);
      return subscriptionInfo;
    } catch (error: any) {
      console.error('Error refreshing subscription:', error);
      setSubscriptionTier('free');
      setSubscriptionEnd(null);
      return {
        subscribed: false,
        subscription_tier: 'free',
        subscription_end: null
      };
    }
  }, []);

  const openCustomerPortal = async () => {
    try {
      const portalUrl = await subscriptionService.openCustomerPortal();
      window.location.href = portalUrl;
    } catch (error: any) {
      throw error;
    }
  };

  return {
    subscriptionTier,
    subscriptionEnd,
    setSubscriptionTier,
    setSubscriptionEnd,
    refreshSubscription,
    openCustomerPortal
  };
};
