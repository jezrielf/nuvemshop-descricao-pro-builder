
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { NimbusBadge } from '../../../NimbusProvider';

interface ConnectionStatusProps {
  success: boolean;
  storeName?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ 
  success, 
  storeName
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center">
        <NimbusBadge variant={success ? 'success' : 'error'}>
          {success ? (
            <CheckCircle2 className="h-4 w-4 mr-1" />
          ) : (
            <XCircle className="h-4 w-4 mr-1" />
          )}
          Status: {success ? 'Conectado' : 'Desconectado'}
        </NimbusBadge>
      </div>
      
      {success && storeName && (
        <div className="text-sm">
          Você está conectado à loja: <span className="font-semibold">{storeName}</span>
        </div>
      )}
    </div>
  );
};
