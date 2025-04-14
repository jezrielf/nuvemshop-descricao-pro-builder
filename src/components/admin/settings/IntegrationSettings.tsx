
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface IntegrationSettingsProps {
  settings: {
    enableApiAccess: boolean;
    apiRateLimit: number;
    corsOrigins: string;
  };
  onSettingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchChange: (name: string, checked: boolean) => void;
}

export const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({
  settings,
  onSettingChange,
  onSwitchChange,
}) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Configurações salvas',
      description: 'As configurações de integração foram atualizadas com sucesso.'
    });
  };

  return (
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
              checked={settings.enableApiAccess}
              onCheckedChange={(checked) => onSwitchChange('integration.enableApiAccess', checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiRateLimit">Limite de Requisições da API (por hora)</Label>
            <Input 
              id="apiRateLimit" 
              name="apiRateLimit" 
              type="number"
              value={settings.apiRateLimit} 
              onChange={onSettingChange}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="corsOrigins">Origens CORS Permitidas</Label>
            <Input 
              id="corsOrigins" 
              name="corsOrigins" 
              value={settings.corsOrigins} 
              onChange={onSettingChange}
              placeholder="https://exemplo.com,https://app.exemplo.com"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Separe múltiplas origens com vírgulas
            </p>
          </div>
        </div>
        
        <Button className="mt-4" onClick={handleSave}>
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
};
