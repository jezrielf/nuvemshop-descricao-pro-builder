
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Palette } from 'lucide-react';
import { NimbusHeader } from '@/components/Nuvemshop/components/header/NimbusHeader';
import { NimbusButton } from '@/components/Nuvemshop/NimbusProvider';
import { NimbusNexoDocumentation } from '@/components/Nuvemshop/components/NimbusNexoDocumentation';
import { logEmbeddedEnvironmentInfo, isEmbeddedInNuvemshop } from '@/components/Nuvemshop/utils/embedUtils';

const NimbusNexoInfo: React.FC = () => {
  const navigate = useNavigate();
  const isEmbedded = isEmbeddedInNuvemshop();
  
  React.useEffect(() => {
    // Log embedded environment information on component mount
    if (isEmbedded) {
      logEmbeddedEnvironmentInfo();
    }
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NimbusHeader showStoreName />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-6 w-6" />
                  Design System Nimbus
                </CardTitle>
                <CardDescription>
                  Integração e compatibilidade com o design system da Nuvemshop
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  O Nimbus é o sistema de design da Nuvemshop, permitindo que
                  sua aplicação tenha a aparência nativa do ecossistema Nuvemshop.
                </p>
                
                <p className="text-sm text-gray-600">
                  O Nimbus UI está ativado para uma experiência integrada com o ecossistema Nuvemshop.
                </p>
                
                <div className="mt-4 flex space-x-4">
                  <NimbusButton 
                    variant="secondary" 
                    onClick={() => navigate('/nuvemshop-connect')}
                  >
                    Conectar Nuvemshop
                  </NimbusButton>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Nexo SDK</CardTitle>
                <CardDescription>
                  Integração com o ambiente de administração da Nuvemshop
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  O Nexo SDK permite que sua aplicação se integre perfeitamente ao
                  ambiente de administração da Nuvemshop, oferecendo acesso a produtos,
                  pedidos, clientes e configurações.
                </p>
                
                <div className="mt-4 flex space-x-4">
                  <NimbusButton 
                    variant="primary" 
                    onClick={() => navigate('/nexo-admin')}
                  >
                    Abrir Admin Nexo
                  </NimbusButton>
                  <NimbusButton 
                    variant="secondary" 
                    onClick={() => window.open('https://dev.nuvemshop.com.br/docs/developer-tools/nexo', '_blank')}
                  >
                    Documentação <ExternalLink className="h-4 w-4 ml-1" />
                  </NimbusButton>
                </div>
              </CardContent>
            </Card>
            
            {isEmbedded && (
              <Card className="border-green-300 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-700">Modo Embarcado Detectado</CardTitle>
                  <CardDescription>
                    Este aplicativo está sendo executado dentro do admin da Nuvemshop
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-green-700">
                    O aplicativo detectou que está sendo executado no ambiente embarcado da Nuvemshop.
                    A autenticação via token de sessão será usada automaticamente.
                  </p>
                  
                  <div className="mt-4">
                    <NimbusButton 
                      variant="primary" 
                      onClick={() => navigate('/nexo-admin')}
                    >
                      Acessar Funcionalidades do App
                    </NimbusButton>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="md:col-span-1">
            <NimbusNexoDocumentation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NimbusNexoInfo;
