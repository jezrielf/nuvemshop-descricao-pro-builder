
import { Plan } from '@/types/subscription';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { PlanFeature } from '@/components/admin/plans/types';

// Convert between different Plan types
const adaptPlanFormat = (plan: any): Plan => {
  // Convert features array based on its type
  let features: any[] = [];
  if (plan.features) {
    if (typeof plan.features[0] === 'string') {
      // If features are strings, convert to objects
      features = plan.features.map((feature: string) => ({
        name: feature,
        included: true
      }));
    } else {
      // Features are already objects
      features = plan.features;
    }
  }

  return {
    id: plan.id,
    name: plan.name,
    description: plan.description || '',
    price: plan.price,
    interval: plan.interval || 'month',
    currency: plan.currency || 'BRL',
    features: features,
    priceId: plan.priceId,
    isActive: plan.isActive !== undefined ? plan.isActive : true,
    isDefault: plan.isDefault !== undefined ? plan.isDefault : false,
    createdAt: plan.createdAt || plan.created_at,
    updatedAt: plan.updatedAt || plan.updated_at
  };
};

// Using mock data approach for plans as Supabase doesn't have a plans table
const getPlans = async (): Promise<Plan[]> => {
  try {
    // For development, use a more reliable approach by mocking the data
    // In production, this would call a Supabase Edge Function to get plans from Stripe
    return getMockPlans();
  } catch (error) {
    console.error('Error fetching plans:', error);
    return getMockPlans();
  }
};

// Get a plan by ID
const getPlanById = async (id: string): Promise<Plan | null> => {
  try {
    // In production, this would call a Supabase Edge Function
    const mockPlans = getMockPlans();
    const plan = mockPlans.find(p => p.id === id);
    return plan || null;
  } catch (error) {
    console.error(`Error fetching plan ${id}:`, error);
    return null;
  }
};

// Create a new plan
const createPlan = async (planData: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plan> => {
  try {
    // In production, this would call a Supabase Edge Function to create a plan in Stripe
    const newPlan: Plan = {
      id: uuidv4(),
      ...planData,
      interval: planData.interval || 'month',
      currency: planData.currency || 'BRL',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return newPlan;
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error;
  }
};

// Update a plan
const updatePlan = async (id: string, planData: Partial<Plan>): Promise<Plan> => {
  try {
    // In production, this would call a Supabase Edge Function to update a plan in Stripe
    const mockPlans = getMockPlans();
    const planIndex = mockPlans.findIndex(p => p.id === id);
    
    if (planIndex === -1) {
      throw new Error('Plan not found');
    }
    
    const updatedPlan: Plan = {
      ...mockPlans[planIndex],
      ...planData,
      updatedAt: new Date().toISOString()
    };
    
    return updatedPlan;
  } catch (error) {
    console.error(`Error updating plan ${id}:`, error);
    throw error;
  }
};

// Delete a plan
const deletePlan = async (id: string): Promise<boolean> => {
  try {
    // In production, this would call a Supabase Edge Function to delete/archive a plan in Stripe
    return true;
  } catch (error) {
    console.error(`Error deleting plan ${id}:`, error);
    return false;
  }
};

// Mock plans for development
const getMockPlans = (): Plan[] => {
  return [
    {
      id: '1',
      name: 'Plano Básico',
      description: 'Ideal para iniciantes',
      price: 29.90,
      interval: 'month',
      currency: 'BRL',
      features: ['1 loja', '100 produtos', 'Suporte básico'],
      priceId: 'price_basic',
      isActive: true,
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Plano Profissional',
      description: 'Para negócios em crescimento',
      price: 59.90,
      interval: 'month',
      currency: 'BRL',
      features: ['3 lojas', 'Produtos ilimitados', 'Suporte prioritário'],
      priceId: 'price_pro',
      isActive: true,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Plano Enterprise',
      description: 'Solução completa para grandes negócios',
      price: 129.90,
      interval: 'month',
      currency: 'BRL',
      features: ['10 lojas', 'Produtos ilimitados', 'Suporte VIP', 'API personalizada'],
      priceId: 'price_enterprise',
      isActive: true,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
};

export const planService = {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
};
