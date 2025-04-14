
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { Store } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Update with new client ID
const NUVEMSHOP_CLIENT_ID = "17194";
const NUVEMSHOP_SCOPES = "products";

export const NuvemshopConnect: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para conectar sua loja.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Initiating Nuvemshop connection for user:', user.id);
      
      // Generate and save state for CSRF protection
      const state = uuidv4();
      const { error: stateError } = await supabase
        .from('nuvemshop_auth_states')
        .insert({ user_id: user.id, state });
        
      if (stateError) {
        console.error('Error saving auth state:', stateError);
        throw stateError;
      }

      // Redirect to Nuvemshop OAuth page
      const url = new URL('https://www.tiendanube.com/apps/authorize/token');
      url.searchParams.append('client_id', NUVEMSHOP_CLIENT_ID);
      url.searchParams.append('state', state);
      url.searchParams.append('scope', NUVEMSHOP_SCOPES);
      
      console.log('Redirecting to Nuvemshop OAuth page:', url.toString());
      window.location.href = url.toString();
    } catch (error) {
      console.error('Error initiating Nuvemshop connection:', error);
      toast({
        title: "Erro de conexão",
        description: "Não foi possível iniciar a conexão com a Nuvemshop.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2" 
      onClick={handleConnect}
    >
      <Store className="h-4 w-4" />
      Conectar Nuvemshop
    </Button>
  );
};
