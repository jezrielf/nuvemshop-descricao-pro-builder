import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import { useTemplateStore } from '@/store/templates';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

// Adicionamos o diretório public/tutorial para as imagens do tutorial
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
  
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <Header />
      
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
