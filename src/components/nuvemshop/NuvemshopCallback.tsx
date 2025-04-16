
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const NuvemshopCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<string>('Inicializando...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract the code from URL parameters
        const code = searchParams.get('code');
        setStatus('Recebendo código de autorização...');
        console.log('🔄 Recebido código de autorização:', code);

        if (!code) {
          const errorMsg = "Código de autenticação não encontrado.";
          console.error('❌ ' + errorMsg);
          setStatus('Erro: ' + errorMsg);
          setError(errorMsg);
          
          toast({
            title: "Erro na autenticação",
            description: errorMsg,
            variant: "destructive"
          });
          
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        setStatus('Enviando código para autenticação...');
        console.log('🔄 Iniciando autenticação Nuvemshop com código:', code);
        
        const { data, error } = await supabase.functions.invoke('nuvemshop-auth', {
          body: { code }
        });

        if (error) {
          console.error('❌ Erro na autenticação Nuvemshop:', error);
          setStatus('Erro na autenticação');
          setError(error.message);
          throw error;
        }

        console.log('✅ Autenticação bem-sucedida. Resposta:', data);
        setStatus('Conexão realizada com sucesso!');
        
        toast({
          title: "Conexão realizada",
          description: "Sua loja Nuvemshop foi conectada com sucesso!"
        });

      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('❌ Erro ao processar callback da Nuvemshop:', error);
        setStatus('Falha na conexão');
        setError(errorMsg);
        
        toast({
          title: "Erro na conexão",
          description: "Não foi possível completar a conexão com a Nuvemshop.",
          variant: "destructive"
        });
      } finally {
        // Give the user a moment to read the status before redirecting
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate, toast, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
      <p className="text-lg">{status}</p>
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md max-w-md">
          <p className="font-semibold">Erro detectado:</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}
    </div>
  );
};

export default NuvemshopCallback;
