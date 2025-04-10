
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SettingsPanel: React.FC = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Descritor de Produtos',
    maxFreeDescriptions: 3,
    defaultRole: 'user',
    enableRegistration: true
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    senderEmail: '',
    senderName: ''
  });
  
  const [integrationSettings, setIntegrationSettings] = useState({
    enableApiAccess: false,
    apiRateLimit: 100,
    corsOrigins: ''
  });
  
  const handleGeneralSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'number' ? parseInt(value) : value
    });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    if (name.startsWith('general')) {
      const key = name.replace('general.', '');
      setGeneralSettings({
        ...generalSettings,
        [key]: checked
      });
    } else if (name.startsWith('integration')) {
      const key = name.replace('integration.', '');
      setIntegrationSettings({
        ...integrationSettings,
        [key]: checked
      });
    }
  };
  
  const handleEmailSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: value
    });
  };
  
  const handleIntegrationSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setIntegrationSettings({
      ...integrationSettings,
      [name]: type === 'number' ? parseInt(value) : value
    });
  };
  
  const handleSaveSettings = (settingType: string) => {
    // In a real application, this would save to the database
    toast({
      title: 'Configurações salvas',
      description: `As configurações de ${settingType} foram atualizadas com sucesso.`
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configurações do Sistema</h2>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="integration">Integrações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as opções básicas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input 
                    id="siteName" 
                    name="siteName" 
                    value={generalSettings.siteName} 
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxFreeDescriptions">Limite de Descrições Gratuitas</Label>
                  <Input 
                    id="maxFreeDescriptions" 
                    name="maxFreeDescriptions" 
                    type="number" 
                    value={generalSettings.maxFreeDescriptions} 
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultRole">Papel Padrão de Novos Usuários</Label>
                  <Input 
                    id="defaultRole" 
                    name="defaultRole" 
                    value={generalSettings.defaultRole} 
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableRegistration">Habilitar Registro de Usuários</Label>
                    <div className="text-sm text-muted-foreground">
                      Permite que novos usuários se registrem no sistema
                    </div>
                  </div>
                  <Switch 
                    id="enableRegistration"
                    checked={generalSettings.enableRegistration}
                    onCheckedChange={(checked) => handleSwitchChange('general.enableRegistration', checked)}
                  />
                </div>
              </div>
              
              <Button className="mt-4" onClick={() => handleSaveSettings('Geral')}>
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>
                Configure as opções para envio de emails pelo sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">Servidor SMTP</Label>
                  <Input 
                    id="smtpServer" 
                    name="smtpServer" 
                    value={emailSettings.smtpServer} 
                    onChange={handleEmailSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Porta SMTP</Label>
                  <Input 
                    id="smtpPort" 
                    name="smtpPort" 
                    value={emailSettings.smtpPort} 
                    onChange={handleEmailSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">Usuário SMTP</Label>
                  <Input 
                    id="smtpUsername" 
                    name="smtpUsername" 
                    value={emailSettings.smtpUsername} 
                    onChange={handleEmailSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">Senha SMTP</Label>
                  <Input 
                    id="smtpPassword" 
                    name="smtpPassword" 
                    type="password"
                    value={emailSettings.smtpPassword} 
                    onChange={handleEmailSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Email do Remetente</Label>
                  <Input 
                    id="senderEmail" 
                    name="senderEmail" 
                    type="email"
                    value={emailSettings.senderEmail} 
                    onChange={handleEmailSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="senderName">Nome do Remetente</Label>
                  <Input 
                    id="senderName" 
                    name="senderName" 
                    value={emailSettings.senderName} 
                    onChange={handleEmailSettingChange}
                  />
                </div>
              </div>
              
              <Button className="mt-4" onClick={() => handleSaveSettings('Email')}>
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Integração</CardTitle>
              <CardDescription>
                Configure as opções para integração com serviços externos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableApiAccess">Habilitar Acesso à API</Label>
                    <div className="text-sm text-muted-foreground">
                      Permite que aplicações externas acessem a API do sistema
                    </div>
                  </div>
                  <Switch 
                    id="enableApiAccess"
                    checked={integrationSettings.enableApiAccess}
                    onCheckedChange={(checked) => handleSwitchChange('integration.enableApiAccess', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="apiRateLimit">Limite de Requisições da API (por hora)</Label>
                  <Input 
                    id="apiRateLimit" 
                    name="apiRateLimit" 
                    type="number"
                    value={integrationSettings.apiRateLimit} 
                    onChange={handleIntegrationSettingChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="corsOrigins">Origens CORS Permitidas</Label>
                  <Input 
                    id="corsOrigins" 
                    name="corsOrigins" 
                    value={integrationSettings.corsOrigins} 
                    onChange={handleIntegrationSettingChange}
                    placeholder="https://exemplo.com,https://app.exemplo.com"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Separe múltiplas origens com vírgulas
                  </p>
                </div>
              </div>
              
              <Button className="mt-4" onClick={() => handleSaveSettings('Integração')}>
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
