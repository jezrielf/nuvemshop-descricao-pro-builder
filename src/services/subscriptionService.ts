import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SubscriptionInfo {
  subscribed: boolean;
  subscription_tier: string;
  subscription_end: string | null;
}

export const subscriptionService = {
  checkSubscription: async (): Promise<SubscriptionInfo> => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error.message);
        throw new Error(error.message);
      }
      
      return data as SubscriptionInfo;
    } catch (error: any) {
      console.error('Error checking subscription:', error);
      // Return default free tier on error
      return {
        subscribed: false,
        subscription_tier: 'free',
        subscription_end: null
      };
    }
  },
  
  createCheckout: async (planId: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data.url;
    } catch (error: any) {
      console.error('Error creating checkout:', error);
      throw error;
    }
  },
  
  openCustomerPortal: async (): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data.url;
    } catch (error: any) {
      console.error('Error opening customer portal:', error);
      throw error;
    }
  }
};
