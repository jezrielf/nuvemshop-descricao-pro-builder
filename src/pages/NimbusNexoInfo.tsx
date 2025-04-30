
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useNimbusUI } from '@/components/Nuvemshop/NimbusProvider';
import { NimbusButton } from '@/components/Nuvemshop/NimbusProvider';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { NimbusToggle } from '@/components/Nuvemshop/components/NimbusToggle';
import { NimbusNexoDocumentation } from '@/components/Nuvemshop/components/NimbusNexoDocumentation';
import { ArrowLeft, Globe, Home } from 'lucide-react';

const NimbusNexoInfo: React.FC = () => {
  const { useNimbusUI: isNimbusUIActive } = useNimbusUI();
  const { success: storeConnected } = useNuvemshopAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              <h1 className="text-xl font-bold">Descrição Pro</h1>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <NimbusToggle />
            
            {isNimbusUIActive ? (
              <NimbusButton 
                variant="secondary" 
                size="small" 
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </NimbusButton>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-2 text-blue-600" />
            Documentação da Integração Nuvemshop
          </h1>
          
          <div className="space-y-8">
            {/* Main documentation component */}
            <NimbusNexoDocumentation />
            
            {/* Additional info sections */}
            <section className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Visão Geral da Integração</h2>
              <p className="text-gray-700 mb-4">
                A integração com a Nuvemshop oferece dois componentes principais:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 bg-blue-50">
                  <h3 className="font-medium text-lg mb-2">Nimbus UI</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Sistema de design consistente com a interface da Nuvemshop, permitindo uma 
                    experiência visual integrada entre seu aplicativo e a plataforma Nuvemshop.
                  </p>
                  <div className="flex justify-end">
                    <NimbusToggle showIcon={false} />
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-green-50">
                  <h3 className="font-medium text-lg mb-2">Nexo Admin</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Interface administrativa completa da Nuvemshop integrada ao seu aplicativo,
                    permitindo gerenciar produtos, pedidos e configurações sem sair do aplicativo.
                  </p>
                  <div className="flex justify-end">
                    {storeConnected ? (
                      isNimbusUIActive ? (
                        <Link to="/nexo-admin">
                          <NimbusButton variant="secondary" size="small">
                            Acessar Nexo Admin
                          </NimbusButton>
                        </Link>
                      ) : (
                        <Link to="/nexo-admin">
                          <Button variant="outline" size="sm">
                            Acessar Nexo Admin
                          </Button>
                        </Link>
                      )
                    ) : (
                      isNimbusUIActive ? (
                        <Link to="/nuvemshop-connect">
                          <NimbusButton variant="secondary" size="small">
                            Conectar Loja
                          </NimbusButton>
                        </Link>
                      ) : (
                        <Link to="/nuvemshop-connect">
                          <Button variant="outline" size="sm">
                            Conectar Loja
                          </Button>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/editor">
                {isNimbusUIActive ? (
                  <NimbusButton variant="primary" size="medium">
                    Voltar ao Editor
                  </NimbusButton>
                ) : (
                  <Button>
                    Voltar ao Editor
                  </Button>
                )}
              </Link>
              
              {storeConnected ? (
                <Link to="/nexo-admin">
                  {isNimbusUIActive ? (
                    <NimbusButton variant="secondary" size="medium">
                      Acessar Nexo Admin
                    </NimbusButton>
                  ) : (
                    <Button variant="outline">
                      Acessar Nexo Admin
                    </Button>
                  )}
                </Link>
              ) : (
                <Link to="/nuvemshop-connect">
                  {isNimbusUIActive ? (
                    <NimbusButton variant="secondary" size="medium">
                      Conectar Nuvemshop
                    </NimbusButton>
                  ) : (
                    <Button variant="outline">
                      Conectar Nuvemshop
                    </Button>
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NimbusNexoInfo;
