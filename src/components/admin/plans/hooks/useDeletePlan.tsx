
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

  const handleDeleteConfirm = async (plan: Plan | null) => {
    if (!plan) return;
    
    try {
      setIsSubmitting(true);
      setLoading(true);
      
      console.log("Excluindo plano:", plan.id);
      await adminService.deletePlan(plan.id);
      
      toast({
        title: 'Plano excluído',
        description: `O plano "${plan.name}" foi excluído com sucesso.`,
      });
      
      // Refresh plans list
      await fetchPlans();
      
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
