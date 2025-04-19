
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

// Componente para carregar o script do Nexo
const NexoScript: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [loadRetries, setLoadRetries] = useState(0);

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

      // Verifica se já existe um script do Nexo carregado
      const existingScript = document.getElementById('nexo-sdk-script');
      if (existingScript) {
        console.log('Elemento script do Nexo já existe no DOM, aguardando carregamento.');
        return;
      }

      // Se estamos em ambiente de desenvolvimento ou produção fora do Nexo,
      // não precisamos carregar o script, pois usaremos detecção de ambiente
      const isNexoEnvironment = 
        window.location.href.includes('mystore.nuvemshop.com.br') || 
        window.location.href.includes('mystore.tiendanube.com') || 
        window.location.href.includes('nimbus-app');

      if (!isNexoEnvironment) {
        console.log('Não estamos em ambiente Nexo, pulando carregamento do script.');
        setScriptLoaded(true);
        return;
      }

      // Criar e adicionar o script à página
      console.log('Carregando SDK do Nexo...');
      const script = document.createElement('script');
      script.id = 'nexo-sdk-script';
      script.src = 'https://nexo.nuvemshop.com.br/sdk.js';
      script.async = true;
      script.onload = () => {
        console.log('SDK do Nexo carregado com sucesso!');
        setScriptLoaded(true);
      };
      
      script.onerror = (error) => {
        console.error('Erro ao carregar SDK do Nexo:', error);
        setScriptError(true);
        
        // Tenta recarregar o script até 3 vezes
        if (loadRetries < 3) {
          console.log(`Tentativa ${loadRetries + 1} de 3 para carregar o SDK do Nexo...`);
          setTimeout(() => {
            setLoadRetries(prev => prev + 1);
            // Remove o script com erro para tentar novamente
            document.body.removeChild(script);
          }, 2000);
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

  if (scriptError && loadRetries >= 3) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        <h3 className="font-bold mb-2">Erro ao carregar o SDK do Nexo</h3>
        <p>Não foi possível carregar o SDK do Nexo após várias tentativas.</p>
        <p className="mt-2">Verifique se:</p>
        <ul className="list-disc list-inside mt-1">
          <li>Você está acessando o aplicativo a partir do painel da Nuvemshop</li>
          <li>O aplicativo está instalado corretamente na sua loja</li>
          <li>Sua conexão de internet está estável</li>
        </ul>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setLoadRetries(0)}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!scriptLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner text="Carregando SDK do Nexo..." />
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
