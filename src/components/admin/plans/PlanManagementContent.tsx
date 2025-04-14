
import React from 'react';
import { Card } from '@/components/ui/card';
import PlanTable from './PlanTable';
import { Plan } from './types';

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
  return (
    <Card className="p-6">
      <PlanTable 
        plans={plans}
        onViewPlan={onViewPlan}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        loading={loading}
      />
    </Card>
  );
};

export default PlanManagementContent;
