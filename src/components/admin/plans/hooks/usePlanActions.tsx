
import { useState, useCallback } from 'react';
import { Plan } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePlanActions = (
  plans: Plan[], 
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>, 
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  fetchPlans: () => Promise<void>
) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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

  const handleDeleteConfirm = async () => {
    if (!selectedPlan) return;
    
    try {
      setLoading(true);
      console.log("Deleting plan:", selectedPlan.id);
      
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'POST', 
          action: 'delete-product',
          data: { id: selectedPlan.id }
        }
      });
      
      if (error) {
        console.error("Stripe API error:", error);
        throw new Error(error.message || "Failed to delete plan");
      }
      
      if (data && !data.success) {
        console.error("Delete plan error:", data.error);
        throw new Error(data.error || "Failed to delete plan");
      }
      
      // Update local state
      setPlans(plans.filter(p => p.id !== selectedPlan.id));
      setIsDeleteDialogOpen(false);

      toast({
        title: "Plano excluído",
        description: `O plano ${selectedPlan.name} foi excluído com sucesso.`,
      });
      
      // Fetch fresh data from Stripe
      await fetchPlans();
    } catch (error: any) {
      console.error("Error deleting plan:", error);
      toast({
        title: "Erro ao excluir plano",
        description: error.message || "Houve um erro ao excluir o plano.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = useCallback(async (newPlan: Omit<Plan, 'id'>) => {
    try {
      setLoading(true);
      console.log("Creating new plan:", newPlan.name);
      
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
      
      if (error) {
        console.error("Stripe API error:", error);
        throw new Error(error.message || "Failed to create plan");
      }
      
      if (data && !data.success) {
        console.error("Create plan error:", data.error);
        throw new Error(data.error || "Failed to create plan");
      }
      
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

      // Update local state
      setPlans([...plans, formattedPlan]);
      setIsCreateDialogOpen(false);

      toast({
        title: "Plano criado",
        description: `O plano ${newPlan.name} foi criado com sucesso.`,
      });
      
      // Fetch fresh data from Stripe
      await fetchPlans();
    } catch (error: any) {
      console.error("Error creating plan:", error);
      toast({
        title: "Erro ao criar plano",
        description: error.message || "Houve um erro ao criar o plano.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [fetchPlans, plans, setIsCreateDialogOpen, setLoading, setPlans, toast]);

  const handleUpdatePlan = useCallback(async (updatedPlan: Plan) => {
    try {
      setLoading(true);
      console.log("Updating plan:", updatedPlan.id);
      
      // Transform features for Stripe format
      const stripeFeatures = updatedPlan.features.map(feature => 
        `${feature.name}:${feature.included ? 'true' : 'false'}`
      );
      
      const { data, error } = await supabase.functions.invoke('manage-plans', {
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
      
      if (error) {
        console.error("Stripe API error:", error);
        throw new Error(error.message || "Failed to update plan");
      }
      
      if (data && !data.success) {
        console.error("Update plan error:", data.error);
        throw new Error(data.error || "Failed to update plan");
      }
      
      // Update locally
      setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
      setIsEditDialogOpen(false);

      toast({
        title: "Plano atualizado",
        description: `O plano ${updatedPlan.name} foi atualizado com sucesso.`,
      });
      
      // Fetch fresh data from Stripe
      await fetchPlans();
    } catch (error: any) {
      console.error("Error updating plan:", error);
      toast({
        title: "Erro ao atualizar plano",
        description: error.message || "Houve um erro ao atualizar o plano.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [fetchPlans, plans, setIsEditDialogOpen, setLoading, setPlans, toast]);

  return {
    selectedPlan,
    isViewOpen,
    isDeleteDialogOpen,
    isCreateDialogOpen,
    isEditDialogOpen,
    setIsViewOpen,
    setIsDeleteDialogOpen,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    handleViewPlan,
    handleEditClick,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCreatePlan,
    handleUpdatePlan
  };
};
