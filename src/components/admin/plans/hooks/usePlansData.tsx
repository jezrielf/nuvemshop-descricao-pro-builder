
import { useState, useEffect, useCallback } from 'react';
import { Plan } from '@/types/subscription';
import { useToast } from '@/hooks/use-toast';
import { planService } from '@/services/admin/planService';

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
      
      const plansData = await planService.getPlans();
      
      // If we have no products, fallback to mock data
      if (!plansData || plansData.length === 0) {
        console.log("Nenhum plano encontrado, usando dados mockados");
        setPlans(mockPlans);
        return;
      }
      
      console.log("Planos buscados com sucesso:", plansData.length);
      // Importante: não estamos filtrando por isActive aqui, mostrar todos os planos
      setPlans(plansData);
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
