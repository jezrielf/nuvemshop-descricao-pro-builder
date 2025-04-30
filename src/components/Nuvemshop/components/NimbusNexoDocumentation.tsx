
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNimbusUI } from '../NimbusProvider';
import { NimbusButton } from '../NimbusProvider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Globe, LayoutDashboard, Palette } from 'lucide-react';

export const NimbusNexoDocumentation: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { useNimbusUI: isNimbusUIActive } = useNimbusUI();

  return (
    <div className={`p-4 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600" />
            Integração Nuvemshop
          </CardTitle>
          <CardDescription>
            Guia completo sobre a integração com Nimbus UI e Nexo Admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what-is">
              <AccordionTrigger className="text-left">
                O que é Nimbus UI e Nexo Admin?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  <strong>Nimbus UI</strong> é o sistema de design da Nuvemshop que permite uma 
                  experiência visual consistente com a plataforma Nuvemshop.
                </p>
                <p>
                  <strong>Nexo Admin</strong> é a interface administrativa da Nuvemshop integrada 
                  que permite gerenciar seus produtos e lojas diretamente do seu aplicativo.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="nimbus-toggle">
              <AccordionTrigger className="text-left">
                Como alternar entre temas?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Você pode alternar entre o tema padrão e o Nimbus UI usando o interruptor Nimbus UI 
                  no cabeçalho do aplicativo. Sua preferência será salva e restaurada automaticamente 
                  quando você voltar ao aplicativo.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="nexo-admin">
              <AccordionTrigger className="text-left">
                Como acessar o Nexo Admin?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  Depois de conectar sua loja Nuvemshop, você pode acessar o Nexo Admin de duas maneiras:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Clicando no botão "Admin Nuvemshop" no cabeçalho.</li>
                  <li>Navegando para a rota "/nexo-admin" do aplicativo.</li>
                </ul>
                <p className="mt-3">
                  O Nexo Admin permite gerenciar seus produtos, pedidos, clientes e configurações 
                  sem sair do aplicativo.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="switching-modules">
              <AccordionTrigger className="text-left">
                Como alternar entre módulos no Nexo Admin?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  No Nexo Admin, você pode alternar entre diferentes módulos usando a barra de navegação no topo:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Produtos</strong>: Gerenciar produtos da sua loja.</li>
                  <li><strong>Pedidos</strong>: Visualizar e gerenciar pedidos.</li>
                  <li><strong>Clientes</strong>: Administrar cadastros de clientes.</li>
                  <li><strong>Configurações</strong>: Ajustar configurações da loja.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="troubleshooting">
              <AccordionTrigger className="text-left">
                Resolução de problemas
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">Se você encontrar problemas com a integração, tente:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Verificar se sua loja Nuvemshop está conectada corretamente.</li>
                  <li>Clicar no botão "Tentar novamente" se o Nexo Admin não carregar.</li>
                  <li>Desconectar e reconectar sua loja Nuvemshop se persistirem os problemas.</li>
                  <li>Verificar se você tem permissões adequadas na sua conta Nuvemshop.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="text-sm">Integração configurada e pronta para uso</span>
            </div>
            
            {isNimbusUIActive ? (
              <div className="flex gap-2">
                <NimbusButton 
                  variant="secondary" 
                  size="small"
                  onClick={() => window.open('https://developers.nuvemshop.com.br/docs/nexo', '_blank')}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Documentação Nexo
                </NimbusButton>
                <NimbusButton 
                  variant="primary" 
                  size="small" 
                  onClick={() => window.location.href = '/nexo-admin'}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Acessar Nexo Admin
                </NimbusButton>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://developers.nuvemshop.com.br/docs/nexo', '_blank')}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Documentação Nexo
                </Button>
                <Button onClick={() => window.location.href = '/nexo-admin'}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Acessar Nexo Admin
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
