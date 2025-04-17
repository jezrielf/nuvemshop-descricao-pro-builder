
import { Plan } from '../types';
import { useToast } from '@/hooks/use-toast';
import { adminService } from '@/services/admin';

export const useCreatePlan = (
  plans: Plan[],
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchPlans: () => Promise<void>
) => {
  const { toast } = useToast();

  const handleCreatePlan = async (planData: Omit<Plan, 'id'>) => {
    try {
      setLoading(true);
      
      const newPlan = await adminService.createPlan(planData);
      
      toast({
        title: 'Plano criado',
        description: `O plano "${newPlan.name}" foi criado com sucesso.`,
      });
      
      // Refresh plans list
      await fetchPlans();
      
      // Close the dialog
      setIsCreateDialogOpen(false);
      
      return newPlan;
    } catch (error: any) {
      console.error('Error creating plan:', error);
      
      toast({
        title: 'Erro ao criar plano',
        description: error.message || 'Ocorreu um erro ao criar o plano.',
        variant: 'destructive',
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreatePlan };
};
