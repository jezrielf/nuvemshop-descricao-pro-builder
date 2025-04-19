
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

// Componente para carregar o script do Nexo
const NexoScript: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // Verificar se já existe um script do Nexo carregado
    if (document.getElementById('nexo-sdk-script')) {
      setScriptLoaded(true);
      return;
    }

    // Se estamos em ambiente de desenvolvimento ou produção fora do Nexo,
    // não precisamos carregar o script, pois usaremos detecção de ambiente
    const isNexoEnvironment = 
      window.location.href.includes('mystore.nuvemshop.com.br') || 
      window.location.href.includes('nimbus-app');

    if (!isNexoEnvironment) {
      setScriptLoaded(true);
      return;
    }

    // Criar e adicionar o script à página
    const script = document.createElement('script');
    script.id = 'nexo-sdk-script';
    script.src = 'https://nexo.nuvemshop.com.br/sdk.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setScriptError(true);
    
    document.body.appendChild(script);

    // Limpeza
    return () => {
      if (document.getElementById('nexo-sdk-script')) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (scriptError) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        Erro ao carregar o SDK do Nexo. Por favor, verifique se você está acessando a aplicação a partir do painel da Nuvemshop.
      </div>
    );
  }

  return <>{children}</>;
};

// Criando um cliente de query para o React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
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
    isNexoEnabled
  } = useNexoAuth();

  return (
    <div className="nexo-app-container p-4">
      <h1 className="text-2xl font-bold mb-4">Descritor Pro</h1>
      
      {!isNexoEnabled ? (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <p className="text-yellow-700">
            Esta aplicação está sendo executada fora do ambiente Nexo da Nuvemshop.
          </p>
        </div>
      ) : authError ? (
        <div className="bg-red-50 border border-red-200 p-4 rounded-md">
          <p className="text-red-700">{authError}</p>
        </div>
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
    </QueryClientProvider>
  );
};
