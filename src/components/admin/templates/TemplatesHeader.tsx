
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus, Sparkles } from 'lucide-react';

interface TemplatesHeaderProps {
  onRefresh: () => void;
  onCreate: () => void;
  onImplementUpdate: () => void;
  loading: boolean;
}

export const TemplatesHeader: React.FC<TemplatesHeaderProps> = ({
  onRefresh,
  onCreate,
  onImplementUpdate,
  loading
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Gerenciar Templates</h1>
        <p className="text-muted-foreground">
          Gerencie os templates disponíveis para os usuários
        </p>
      </div>
      <div className="flex space-x-2">
        <Button 
          onClick={onImplementUpdate}
          disabled={loading}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {loading ? 'Implementando...' : 'Implementar Atualização Completa'}
        </Button>
        <Button onClick={onRefresh} variant="outline" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
        <Button onClick={onCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Template
        </Button>
      </div>
    </div>
  );
};
