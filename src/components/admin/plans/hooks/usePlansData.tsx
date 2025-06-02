
import { useState, useEffect, useCallback } from 'react';
import { Plan } from '../types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Import mockData for fallback
import { mockPlans } from '../mockData';

export const usePlansData = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Buscando planos...");
      
      // Use Stripe edge function to get plans
      const { data: plansData, error } = await supabase.functions.invoke('manage-plans', {
        body: { method: 'GET', action: 'list-products' }
      });

      if (error) throw error;
      
      // If we have no products, fallback to mock data
      if (!plansData?.products || plansData.products.length === 0) {
        console.log("Nenhum plano encontrado, usando dados mockados");
        setPlans(mockPlans);
        return;
      }
      
      console.log("Planos buscados com sucesso:", plansData.products.length);
      
      // Format plans data
      const formattedPlans = plansData.products.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: product.price || 0,
        priceId: product.priceId,
        isActive: product.isActive || false,
        isDefault: false,
        features: product.features || []
      }));
      
      setPlans(formattedPlans);
    } catch (error: any) {
      console.error("Erro ao buscar planos:", error);
      
      // Fallback to mock data
      console.log("Usando dados mockados como fallback");
      setPlans(mockPlans);
      
      toast({
        title: 'Erro ao carregar planos',
        description: error.message || "Não foi possível carregar os planos. Usando dados locais.",
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return { plans, setPlans, loading, setLoading, fetchPlans };
};
