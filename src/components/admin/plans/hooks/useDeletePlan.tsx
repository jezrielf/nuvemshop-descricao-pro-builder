
import { Plan } from '../types';
import { useToast } from '@/hooks/use-toast';
import { adminService } from '@/services/admin';

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
      
      const result = await adminService.deletePlan(plan.id);
      
      if (result.success) {
        toast({
          title: 'Plano excluído',
          description: `O plano "${plan.name}" foi excluído com sucesso.`,
        });
        
        // Refresh plans list
        await fetchPlans();
      } else {
        toast({
          title: 'Erro ao excluir plano',
          description: result.error || 'Ocorreu um erro ao excluir o plano.',
          variant: 'destructive',
        });
      }
      
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
