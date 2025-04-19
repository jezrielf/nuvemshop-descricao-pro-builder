
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNimbusAuth } from '../hooks/useNimbusAuth';
import LoadingSpinner from '@/components/LoadingSpinner'; // Changed to default import

export const NimbusAuthStatus: React.FC = () => {
  const {
    loading,
    authenticating,
    error,
    success,
    storeName,
    handleConnect,
    handleDisconnect
  } = useNimbusAuth();

  if (loading || authenticating) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={handleConnect}>Tentar novamente</Button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="space-y-4">
        <p className="text-green-600">
          Conectado à loja Nimbus: {storeName}
        </p>
        <Button variant="destructive" onClick={handleDisconnect}>
          Desconectar
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleConnect} className="bg-[#6366f1] hover:bg-[#4f46e5]">
      Conectar Nimbus
    </Button>
  );
};
