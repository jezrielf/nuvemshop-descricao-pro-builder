
import { supabase } from '@/integrations/supabase/client';

// Get dashboard statistics
const getDashboardStats = async () => {
  try {
    const stats = {
      totalUsers: 0,
      activeUsers: 0,
      premiumUsers: 0,
      totalTemplates: 0,
      totalDescriptions: 0,
    };
    
    // In a production app, we would fetch real statistics from a database
    const { count: userCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    const { count: premiumCount } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('subscribed', true);
    
    const { count: templateCount } = await supabase
      .from('templates')
      .select('*', { count: 'exact', head: true });
    
    stats.totalUsers = userCount || 0;
    stats.activeUsers = Math.floor(stats.totalUsers * 0.7); // Placeholder: 70% of users are active
    stats.premiumUsers = premiumCount || 0;
    stats.totalTemplates = templateCount || 0;
    stats.totalDescriptions = Math.floor(stats.totalTemplates * 3); // Placeholder: average 3 descriptions per template
    
    return stats;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    // Return default values if there's an error
    return {
      totalUsers: 0,
      activeUsers: 0,
      premiumUsers: 0,
      totalTemplates: 0,
      totalDescriptions: 0,
    };
  }
};

export const analyticsService = {
  getDashboardStats,
};
