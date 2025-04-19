
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
      // Configurar URL de autorização da Nimbus
      const clientId = '17194';
      const redirectUri = `${window.location.origin}/nuvemshop-connect`;
      const scopes = 'write_products read_products read_store_info';
      
      const authUrl = `https://auth.nuvemshop.com.br/oauth/authorize?client_id=${clientId}&scope=${scopes}&response_type=code&redirect_uri=${redirectUri}`;
      
      // Redirecionar para autorização
      window.location.href = authUrl;
    } catch (err) {
      console.error('Erro ao iniciar conexão com Nimbus:', err);
      setError('Não foi possível iniciar a conexão com a Nimbus');
      toast({
        title: 'Erro de conexão',
        description: 'Não foi possível conectar com a Nimbus.',
        variant: 'destructive'
      });
    } finally {
      setAuthenticating(false);
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
      console.error('Erro ao desconectar da Nimbus:', err);
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

  const handleCallback = useCallback(async (code: string) => {
    setAuthenticating(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.functions.invoke('nimbus-auth', {
        body: { code }
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
            url: `https://${store_name}.lojanuvem.com.br`
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
      console.error('Erro ao processar callback da Nimbus:', err);
      setError('Erro ao conectar com a Nimbus');
      toast({
        title: 'Erro de conexão',
        description: 'Não foi possível processar a autorização da Nimbus.',
        variant: 'destructive'
      });
    } finally {
      setAuthenticating(false);
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
    handleDisconnect,
    handleCallback
  };
};
