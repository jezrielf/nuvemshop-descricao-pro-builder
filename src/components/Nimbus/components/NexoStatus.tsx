
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AlertCircle, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const NexoStatus: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verifica se o SDK do Nexo está disponível
  useEffect(() => {
    const checkNexoAvailability = () => {
      try {
        // Verifica se estamos em um ambiente onde o Nexo poderia estar disponível
        const isNexoEnvironment = 
          window.location.href.includes('mystore.nuvemshop.com.br') || 
          window.location.href.includes('mystore.tiendanube.com') || 
          window.location.href.includes('lojavirtualnuvem.com.br') ||
          window.location.href.includes('/admin/v2/apps/17194') ||
          window.location.href.includes('/admin/apps/17194');

        if (isNexoEnvironment) {
          // Se estamos em um ambiente que poderia ter o Nexo, tentamos detectar se o SDK está disponível
          if (typeof window !== 'undefined' && 'Nexo' in window) {
            setIsAvailable(true);
            setError(null);
          } else {
            setIsAvailable(false);
            setError('SDK do Nexo não detectado. Verifique se você está acessando a partir do Admin da Nuvemshop.');
          }
        } else {
          // Não estamos em um ambiente Nexo, isso é esperado quando acessado fora do Admin
          setIsAvailable(false);
          setError(null);
        }
      } catch (err) {
        console.error('Erro ao verificar disponibilidade do Nexo:', err);
        setIsAvailable(false);
        setError('Erro ao verificar disponibilidade do Nexo: ' + (err.message || 'Erro desconhecido'));
      } finally {
        setIsLoading(false);
      }
    };

    checkNexoAvailability();
  }, []);

  // Se estiver carregando, mostra spinner
  if (isLoading) {
    return <LoadingSpinner text="Verificando status do Nexo..." />;
  }

  // Se houver erro, mostra alerta de erro
  if (error) {
    return (
      <Alert className="mb-4 border-amber-200 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-600 font-medium">
          Ambiente Nexo não detectado
        </AlertTitle>
        <AlertDescription className="text-amber-700 mt-2">
          <p>{error}</p>
          <p className="mt-2">
            Para usar o Nexo, você precisa acessar o aplicativo através do painel administrativo da Nuvemshop.
          </p>
          <div className="mt-4">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="flex items-center"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Verificar novamente
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  // Se o Nexo estiver disponível, mostra informações de sucesso
  if (isAvailable) {
    return (
      <Alert className="mb-4 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-600 font-medium">
          Integração Nexo ativa
        </AlertTitle>
        <AlertDescription className="text-green-700 mt-2 space-y-4">
          <p>
            O SDK do Nexo está disponível neste ambiente.
          </p>
          <div className="mt-4 flex gap-2">
            <Button 
              onClick={() => window.open('/nexo', '_blank')} 
              variant="outline" 
              className="flex items-center"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir aplicativo Nexo
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  // Estado padrão - não estamos no ambiente Nexo
  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-600 font-medium">
        Ambiente Nexo não detectado
      </AlertTitle>
      <AlertDescription className="text-blue-700 mt-2">
        <p>
          Este aplicativo não está sendo executado dentro do ambiente Nexo da Nuvemshop.
          Para testar a integração, acesse o aplicativo através do painel da Nuvemshop.
        </p>
        <div className="flex gap-2 mt-4">
          <Button 
            onClick={() => window.open('/nexo', '_blank')} 
            variant="outline" 
            className="flex items-center"
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Abrir versão Nexo
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
