
import { useState } from 'react';
import { Plan } from '@/types/subscription';
import { useToast } from '@/hooks/use-toast';
import { planService } from '@/services/admin/planService';

export const useCreatePlan = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchPlans: () => Promise<void>
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCreatePlan = async (planData: Omit<Plan, 'id'>) => {
    try {
      setIsSubmitting(true);
      setLoading(true);
      
      console.log("Criando plano:", planData);
      const newPlan = await planService.createPlan(planData);
      
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
      console.error('Erro ao criar plano:', error);
      
      toast({
        title: 'Erro ao criar plano',
        description: error.message || 'Ocorreu um erro ao criar o plano.',
        variant: 'destructive',
      });
      
      return null;
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return { handleCreatePlan, isSubmitting };
};
