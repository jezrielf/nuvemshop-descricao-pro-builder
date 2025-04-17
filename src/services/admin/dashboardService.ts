
import { supabase } from '@/integrations/supabase/client';
import { planService } from './planService';

export const dashboardService = {
  getDashboardStats: async (): Promise<any> => {
    try {
      // Get user stats
      const { count: totalUsers, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
        
      if (countError) throw countError;
      
      // Get premium users count
      const { count: premiumUsers, error: premiumError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'premium');
        
      if (premiumError) throw premiumError;
      
      // Get admin users count
      const { count: adminUsers, error: adminError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'admin');
        
      if (adminError) throw adminError;
      
      // Get new users today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { count: newUsersToday, error: newUsersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('criado_em', today.toISOString());
        
      if (newUsersError) throw newUsersError;
      
      // Mock descriptions data since the table doesn't exist
      // Instead of trying to query a non-existent table
      const totalDescriptions = 0;
      const recentDescriptions = 0;
      
      // Get plans
      const plans = await planService.getPlans();
      
      return {
        userStats: {
          total: totalUsers || 0,
          premium: premiumUsers || 0,
          admin: adminUsers || 0,
          newToday: newUsersToday || 0
        },
        descriptions: {
          total: totalDescriptions || 0,
          recent: recentDescriptions || 0
        },
        plans: {
          total: plans.length,
          active: plans.filter(p => p.isActive).length
        }
      };
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
      // Return mock data as fallback
      return {
        userStats: {
          total: 0,
          premium: 0,
          admin: 0,
          newToday: 0
        },
        descriptions: {
          total: 0,
          recent: 0
        },
        plans: {
          total: 0,
          active: 0
        }
      };
    }
  }
};
