
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NuvemshopCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

        toast({
          title: "Conexão realizada",
          description: "Sua loja Nuvemshop foi conectada com sucesso!"
        });

      } catch (error) {
        console.error('Error handling Nuvemshop callback:', error);
        toast({
          title: "Erro na conexão",
          description: "Não foi possível completar a conexão com a Nuvemshop.",
          variant: "destructive"
        });
      } finally {
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Conectando à Nuvemshop...</p>
    </div>
  );
};

export default NuvemshopCallback;
