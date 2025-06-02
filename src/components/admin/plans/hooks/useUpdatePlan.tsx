
import { useState } from 'react';
import { Plan } from '../types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
      
      // Use Stripe edge function to update plan
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'PUT', 
          action: 'update-product',
          id: planData.id,
          ...planData
        }
      });

      if (error) throw error;
      
      toast({
        title: 'Plano atualizado',
        description: `O plano "${planData.name}" foi atualizado com sucesso.`,
      });
      
      // Refresh plans list
      await fetchPlans();
      
      // Close the dialog
      setIsEditDialogOpen(false);
      
      return data;
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
