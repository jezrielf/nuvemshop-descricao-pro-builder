
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import PlanTable from './plans/PlanTable';
import PlanDetailsDialog from './plans/PlanDetailsDialog';
import DeletePlanDialog from './plans/DeletePlanDialog';
import { Plan } from './plans/types';
import { mockPlans } from './plans/mockData';

const PlansPanel: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsViewOpen(true);
  };

  const handleDeleteClick = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedPlan) return;
    
    // Remove the plan from our state
    setPlans(plans.filter(p => p.id !== selectedPlan.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Planos</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Plano
        </Button>
      </div>
      
      <Card className="p-6">
        <PlanTable 
          plans={plans}
          onViewPlan={handleViewPlan}
          onDeleteClick={handleDeleteClick}
        />
      </Card>

      {/* View Plan Dialog */}
      <PlanDetailsDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        selectedPlan={selectedPlan}
      />

      {/* Delete Confirmation Dialog */}
      <DeletePlanDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedPlan={selectedPlan}
        onConfirmDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default PlansPanel;
