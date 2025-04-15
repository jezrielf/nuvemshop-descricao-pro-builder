
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export const NuvemshopConnect = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      setLoading(true);
      if (!user) {
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para conectar sua loja.",
          variant: "destructive"
        });
        return;
      }

      // Generate a state token for CSRF protection
      const state = uuidv4();

      // Save the state token in the database
      const { error: stateError } = await supabase
        .from('nuvemshop_auth_states')
        .insert({
          user_id: user.id,
          state
        });

      if (stateError) {
        throw new Error('Failed to save auth state');
      }

      // Construct the authorization URL with your app's client ID
      const authUrl = `https://www.tiendanube.com/apps/authorize/token?client_id=17194&state=${state}`;
      
      // Redirect to Nuvemshop's authorization page
      window.location.href = authUrl;

    } catch (error) {
      console.error('Error initiating Nuvemshop connection:', error);
      toast({
        title: "Erro ao conectar",
        description: "Não foi possível iniciar a conexão com a Nuvemshop.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleConnect}
      disabled={loading}
    >
      {loading ? 'Conectando...' : 'Conectar Nuvemshop'}
    </Button>
  );
};
