
import React from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NexoLayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  storeInfo?: {
    name?: string;
    id?: string | number;
    url?: string;
  } | null;
}

export const NexoLayout: React.FC<NexoLayoutProps> = ({ 
  children, 
  isLoading = false,
  error = null,
  storeInfo = null
}) => {
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

  // Renderizar o conteúdo do aplicativo com informações da loja (se disponíveis)
  return (
    <div className="nexo-app-container p-4">
      {storeInfo && (
        <div className="nexo-app-header mb-4 bg-gray-50 p-3 rounded-md border">
          <div className="nexo-store-info">
            <h2 className="text-lg font-medium">
              {storeInfo.name ? `Loja: ${storeInfo.name}` : 'Loja Nuvemshop'}
            </h2>
            {(storeInfo.id || storeInfo.url) && (
              <p className="text-sm text-gray-500">
                {storeInfo.id && `ID: ${storeInfo.id}`} 
                {storeInfo.url && storeInfo.id && ' • '} 
                {storeInfo.url && `URL: ${storeInfo.url}`}
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="nexo-app-content">
        {children}
      </div>
    </div>
  );
};
