
import { Plan } from '@/types/subscription';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// Get all plans
const getPlans = async (): Promise<Plan[]> => {
  try {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('price');
      
    if (error) throw error;
    
    return data as Plan[];
  } catch (error) {
    console.error('Error fetching plans:', error);
    return [];
  }
};

// Get a plan by ID
const getPlanById = async (id: string): Promise<Plan | null> => {
  try {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return data as Plan;
  } catch (error) {
    console.error(`Error fetching plan ${id}:`, error);
    return null;
  }
};

// Create a new plan
const createPlan = async (planData: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plan> => {
  try {
    const now = new Date().toISOString();
    const newPlan: Plan = {
      id: uuidv4(),
      ...planData,
      createdAt: now,
      updatedAt: now
    };
    
    const { error } = await supabase
      .from('plans')
      .insert([{
        id: newPlan.id,
        name: newPlan.name,
        description: newPlan.description,
        price: newPlan.price,
        interval: newPlan.interval,
        currency: newPlan.currency,
        features: newPlan.features,
        created_at: newPlan.createdAt,
        updated_at: newPlan.updatedAt
      }]);
      
    if (error) throw error;
    
    return newPlan;
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error;
  }
};

// Update a plan
const updatePlan = async (id: string, planData: Partial<Plan>): Promise<Plan> => {
  try {
    const updates = {
      ...planData,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('plans')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return data as Plan;
  } catch (error) {
    console.error(`Error updating plan ${id}:`, error);
    throw error;
  }
};

// Delete a plan
const deletePlan = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('plans')
      .delete()
      .eq('id', id);
      
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
