
import { v4 as uuidv4 } from 'uuid';

// Type for a plan feature
export interface PlanFeature {
  name: string;
  included: boolean;
}

// Type for a plan
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year' | 'one-time';
  features: PlanFeature[];
  isActive: boolean;
  isDefault: boolean;
  stripePriceId?: string;
  createdAt: string;
  updatedAt: string;
}

// Get all plans
const getPlans = async (): Promise<Plan[]> => {
  try {
    // In a real app, this would be fetched from an API or database
    // Return mock data for now
    return [
      {
        id: "1",
        name: "Free",
        description: "Basic features for free",
        price: 0,
        currency: "BRL",
        interval: "month",
        features: [
          { name: "Unlimited Templates", included: false },
          { name: "AI Generation", included: false },
          { name: "Remove Attribution", included: false },
        ],
        isActive: true,
        isDefault: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Pro",
        description: "For professionals and businesses",
        price: 29.90,
        currency: "BRL",
        interval: "month",
        features: [
          { name: "Unlimited Templates", included: true },
          { name: "AI Generation", included: true },
          { name: "Remove Attribution", included: true },
        ],
        isActive: true,
        isDefault: false,
        stripePriceId: "price_1abc123def456",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];
  } catch (error) {
    console.error('Error fetching plans:', error);
    return [];
  }
};

// Create a new plan
const createPlan = async (planData: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plan> => {
  try {
    const newPlan = {
      ...planData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, save to database
    console.log('Creating plan:', newPlan);
    return newPlan;
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error;
  }
};

// Update an existing plan
const updatePlan = async (id: string, planData: Partial<Plan>): Promise<Plan> => {
  try {
    // In a real app, update in database
    console.log('Updating plan:', id, planData);
    
    // Mock response for now
    return {
      id,
      name: planData.name || "Updated Plan",
      description: planData.description || "Updated description",
      price: planData.price || 0,
      currency: planData.currency || "BRL",
      interval: planData.interval || "month",
      features: planData.features || [],
      isActive: planData.isActive !== undefined ? planData.isActive : true,
      isDefault: planData.isDefault !== undefined ? planData.isDefault : false,
      stripePriceId: planData.stripePriceId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error updating plan:', error);
    throw error;
  }
};

// Delete a plan
const deletePlan = async (id: string): Promise<boolean> => {
  try {
    // In a real app, delete from database
    console.log('Deleting plan:', id);
    return true;
  } catch (error) {
    console.error('Error deleting plan:', error);
    throw error;
  }
};

export const planService = {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
};
