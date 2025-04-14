
import { useCallback } from 'react';
import { Plan } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUpdatePlan = (
  plans: Plan[],
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditDialogOpen: (open: boolean) => void,
  fetchPlans: () => Promise<void>
) => {
  const { toast } = useToast();

  const handleUpdatePlan = useCallback(async (updatedPlan: Plan) => {
    try {
      setLoading(true);
      console.log("Updating plan:", updatedPlan.id);
      
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
      
      setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
      setIsEditDialogOpen(false);

      toast({
        title: "Plano atualizado",
        description: `O plano ${updatedPlan.name} foi atualizado com sucesso.`,
      });
      
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

  return { handleUpdatePlan };
};
