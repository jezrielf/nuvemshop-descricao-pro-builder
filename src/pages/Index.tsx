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
import { CheckCircle2, LogOut, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import FirstAccessTutorial from '@/components/tutorial/FirstAccessTutorial';
import { detectAuthCode, clearAuthCodeFromUrl } from '@/components/Nuvemshop/utils/authOperations';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { NimbusToggle } from '@/components/Nuvemshop/components/NimbusToggle';
import { useNimbusUI } from '@/components/Nuvemshop/NimbusProvider';
import { NimbusBadge, NimbusButton, NimbusAlert } from '@/components/Nuvemshop/NimbusProvider';

const Index = () => {
  console.log("Index page renderizada");
  const { loadTemplates, templates } = useTemplateStore();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<NuvemshopProduct | null>(null);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [hasDbError, setHasDbError] = useState(false);
  const { 
    success: storeConnected, 
    storeName, 
    userId: storeId, 
    handleConnect: handleConnectNuvemshop,
    handleDisconnect: handleDisconnectNuvemshop,
    tryAutoAuthentication,
    handleTestCode
  } = useNuvemshopAuth();
  
  const { useNimbusUI } = useNimbusUI();
  
  useEffect(() => {
    // Verificar se há um código de autorização na URL
    const authCode = detectAuthCode();
    if (authCode) {
      console.log("Código de autorização detectado no /editor:", authCode);
      handleTestCode(authCode);
      clearAuthCodeFromUrl();
    }
    
    // Garantir que temos templates disponíveis tanto no desenvolvimento quanto em produção
    const initializeTemplates = async () => {
      try {
        setIsLoadingTemplates(true);
        console.log("Iniciando carregamento de templates na página inicial");
        const loadedTemplates = await loadTemplates();
        console.log("Templates carregados na inicialização:", loadedTemplates.length);
        
        if (loadedTemplates.length > 0) {
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
      } catch (error: any) {
        console.error("Erro ao carregar templates:", error);
        
        // Check for database recursion error
        if (error.code === '42P17' && error.message?.includes('infinite recursion')) {
          setHasDbError(true);
          toast({
            title: "Erro de permissões no banco de dados",
            description: "Detectado erro de recursão infinita na tabela 'user_roles'. Algumas funcionalidades estarão limitadas.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro ao carregar templates",
            description: "Não foi possível carregar os templates. Algumas funcionalidades podem estar indisponíveis.",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoadingTemplates(false);
      }
    };
    
    initializeTemplates();
    
    // Configura um intervalo para verificar atualizações de templates a cada 5 minutos
    const templateRefreshInterval = setInterval(() => {
      loadTemplates()
        .then(templates => console.log("Templates atualizados no background:", templates.length))
        .catch(err => console.error("Erro ao atualizar templates no background:", err));
    }, 5 * 60 * 1000); // 5 minutos
    
    // Limpar o intervalo quando o componente for desmontado
    return () => {
      clearInterval(templateRefreshInterval);
    };
  }, [loadTemplates]);

  // Log sempre que os templates mudam
  useEffect(() => {
    console.log(`Index - Templates disponíveis: ${templates.length}`);
  }, [templates]);

  const handleNuvemshopDisconnect = () => {
    handleDisconnectNuvemshop();
    toast({
      title: 'Nuvemshop Desconectada',
      description: 'Sua loja Nuvemshop foi desconectada com sucesso.',
    });
  };
  
  // Função para renderizar informações da loja conectada
  const renderStoreInfo = () => {
    if (storeName) {
      return `Conectado com ${storeName}`;
    } else if (storeId) {
      return `Conectado (ID: ${storeId})`;
    }
    return "Conectado";
  };
  
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <Header />
      
      {hasDbError && (
        useNimbusUI ? (
          <NimbusAlert variant="warning" className="mx-4 mt-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            Detectado erro de recursão infinita na tabela "user_roles". Algumas funcionalidades estarão limitadas.
            Contate o administrador do sistema para corrigir as políticas de segurança no banco de dados.
          </NimbusAlert>
        ) : (
          <Alert variant="warning" className="mx-4 mt-2 bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              Detectado erro de recursão infinita na tabela "user_roles". Algumas funcionalidades estarão limitadas.
              Contate o administrador do sistema para corrigir as políticas de segurança no banco de dados.
            </AlertDescription>
          </Alert>
        )
      )}
      
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <ProductSearch onProductSelect={setSelectedProduct} />
          </div>
          <NimbusToggle className="ml-4" />
        </div>
        
        {storeConnected ? (
          <div className="flex items-center gap-4">
            {useNimbusUI ? (
              <>
                <NimbusBadge variant="success" className="bg-green-100">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  {renderStoreInfo()}
                </NimbusBadge>
                <NimbusButton variant="danger" size="small" onClick={handleNuvemshopDisconnect}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Desconectar
                </NimbusButton>
              </>
            ) : (
              <>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  {renderStoreInfo()}
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
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {useNimbusUI ? (
              <NimbusButton 
                variant="secondary" 
                size="small" 
                onClick={() => handleConnectNuvemshop()}
              >
                Conectar Nuvemshop
              </NimbusButton>
            ) : (
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
            )}
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
            <Editor selectedProduct={selectedProduct} />
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
      
      <FirstAccessTutorial />
    </div>
  );
};

export default Index;
