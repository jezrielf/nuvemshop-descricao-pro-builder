
import { Plan } from '../types';
import { useToast } from '@/hooks/use-toast';
import { adminService } from '@/services/adminService';

export const useDeletePlan = (
  plans: Plan[],
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchPlans: () => Promise<void>
) => {
  const { toast } = useToast();

  const handleDeleteConfirm = async (plan: Plan | null) => {
    if (!plan) return;
    
    try {
      setLoading(true);
      
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
      console.error('Error deleting plan:', error);
      
      toast({
        title: 'Erro ao excluir plano',
        description: error.message || 'Ocorreu um erro ao excluir o plano.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteConfirm };
};
