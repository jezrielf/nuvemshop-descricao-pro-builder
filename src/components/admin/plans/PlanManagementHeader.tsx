
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';

interface PlanManagementHeaderProps {
  onCreateClick: () => void;
  onRefreshClick: () => void;
  loading: boolean;
}

const PlanManagementHeader: React.FC<PlanManagementHeaderProps> = ({
  onCreateClick,
  onRefreshClick,
  loading
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Gerenciar Planos</h2>
      <div className="flex gap-2">
        <Button onClick={onCreateClick}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Plano
        </Button>
        <Button variant="outline" onClick={onRefreshClick} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default PlanManagementHeader;
