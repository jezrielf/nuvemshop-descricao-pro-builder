
import { useCallback } from 'react';
import { Plan } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useDeletePlan = (
  plans: Plan[], 
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeleteDialogOpen: (open: boolean) => void,
  fetchPlans: () => Promise<void>
) => {
  const { toast } = useToast();

  const handleDeleteConfirm = useCallback(async (selectedPlan: Plan | null) => {
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
      
      setPlans(plans.filter(p => p.id !== selectedPlan.id));
      setIsDeleteDialogOpen(false);

      toast({
        title: "Plano excluído",
        description: `O plano ${selectedPlan.name} foi excluído com sucesso.`,
      });
      
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
  }, [fetchPlans, plans, setIsDeleteDialogOpen, setLoading, setPlans, toast]);

  return { handleDeleteConfirm };
};
