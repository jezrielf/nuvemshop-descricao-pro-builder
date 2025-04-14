
import { useCallback } from 'react';
import { Plan } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCreatePlan = (
  plans: Plan[],
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCreateDialogOpen: (open: boolean) => void,
  fetchPlans: () => Promise<void>
) => {
  const { toast } = useToast();

  const handleCreatePlan = useCallback(async (newPlan: Omit<Plan, 'id'>) => {
    try {
      setLoading(true);
      console.log("Creating new plan:", newPlan.name);
      
      const stripeFeatures = newPlan.features.map(feature => 
        `${feature.name}:${feature.included ? 'true' : 'false'}`
      );
      
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'POST', 
          action: 'create-product',
          data: {
            name: newPlan.name,
            description: `Plano ${newPlan.name}`,
            price: newPlan.price,
            features: stripeFeatures,
            isActive: newPlan.isActive,
            isDefault: newPlan.isDefault
          }
        }
      });
      
      if (error) {
        console.error("Stripe API error:", error);
        throw new Error(error.message || "Failed to create plan");
      }
      
      if (data && !data.success) {
        console.error("Create plan error:", data.error);
        throw new Error(data.error || "Failed to create plan");
      }
      
      const createdPlan = data.product;
      const formattedPlan: Plan = {
        id: createdPlan.id,
        name: createdPlan.name,
        price: createdPlan.price,
        features: createdPlan.features.map((feature: string, index: number) => ({
          id: `feature-${index}`,
          name: feature.split(':')[0],
          included: feature.split(':')[1] === 'true'
        })),
        isActive: createdPlan.isActive,
        isDefault: createdPlan.isDefault,
        priceId: createdPlan.priceId
      };

      setPlans([...plans, formattedPlan]);
      setIsCreateDialogOpen(false);

      toast({
        title: "Plano criado",
        description: `O plano ${newPlan.name} foi criado com sucesso.`,
      });
      
      await fetchPlans();
    } catch (error: any) {
      console.error("Error creating plan:", error);
      toast({
        title: "Erro ao criar plano",
        description: error.message || "Houve um erro ao criar o plano.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [fetchPlans, plans, setIsCreateDialogOpen, setLoading, setPlans, toast]);

  return { handleCreatePlan };
};
