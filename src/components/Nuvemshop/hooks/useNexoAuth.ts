
import { useNexo } from '../nexo/NexoProvider';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useNexoAuth = () => {
  const { store, user, accessToken, isNexoEnabled, isLoading } = useNexo();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  // Registrar a loja automaticamente quando temos as informações do Nexo
  useEffect(() => {
    const registerStore = async () => {
      if (!isNexoEnabled || !store || !accessToken) return;
      
      try {
        setIsAuthenticating(true);
        
        // Verifica se a loja já está registrada
        const { data: existingStores } = await supabase
          .from('ecommerce_stores')
          .select('*')
          .eq('store_id', store.id)
          .eq('platform', 'nimbus');
        
        // Se a loja já existe no banco, não faz nada
        if (existingStores && existingStores.length > 0) {
          setIsAuthenticated(true);
          return;
        }
        
        // Adiciona a loja ao banco de dados
        const { error } = await supabase
          .from('ecommerce_stores')
          .insert({
            access_token: accessToken,
            user_id: user?.id.toString() || '',
            store_id: store.id,
            name: store.name,
            platform: 'nimbus',
            url: store.url
          });
          
        if (error) throw error;
        
        setIsAuthenticated(true);
        toast({
          title: 'Loja conectada automaticamente',
          description: `A loja ${store.name} foi conectada via Nexo.`
        });
      } catch (err) {
        console.error('Erro ao registrar loja via Nexo:', err);
        setAuthError('Não foi possível conectar automaticamente com a loja');
        toast({
          title: 'Erro de conexão',
          description: 'Não foi possível registrar automaticamente a loja.',
          variant: 'destructive'
        });
      } finally {
        setIsAuthenticating(false);
      }
    };
    
    registerStore();
  }, [isNexoEnabled, store, accessToken, user, toast]);
  
  // Desconectar a loja
  const handleDisconnect = useCallback(async () => {
    if (!store) return;
    
    try {
      const { error } = await supabase
        .from('ecommerce_stores')
        .delete()
        .eq('store_id', store.id)
        .eq('platform', 'nimbus');
        
      if (error) throw error;
      
      setIsAuthenticated(false);
      toast({
        title: 'Loja desconectada',
        description: 'A conexão com a loja Nimbus foi removida.'
      });
    } catch (err) {
      console.error('Erro ao desconectar loja:', err);
      toast({
        title: 'Erro ao desconectar',
        description: 'Não foi possível desconectar a loja.',
        variant: 'destructive'
      });
    }
  }, [store, toast]);

  return {
    isAuthenticated,
    isAuthenticating,
    authError,
    storeName: store?.name || null,
    storeId: store?.id || null,
    accessToken,
    handleDisconnect,
    isNexoEnabled,
    isLoading
  };
};
