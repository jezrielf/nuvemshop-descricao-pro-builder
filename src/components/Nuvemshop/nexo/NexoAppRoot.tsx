
import React, { useState, useEffect } from 'react';
import { NexoProvider } from './NexoProvider';
import { NexoLayout } from './NexoLayout';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import ProductSearch from '@/components/Nuvemshop/components/ProductSearch';
import ProductEditorController from '@/components/Nuvemshop/components/ProductEditorController';
import { NuvemshopProduct } from '@/components/Nuvemshop/types';
import { useNexoAuth } from '../hooks/useNexoAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';

// Componente para exibir erros de script
const ScriptErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="p-8 text-center">
    <Alert className="max-w-2xl mx-auto border-red-200 bg-red-50">
      <AlertCircle className="h-5 w-5 text-red-600" />
      <AlertTitle className="text-red-600 text-lg font-medium">
        Erro ao carregar SDK do Nexo
      </AlertTitle>
      <AlertDescription className="mt-2 text-gray-600">
        <p className="mb-4">Não foi possível carregar o SDK do Nexo: {error.message}</p>
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

// Componente para carregar o script do Nexo
const NexoScript: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<Error | null>(null);
  const [loadRetries, setLoadRetries] = useState(0);
  const maxRetries = 5;

  useEffect(() => {
    // Função para verificar se o script já está carregado
    const isScriptAlreadyLoaded = () => {
      return typeof window !== 'undefined' && 'Nexo' in window;
    };

    // Função para carregar o script
    const loadScript = () => {
      if (isScriptAlreadyLoaded()) {
        console.log('Nexo SDK já está carregado, não precisa recarregar.');
        setScriptLoaded(true);
        return;
      }

      // Remove qualquer tentativa anterior para evitar duplicação
      const existingScript = document.getElementById('nexo-sdk-script');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }

      // Se estamos em ambiente de desenvolvimento ou produção fora do Nexo,
      // não precisamos carregar o script, pois usaremos detecção de ambiente
      const isNexoEnvironment = window.location.href.includes('mystore.nuvemshop.com.br') || 
                               window.location.href.includes('mystore.tiendanube.com') || 
                               window.location.href.includes('admin/v2/apps/17194') ||
                               window.location.href.includes('admin/apps/17194') ||
                               window.location.href.includes('nimbus-app');

      if (!isNexoEnvironment) {
        console.log('Não estamos em ambiente Nexo, pulando carregamento do script.');
        setScriptLoaded(true);
        return;
      }

      // Criar e adicionar o script à página
      console.log(`Tentativa ${loadRetries + 1} de ${maxRetries} para carregar o SDK do Nexo...`);
      const script = document.createElement('script');
      script.id = 'nexo-sdk-script';
      script.src = 'https://nexo.nuvemshop.com.br/sdk.js';
      script.async = true;
      script.onload = () => {
        console.log('SDK do Nexo carregado com sucesso!');
        setScriptLoaded(true);
        setScriptError(null);
      };
      
      script.onerror = (event) => {
        console.error('Erro ao carregar SDK do Nexo:', event);
        const error = new Error('Falha ao carregar o SDK do Nexo. Verifique sua conexão de internet ou se o SDK está disponível.');
        setScriptError(error);
        
        // Tenta recarregar o script até o número máximo de tentativas
        if (loadRetries < maxRetries - 1) {
          console.log(`Tentativa ${loadRetries + 1} de ${maxRetries} para carregar o SDK do Nexo falhou. Tentando novamente...`);
          setTimeout(() => {
            setLoadRetries(prev => prev + 1);
          }, 2000);
        } else {
          console.error(`Todas as ${maxRetries} tentativas de carregar o SDK do Nexo falharam.`);
        }
      };
      
      document.body.appendChild(script);
    };

    loadScript();

    // Limpeza
    return () => {
      const script = document.getElementById('nexo-sdk-script');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [loadRetries]);

  if (scriptError) {
    throw scriptError;
  }

  if (!scriptLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner text={`Carregando SDK do Nexo (tentativa ${loadRetries + 1}/${maxRetries})...`} />
      </div>
    );
  }

  return <>{children}</>;
};

// Criando um cliente de query para o React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const NexoAppContent: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<NuvemshopProduct | null>(null);
  const { 
    isAuthenticated, 
    storeName, 
    storeId, 
    authError,
    isNexoEnabled,
    isLoading
  } = useNexoAuth();

  if (isLoading) {
    return <LoadingSpinner text="Inicializando aplicação..." />;
  }

  return (
    <div className="nexo-app-container p-4">
      <h1 className="text-2xl font-bold mb-4">Descritor Pro</h1>
      
      {!isNexoEnabled ? (
        <Alert className="mb-4 border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-600 font-medium">
            Ambiente Nexo não detectado
          </AlertTitle>
          <AlertDescription className="text-amber-700 mt-2">
            <p>
              Esta aplicação está sendo executada fora do ambiente Nexo da Nuvemshop.
              Para usar este aplicativo, acesse-o através do painel da sua loja Nuvemshop.
            </p>
          </AlertDescription>
        </Alert>
      ) : authError ? (
        <Alert className="mb-4 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-600 font-medium">
            Erro de autenticação
          </AlertTitle>
          <AlertDescription className="text-red-700 mt-2">
            <p>{authError}</p>
          </AlertDescription>
        </Alert>
      ) : (
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
      )}
    </div>
  );
};

export const NexoAppRoot: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ScriptErrorFallback} onReset={() => window.location.reload()}>
        <NexoScript>
          <NexoProvider>
            <TooltipProvider>
              <NexoLayout>
                <NexoAppContent />
              </NexoLayout>
              <Toaster />
            </TooltipProvider>
          </NexoProvider>
        </NexoScript>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
