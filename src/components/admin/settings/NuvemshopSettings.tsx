
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NimbusAuthStatus } from '@/components/Nimbus/components/NimbusAuthStatus';
import { NexoStatus } from '@/components/Nimbus/components/NexoStatus';

interface NuvemshopSettingsProps {
  settings: {
    clientId: string;
    clientSecret: string;
  };
  onSettingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NuvemshopSettings: React.FC<NuvemshopSettingsProps> = ({
  settings,
  onSettingChange,
}) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Configurações salvas',
      description: 'As configurações da Nuvemshop foram atualizadas com sucesso.'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrações E-commerce</CardTitle>
        <CardDescription>
          Configure suas integrações com plataformas de e-commerce
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="nuvemshop">
          <TabsList>
            <TabsTrigger value="nuvemshop">Nuvemshop</TabsTrigger>
            <TabsTrigger value="nimbus">Nimbus</TabsTrigger>
            <TabsTrigger value="nexo">Nexo</TabsTrigger>
          </TabsList>

          <TabsContent value="nuvemshop">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span>Configurações da Nuvemshop</span>
                <Link 
                  to="/nuvemshop-connect" 
                  className="text-sm text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <span>Ir para página de conexão</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clientId">Client ID</Label>
                  <Input 
                    id="clientId" 
                    name="clientId" 
                    value={settings.clientId} 
                    onChange={onSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clientSecret">Client Secret</Label>
                  <Input 
                    id="clientSecret" 
                    name="clientSecret" 
                    type="password"
                    value={settings.clientSecret} 
                    onChange={onSettingChange}
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md text-blue-800 text-sm mt-4">
                <p><strong>Informações importantes:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>O redirecionamento deve ser para: <code>https://descricaopro.com.br</code></li>
                  <li>Não compartilhe seu Client Secret com terceiros</li>
                  <li>Para testar a integração, use a página "Conectar Nuvemshop"</li>
                </ul>
              </div>
              
              <Button className="mt-4" onClick={handleSave}>
                Salvar Configurações
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="nimbus">
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Status da Integração Nimbus</h3>
                <NimbusAuthStatus />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md text-blue-800 text-sm">
                <p><strong>Informações sobre a integração Nimbus:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>A integração com a Nimbus está em fase de testes</li>
                  <li>Para mais informações, entre em contato com o suporte</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nexo">
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Status da Integração Nexo</h3>
                <NexoStatus />
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <Button 
                  onClick={() => window.open('/nexo', '_blank')} 
                  variant="outline"
                  className="flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir App no Nexo
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md text-blue-800 text-sm">
                <p><strong>Informações sobre a integração Nexo:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>O Nexo permite que a aplicação seja executada dentro do painel administrativo da Nuvemshop</li>
                  <li>Para usar o Nexo, você precisa instalar o aplicativo na sua loja Nuvemshop</li>
                  <li>Depois da instalação, esta aplicação estará disponível diretamente no seu painel Nuvemshop</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
