
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const NuvemshopCallback: React.FC = () => {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Conectando à Nuvemshop...');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get query parameters
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        
        console.log('Processing Nuvemshop callback with code:', code?.substring(0, 8) + '...');
        
        if (!code || !state) {
          console.error('Missing required parameters');
          setStatus('error');
          setMessage('Parâmetros de autenticação inválidos.');
          return;
        }

        // Call our edge function to handle OAuth exchange
        const { data, error } = await supabase.functions.invoke('nuvemshop-auth', {
          body: { code, state }
        });

        if (error) {
          console.error('Error during Nuvemshop connection:', error);
          setStatus('error');
          setMessage('Erro ao conectar com a Nuvemshop. Por favor, tente novamente.');
          toast({
            title: "Erro de conexão",
            description: "Não foi possível conectar à sua loja Nuvemshop.",
            variant: "destructive",
          });
          return;
        }

        console.log('Nuvemshop auth successful:', data);
        setStatus('success');
        setMessage('Loja conectada com sucesso!');
        toast({
          title: "Conexão realizada",
          description: "Sua loja Nuvemshop foi conectada com sucesso!",
        });

        // Redirect to home after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
        
      } catch (error) {
        console.error('Error processing Nuvemshop callback:', error);
        setStatus('error');
        setMessage('Ocorreu um erro no processo de conexão.');
        toast({
          title: "Erro de conexão",
          description: "Ocorreu um erro ao processar a conexão com a Nuvemshop.",
          variant: "destructive",
        });
      }
    };

    processCallback();
  }, [navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        {status === 'processing' && (
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
        )}
        
        {status === 'success' && (
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        
        {status === 'error' && (
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
        
        <h2 className="text-xl font-semibold mb-2">
          {status === 'processing' ? 'Processando' : status === 'success' ? 'Sucesso!' : 'Erro'}
        </h2>
        
        <p className="text-gray-600">{message}</p>
        
        {status === 'error' && (
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Voltar para a página inicial
          </button>
        )}
      </div>
    </div>
  );
};

export default NuvemshopCallback;
