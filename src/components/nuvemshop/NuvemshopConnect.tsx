
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Store, Loader2 } from 'lucide-react';

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
      
      console.log('🔄 Verificando se já existe uma loja conectada para o usuário:', user.id);
      
      try {
        const { data, error } = await supabase
          .from('nuvemshop_stores')
          .select('*')
          .eq('user_id', user.id)
          .order('connected_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (error) {
          console.error('❌ Erro ao buscar loja conectada:', error);
          return;
        }
        
        if (data) {
          console.log('✅ Loja já conectada encontrada:', data);
          setConnectedStore(data);
        } else {
          console.log('ℹ️ Nenhuma loja conectada encontrada para este usuário');
        }
      } catch (error) {
        console.error('❌ Erro ao verificar loja conectada:', error);
      }
    };
    
    checkConnectedStore();
  }, [user]);

  const handleConnect = async () => {
    try {
      console.log('🔄 Iniciando processo de conexão com a Nuvemshop');
      setLoading(true);
      
      if (!user) {
        console.error('❌ Usuário não autenticado');
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para conectar sua loja.",
          variant: "destructive"
        });
        return;
      }

      console.log('🔄 Solicitando subdomínio da loja');
      // Ask for store subdomain
      const storeSubdomain = prompt("Digite o subdomínio da sua loja (ex: universodosparafusos):");
      
      if (!storeSubdomain) {
        console.log('❌ Subdomínio não informado');
        toast({
          title: "Erro",
          description: "O subdomínio da loja é obrigatório.",
          variant: "destructive"
        });
        return;
      }

      console.log(`✅ Subdomínio informado: ${storeSubdomain}`);

      // Redirect to the correct Nuvemshop authorization URL format
      const appId = "17194";  // Your app ID
      const authUrl = `https://${storeSubdomain}.lojavirtualnuvem.com.br/admin/apps/${appId}/authorize`;
      
      console.log(`🔄 Redirecionando para URL de autorização: ${authUrl}`);
      toast({
        title: "Redirecionando",
        description: "Você será redirecionado para a página de autorização da Nuvemshop."
      });
      
      // Add a small delay to ensure the toast is displayed before redirecting
      setTimeout(() => {
        window.location.href = authUrl;
      }, 1000);

    } catch (error) {
      console.error('❌ Erro ao iniciar conexão com a Nuvemshop:', error);
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
      {loading ? (
        <>
          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          Conectando...
        </>
      ) : (
        'Conectar Nuvemshop'
      )}
    </Button>
  );
};
