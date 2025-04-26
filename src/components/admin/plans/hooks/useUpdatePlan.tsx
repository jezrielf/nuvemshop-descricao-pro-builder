
import { useState } from 'react';
import { Plan } from '@/types/subscription';
import { useToast } from '@/hooks/use-toast';
import { planService } from '@/services/admin/planService';

export const useUpdatePlan = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchPlans: () => Promise<void>
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleUpdatePlan = async (planData: Plan) => {
    try {
      setIsSubmitting(true);
      setLoading(true);
      
      console.log("Atualizando plano:", planData.id, planData);
      const updatedPlan = await planService.updatePlan(planData.id, planData);
      
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
      console.error('Erro ao atualizar plano:', error);
      
      toast({
        title: 'Erro ao atualizar plano',
        description: error.message || 'Ocorreu um erro ao atualizar o plano.',
        variant: 'destructive',
      });
      
      return null;
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return { handleUpdatePlan, isSubmitting };
};
