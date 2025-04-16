
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const NuvemshopCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      // Extract the code from URL parameters
      const code = searchParams.get('code');
      console.log('Received authorization code:', code);

      if (!code) {
        toast({
          title: "Erro na autenticação",
          description: "Código de autenticação não encontrado.",
          variant: "destructive"
        });
        navigate('/');
        return;
      }

      try {
        console.log('Initiating Nuvemshop authentication with code:', code);
        const { data, error } = await supabase.functions.invoke('nuvemshop-auth', {
          body: { code }
        });

        if (error) {
          console.error('Error in Nuvemshop authentication:', error);
          throw error;
        }

        console.log('Authentication successful:', data);
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
        // Give the user a moment to read the toast before redirecting
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    };

    handleCallback();
  }, [navigate, toast, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
      <p className="text-lg">Conectando à Nuvemshop...</p>
    </div>
  );
};

export default NuvemshopCallback;
