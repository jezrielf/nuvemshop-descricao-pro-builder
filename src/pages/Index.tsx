import React, { useEffect, useState } from 'react';
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
import ImageUpload from '@/components/ImageUpload';

const placeholderImages = [
  '/tutorial/welcome.png',
  '/tutorial/add-blocks.png',
  '/tutorial/templates.png',
  '/tutorial/customize.png',
  '/tutorial/preview.png',
  '/tutorial/export.png'
];

const Index = () => {
  console.log("Index page renderizada");
  const { loadTemplates } = useTemplateStore();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<NuvemshopProduct | null>(null);
  const { 
    success: storeConnected, 
    storeName, 
    userId: storeId, 
    handleConnect: handleConnectNuvemshop,
    handleDisconnect: handleDisconnectNuvemshop
  } = useNuvemshopAuth();
  
  useEffect(() => {
    // Carrega os templates iniciais
    const initializeTemplates = async () => {
      try {
        console.log("Iniciando carregamento de templates na página inicial");
        await loadTemplates();
        console.log("Templates carregados na inicialização");
      } catch (error) {
        console.error("Erro ao carregar templates:", error);
        toast({
          title: "Erro ao carregar templates",
          description: "Não foi possível carregar os templates. Algumas funcionalidades podem estar indisponíveis.",
          variant: "destructive",
        });
      }
    };
    
    initializeTemplates();
    
    // Configura um intervalo para verificar atualizações de templates a cada 5 minutos
    const templateRefreshInterval = setInterval(() => {
      loadTemplates()
        .then(() => console.log("Templates atualizados no background"))
        .catch(err => console.error("Erro ao atualizar templates no background:", err));
    }, 5 * 60 * 1000); // 5 minutos
    
    // Pré-carrega as imagens do tutorial
    placeholderImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // Limpar o intervalo quando o componente for desmontado
    return () => {
      clearInterval(templateRefreshInterval);
    };
  }, [loadTemplates]);

  const handleNuvemshopDisconnect = () => {
    handleDisconnectNuvemshop();
    toast({
      title: 'Nuvemshop Desconectada',
      description: 'Sua loja Nuvemshop foi desconectada com sucesso.',
    });
  };
  
  // First, show the image upload component
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <Header />
      
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
        <div className="flex-1">
          <ProductSearch onProductSelect={setSelectedProduct} />
        </div>
        
        {storeConnected ? (
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-100 text-green-800">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              {storeName 
                ? `Conectado com a ${storeName}` 
                : `Conectado com a loja ID: ${storeId}`}
            </Badge>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleNuvemshopDisconnect}
              className="flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Desconectar
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => {
                e.preventDefault();
                handleConnectNuvemshop();
              }}
              className="text-green-600 border-green-300 hover:bg-green-50 h-8"
            >
              Conectar Nuvemshop
            </Button>
          </div>
        )}
      </div>
      
      {selectedProduct && (
        <ProductEditorController product={selectedProduct} />
      )}
      
      {/* Display the image upload component */}
      <div className="p-4 bg-white">
        <ImageUpload />
      </div>
      
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
    </div>
  );
};

export default Index;
