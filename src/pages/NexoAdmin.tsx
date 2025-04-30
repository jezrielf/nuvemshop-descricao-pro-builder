
import React, { useEffect, useRef, useState } from 'react';
import { useNexo } from '@/components/Nuvemshop/NexoProvider';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useNimbusUI } from '@/components/Nuvemshop/NimbusProvider';
import { NimbusButton, NimbusAlert } from '@/components/Nuvemshop/NimbusProvider';
import { Spinner } from '@/components/ui/spinner';
import { NimbusToggle } from '@/components/Nuvemshop/components/NimbusToggle';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Menu modules available in Nexo
const NEXO_MODULES = [
  { id: 'products', name: 'Produtos' },
  { id: 'orders', name: 'Pedidos' },
  { id: 'customers', name: 'Clientes' },
  { id: 'settings', name: 'Configurações' },
];

const NexoAdmin: React.FC = () => {
  const { nexo, isNexoLoaded, nexoError, isInitializing, retryLoading, isEmbedded } = useNexo();
  const { success: isAuthenticated, accessToken, userId, storeName } = useNuvemshopAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { useNimbusUI: isNimbusUIActive } = useNimbusUI();
  const [activeModule, setActiveModule] = useState<string>('products');
  const [isMounting, setIsMounting] = useState(false);
  const { toast } = useToast();

  // Handle module switching
  const handleModuleChange = (moduleId: string) => {
    if (activeModule === moduleId) return;
    
    setActiveModule(moduleId);
    setIsMounting(true);
    
    if (nexo && containerRef.current) {
      try {
        nexo.unmount();
        nexo.mount({
          target: containerRef.current,
          module: moduleId,
          config: {
            theme: isNimbusUIActive ? 'nimbus' : 'default'
          }
        });
        
        toast({
          title: 'Módulo alterado',
          description: `Carregando módulo: ${NEXO_MODULES.find(m => m.id === moduleId)?.name}`,
        });
        
        setTimeout(() => setIsMounting(false), 500);
      } catch (error) {
        console.error(`Error switching to module ${moduleId}:`, error);
        setIsMounting(false);
        
        toast({
          variant: 'destructive',
          title: 'Erro ao carregar módulo',
          description: 'Não foi possível carregar o módulo selecionado.',
        });
      }
    }
  };

  // Mount Nexo when ready
  useEffect(() => {
    // Determine if we have auth (either via token or embedded mode)
    const hasAuth = isEmbedded || isAuthenticated;
    
    if (isNexoLoaded && hasAuth && containerRef.current) {
      try {
        setIsMounting(true);
        
        // Mount Nexo to container
        nexo.mount({
          target: containerRef.current,
          module: activeModule,
          config: {
            theme: isNimbusUIActive ? 'nimbus' : 'default'
          }
        });
        
        console.log('Nexo mounted successfully');
        setIsMounting(false);
        
        // Clean up on unmount
        return () => {
          if (nexo) {
            nexo.unmount();
          }
        };
      } catch (error) {
        console.error('Error mounting Nexo:', error);
        setIsMounting(false);
      }
    }
  }, [isNexoLoaded, isAuthenticated, nexo, isNimbusUIActive, isEmbedded]);

  // Retry handler for manual retry
  const handleRetry = () => {
    retryLoading();
    toast({
      title: 'Reconectando',
      description: 'Tentando conectar-se novamente ao Nexo...',
    });
  };

  // In embedded mode, we don't show login requirements
  if (!isAuthenticated && !isEmbedded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <h1 className="text-2xl font-bold mb-4">Conexão com Nuvemshop necessária</h1>
        <p className="text-gray-600 mb-6">Para acessar o ambiente de administração, conecte sua loja Nuvemshop.</p>
        {isNimbusUIActive ? (
          <NimbusButton onClick={() => navigate('/nuvemshop-connect')}>
            Conectar Nuvemshop
          </NimbusButton>
        ) : (
          <Button onClick={() => navigate('/nuvemshop-connect')}>
            Conectar Nuvemshop
          </Button>
        )}
      </div>
    );
  }

  if (nexoError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar Nexo</h1>
        <p className="text-gray-600 mb-6">{nexoError.message}</p>
        
        <div className="flex gap-4">
          {isNimbusUIActive ? (
            <>
              <NimbusButton variant="primary" onClick={handleRetry}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar novamente
              </NimbusButton>
              {!isEmbedded && (
                <NimbusButton variant="secondary" onClick={() => navigate('/editor')}>
                  Voltar ao Editor
                </NimbusButton>
              )}
            </>
          ) : (
            <>
              <Button onClick={handleRetry}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar novamente
              </Button>
              {!isEmbedded && (
                <Button variant="outline" onClick={() => navigate('/editor')}>
                  Voltar ao Editor
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  if (!isNexoLoaded || isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner className="h-12 w-12 mb-4" />
        <p className="text-gray-600">{isEmbedded ? 'Carregando aplicativo no admin da Nuvemshop...' : 'Carregando ambiente de administração...'}</p>
        {storeName && (
          <p className="text-gray-500 mt-2">Conectado à loja: {storeName}</p>
        )}
      </div>
    );
  }

  // In embedded mode, use a simpler header without back button
  if (isEmbedded) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex flex-col sm:flex-row items-center justify-between p-2 border-b bg-gray-50">
          <div className="flex items-center mb-2 sm:mb-0">
            <h1 className="text-lg font-medium mr-2">
              DescriçãoPro
            </h1>
            
            <NimbusToggle className="ml-2" />
          </div>
          
          <div className="flex overflow-x-auto space-x-2 pb-1">
            {NEXO_MODULES.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(module.id)}
                className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors ${
                  activeModule === module.id
                    ? isNimbusUIActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-200 text-gray-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {module.name}
              </button>
            ))}
          </div>
        </div>
        
        {isMounting ? (
          <div className="flex-1 flex items-center justify-center">
            <Spinner className="h-10 w-10" />
          </div>
        ) : (
          <div ref={containerRef} className="flex-1 overflow-hidden" />
        )}
      </div>
    );
  }

  // Regular standalone mode
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-xl font-bold mr-4">
            {storeName || 'Nuvemshop Admin'}
          </h1>
          
          <NimbusToggle className="ml-2" />
        </div>
        
        <div className="flex items-center space-x-2">
          {isNimbusUIActive ? (
            <NimbusButton variant="secondary" size="small" onClick={() => navigate('/editor')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Editor
            </NimbusButton>
          ) : (
            <Button variant="outline" onClick={() => navigate('/editor')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Editor
            </Button>
          )}
        </div>
      </div>
      
      {/* Module Navigation */}
      <div className="border-b px-4 py-2 bg-white">
        <div className="flex overflow-x-auto space-x-2 pb-1">
          {NEXO_MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleChange(module.id)}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                activeModule === module.id
                  ? isNimbusUIActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-200 text-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {module.name}
            </button>
          ))}
        </div>
      </div>
      
      {isMounting ? (
        <div className="flex-1 flex items-center justify-center">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <div ref={containerRef} className="flex-1 overflow-hidden" />
      )}
    </div>
  );
};

export default NexoAdmin;
