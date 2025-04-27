import React, { useEffect, useState, memo } from 'react';
import Header from '@/components/Header';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import { useTemplateStore } from '@/store/templates';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import ProductSearch from '@/components/Nuvemshop/components/ProductSearch';
import ProductEditorController from '@/components/Nuvemshop/components/ProductEditorController';
import { NuvemshopProduct } from '@/components/Nuvemshop/types';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import FirstAccessTutorial from '@/components/tutorial/FirstAccessTutorial';
import { detectAuthCode, clearAuthCodeFromUrl } from '@/components/Nuvemshop/utils/authOperations';
import { Suspense, lazy } from 'react';

// Lazy-loaded components
const ProductEditorControllerLazy = lazy(() => 
  import('@/components/Nuvemshop/components/ProductEditorController')
);

// Memoized components for better performance
const NuvemshopConnectionStatus = memo(({ 
  storeConnected, 
  storeName, 
  storeId,
  onDisconnect 
}: {
  storeConnected: boolean;
  storeName: string | null;
  storeId: string | number | null;
  onDisconnect: () => void;
}) => {
  if (!storeConnected) return null;

  // Format storeId to string display
  const storeIdFormatted = storeId ? String(storeId) : 'N/A';
  const storeDisplayName = storeName || (storeId ? `ID ${storeIdFormatted}` : 'Loja conectada');
  
  return (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="bg-green-100 text-green-800">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Conectado: {storeDisplayName}
      </Badge>
      <Button 
        variant="destructive" 
        size="sm" 
        onClick={onDisconnect}
        className="flex items-center text-xs h-7"
      >
        <LogOut className="h-3 w-3 mr-1" />
        Desconectar
      </Button>
    </div>
  );
});

// Memoized components for better performance
const NuvemshopConnectButton = memo(({ onConnect }: { onConnect: (e: React.MouseEvent) => void }) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onConnect}
      className="text-green-600 border-green-300 hover:bg-green-50 h-7 text-xs"
    >
      Conectar Nuvemshop
    </Button>
  );
});

const Index = () => {
  const { loadTemplates } = useTemplateStore();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<NuvemshopProduct | null>(null);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [hasLoadedTemplates, setHasLoadedTemplates] = useState(false);
  const { 
    success: storeConnected, 
    storeName, 
    userId: storeId, 
    handleConnect: handleConnectNuvemshop,
    handleDisconnect: handleDisconnectNuvemshop,
    tryAutoAuthentication,
    handleTestCode
  } = useNuvemshopAuth();
  
  useEffect(() => {
    // Check for auth code in URL
    const authCode = detectAuthCode();
    if (authCode) {
      handleTestCode(authCode);
      clearAuthCodeFromUrl();
    }
    
    // Only load templates once to prevent loops
    if (!hasLoadedTemplates) {
      const initializeTemplates = async () => {
        try {
          setIsLoadingTemplates(true);
          const loadedTemplates = await loadTemplates();
          
          if (loadedTemplates && loadedTemplates.length > 0) {
            toast({
              title: "Templates carregados",
              description: `${loadedTemplates.length} templates disponíveis`,
            });
          } else {
            toast({
              title: "Atenção",
              description: "Problemas ao carregar templates. Tente atualizar a página.",
              variant: "destructive",
            });
          }
          setHasLoadedTemplates(true);
        } catch (error) {
          console.error("Erro ao carregar templates:", error);
          toast({
            title: "Erro ao carregar templates",
            description: "Não foi possível carregar os templates. Algumas funcionalidades podem estar indisponíveis.",
            variant: "destructive",
          });
        } finally {
          setIsLoadingTemplates(false);
        }
      };
      
      initializeTemplates();
    }
  }, [loadTemplates, toast, handleTestCode, hasLoadedTemplates]);

  const handleNuvemshopDisconnect = () => {
    handleDisconnectNuvemshop();
    toast({
      title: 'Nuvemshop Desconectada',
      description: 'Sua loja Nuvemshop foi desconectada com sucesso.',
    });
  };
  
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <Header />
      
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-b">
        <div className="flex-1">
          <ProductSearch onProductSelect={setSelectedProduct} />
        </div>
        
        {storeConnected ? (
          <NuvemshopConnectionStatus 
            storeConnected={storeConnected} 
            storeName={storeName} 
            storeId={storeId}
            onDisconnect={handleNuvemshopDisconnect}
          />
        ) : (
          <div className="flex items-center">
            <NuvemshopConnectButton 
              onConnect={(e) => {
                e.preventDefault();
                handleConnectNuvemshop();
              }}
            />
          </div>
        )}
      </div>
      
      {selectedProduct && (
        <Suspense fallback={<div className="p-2 text-sm text-center">Carregando...</div>}>
          <ProductEditorControllerLazy product={selectedProduct} />
        </Suspense>
      )}
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup 
          direction={isMobile ? "vertical" : "horizontal"}
          className="h-full max-h-full"
        >
          <ResizablePanel 
            defaultSize={isMobile ? 50 : 50} 
            minSize={isMobile ? 30 : 30} 
            className="editor-area h-full max-h-full overflow-hidden"
          >
            <Editor />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel 
            defaultSize={isMobile ? 50 : 50} 
            minSize={isMobile ? 30 : 30} 
            className="preview-area h-full max-h-full overflow-hidden"
          >
            <Preview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      
      {/* Tutorial de primeiro acesso */}
      <FirstAccessTutorial />
    </div>
  );
};

export default Index;
