
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
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { Button } from '@/components/ui/button';

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
  const { loadTemplates, templates } = useTemplateStore();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<NuvemshopProduct | null>(null);
  const [templatesLoaded, setTemplatesLoaded] = useState(false);
  const { 
    success: storeConnected, 
    storeName, 
    userId: storeId, 
    handleConnect: handleConnectNuvemshop,
    handleDisconnect: handleDisconnectNuvemshop
  } = useNuvemshopAuth();
  
  // Carrega os templates na inicialização e força recarregamento
  useEffect(() => {
    // Função para carregar templates com retry
    const loadTemplatesWithRetry = async (retryCount = 0) => {
      try {
        console.log(`Tentando carregar templates (tentativa ${retryCount + 1})`);
        await loadTemplates();
        console.log(`Templates carregados com sucesso: ${templates.length} templates disponíveis`);
        
        if (templates.length === 0 && retryCount < 3) {
          // Se não há templates e ainda temos tentativas, tente novamente após um delay
          console.log(`Nenhum template encontrado, tentando novamente em 1 segundo...`);
          setTimeout(() => loadTemplatesWithRetry(retryCount + 1), 1000);
        } else {
          setTemplatesLoaded(true);
        }
      } catch (error) {
        console.error("Erro ao carregar templates:", error);
        
        if (retryCount < 3) {
          // Tentar novamente após um delay exponencial
          const delay = Math.pow(2, retryCount) * 1000;
          console.log(`Erro ao carregar templates, tentando novamente em ${delay/1000} segundos...`);
          setTimeout(() => loadTemplatesWithRetry(retryCount + 1), delay);
        } else {
          toast({
            title: "Erro ao carregar templates",
            description: "Tente atualizar a página ou entre em contato com o suporte.",
            variant: "destructive",
          });
        }
      }
    };
    
    // Iniciar processo de carregamento
    loadTemplatesWithRetry();
    
    // Pré-carrega as imagens do tutorial
    placeholderImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // Verifica atualizações a cada 5 minutos
    const templateRefreshInterval = setInterval(() => {
      loadTemplates()
        .then(() => console.log("Templates atualizados no background"))
        .catch(err => console.error("Erro ao atualizar templates no background:", err));
    }, 5 * 60 * 1000);
    
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
