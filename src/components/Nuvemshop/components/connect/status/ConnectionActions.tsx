
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ConnectionActionsProps {
  success: boolean;
  loading: boolean;
  authenticating: boolean;
  loadingProducts: boolean;
  handleConnect: () => void;
  handleDisconnect: () => void;
  onFetchProducts: () => void;
}

export const ConnectionActions: React.FC<ConnectionActionsProps> = ({
  success,
  loading,
  authenticating,
  loadingProducts,
  handleConnect,
  handleDisconnect,
  onFetchProducts
}) => {
  return (
    <div className="pt-4">
      {!success ? (
        <Button onClick={handleConnect} disabled={loading || authenticating}>
          {(loading || authenticating) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Conectar Loja
        </Button>
      ) : (
        <div className="flex space-x-4">
          <Button variant="outline" onClick={handleDisconnect}>
            Desconectar Loja
          </Button>
          <Button onClick={onFetchProducts} disabled={loadingProducts}>
            {loadingProducts ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Carregar Produtos'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
