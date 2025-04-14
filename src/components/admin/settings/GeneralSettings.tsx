
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface GeneralSettingsProps {
  settings: {
    siteName: string;
    maxFreeDescriptions: number;
    defaultRole: string;
    enableRegistration: boolean;
  };
  onSettingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchChange: (name: string, checked: boolean) => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  settings,
  onSettingChange,
  onSwitchChange,
}) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Configurações salvas',
      description: 'As configurações gerais foram atualizadas com sucesso.'
    });
  };

  return (
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
              value={settings.siteName} 
              onChange={onSettingChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maxFreeDescriptions">Limite de Descrições Gratuitas</Label>
            <Input 
              id="maxFreeDescriptions" 
              name="maxFreeDescriptions" 
              type="number" 
              value={settings.maxFreeDescriptions} 
              onChange={onSettingChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="defaultRole">Papel Padrão de Novos Usuários</Label>
            <Input 
              id="defaultRole" 
              name="defaultRole" 
              value={settings.defaultRole} 
              onChange={onSettingChange}
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
              checked={settings.enableRegistration}
              onCheckedChange={(checked) => onSwitchChange('general.enableRegistration', checked)}
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
