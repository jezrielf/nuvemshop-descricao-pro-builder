
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNexoAuth } from '@/components/Nuvemshop/hooks/useNexoAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const NexoStatus: React.FC = () => {
  const {
    isAuthenticated,
    isAuthenticating,
    authError,
    storeName,
    handleDisconnect,
    isNexoEnabled,
    isLoading
  } = useNexoAuth();

  // Se o componente estiver carregando, mostra um spinner
  if (isLoading) {
    return <LoadingSpinner text="Verificando status do Nexo..." />;
  }

  // Se não estiver no ambiente Nexo, mostra uma mensagem
  if (!isNexoEnabled) {
    return (
      <Alert className="mb-4 border-amber-200 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-600 font-medium">
          Ambiente Nexo não detectado
        </AlertTitle>
        <AlertDescription className="text-amber-700 mt-2 space-y-4">
          <p>
            Esta aplicação não está sendo executada dentro do ambiente Nexo da Nuvemshop.
            Para testar a integração, acesse o aplicativo através do painel da Nuvemshop.
          </p>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => window.open('/nexo', '_blank')} variant="outline" className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir versão Nexo
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  // Se houver erro de autenticação, mostra a mensagem de erro
  if (authError) {
    return (
      <Alert className="mb-4 border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-600 font-medium">
          Erro na integração Nexo
        </AlertTitle>
        <AlertDescription className="text-red-700 mt-2">
          <p>{authError}</p>
          <div className="mt-4">
            <Button onClick={() => window.location.reload()} variant="outline" className="text-red-600 border-red-300">
              Tentar novamente
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  // Se estiver autenticado, mostra status de conectado
  if (isAuthenticated) {
    return (
      <Alert className="mb-4 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-600 font-medium">
          Conexão Nexo ativa
        </AlertTitle>
        <AlertDescription className="text-green-700 mt-2 space-y-4">
          <p>
            Conectado à loja Nimbus via Nexo: <strong>{storeName}</strong>
          </p>
          <div className="mt-4">
            <Button variant="destructive" onClick={handleDisconnect} size="sm">
              Desconectar
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  // Estado de aguardando autenticação
  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-600 font-medium">
        Aguardando autenticação
      </AlertTitle>
      <AlertDescription className="text-blue-700 mt-2">
        <p>Aguardando autenticação via Nexo...</p>
        {isAuthenticating && <LoadingSpinner className="py-2" size="sm" text="Autenticando..." />}
      </AlertDescription>
    </Alert>
  );
};
