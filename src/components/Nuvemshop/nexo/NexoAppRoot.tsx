
import React from 'react';
import { NexoProvider } from './NexoProvider';
import { NexoLayout } from './NexoLayout';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import ProductSearch from '@/components/Nuvemshop/components/ProductSearch';
import ProductEditorController from '@/components/Nuvemshop/components/ProductEditorController';
import { NuvemshopProduct } from '@/components/Nuvemshop/types';
import { useState } from 'react';
import { useNexoAuth } from '../hooks/useNexoAuth';

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
      <NexoProvider>
        <TooltipProvider>
          <NexoLayout>
            <NexoAppContent />
          </NexoLayout>
          <Toaster />
        </TooltipProvider>
      </NexoProvider>
    </QueryClientProvider>
  );
};
