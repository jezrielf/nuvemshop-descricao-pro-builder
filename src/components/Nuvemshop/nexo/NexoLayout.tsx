
import React from 'react';
import { useNexo } from './NexoProvider';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NexoLayoutProps {
  children: React.ReactNode;
}

export const NexoLayout: React.FC<NexoLayoutProps> = ({ children }) => {
  const { isNexoEnabled, isLoading, error, store } = useNexo();

  // Se estiver carregando, mostra o spinner
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner text="Inicializando Nexo..." />
      </div>
    );
  }

  // Se ocorrer um erro na integração com o Nexo
  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center p-4">
        <Alert className="max-w-lg border-red-200 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-600 text-lg font-medium">
            Erro de Integração
          </AlertTitle>
          <AlertDescription className="mt-2 text-gray-600">
            <p className="mb-4">{error}</p>
            <p className="text-sm text-gray-500 mb-4">
              Verifique se você está acessando este aplicativo através do painel da sua loja Nuvemshop 
              e que possui as permissões necessárias.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => window.location.reload()} variant="outline">
                Tentar novamente
              </Button>
              <Button 
                onClick={() => window.open('https://ajuda.nuvemshop.com.br', '_blank')}
                variant="outline" 
                className="ml-2"
              >
                Central de Ajuda
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Se estiver no ambiente Nexo, renderizar uma interface adaptada para o painel
  if (isNexoEnabled) {
    return (
      <div className="nexo-app-container p-4">
        <div className="nexo-app-header mb-4">
          {store && (
            <div className="nexo-store-info mb-2">
              <h2 className="text-lg font-medium">Loja: {store.name}</h2>
              <p className="text-sm text-gray-500">ID: {store.id} • URL: {store.url}</p>
            </div>
          )}
        </div>
        <div className="nexo-app-content">
          {children}
        </div>
      </div>
    );
  }

  // Se não estiver no ambiente Nexo, renderizar uma mensagem informativa
  return (
    <div className="p-4">
      <Alert className="mb-4 border-amber-200 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-600 font-medium">
          Ambiente Nexo não detectado
        </AlertTitle>
        <AlertDescription className="text-amber-700 mt-2">
          <p>Esta aplicação deve ser acessada através do painel administrativo da Nuvemshop.</p>
          <p className="mt-2">Para utilizar todas as funcionalidades, instale este aplicativo na sua loja Nuvemshop.</p>
        </AlertDescription>
      </Alert>
      {children}
    </div>
  );
};
