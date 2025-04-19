
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNexoAuth } from '@/components/Nuvemshop/hooks/useNexoAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

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
    return <LoadingSpinner />;
  }

  // Se não estiver no ambiente Nexo, mostra uma mensagem
  if (!isNexoEnabled) {
    return (
      <div className="space-y-4">
        <p className="text-amber-600">
          Esta aplicação não está sendo executada dentro do ambiente Nexo da Nuvemshop.
        </p>
        <Button onClick={() => window.open('/nexo', '_blank')} variant="outline">
          Abrir versão Nexo
        </Button>
      </div>
    );
  }

  // Se houver erro de autenticação, mostra a mensagem de erro
  if (authError) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">{authError}</p>
      </div>
    );
  }

  // Se estiver autenticado, mostra status de conectado
  if (isAuthenticated) {
    return (
      <div className="space-y-4">
        <p className="text-green-600">
          Conectado à loja Nimbus via Nexo: {storeName}
        </p>
        <Button variant="destructive" onClick={handleDisconnect}>
          Desconectar
        </Button>
      </div>
    );
  }

  // Estado de aguardando autenticação
  return (
    <div className="space-y-4">
      <p>Aguardando autenticação via Nexo...</p>
      {isAuthenticating && <LoadingSpinner />}
    </div>
  );
};
