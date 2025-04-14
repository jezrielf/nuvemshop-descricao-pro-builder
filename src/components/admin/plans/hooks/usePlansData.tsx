
import { useState, useEffect, useCallback } from 'react';
import { Plan } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
      
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { method: 'GET', action: 'list-products' }
      });
      
      if (error) {
        console.error("Stripe API error:", error);
        throw new Error(error.message || "Failed to fetch plans");
      }
      
      if (data && !data.success) {
        console.error("Fetch plans error:", data.error);
        throw new Error(data.error || "Failed to fetch plans");
      }
      
      // If we have no products or there was an error, fallback to mock data
      if (!data.products || data.products.length === 0) {
        console.log("No plans found in Stripe, using mock data");
        setPlans(mockPlans);
        return;
      }
      
      // Process retrieved products
      const formattedPlans: Plan[] = data.products.map((product: any) => {
        // Parse features from string to our PlanFeature format
        let features = [];
        try {
          // If features are already JSON parsed, use them directly
          if (Array.isArray(product.features)) {
            features = product.features.map((feature: any, index: number) => {
              // Handle different feature formats
              if (typeof feature === 'object' && 'name' in feature && 'included' in feature) {
                return {
                  id: `feature-${index}`,
                  name: feature.name,
                  included: feature.included
                };
              } else if (typeof feature === 'string') {
                const [name, includedStr] = feature.split(':');
                return {
                  id: `feature-${index}`,
                  name,
                  included: includedStr === 'true'
                };
              }
              
              return {
                id: `feature-${index}`,
                name: String(feature),
                included: false
              };
            });
          } else {
            features = [];
          }
        } catch (e) {
          console.error("Error parsing product features:", e);
          features = [];
        }
        
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          priceId: product.priceId,
          features,
          isActive: product.isActive,
          isDefault: product.isDefault
        };
      });
      
      console.log("Plans fetched successfully:", formattedPlans.length);
      setPlans(formattedPlans);
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
