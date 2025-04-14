
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { Store } from 'lucide-react';

const NUVEMSHOP_CLIENT_ID = "7437";
const NUVEMSHOP_SCOPES = "products";

export const NuvemshopConnect: React.FC = () => {
  const { user } = useAuth();

  const handleConnect = async () => {
    if (!user) return;

    try {
      // Generate and save state for CSRF protection
      const state = uuidv4();
      await supabase
        .from('nuvemshop_auth_states')
        .insert({ user_id: user.id, state });

      // Redirect to Nuvemshop OAuth page
      const url = new URL('https://www.tiendanube.com/apps/authorize/token');
      url.searchParams.append('client_id', NUVEMSHOP_CLIENT_ID);
      url.searchParams.append('state', state);
      url.searchParams.append('scope', NUVEMSHOP_SCOPES);
      window.location.href = url.toString();
    } catch (error) {
      console.error('Error initiating Nuvemshop connection:', error);
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
