
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useProductAnalytics = (userId: string | undefined, productId: number, storeId: number) => {
  useEffect(() => {
    if (!userId || !productId || !storeId) return;

    const syncAnalytics = async () => {
      try {
        await supabase.functions.invoke('sync-product-analytics', {
          body: { userId, productId, storeId }
        });
      } catch (error) {
        console.error('Error syncing analytics:', error);
      }
    };

    syncAnalytics();
  }, [userId, productId, storeId]);
};
