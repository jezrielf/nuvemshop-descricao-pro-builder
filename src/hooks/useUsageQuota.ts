
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UseUsageQuotaReturn {
  count: number;
  remaining: number;
  reached: boolean;
  isUnlimited: boolean;
  increment: () => Promise<boolean>;
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
        // Load from Supabase for authenticated users
        const { data, error } = await supabase.rpc('get_usage_counter', { _key: key });
        if (error) {
          console.error('Error loading usage counter:', error);
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

  const increment = useCallback(async (): Promise<boolean> => {
    try {
      if (user) {
        // Increment in Supabase for authenticated users
        const { data, error } = await supabase.rpc('increment_usage_counter', { _key: key });
        if (error) {
          console.error('Error incrementing usage counter:', error);
          return false;
        }
        const newCount = data?.[0]?.count || count + 1;
        setCount(newCount);
        return true;
      } else {
        // Increment in localStorage for anonymous users
        const newCount = count + 1;
        setCount(newCount);
        localStorage.setItem(getStorageKey(), newCount.toString());
        return true;
      }
    } catch (error) {
      console.error('Error incrementing usage count:', error);
      return false;
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
    increment,
    refresh,
    loading
  };
};
