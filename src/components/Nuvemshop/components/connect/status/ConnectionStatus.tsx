
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ConnectionStatusProps {
  success: boolean;
  storeName?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  success,
  storeName
}) => {
  // Verificar se o storeName é uma string válida
  const isValidStoreName = typeof storeName === 'string' && storeName.trim() !== '';
  
  return (
    <div className="flex items-center">
      <span className="mr-2">Status:</span>
      {success ? (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          <CheckCircle2 className="h-4 w-4 mr-1" />
          {isValidStoreName 
            ? `Conectado com ${storeName}` 
            : 'Conectado'}
        </Badge>
      ) : (
        <Badge variant="destructive">
          <XCircle className="h-4 w-4 mr-1" />
          Desconectado
        </Badge>
      )}
    </div>
  );
};
