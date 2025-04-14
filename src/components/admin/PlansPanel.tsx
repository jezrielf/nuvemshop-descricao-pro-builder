
import React, { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';

const PlansPanel: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Uncomment and implement this when you have a real plans API
  // const fetchPlans = async () => {
  //   try {
  //     setLoading(true);
  //     // Here you would call your API to get the plans from Stripe
  //     // const { data, error } = await supabase.functions.invoke('get-plans');
  //     // if (error) throw error;
  //     // setPlans(data);
  //     
  //     // For now, we'll just use the mock data
  //     setPlans([...mockPlans]);
  //     toast({
  //       title: "Planos atualizados",
  //       description: "Lista de planos atualizada com sucesso.",
  //     });
  //   } catch (error: any) {
  //     toast({
  //       title: "Erro ao carregar planos",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchPlans();
  // }, []);

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

  const handleDeleteConfirm = async () => {
    if (!selectedPlan) return;
    
    try {
      setLoading(true);
      
      // In a real app, this would call an API to delete the plan in Stripe
      // const { error } = await supabase.functions.invoke('delete-plan', {
      //   body: { planId: selectedPlan.id }
      // });
      // if (error) throw error;
      
      // For now, we'll just remove it from our state
      setPlans(plans.filter(p => p.id !== selectedPlan.id));
      setIsDeleteDialogOpen(false);

      toast({
        title: "Plano excluído",
        description: `O plano ${selectedPlan.name} foi excluído com sucesso.`,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao excluir plano",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (newPlan: Omit<Plan, 'id'>) => {
    try {
      setLoading(true);
      
      // In a real app, this would call an API to create the plan in Stripe
      // const { data, error } = await supabase.functions.invoke('create-plan', {
      //   body: newPlan
      // });
      // if (error) throw error;
      // const createdPlan = data;
      
      // For now, we'll just add it to our state with a mock ID
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
    } catch (error: any) {
      toast({
        title: "Erro ao criar plano",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlan = async (updatedPlan: Plan) => {
    try {
      setLoading(true);
      
      // In a real app, this would call an API to update the plan in Stripe
      // const { data, error } = await supabase.functions.invoke('update-plan', {
      //   body: updatedPlan
      // });
      // if (error) throw error;
      
      // For now, we'll just update it in our state
      setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
      setIsEditDialogOpen(false);

      toast({
        title: "Plano atualizado",
        description: `O plano ${updatedPlan.name} foi atualizado com sucesso.`,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar plano",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshPlans = () => {
    setLoading(true);
    // In a real app, this would call fetchPlans()
    
    // For now, we'll just simulate a refresh
    setTimeout(() => {
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
