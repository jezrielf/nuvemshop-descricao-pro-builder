
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface EmailSettingsProps {
  settings: {
    smtpServer: string;
    smtpPort: string;
    smtpUsername: string;
    smtpPassword: string;
    senderEmail: string;
    senderName: string;
  };
  onSettingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailSettings: React.FC<EmailSettingsProps> = ({
  settings,
  onSettingChange,
}) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Configurações salvas',
      description: 'As configurações de email foram atualizadas com sucesso.'
    });
  };

  return (
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
              value={settings.smtpServer} 
              onChange={onSettingChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="smtpPort">Porta SMTP</Label>
            <Input 
              id="smtpPort" 
              name="smtpPort" 
              value={settings.smtpPort} 
              onChange={onSettingChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="smtpUsername">Usuário SMTP</Label>
            <Input 
              id="smtpUsername" 
              name="smtpUsername" 
              value={settings.smtpUsername} 
              onChange={onSettingChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="smtpPassword">Senha SMTP</Label>
            <Input 
              id="smtpPassword" 
              name="smtpPassword" 
              type="password"
              value={settings.smtpPassword} 
              onChange={onSettingChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="senderEmail">Email do Remetente</Label>
            <Input 
              id="senderEmail" 
              name="senderEmail" 
              type="email"
              value={settings.senderEmail} 
              onChange={onSettingChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="senderName">Nome do Remetente</Label>
            <Input 
              id="senderName" 
              name="senderName" 
              value={settings.senderName} 
              onChange={onSettingChange}
            />
          </div>
        </div>
        
        <Button className="mt-4" onClick={handleSave}>
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
};
