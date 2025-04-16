
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const NuvemshopCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [storeName, setStoreName] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (!code || !state) {
        toast({
          title: "Erro na autenticação",
          description: "Parâmetros de autenticação inválidos.",
          variant: "destructive"
        });
        navigate('/');
        return;
      }

      try {
        // Call the edge function to handle the OAuth flow
        const { data, error } = await supabase.functions.invoke('nuvemshop-auth', {
          body: { code, state }
        });

        if (error) throw error;

        // Get the store name from the most recent connection
        const { data: storeData } = await supabase
          .from('nuvemshop_stores')
          .select('name')
          .order('connected_at', { ascending: false })
          .limit(1)
          .single();
        
        if (storeData) {
          setStoreName(storeData.name);
          toast({
            title: "Conexão realizada",
            description: `Sua loja ${storeData.name} foi conectada com sucesso!`
          });
        } else {
          toast({
            title: "Conexão realizada",
            description: "Sua loja Nuvemshop foi conectada com sucesso!"
          });
        }

      } catch (error) {
        console.error('Error handling Nuvemshop callback:', error);
        toast({
          title: "Erro na conexão",
          description: "Não foi possível completar a conexão com a Nuvemshop.",
          variant: "destructive"
        });
      } finally {
        // Give the user a moment to read the toast before redirecting
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
      <p className="text-lg">
        {storeName 
          ? `Conectando à loja ${storeName}...` 
          : "Conectando à Nuvemshop..."}
      </p>
    </div>
  );
};

export default NuvemshopCallback;
