
import React from 'react';
import { Card } from '@/components/ui/card';
import PlanTable from './PlanTable';
import { Plan } from './types';
import { Loader2 } from 'lucide-react';

interface PlanManagementContentProps {
  plans: Plan[];
  loading: boolean;
  onViewPlan: (plan: Plan) => void;
  onEditClick: (plan: Plan) => void;
  onDeleteClick: (plan: Plan) => void;
}

const PlanManagementContent: React.FC<PlanManagementContentProps> = ({
  plans,
  loading,
  onViewPlan,
  onEditClick,
  onDeleteClick
}) => {
  if (loading && plans.length === 0) {
    return (
      <Card className="p-6 flex justify-center items-center min-h-[200px]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Carregando planos...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {plans.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum plano encontrado.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Clique em "Novo Plano" para criar seu primeiro plano.
          </p>
        </div>
      ) : (
        <PlanTable 
          plans={plans}
          onViewPlan={onViewPlan}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          loading={loading}
        />
      )}
    </Card>
  );
};

export default PlanManagementContent;
