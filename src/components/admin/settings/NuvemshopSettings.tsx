
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <CardTitle className="flex items-center justify-between">
          <span>Configurações da Nuvemshop</span>
          <Link 
            to="/nuvemshop-connect" 
            className="text-sm text-blue-500 hover:text-blue-700 flex items-center"
          >
            <span>Ir para página de conexão</span>
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </CardTitle>
        <CardDescription>
          Configure as credenciais para integração com a Nuvemshop
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
        
        <div className="bg-blue-50 p-4 rounded-md text-blue-800 text-sm mt-4">
          <p>
            <strong>Informações importantes:</strong>
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>O redirecionamento deve ser para: <code>https://descricaopro.com.br</code></li>
            <li>Não compartilhe seu Client Secret com terceiros</li>
            <li>Para testar a integração, use a página "Conectar Nuvemshop"</li>
          </ul>
        </div>
        
        <Button className="mt-4" onClick={handleSave}>
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
};
