
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface AuthStatusProps {
  success: boolean;
  error: string | null;
  loading: boolean;
  authenticating: boolean;
  userId: string | null;
  handleConnect: () => void;
  handleDisconnect: () => void;
  onFetchProducts: () => void;
  loadingProducts: boolean;
}

export const AuthStatus: React.FC<AuthStatusProps> = ({
  success,
  error,
  loading,
  authenticating,
  userId,
  handleConnect,
  handleDisconnect,
  onFetchProducts,
  loadingProducts
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <span className="mr-2">Status:</span>
        {success ? (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Conectado
          </Badge>
        ) : (
          <Badge variant="destructive">
            <XCircle className="h-4 w-4 mr-1" />
            Desconectado
          </Badge>
        )}
      </div>
      
      {userId && (
        <div>
          <span className="font-semibold">ID da Loja:</span> {userId}
        </div>
      )}
      
      {error && (
        <div className="text-red-500 mt-2">
          Erro: {error}
        </div>
      )}
      
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
    </div>
  );
};
