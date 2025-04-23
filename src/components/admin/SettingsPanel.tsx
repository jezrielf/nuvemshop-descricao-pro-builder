
import React from 'react';
import { GeneralSettings } from './settings/GeneralSettings';
import { EmailSettings } from './settings/EmailSettings';
import { IntegrationSettings } from './settings/IntegrationSettings';
import { NuvemshopSettings } from './settings/NuvemshopSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsPanel: React.FC = () => {
  const [generalSettings, setGeneralSettings] = React.useState({
    siteName: 'DescriçãoPRO',
    maxFreeDescriptions: 3,
    defaultRole: 'user',
    enableRegistration: true
  });

  const [emailSettings, setEmailSettings] = React.useState({
    smtpServer: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    senderEmail: '',
    senderName: ''
  });

  const [integrationSettings, setIntegrationSettings] = React.useState({
    enableApiAccess: true,
    apiRateLimit: 1000,
    corsOrigins: ''
  });

  const [nuvemshopSettings, setNuvemshopSettings] = React.useState({
    clientId: '',
    clientSecret: ''
  });

  const handleGeneralSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralSettings(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmailSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailSettings(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleIntegrationSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationSettings(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNuvemshopSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuvemshopSettings(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSwitchChange = (key: string, checked: boolean) => {
    const [section, field] = key.split('.');
    switch (section) {
      case 'general':
        setGeneralSettings(prev => ({ ...prev, [field]: checked }));
        break;
      case 'integration':
        setIntegrationSettings(prev => ({ ...prev, [field]: checked }));
        break;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="integration">Integração</TabsTrigger>
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
