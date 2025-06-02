
import { useState } from 'react';
import { Plan } from '../types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
      
      // Use Stripe edge function to create plan
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'POST', 
          action: 'create-product',
          ...planData
        }
      });

      if (error) throw error;
      
      toast({
        title: 'Plano criado',
        description: `O plano "${planData.name}" foi criado com sucesso.`,
      });
      
      // Refresh plans list
      await fetchPlans();
      
      // Close the dialog
      setIsCreateDialogOpen(false);
      
      return data;
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
