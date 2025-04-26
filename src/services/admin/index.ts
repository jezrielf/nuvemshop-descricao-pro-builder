
import { templateService } from './templateService';
import { userService } from './userService';

// Define the return type for the dashboard stats
interface DashboardStats {
  userStats: {
    total: number;
    premium: number;
    admin: number;
    newToday: number;
  };
  descriptions: {
    total: number;
    recent: number;
  };
  plans: {
    total: number;
    active: number;
  };
  templates: number;
}

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
  getDashboardStats: async (): Promise<DashboardStats> => {
    console.info('Fetching dashboard stats');
    // Mock implementation with the correct structure
    return {
      userStats: {
        total: 25,
        premium: 8,
        admin: 2,
        newToday: 3
      },
      descriptions: {
        total: 42,
        recent: 5
      },
      plans: {
        total: 3,
        active: 2
      },
      templates: 15
    };
  },

  // Template methods from templateService
  ...templateService
};

// Re-export individual services for direct usage
export * from './templateService';
export { userService } from './userService';
