
import { supabase } from '@/integrations/supabase/client';
import { planService } from './planService';

export const dashboardService = {
  getDashboardStats: async (): Promise<any> => {
    try {
      console.log('Dashboard: Iniciando busca de estatísticas');
      
      // Get user stats from profiles table
      const { count: totalUsers, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
        
      if (countError) {
        console.error('Error counting total users:', countError);
      }
      
      // Get premium users count (users with premium or admin role)
      const { count: premiumUsers, error: premiumError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .or('role.ilike.%premium%,role.ilike.%admin%');
        
      if (premiumError) {
        console.error('Error counting premium users:', premiumError);
      }
      
      // Get admin users count
      const { count: adminUsers, error: adminError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .like('role', '%admin%');
        
      if (adminError) {
        console.error('Error counting admin users:', adminError);
      }
      
      // Get new users today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { count: newUsersToday, error: newUsersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('criado_em', today.toISOString());
        
      if (newUsersError) {
        console.error('Error counting new users:', newUsersError);
      }
      
      // Get descriptions data from localStorage (since they're stored locally)
      let totalDescriptions = 0;
      let recentDescriptions = 0;
      
      try {
        const allStorageKeys = Object.keys(localStorage);
        const descriptionKeys = allStorageKeys.filter(key => 
          key.startsWith('savedDescriptions_')
        );
        
        descriptionKeys.forEach(key => {
          try {
            const userDescriptions = JSON.parse(localStorage.getItem(key) || '[]');
            totalDescriptions += userDescriptions.length;
            
            // Count recent descriptions (last 24 hours)
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            const recentCount = userDescriptions.filter((desc: any) => 
              new Date(desc.updatedAt || desc.createdAt) > yesterday
            ).length;
            
            recentDescriptions += recentCount;
          } catch (e) {
            console.error('Error parsing descriptions for key:', key, e);
          }
        });
      } catch (error) {
        console.error('Error reading descriptions from localStorage:', error);
      }
      
      // Get subscriber stats
      const { count: subscribersCount, error: subscribersError } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('subscribed', true);
        
      if (subscribersError) {
        console.error('Error counting subscribers:', subscribersError);
      }
      
      // Get plans from Stripe
      let plansData = { total: 0, active: 0 };
      try {
        const plans = await planService.getPlans();
        plansData = {
          total: plans.length,
          active: plans.filter(p => p.isActive).length
        };
      } catch (error) {
        console.error('Error getting plans:', error);
      }
      
      const stats = {
        userStats: {
          total: totalUsers || 0,
          premium: premiumUsers || 0,
          admin: adminUsers || 0,
          newToday: newUsersToday || 0,
          subscribers: subscribersCount || 0
        },
        descriptions: {
          total: totalDescriptions,
          recent: recentDescriptions
        },
        plans: plansData
      };
      
      console.log('Dashboard stats:', stats);
      return stats;
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
      // Return default data as fallback
      return {
        userStats: {
          total: 0,
          premium: 0,
          admin: 0,
          newToday: 0,
          subscribers: 0
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
