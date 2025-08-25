import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecureStore {
  id: string;
  name: string;
  user_id: string;
  store_id: number;
  connected_at: string;
  platform: string;
  url: string;
  scope?: string;
}

export const useSecureStores = () => {
  const [stores, setStores] = useState<SecureStore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStores = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use the secure function that doesn't expose access tokens
      const { data, error } = await supabase.rpc('get_user_stores');

      if (error) {
        console.error('Error fetching stores:', error);
        setError(error.message);
        toast({
          variant: 'destructive',
          title: 'Erro ao carregar lojas',
          description: error.message,
        });
        return;
      }

      if (data) {
        setStores(data);
        console.log(`Loaded ${data.length} stores safely`);
      }
    } catch (err) {
      console.error('Error in fetchStores:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar lojas',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return {
    stores,
    isLoading,
    error,
    refetch: fetchStores,
  };
};