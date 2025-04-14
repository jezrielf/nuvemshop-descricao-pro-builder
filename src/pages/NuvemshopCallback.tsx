
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingBag, Check, AlertTriangle } from 'lucide-react';
import { handleNuvemshopCallback } from '@/services/nuvemshopService';
import { useToast } from '@/hooks/use-toast';

const NuvemshopCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Get the code from the URL query params
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const error = params.get('error');
      
      // Handle errors from Nuvemshop
      if (error) {
        setStatus('error');
        setErrorMessage('Autorização negada pela Nuvemshop. Verifique as permissões e tente novamente.');
        return;
      }
      
      // No code found
      if (!code) {
        setStatus('error');
        setErrorMessage('Código de autorização não encontrado.');
        return;
      }
      
      try {
        // Process the OAuth callback
        await handleNuvemshopCallback(code);
        
        // Show success toast
        toast({
          title: 'Loja conectada com sucesso',
          description: 'Sua loja Nuvemshop foi conectada com sucesso ao Descrição Pro.',
        });
        
        setStatus('success');
      } catch (error) {
        console.error('Error handling Nuvemshop callback:', error);
        setStatus('error');
        setErrorMessage(error.message || 'Erro ao conectar a loja Nuvemshop. Tente novamente.');
        
        // Show error toast
        toast({
          title: 'Erro ao conectar loja',
          description: 'Não foi possível completar a conexão com a Nuvemshop.',
          variant: 'destructive',
        });
      }
    };
    
    handleOAuthCallback();
  }, [location, toast]);
  
  const returnToApp = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-blue-500" />
            Integração Nuvemshop
          </CardTitle>
          <CardDescription>
            {status === 'loading' && 'Processando autorização da loja...'}
            {status === 'success' && 'Loja conectada com sucesso!'}
            {status === 'error' && 'Erro na conexão'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            {status === 'loading' && (
              <>
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-600 text-center">
                  Estamos conectando sua loja Nuvemshop ao Descrição Pro.
                </p>
              </>
            )}
            
            {status === 'success' && (
              <>
                <div className="bg-green-100 rounded-full p-3 mb-4">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <p className="text-gray-600 text-center">
                  Sua loja Nuvemshop foi conectada com sucesso! Agora você pode exportar descrições de produtos diretamente do Descrição Pro.
                </p>
              </>
            )}
            
            {status === 'error' && (
              <>
                <div className="bg-red-100 rounded-full p-3 mb-4">
                  <AlertTriangle className="h-10 w-10 text-red-600" />
                </div>
                <p className="text-gray-600 text-center">
                  {errorMessage || 'Ocorreu um erro ao conectar sua loja.'}
                </p>
              </>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={returnToApp}
            disabled={status === 'loading'}
          >
            {status === 'success' 
              ? 'Voltar para o Descrição Pro' 
              : status === 'error' 
                ? 'Tentar novamente' 
                : 'Aguarde...'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NuvemshopCallback;
