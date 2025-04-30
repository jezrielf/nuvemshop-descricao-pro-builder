
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { NimbusBadge } from '../../../NimbusProvider';
import { Badge } from '@/components/ui/badge';

interface ConnectionStatusProps {
  success: boolean;
  storeName?: string;
  useNimbusUI?: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ 
  success, 
  storeName,
  useNimbusUI
}) => {
  if (useNimbusUI) {
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
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center">
        <Badge variant={success ? 'success' : 'destructive'} className="flex items-center">
          {success ? (
            <CheckCircle2 className="h-4 w-4 mr-1" />
          ) : (
            <XCircle className="h-4 w-4 mr-1" />
          )}
          Status: {success ? 'Conectado' : 'Desconectado'}
        </Badge>
      </div>
      
      {success && storeName && (
        <div className="text-sm">
          Você está conectado à loja: <span className="font-semibold">{storeName}</span>
        </div>
      )}
    </div>
  );
};
