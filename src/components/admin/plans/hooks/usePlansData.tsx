
import { useState, useEffect, useCallback } from 'react';
import { Plan } from '../types';
import { useToast } from '@/hooks/use-toast';
import { adminService } from '@/services/admin';

// Import mockData for fallback
import { mockPlans } from '../mockData';

export const usePlansData = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Fetching plans...");
      
      const plansData = await adminService.getPlans();
      
      // If we have no products, fallback to mock data
      if (!plansData || plansData.length === 0) {
        console.log("No plans found, using mock data");
        setPlans(mockPlans);
        return;
      }
      
      console.log("Plans fetched successfully:", plansData.length);
      setPlans(plansData);
    } catch (error: any) {
      console.error("Error fetching plans:", error);
      
      // Fallback to mock data
      console.log("Using mock data as fallback");
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
