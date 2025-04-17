
import { supabase } from '@/integrations/supabase/client';
import { Plan } from '@/components/admin/plans/types';

export const planService = {
  getPlans: async (): Promise<Plan[]> => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { method: 'GET', action: 'list-products' }
      });
      
      if (error) throw error;
      
      if (data && !data.success) {
        throw new Error(data.error || "Failed to fetch plans");
      }
      
      // Process retrieved products
      const formattedPlans: Plan[] = data.products.map((product: any) => {
        // Parse features from string to our PlanFeature format
        let features = [];
        try {
          if (Array.isArray(product.features)) {
            features = product.features.map((feature: any, index: number) => {
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
      
      return formattedPlans;
    } catch (error) {
      console.error('Error in getPlans:', error);
      throw error;
    }
  },
  
  createPlan: async (planData: Omit<Plan, 'id'>): Promise<Plan> => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'POST', 
          action: 'create-product',
          productData: planData
        }
      });
      
      if (error) throw error;
      
      if (data && !data.success) {
        throw new Error(data.error || "Failed to create plan");
      }
      
      return data.product;
    } catch (error) {
      console.error('Error in createPlan:', error);
      throw error;
    }
  },
  
  updatePlan: async (planId: string, planData: Partial<Plan>): Promise<Plan> => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'PUT', 
          action: 'update-product',
          productId: planId,
          productData: planData
        }
      });
      
      if (error) throw error;
      
      if (data && !data.success) {
        throw new Error(data.error || "Failed to update plan");
      }
      
      return data.product;
    } catch (error) {
      console.error('Error in updatePlan:', error);
      throw error;
    }
  },
  
  deletePlan: async (planId: string): Promise<void> => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'DELETE', 
          action: 'delete-product',
          productId: planId
        }
      });
      
      if (error) throw error;
      
      if (data && !data.success) {
        throw new Error(data.error || "Failed to delete plan");
      }
    } catch (error) {
      console.error('Error in deletePlan:', error);
      throw error;
    }
  },
};
