
import { Plan } from '../types';
import { useToast } from '@/hooks/use-toast';
import { adminService } from '@/services/admin';

export const useUpdatePlan = (
  plans: Plan[],
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchPlans: () => Promise<void>
) => {
  const { toast } = useToast();

  const handleUpdatePlan = async (planData: Plan) => {
    try {
      setLoading(true);
      
      const updatedPlan = await adminService.updatePlan(planData.id, planData);
      
      toast({
        title: 'Plano atualizado',
        description: `O plano "${updatedPlan.name}" foi atualizado com sucesso.`,
      });
      
      // Refresh plans list
      await fetchPlans();
      
      // Close the dialog
      setIsEditDialogOpen(false);
      
      return updatedPlan;
    } catch (error: any) {
      console.error('Error updating plan:', error);
      
      toast({
        title: 'Erro ao atualizar plano',
        description: error.message || 'Ocorreu um erro ao atualizar o plano.',
        variant: 'destructive',
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdatePlan };
};
