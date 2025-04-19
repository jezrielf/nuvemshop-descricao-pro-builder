
import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import ProductSearch from '@/components/Nuvemshop/components/ProductSearch';
import ProductEditorController from '@/components/Nuvemshop/components/ProductEditorController';
import { NuvemshopProduct } from '@/components/Nuvemshop/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
// Import our custom helpers
import * as nexoHelpers from './nexoHelpers';

// Create a new React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Componente para exibir erros de conexão com Nexo
const NexoConnectionError = ({ error, resetErrorBoundary }) => (
  <div className="p-8 text-center">
    <Alert className="max-w-2xl mx-auto border-red-200 bg-red-50">
      <AlertCircle className="h-5 w-5 text-red-600" />
      <AlertTitle className="text-red-600 text-lg font-medium">
        Erro ao conectar com o Nexo
      </AlertTitle>
      <AlertDescription className="mt-2 text-gray-600">
        <p className="mb-4">Não foi possível se conectar ao SDK do Nexo: {error.message}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={resetErrorBoundary}
        >
          Tentar novamente
        </button>
      </AlertDescription>
    </Alert>
  </div>
);

// Componente para o conteúdo do aplicativo
const NexoAppContent = () => {
  const [selectedProduct, setSelectedProduct] = useState<NuvemshopProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nexoClient, setNexoClient] = useState(null);

  useEffect(() => {
    // Verifica se estamos em ambiente de produção da Nuvemshop
    const isNexoEnvironment = 
      window.location.href.includes('mystore.nuvemshop.com.br') || 
      window.location.href.includes('mystore.tiendanube.com') || 
      window.location.href.includes('lojavirtualnuvem.com.br') ||
      window.location.href.includes('/admin/v2/apps/17194') ||
      window.location.href.includes('/admin/apps/17194');

    const initializeNexo = async () => {
      try {
        // Se não estamos no ambiente Nexo, pulamos a inicialização
        if (!isNexoEnvironment) {
          console.log('Não estamos no ambiente Nexo - simulando conexão');
          setIsConnected(true);
          setIsLoading(false);
          return;
        }
        
        // Verificamos se o Nexo está disponível no escopo global
        if (typeof window !== 'undefined' && 'Nexo' in window) {
          console.log('Inicializando cliente Nexo...');
          
          // Cria uma instância do Nexo conforme documentação
          const nexo = window.Nexo.create({
            clientId: '17194',
            log: true // Ativa logs para depuração
          });
          
          setNexoClient(nexo);
          
          // Tenta estabelecer conexão com o Admin da Nuvemshop
          console.log('Tentando conectar com o Nexo...');
          await nexoHelpers.connect(nexo, 5000); // 5 segundos de timeout
          
          console.log('Conexão estabelecida com o Nexo');
          setIsConnected(true);
          
          // Notifica que o App está pronto para ser exibido
          console.log('Notificando que o app está pronto (iAmReady)');
          nexoHelpers.iAmReady(nexo);
          
          // Obtém informações da loja
          const storeInfo = await nexoHelpers.getStoreInfo(nexo);
          console.log('Informações da loja obtidas:', storeInfo);
        } else {
          throw new Error('SDK do Nexo não disponível. Verifique se o aplicativo está sendo executado dentro do Admin da Nuvemshop.');
        }
      } catch (err) {
        console.error('Erro ao inicializar Nexo:', err);
        setError(err.message || 'Falha ao inicializar o Nexo');
      } finally {
        setIsLoading(false);
      }
    };

    initializeNexo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner text="Conectando ao painel da Nuvemshop..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="m-4 border-red-200 bg-red-50">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <AlertTitle className="text-red-600">Erro de Conexão</AlertTitle>
        <AlertDescription className="text-red-800">
          {error}
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 block"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="nexo-app-container p-4">
      <h1 className="text-2xl font-bold mb-4">Descritor Pro</h1>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <ProductSearch onProductSelect={setSelectedProduct} />
          </div>
        </div>
        
        {selectedProduct && (
          <ProductEditorController product={selectedProduct} />
        )}
        
        <Tabs defaultValue="editor" className="w-full">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Visualização</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="h-[70vh]">
            <Editor />
          </TabsContent>
          
          <TabsContent value="preview" className="h-[70vh]">
            <Preview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Componente principal da aplicação Nexo
export const NexoAppRoot: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={NexoConnectionError} onReset={() => window.location.reload()}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <NexoAppContent />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
