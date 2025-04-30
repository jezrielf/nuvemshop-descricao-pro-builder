
import React, { useEffect, useRef } from 'react';
import { useNexo } from '@/components/Nuvemshop/NexoProvider';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useNimbusUI } from '@/components/Nuvemshop/NimbusProvider';
import { NimbusButton } from '@/components/Nuvemshop/NimbusProvider';
import { Spinner } from '@/components/ui/spinner';

const NexoAdmin: React.FC = () => {
  const { nexo, isNexoLoaded, nexoError } = useNexo();
  const { success: isAuthenticated, accessToken, userId } = useNuvemshopAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { useNimbusUI: isNimbusUIActive } = useNimbusUI();

  useEffect(() => {
    if (isNexoLoaded && isAuthenticated && containerRef.current) {
      try {
        // Mount Nexo to container
        nexo.mount({
          target: containerRef.current,
          module: 'products', // Default to products module
          config: {
            // Additional configuration here
            theme: isNimbusUIActive ? 'nimbus' : 'default'
          }
        });
        
        console.log('Nexo mounted successfully');
        
        // Clean up on unmount
        return () => {
          if (nexo) {
            nexo.unmount();
          }
        };
      } catch (error) {
        console.error('Error mounting Nexo:', error);
      }
    }
  }, [isNexoLoaded, isAuthenticated, nexo, isNimbusUIActive]);

  if (!isAuthenticated) {
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
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar Nexo</h1>
        <p className="text-gray-600 mb-6">{nexoError.message}</p>
        {isNimbusUIActive ? (
          <NimbusButton onClick={() => navigate('/editor')}>
            Voltar ao Editor
          </NimbusButton>
        ) : (
          <Button onClick={() => navigate('/editor')}>
            Voltar ao Editor
          </Button>
        )}
      </div>
    );
  }

  if (!isNexoLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner className="h-12 w-12 mb-4" />
        <p className="text-gray-600">Carregando ambiente de administração...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Administração Nuvemshop</h1>
        {isNimbusUIActive ? (
          <NimbusButton variant="secondary" size="small" onClick={() => navigate('/editor')}>
            Voltar ao Editor
          </NimbusButton>
        ) : (
          <Button variant="outline" onClick={() => navigate('/editor')}>
            Voltar ao Editor
          </Button>
        )}
      </div>
      <div ref={containerRef} className="flex-1 overflow-hidden" />
    </div>
  );
};

export default NexoAdmin;
