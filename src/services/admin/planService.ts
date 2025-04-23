
import { supabase } from '@/integrations/supabase/client';
import { Plan } from '@/components/admin/plans/types';

export const planService = {
  getPlans: async (): Promise<Plan[]> => {
    try {
      console.log("Buscando planos no Stripe via Edge Function");
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { method: 'GET', action: 'list-products' }
      });
      
      if (error) {
        console.error("Erro na Edge Function:", error);
        throw error;
      }
      
      if (data && !data.success) {
        console.error("Erro ao buscar planos:", data.error);
        throw new Error(data.error || "Failed to fetch plans");
      }
      
      console.log("Planos recebidos:", data.products?.length || 0);
      
      // Process retrieved products
      const formattedPlans: Plan[] = data.products.map((product: any) => {
        // Parse features from string to our PlanFeature format
        let features = [];
        try {
          if (Array.isArray(product.features)) {
            features = product.features.map((feature: any, index: number) => {
              if (typeof feature === 'object' && 'name' in feature && 'included' in feature) {
                return {
                  id: feature.id || `feature-${index}`,
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
          console.error("Erro ao processar features:", e);
          features = [];
        }
        
        return {
          id: product.id,
          name: product.name,
          description: product.description || '',
          price: product.price,
          priceId: product.priceId,
          features,
          isActive: product.isActive,
          isDefault: product.isDefault
        };
      });
      
      console.log("Planos formatados:", formattedPlans.length);
      return formattedPlans;
    } catch (error) {
      console.error('Erro em getPlans:', error);
      throw error;
    }
  },
  
  createPlan: async (planData: Omit<Plan, 'id'>): Promise<Plan> => {
    try {
      console.log("Criando novo plano:", planData.name);
      
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Authentication required");
      }
      
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'POST', 
          action: 'create-product',
          productData: planData
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
      if (error) {
        console.error("Erro na Edge Function:", error);
        throw error;
      }
      
      if (data && !data.success) {
        console.error("Erro ao criar plano:", data.error);
        throw new Error(data.error || "Failed to create plan");
      }
      
      console.log("Plano criado com sucesso:", data.product);
      return data.product;
    } catch (error) {
      console.error('Erro em createPlan:', error);
      throw error;
    }
  },
  
  updatePlan: async (planId: string, planData: Partial<Plan>): Promise<Plan> => {
    try {
      console.log("Atualizando plano:", planId);
      
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Authentication required");
      }
      
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'PUT', 
          action: 'update-product',
          productId: planId,
          productData: planData
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
      if (error) {
        console.error("Erro na Edge Function:", error);
        throw error;
      }
      
      if (data && !data.success) {
        console.error("Erro ao atualizar plano:", data.error);
        throw new Error(data.error || "Failed to update plan");
      }
      
      console.log("Plano atualizado com sucesso:", data.product);
      return data.product;
    } catch (error) {
      console.error('Erro em updatePlan:', error);
      throw error;
    }
  },
  
  deletePlan: async (planId: string): Promise<void> => {
    try {
      console.log("Excluindo plano:", planId);
      
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Authentication required");
      }
      
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'DELETE', 
          action: 'delete-product',
          productId: planId
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
      if (error) {
        console.error("Erro na Edge Function:", error);
        throw error;
      }
      
      if (data && !data.success) {
        console.error("Erro ao excluir plano:", data.error);
        throw new Error(data.error || "Failed to delete plan");
      }
      
      console.log("Plano excluído com sucesso");
    } catch (error) {
      console.error('Erro em deletePlan:', error);
      throw error;
    }
  },
};
