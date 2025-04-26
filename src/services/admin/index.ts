
import { templateService } from './templateService';
import { userService } from './userService';

// Create a centralized adminService object that exports all admin services
export const adminService = {
  ...templateService,
  ...userService,
  // Add other admin services here as needed
  getPlans: async () => {
    console.info('Buscando planos no Stripe via Edge Function');
    // Mock implementation - in a real app this would connect to an API
    return [];
  },
  createPlan: async (planData: any) => {
    console.info('Criando plano:', planData);
    // Mock implementation
    return { ...planData, id: `plan-${Date.now()}` };
  },
  updatePlan: async (id: string, planData: any) => {
    console.info('Atualizando plano:', id, planData);
    // Mock implementation
    return { ...planData, id };
  },
  deletePlan: async (id: string) => {
    console.info('Excluindo plano:', id);
    // Mock implementation
    return true;
  }
};

// Re-export individual services for direct usage
export * from './templateService';
export { userService } from './userService';
