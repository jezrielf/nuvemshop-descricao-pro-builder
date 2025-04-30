
import React from 'react';
import { RefreshCw, LogIn, LogOut } from 'lucide-react';
import { NimbusButton } from '../../../NimbusProvider';

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
    <div className="flex flex-wrap gap-2">
      {!success ? (
        <NimbusButton
          variant="primary"
          size="small"
          onClick={handleConnect}
          disabled={loading || authenticating}
        >
          {authenticating ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <LogIn className="h-4 w-4 mr-2" />
          )}
          Conectar Nuvemshop
        </NimbusButton>
      ) : (
        <>
          <NimbusButton
            variant="primary"
            size="small"
            onClick={onFetchProducts}
            disabled={loadingProducts}
          >
            {loadingProducts && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
            {loadingProducts ? 'Carregando produtos...' : 'Listar produtos'}
          </NimbusButton>
          
          <NimbusButton
            variant="danger"
            size="small"
            onClick={handleDisconnect}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Desconectar
          </NimbusButton>
        </>
      )}
    </div>
  );
};
