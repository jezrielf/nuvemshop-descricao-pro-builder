
import { useState } from 'react';
import { Plan } from '../types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useDeletePlan = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchPlans: () => Promise<void>
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null);

  const handleDeleteConfirm = async () => {
    try {
      setIsSubmitting(true);
      setLoading(true);
      
      if (!planToDelete) {
        console.error("No plan selected for deletion");
        toast({
          title: 'Erro ao excluir plano',
          description: 'Nenhum plano selecionado para exclusão.',
          variant: 'destructive',
        });
        return;
      }
      
      console.log("Excluindo plano:", planToDelete.id);
      
      // Use Stripe edge function to delete plan
      const { error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'DELETE', 
          action: 'delete-product',
          id: planToDelete.id
        }
      });

      if (error) throw error;
      
      toast({
        title: 'Plano excluído',
        description: `O plano "${planToDelete.name}" foi excluído com sucesso.`,
      });
      
      // Refresh plans list
      await fetchPlans();
      
      // Clear the selected plan
      setPlanToDelete(null);
      
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

  return { 
    handleDeleteConfirm, 
    isSubmitting, 
    planToDelete, 
    setPlanToDelete 
  };
};
