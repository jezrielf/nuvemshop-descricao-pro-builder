
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

  const handleUpdateSettings = async () => {
    try {
      const { error } = await supabase.functions.invoke('update-nuvemshop-settings', {
        body: {
          clientId: settings.clientId,
          clientSecret: settings.clientSecret
        }
      });
      
      if (error) throw error;
      
      toast({
        title: 'Configurações atualizadas',
        description: 'As configurações da Nuvemshop foram atualizadas com sucesso.'
      });
    } catch (error) {
      console.error('Error updating Nuvemshop settings:', error);
      toast({
        title: 'Erro ao atualizar',
        description: 'Não foi possível atualizar as configurações da Nuvemshop.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações da Nuvemshop</CardTitle>
        <CardDescription>
          Configure as credenciais da API da Nuvemshop
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
        
        <Button className="mt-4" onClick={handleUpdateSettings}>
          Atualizar Configurações
        </Button>
      </CardContent>
    </Card>
  );
};
