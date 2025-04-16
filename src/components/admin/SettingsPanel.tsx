
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralSettings } from './settings/GeneralSettings';
import { EmailSettings } from './settings/EmailSettings';
import { IntegrationSettings } from './settings/IntegrationSettings';
import { NuvemshopSettings } from './settings/NuvemshopSettings';

const SettingsPanel: React.FC = () => {
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
  
  const [nuvemshopSettings, setNuvemshopSettings] = useState({
    clientId: "17194",
    clientSecret: "148c58e8c8e6280d3bc15230ff6758dd3a9ce4fad34d4d0b"
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
  
  const handleNuvemshopSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuvemshopSettings({
      ...nuvemshopSettings,
      [name]: value
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
          <TabsTrigger value="nuvemshop">Nuvemshop</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <GeneralSettings
            settings={generalSettings}
            onSettingChange={handleGeneralSettingChange}
            onSwitchChange={handleSwitchChange}
          />
        </TabsContent>
        
        <TabsContent value="email">
          <EmailSettings
            settings={emailSettings}
            onSettingChange={handleEmailSettingChange}
          />
        </TabsContent>
        
        <TabsContent value="integration">
          <IntegrationSettings
            settings={integrationSettings}
            onSettingChange={handleIntegrationSettingChange}
            onSwitchChange={handleSwitchChange}
          />
        </TabsContent>
        
        <TabsContent value="nuvemshop">
          <NuvemshopSettings
            settings={nuvemshopSettings}
            onSettingChange={handleNuvemshopSettingChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
