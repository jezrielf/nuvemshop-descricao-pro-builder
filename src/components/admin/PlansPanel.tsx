
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, RefreshCw } from 'lucide-react';
import PlanTable from './plans/PlanTable';
import PlanDetailsDialog from './plans/PlanDetailsDialog';
import DeletePlanDialog from './plans/DeletePlanDialog';
import PlanFormDialog from './plans/PlanFormDialog';
import { Plan } from './plans/types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PlansPanel: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { method: 'GET', action: 'list-products' }
      });
      
      if (error) throw error;
      
      // Transform Stripe products into our Plan format
      const stripePlans: Plan[] = data.products.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        features: product.features.map((feature: string, index: number) => ({
          id: `feature-${index}`,
          name: feature.split(':')[0],
          included: feature.split(':')[1] === 'true'
        })),
        isActive: product.isActive,
        isDefault: product.isDefault,
        priceId: product.priceId
      }));
      
      setPlans(stripePlans);
      toast({
        title: "Planos atualizados",
        description: "Lista de planos atualizada com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao carregar planos",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPlans();
  }, []);

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
      const { error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'POST', 
          action: 'delete-product',
          data: { id: selectedPlan.id }
        }
      });
      
      if (error) throw error;
      
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
      
      // Transform features for Stripe format
      const stripeFeatures = newPlan.features.map(feature => 
        `${feature.name}:${feature.included ? 'true' : 'false'}`
      );
      
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'POST', 
          action: 'create-product',
          data: {
            name: newPlan.name,
            description: `Plano ${newPlan.name}`,
            price: newPlan.price,
            features: stripeFeatures,
            isActive: newPlan.isActive,
            isDefault: newPlan.isDefault
          }
        }
      });
      
      if (error) throw error;
      
      const createdPlan = data.product;
      const formattedPlan: Plan = {
        id: createdPlan.id,
        name: createdPlan.name,
        price: createdPlan.price,
        features: createdPlan.features.map((feature: string, index: number) => ({
          id: `feature-${index}`,
          name: feature.split(':')[0],
          included: feature.split(':')[1] === 'true'
        })),
        isActive: createdPlan.isActive,
        isDefault: createdPlan.isDefault,
        priceId: createdPlan.priceId
      };

      setPlans([...plans, formattedPlan]);
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
      
      // Transform features for Stripe format
      const stripeFeatures = updatedPlan.features.map(feature => 
        `${feature.name}:${feature.included ? 'true' : 'false'}`
      );
      
      const { error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'POST', 
          action: 'update-product',
          data: {
            id: updatedPlan.id,
            name: updatedPlan.name,
            description: `Plano ${updatedPlan.name}`,
            price: updatedPlan.price,
            features: stripeFeatures,
            isActive: updatedPlan.isActive,
            isDefault: updatedPlan.isDefault,
            priceId: updatedPlan.priceId
          }
        }
      });
      
      if (error) throw error;
      
      // Update locally
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Planos</h2>
        <div className="flex gap-2">
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Plano
          </Button>
          <Button variant="outline" onClick={fetchPlans} disabled={loading}>
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
            handleUpdatePlan({ ...data, id: selectedPlan.id, priceId: selectedPlan.priceId });
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
