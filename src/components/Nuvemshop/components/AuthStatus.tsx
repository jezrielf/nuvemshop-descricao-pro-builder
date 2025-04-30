
import React from 'react';
import { ConnectionStatus } from './connect/status/ConnectionStatus';
import { ConnectionActions } from './connect/status/ConnectionActions';

interface AuthStatusProps {
  success: boolean;
  error: string | null;
  loading: boolean;
  authenticating: boolean;
  userId: string | null;
  storeName?: string;
  handleConnect: () => void;
  handleDisconnect: () => void;
  onFetchProducts: () => void;
  loadingProducts: boolean;
  useNimbusUI?: boolean;
}

export const AuthStatus: React.FC<AuthStatusProps> = (props) => {
  return (
    <div className="flex flex-col space-y-4">
      <ConnectionStatus 
        success={props.success} 
        storeName={props.storeName} 
        useNimbusUI={props.useNimbusUI}
      />
      
      {props.userId && (
        <div>
          <span className="font-semibold">ID da Loja:</span> {props.userId}
        </div>
      )}
      
      {props.error && (
        <div className="text-red-500 mt-2">
          Erro: {props.error}
        </div>
      )}
      
      <ConnectionActions 
        success={props.success}
        loading={props.loading}
        authenticating={props.authenticating}
        loadingProducts={props.loadingProducts}
        handleConnect={props.handleConnect}
        handleDisconnect={props.handleDisconnect}
        onFetchProducts={props.onFetchProducts}
        useNimbusUI={props.useNimbusUI}
      />
    </div>
  );
};
