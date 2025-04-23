
import { useState } from 'react';
import { Plan } from '../types';
import { useToast } from '@/hooks/use-toast';
import { adminService } from '@/services/admin';

export const useDeletePlan = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchPlans: () => Promise<void>
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      setIsSubmitting(true);
      setLoading(true);
      
      // Get the plan from the parent component's state instead of as parameter
      const plan = window.selectedPlanToDelete;
      if (!plan) {
        console.error("No plan selected for deletion");
        toast({
          title: 'Erro ao excluir plano',
          description: 'Nenhum plano selecionado para exclusão.',
          variant: 'destructive',
        });
        return;
      }
      
      console.log("Excluindo plano:", plan.id);
      await adminService.deletePlan(plan.id);
      
      toast({
        title: 'Plano excluído',
        description: `O plano "${plan.name}" foi excluído com sucesso.`,
      });
      
      // Refresh plans list
      await fetchPlans();
      
      // Clear the selected plan
      window.selectedPlanToDelete = null;
      
      // Close the dialog
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      console.error('Erro ao excluir plano:', error);
      
      toast({
        title: 'Erro ao excluir plano',
        description: error.message || 'Ocorreu um erro ao excluir o plano.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return { handleDeleteConfirm, isSubmitting };
};

// Declare global window property for TypeScript
declare global {
  interface Window {
    selectedPlanToDelete: Plan | null;
  }
}

// Initialize the global variable
if (typeof window !== 'undefined') {
  window.selectedPlanToDelete = null;
}
