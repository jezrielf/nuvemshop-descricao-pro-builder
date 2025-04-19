
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useNimbusAuth = () => {
  const [loading, setLoading] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [storeName, setStoreName] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = useCallback(async () => {
    setAuthenticating(true);
    setError(null);

    try {
      // TODO: Implement Nimbus OAuth flow
      // This is a placeholder that simulates authentication
      const mockCode = "nimbus_test_code";
      
      const { data, error: authError } = await supabase.functions.invoke('nimbus-auth', {
        body: { code: mockCode }
      });

      if (authError) throw authError;

      if (data) {
        const { access_token, user_id, store_name } = data;

        const { error: storeError } = await supabase
          .from('ecommerce_stores')
          .insert({
            access_token,
            user_id: user_id,
            store_id: parseInt(user_id),
            name: store_name,
            platform: 'nimbus',
            url: 'https://nimbus.example.com' // Placeholder URL
          });

        if (storeError) throw storeError;

        setUserId(user_id);
        setStoreName(store_name);
        setSuccess(true);
        
        toast({
          title: 'Loja conectada com sucesso',
          description: `A loja ${store_name} foi conectada com sucesso.`
        });
      }
    } catch (err) {
      console.error('Error connecting to Nimbus:', err);
      setError('Erro ao conectar com a Nimbus');
      toast({
        title: 'Erro de conexão',
        description: 'Não foi possível conectar com a Nimbus.',
        variant: 'destructive'
      });
    } finally {
      setAuthenticating(false);
      setLoading(false);
    }
  }, [toast]);

  const handleDisconnect = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('ecommerce_stores')
        .delete()
        .eq('platform', 'nimbus');

      if (deleteError) throw deleteError;

      setSuccess(false);
      setUserId(null);
      setStoreName(null);
      
      toast({
        title: 'Desconectado com sucesso',
        description: 'A loja Nimbus foi desconectada.'
      });
    } catch (err) {
      console.error('Error disconnecting from Nimbus:', err);
      setError('Erro ao desconectar da Nimbus');
      toast({
        title: 'Erro ao desconectar',
        description: 'Não foi possível desconectar da Nimbus.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    loading,
    authenticating,
    error,
    success,
    userId,
    storeName,
    handleConnect,
    handleDisconnect
  };
};
