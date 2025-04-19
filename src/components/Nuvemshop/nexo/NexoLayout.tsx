
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
            <Button onClick={() => window.location.reload()} variant="outline">
              Tentar novamente
            </Button>
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
            </div>
          )}
        </div>
        <div className="nexo-app-content">
          {children}
        </div>
      </div>
    );
  }

  // Se não estiver no ambiente Nexo, renderizar normalmente
  return <>{children}</>;
};
