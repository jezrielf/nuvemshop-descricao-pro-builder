
import React from 'react';
import { useNexo } from './NexoProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

interface NexoLayoutProps {
  children: React.ReactNode;
}

export const NexoLayout: React.FC<NexoLayoutProps> = ({ children }) => {
  const { isNexoEnabled, isLoading, error, store } = useNexo();

  // Se estiver carregando, mostra o spinner
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Se ocorrer um erro na integração com o Nexo
  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="text-xl font-semibold text-red-600 mb-2">
          Erro de Integração
        </div>
        <p className="text-gray-600">{error}</p>
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
