
import { templateService } from './templateService';
import { userService } from './userService';

// Create a centralized adminService object that exports all admin services
export const adminService = {
  // Plan-related methods
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
  },

  // User-related methods
  getUsers: async () => userService.getUserList(),
  createUser: async (email: string, password: string, userData: any) => {
    console.info('Creating user:', email, userData);
    // Mock implementation
    return { id: `user-${Date.now()}`, email, ...userData };
  },
  updateUserProfile: async (userId: string, data: any) => {
    console.info('Updating user profile:', userId, data);
    // Mock implementation
    return { id: userId, ...data };
  },
  updateUserRole: async (userId: string, role: string | string[]) => {
    console.info('Updating user role:', userId, role);
    // Mock implementation
    return { id: userId, role };
  },
  deleteUser: async (userId: string) => {
    console.info('Deleting user:', userId);
    // Mock implementation
    return true;
  },

  // Dashboard-related methods
  getDashboardStats: async () => {
    console.info('Fetching dashboard stats');
    // Mock implementation
    return {
      users: 25,
      descriptions: 42,
      templates: 15,
      plans: 3
    };
  },

  // Template methods from templateService
  ...templateService
};

// Re-export individual services for direct usage
export * from './templateService';
export { userService } from './userService';
