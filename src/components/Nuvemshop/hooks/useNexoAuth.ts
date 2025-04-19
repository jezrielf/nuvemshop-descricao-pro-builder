
import { useNexo } from '../nexo/NexoProvider';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useNexoAuth = () => {
  const { store, user, accessToken, isNexoEnabled, isLoading: nexoLoading, error: nexoError } = useNexo();
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
        console.log('Tentando registrar loja via Nexo:', store.name);
        
        // Verifica se a loja já está registrada
        const { data: existingStores, error: queryError } = await supabase
          .from('ecommerce_stores')
          .select('*')
          .eq('store_id', store.id)
          .eq('platform', 'nimbus');
        
        if (queryError) {
          console.error('Erro ao verificar loja existente:', queryError);
          throw new Error(`Erro ao verificar loja existente: ${queryError.message}`);
        }
        
        // Se a loja já existe no banco, atualiza o status para autenticado
        if (existingStores && existingStores.length > 0) {
          console.log("Loja já registrada:", existingStores[0]);
          
          // Atualiza o token de acesso para garantir que está atualizado
          const { error: updateError } = await supabase
            .from('ecommerce_stores')
            .update({ access_token: accessToken })
            .eq('store_id', store.id)
            .eq('platform', 'nimbus');
            
          if (updateError) {
            console.warn('Erro ao atualizar token de acesso:', updateError);
          }
          
          setIsAuthenticated(true);
          return;
        }
        
        console.log("Registrando nova loja:", store.name);
        
        // Adiciona a loja ao banco de dados
        const { error: insertError } = await supabase
          .from('ecommerce_stores')
          .insert({
            access_token: accessToken,
            user_id: user?.id.toString() || '',
            store_id: store.id,
            name: store.name,
            platform: 'nimbus',
            url: store.url
          });
          
        if (insertError) {
          console.error('Erro ao inserir loja:', insertError);
          throw new Error(`Erro ao inserir loja: ${insertError.message}`);
        }
        
        setIsAuthenticated(true);
        toast({
          title: 'Loja conectada automaticamente',
          description: `A loja ${store.name} foi conectada via Nexo.`
        });
      } catch (err) {
        console.error('Erro ao registrar loja via Nexo:', err);
        const errorMessage = err instanceof Error ? err.message : 'Não foi possível conectar automaticamente com a loja';
        setAuthError(errorMessage);
        toast({
          title: 'Erro de conexão',
          description: 'Não foi possível registrar automaticamente a loja.',
          variant: 'destructive'
        });
      } finally {
        setIsAuthenticating(false);
      }
    };
    
    if (store && accessToken) {
      console.log("Tentando registrar loja:", store.name);
      registerStore();
    }
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
        
      if (error) {
        console.error('Erro ao excluir registro da loja:', error);
        throw new Error(`Erro ao excluir registro: ${error.message}`);
      }
      
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

  // Agregar erros para mostrar ao usuário
  useEffect(() => {
    if (nexoError) {
      console.log('Erro do Nexo detectado:', nexoError);
      setAuthError(nexoError);
    }
  }, [nexoError]);

  return {
    isAuthenticated,
    isAuthenticating,
    authError,
    storeName: store?.name || null,
    storeId: store?.id || null,
    accessToken,
    handleDisconnect,
    isNexoEnabled,
    isLoading: nexoLoading || isAuthenticating
  };
};
