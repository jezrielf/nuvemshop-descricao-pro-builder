
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UseUsageQuotaReturn {
  count: number;
  remaining: number;
  reached: boolean;
  isUnlimited: boolean;
  logProductUpdate: (productId: number, storeId?: number, platform?: string) => Promise<{ success: boolean; wasNew: boolean }>;
  refresh: () => Promise<void>;
  loading: boolean;
}

export const useUsageQuota = (
  key: string = 'nuvemshop_saves',
  freeLimit: number = 3
): UseUsageQuotaReturn => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, isPremium, isSubscribed } = useAuth();
  
  const isUnlimited = isPremium() || isSubscribed();
  const remaining = Math.max(0, freeLimit - count);
  const reached = !isUnlimited && count >= freeLimit;

  const getStorageKey = () => `usage_${key}_${user?.id || 'anonymous'}`;

  const loadCount = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        // Load from Supabase for authenticated users (distinct product count)
        const { data, error } = await supabase.rpc('get_product_updates_count', { _key: key });
        if (error) {
          console.error('Error loading product updates count:', error);
          setCount(0);
        } else {
          setCount(data || 0);
        }
      } else {
        // Fallback to localStorage for anonymous users
        const stored = localStorage.getItem(getStorageKey());
        setCount(stored ? parseInt(stored, 10) : 0);
      }
    } catch (error) {
      console.error('Error loading usage count:', error);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [user, key]);

  const logProductUpdate = useCallback(async (
    productId: number, 
    storeId: number = 0, 
    platform: string = 'nuvemshop'
  ): Promise<{ success: boolean; wasNew: boolean }> => {
    try {
      if (user) {
        // Log product update in Supabase for authenticated users
        const { data, error } = await supabase.rpc('log_product_update', { 
          _key: key, 
          _product_id: productId,
          _store_id: storeId,
          _platform: platform
        });
        
        if (error) {
          console.error('Error logging product update:', error);
          return { success: false, wasNew: false };
        }
        
        const result = data?.[0];
        if (result) {
          setCount(result.total_count);
          return { success: true, wasNew: result.inserted };
        }
        
        return { success: false, wasNew: false };
      } else {
        // For anonymous users, increment in localStorage (simplified counting)
        const newCount = count + 1;
        setCount(newCount);
        localStorage.setItem(getStorageKey(), newCount.toString());
        return { success: true, wasNew: true };
      }
    } catch (error) {
      console.error('Error logging product update:', error);
      return { success: false, wasNew: false };
    }
  }, [user, key, count]);

  const refresh = useCallback(async () => {
    await loadCount();
  }, [loadCount]);

  useEffect(() => {
    loadCount();
  }, [loadCount]);

  return {
    count,
    remaining,
    reached,
    isUnlimited,
    logProductUpdate,
    refresh,
    loading
  };
};
