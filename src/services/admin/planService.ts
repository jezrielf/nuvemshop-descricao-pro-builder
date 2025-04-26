
import { Plan } from '@/types/subscription';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// Using Stripe API integration for plans instead of direct database access
// This service acts as a facade to the Stripe API via Supabase Edge Functions

// Get all plans
const getPlans = async (): Promise<Plan[]> => {
  try {
    // Call Supabase function to get plans from Stripe
    const { data, error } = await supabase.functions.invoke('manage-plans', {
      body: { method: 'GET', action: 'list-products' }
    });
      
    if (error) throw error;
    
    if (!data || !data.products) return [];
    
    return data.products.map((plan: any) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description || '',
      price: plan.price || 0,
      interval: plan.interval || 'month',
      currency: plan.currency || 'BRL',
      features: Array.isArray(plan.features) ? plan.features : [],
      priceId: plan.priceId,
      isActive: plan.isActive !== false,
      isDefault: !!plan.isDefault,
      createdAt: plan.created_at || new Date().toISOString(),
      updatedAt: plan.updated_at || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching plans:', error);
    return [];
  }
};

// Get a plan by ID
const getPlanById = async (id: string): Promise<Plan | null> => {
  try {
    // Call Supabase function to get a specific plan
    const { data, error } = await supabase.functions.invoke('manage-plans', {
      body: { method: 'GET', action: 'get-product', productId: id }
    });
      
    if (error) throw error;
    
    if (!data || !data.product) return null;
    
    return {
      id: data.product.id,
      name: data.product.name,
      description: data.product.description || '',
      price: data.product.price || 0,
      interval: data.product.interval || 'month',
      currency: data.product.currency || 'BRL',
      features: Array.isArray(data.product.features) ? data.product.features : [],
      priceId: data.product.priceId,
      isActive: data.product.isActive !== false,
      isDefault: !!data.product.isDefault,
      createdAt: data.product.created_at || new Date().toISOString(),
      updatedAt: data.product.updated_at || new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error fetching plan ${id}:`, error);
    return null;
  }
};

// Create a new plan
const createPlan = async (planData: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plan> => {
  try {
    // Call Supabase function to create a plan in Stripe
    const { data, error } = await supabase.functions.invoke('manage-plans', {
      body: { 
        method: 'POST', 
        action: 'create-product',
        product: {
          name: planData.name,
          description: planData.description,
          price: planData.price,
          currency: planData.currency,
          interval: planData.interval,
          features: planData.features
        }
      }
    });
      
    if (error) throw error;
    
    if (!data || !data.product) {
      throw new Error('Failed to create plan');
    }
    
    return {
      ...planData,
      id: data.product.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error;
  }
};

// Update a plan
const updatePlan = async (id: string, planData: Partial<Plan>): Promise<Plan> => {
  try {
    // Call Supabase function to update a plan in Stripe
    const { data, error } = await supabase.functions.invoke('manage-plans', {
      body: { 
        method: 'PUT', 
        action: 'update-product',
        productId: id,
        updates: {
          name: planData.name,
          description: planData.description,
          price: planData.price,
          currency: planData.currency,
          interval: planData.interval,
          features: planData.features,
          isActive: planData.isActive
        }
      }
    });
      
    if (error) throw error;
    
    if (!data || !data.product) {
      throw new Error('Failed to update plan');
    }
    
    return {
      ...planData,
      id: data.product.id,
      updatedAt: new Date().toISOString()
    } as Plan;
  } catch (error) {
    console.error(`Error updating plan ${id}:`, error);
    throw error;
  }
};

// Delete a plan
const deletePlan = async (id: string): Promise<boolean> => {
  try {
    // Call Supabase function to delete or archive a plan in Stripe
    const { data, error } = await supabase.functions.invoke('manage-plans', {
      body: { 
        method: 'DELETE', 
        action: 'delete-product',
        productId: id
      }
    });
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error(`Error deleting plan ${id}:`, error);
    return false;
  }
};

export const planService = {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
};
