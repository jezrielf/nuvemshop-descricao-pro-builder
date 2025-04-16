import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Store } from 'lucide-react';

type NuvemshopStore = {
  id: string;
  store_id: number;
  name: string;
  url: string;
}

export const NuvemshopConnect = () => {
  const [loading, setLoading] = useState(false);
  const [connectedStore, setConnectedStore] = useState<NuvemshopStore | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Check if there's already a connected store when component mounts
  useEffect(() => {
    const checkConnectedStore = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('nuvemshop_stores')
          .select('*')
          .eq('user_id', user.id)
          .order('connected_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching connected store:', error);
          return;
        }
        
        if (data) {
          setConnectedStore(data);
        }
      } catch (error) {
        console.error('Error checking connected store:', error);
      }
    };
    
    checkConnectedStore();
  }, [user]);

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

      // Ask for store subdomain
      const storeSubdomain = prompt("Digite o subdomínio da sua loja (ex: universodosparafusos):");
      
      if (!storeSubdomain) {
        toast({
          title: "Erro",
          description: "O subdomínio da loja é obrigatório.",
          variant: "destructive"
        });
        return;
      }

      // Redirect to the correct Nuvemshop authorization URL format
      const appId = "17194";  // Your app ID
      const authUrl = `https://${storeSubdomain}.lojavirtualnuvem.com.br/admin/apps/${appId}/authorize`;
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

  if (connectedStore) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
      >
        <Store className="mr-1 h-4 w-4" />
        Conectado à {connectedStore.name}
      </Button>
    );
  }

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
