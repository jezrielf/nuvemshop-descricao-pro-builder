
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AuthStatusProps {
  success: boolean;
  error: string | null;
  loading: boolean;
  authenticating: boolean;
  userId: string | number | null;
  storeName: string | null;
  handleConnect: () => void;
  handleDisconnect: () => void;
  onFetchProducts?: () => void;
  loadingProducts?: boolean;
}

export const AuthStatus: React.FC<AuthStatusProps> = ({
  success,
  error,
  loading,
  authenticating,
  userId,
  storeName,
  handleConnect,
  handleDisconnect,
  onFetchProducts,
  loadingProducts = false
}) => {
  // Format userId to string display
  const displayUserId = userId ? String(userId) : 'N/A';
  const displayStoreName = storeName || `Loja #${displayUserId}`;
  
  if (loading || authenticating) {
    return (
      <div className="flex items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <span className="text-sm">{authenticating ? 'Autenticando...' : 'Carregando...'}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <Badge variant="destructive" className="mb-2">Erro de Conexão</Badge>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button size="sm" variant="outline" onClick={handleConnect}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <Badge variant="secondary" className="bg-green-100 text-green-800 inline-flex items-center w-fit">
            <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
            Conectado
          </Badge>
          
          <div className="flex flex-col">
            <p className="font-medium">{displayStoreName}</p>
            <p className="text-xs text-muted-foreground">ID: {displayUserId}</p>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          {onFetchProducts && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onFetchProducts}
              disabled={loadingProducts}
              className="w-full"
            >
              {loadingProducts && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Carregar Produtos
            </Button>
          )}
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleDisconnect}
            className="text-red-500 hover:text-white hover:bg-red-500"
          >
            Desconectar Loja
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Badge variant="outline" className="mb-2">Não Conectado</Badge>
      <p className="text-sm text-muted-foreground">Conecte sua loja Nuvemshop.</p>
    </div>
  );
};
