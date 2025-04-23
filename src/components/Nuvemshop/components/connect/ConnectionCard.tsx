
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthStatus } from '../AuthStatus';
import { Button } from '@/components/ui/button';
import { AuthenticationPanel } from '../AuthenticationPanel';

interface ConnectionCardProps {
  success: boolean;
  error: string | null;
  loading: boolean;
  authenticating: boolean;
  userId: string | null;
  handleConnect: () => void;
  handleDisconnect: () => void;
  onFetchProducts: () => void;
  loadingProducts: boolean;
  storeName: string | null;
  testCode: string;
  setTestCode: (code: string) => void;
  redirectUrl: string;
  setRedirectUrl: (url: string) => void;
  extractCodeFromUrl: () => void;
  handleTestCode: () => void;
  copyToClipboard: (text: string) => void;
  handleClearCache: (e?: React.MouseEvent) => void;
}

export const ConnectionCard: React.FC<ConnectionCardProps> = ({
  success,
  error,
  loading,
  authenticating,
  userId,
  handleConnect,
  handleDisconnect,
  onFetchProducts,
  loadingProducts,
  storeName,
  testCode,
  setTestCode,
  redirectUrl,
  setRedirectUrl,
  extractCodeFromUrl,
  handleTestCode,
  copyToClipboard,
  handleClearCache
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status da Conexão</CardTitle>
        <CardDescription>
          Conecte sua loja Nuvemshop para importar produtos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <AuthStatus
            success={success}
            error={error}
            loading={loading}
            authenticating={authenticating}
            userId={userId}
            handleConnect={handleConnect}
            handleDisconnect={handleDisconnect}
            onFetchProducts={onFetchProducts}
            loadingProducts={loadingProducts}
            storeName={storeName}
          />
          
          {!success && (
            <div className="mt-2">
              <Button 
                variant="outline"
                onClick={handleClearCache}
                className="text-yellow-600 border-yellow-300 bg-yellow-50 hover:bg-yellow-100 mb-4"
              >
                Limpar Cache de Conexão
              </Button>
              
              <div className="space-y-2">
                <Button
                  variant="default"
                  onClick={handleConnect}
                  className="bg-green-600 hover:bg-green-700 w-full"
                >
                  Conectar Loja Nuvemshop
                </Button>
                <p className="text-xs text-gray-500">
                  Clique para conectar sua loja Nuvemshop automaticamente. Você será redirecionado para autorizar o acesso.
                </p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Modo avançado (se o automático falhar)</h3>
                <AuthenticationPanel
                  redirectUrl={redirectUrl}
                  setRedirectUrl={setRedirectUrl}
                  extractCodeFromUrl={extractCodeFromUrl}
                  testCode={testCode}
                  setTestCode={setTestCode}
                  handleTestCode={handleTestCode}
                  authenticating={authenticating}
                  copyToClipboard={copyToClipboard}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
