
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthStatus } from '../AuthStatus';
import { AuthenticationPanel } from '../AuthenticationPanel';
import { useNimbusUI } from '../../NimbusProvider';
import { NimbusAlert } from '../../NimbusProvider';

interface ConnectionCardProps {
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
  testCode: string;
  setTestCode: (code: string) => void;
  redirectUrl: string;
  setRedirectUrl: (url: string) => void;
  extractCodeFromUrl: () => void;
  handleTestCode: () => void;
  copyToClipboard: (text: string) => void;
  handleClearCache: (e?: React.MouseEvent) => void;
}

export const ConnectionCard: React.FC<ConnectionCardProps> = (props) => {
  const { useNimbusUI } = useNimbusUI();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conectar Nuvemshop</CardTitle>
        <CardDescription>
          Configure a conexão com sua loja Nuvemshop
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <AuthStatus
          success={props.success}
          error={props.error}
          loading={props.loading}
          authenticating={props.authenticating}
          userId={props.userId}
          storeName={props.storeName}
          handleConnect={props.handleConnect}
          handleDisconnect={props.handleDisconnect}
          onFetchProducts={props.onFetchProducts}
          loadingProducts={props.loadingProducts}
          useNimbusUI={useNimbusUI}
        />
        
        {!props.success && (
          <>
            <div className="border-t my-4"></div>
            
            {useNimbusUI ? (
              <NimbusAlert variant="info">
                Caso o botão "Conectar Nuvemshop" não funcione, você pode gerar um código manualmente seguindo os passos abaixo.
              </NimbusAlert>
            ) : (
              <div className="bg-blue-50 p-4 rounded-md text-blue-700 text-sm">
                <p>
                  Caso o botão "Conectar Nuvemshop" não funcione, você pode gerar um código manualmente seguindo os passos abaixo.
                </p>
              </div>
            )}
            
            <AuthenticationPanel
              redirectUrl={props.redirectUrl}
              setRedirectUrl={props.setRedirectUrl}
              extractCodeFromUrl={props.extractCodeFromUrl}
              testCode={props.testCode}
              setTestCode={props.setTestCode}
              handleTestCode={props.handleTestCode}
              authenticating={props.authenticating}
              copyToClipboard={props.copyToClipboard}
              useNimbusUI={useNimbusUI}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
