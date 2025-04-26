
import { supabase } from '@/integrations/supabase/client';

// Get dashboard statistics
const getDashboardStats = async () => {
  try {
    // Count total users
    const { count: userCount, error: userError } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true });
    
    if (userError) throw userError;
    
    // Count total templates
    const { count: templateCount, error: templateError } = await supabase
      .from('templates')
      .select('id', { count: 'exact', head: true });
      
    if (templateError) throw templateError;
    
    // Count total subscribers
    const { count: subscriberCount, error: subscriberError } = await supabase
      .from('subscribers')
      .select('id', { count: 'exact', head: true })
      .eq('subscribed', true);
      
    if (subscriberError) throw subscriberError;
    
    // Get recent users
    const { data: recentUsers, error: recentUsersError } = await supabase
      .from('profiles')
      .select('*')
      .order('criado_em', { ascending: false })
      .limit(5);
      
    if (recentUsersError) throw recentUsersError;
    
    // Calculate active percentage (mock for now)
    const activePercentage = 65; // This would be calculated based on real data
    
    return {
      users: {
        total: userCount || 0,
        active: Math.round((userCount || 0) * (activePercentage / 100)),
        activePercentage,
        recentUsers: recentUsers || []
      },
      templates: {
        total: templateCount || 0
      },
      subscribers: {
        total: subscriberCount || 0,
        percentage: subscriberCount && userCount ? Math.round((subscriberCount / userCount) * 100) : 0
      }
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    return {
      users: { total: 0, active: 0, activePercentage: 0, recentUsers: [] },
      templates: { total: 0 },
      subscribers: { total: 0, percentage: 0 }
    };
  }
};

export const analyticsService = {
  getDashboardStats
};
