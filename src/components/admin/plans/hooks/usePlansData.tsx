
import { useState, useEffect } from 'react';
import { Plan } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePlansData = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { method: 'GET', action: 'list-products' }
      });
      
      if (error) throw error;
      
      // Transform Stripe products into our Plan format
      const stripePlans: Plan[] = data.products.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        features: product.features.map((feature: string, index: number) => ({
          id: `feature-${index}`,
          name: feature.split(':')[0],
          included: feature.split(':')[1] === 'true'
        })),
        isActive: product.isActive,
        isDefault: product.isDefault,
        priceId: product.priceId
      }));
      
      setPlans(stripePlans);
      toast({
        title: "Planos atualizados",
        description: "Lista de planos atualizada com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao carregar planos",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    setPlans,
    loading,
    setLoading,
    fetchPlans
  };
};
