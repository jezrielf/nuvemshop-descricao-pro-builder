
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, RefreshCw } from 'lucide-react';
import PlanTable from './plans/PlanTable';
import PlanDetailsDialog from './plans/PlanDetailsDialog';
import DeletePlanDialog from './plans/DeletePlanDialog';
import PlanFormDialog from './plans/PlanFormDialog';
import { Plan } from './plans/types';
import { mockPlans } from './plans/mockData';
import { useToast } from '@/hooks/use-toast';

const PlansPanel: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleViewPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsViewOpen(true);
  };

  const handleEditClick = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsEditDialogOpen(true);
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

    toast({
      title: "Plano excluído",
      description: `O plano ${selectedPlan.name} foi excluído com sucesso.`,
    });
  };

  const handleCreatePlan = (newPlan: Omit<Plan, 'id'>) => {
    // In a real app, this would call an API
    const planWithId: Plan = {
      ...newPlan,
      id: `plan-${Date.now()}`, // Generate a unique ID
    };

    setPlans([...plans, planWithId]);
    setIsCreateDialogOpen(false);

    toast({
      title: "Plano criado",
      description: `O plano ${newPlan.name} foi criado com sucesso.`,
    });
  };

  const handleUpdatePlan = (updatedPlan: Plan) => {
    // In a real app, this would call an API
    setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
    setIsEditDialogOpen(false);

    toast({
      title: "Plano atualizado",
      description: `O plano ${updatedPlan.name} foi atualizado com sucesso.`,
    });
  };

  const refreshPlans = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      // In a real app, this would fetch from an API
      setPlans([...mockPlans]);
      setLoading(false);
      
      toast({
        title: "Planos atualizados",
        description: "Lista de planos atualizada com sucesso.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Planos</h2>
        <div className="flex gap-2">
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Plano
          </Button>
          <Button variant="outline" onClick={refreshPlans} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      <Card className="p-6">
        <PlanTable 
          plans={plans}
          onViewPlan={handleViewPlan}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          loading={loading}
        />
      </Card>

      {/* View Plan Dialog */}
      <PlanDetailsDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        selectedPlan={selectedPlan}
      />

      {/* Create Plan Dialog */}
      <PlanFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreatePlan}
        title="Criar Novo Plano"
      />

      {/* Edit Plan Dialog */}
      <PlanFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={(data) => {
          if (selectedPlan) {
            handleUpdatePlan({ ...data, id: selectedPlan.id });
          }
        }}
        title="Editar Plano"
        initialData={selectedPlan}
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
