
import { supabase } from '@/integrations/supabase/client';

export const dashboardService = {
  getDashboardStats: async () => {
    try {
      console.log('DashboardService: Fetching dashboard stats');

      // Estatísticas de usuários
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, role, criado_em');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw new Error(`Erro ao buscar perfis: ${profilesError.message}`);
      }

      // Contar usuários por role
      const totalUsers = profiles?.length || 0;
      const premiumUsers = profiles?.filter(p => 
        p.role && (p.role.includes('premium') || p.role === 'premium')
      ).length || 0;
      const adminUsers = profiles?.filter(p => 
        p.role && (p.role.includes('admin') || p.role === 'admin')
      ).length || 0;

      // Usuários criados hoje
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newUsersToday = profiles?.filter(p => {
        const createdDate = new Date(p.criado_em);
        return createdDate >= today;
      }).length || 0;

      // Estatísticas de assinantes do Stripe
      const { data: subscribers, error: subscribersError } = await supabase
        .from('subscribers')
        .select('*');

      if (subscribersError) {
        console.error('Error fetching subscribers:', subscribersError);
      }

      const totalSubscribers = subscribers?.length || 0;
      const activeSubscribers = subscribers?.filter(s => s.subscribed).length || 0;

      // Contar descrições no localStorage (aproximação)
      const allStorageKeys = Object.keys(localStorage);
      const descriptionKeys = allStorageKeys.filter(key => 
        key.startsWith('savedDescriptions_')
      );
      
      let totalDescriptions = 0;
      let recentDescriptions = 0;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      descriptionKeys.forEach(key => {
        try {
          const userDescriptions = JSON.parse(localStorage.getItem(key) || '[]');
          totalDescriptions += userDescriptions.length;
          
          // Contar descrições recentes (últimas 24h)
          const recent = userDescriptions.filter((desc: any) => {
            const updatedDate = new Date(desc.updatedAt);
            return updatedDate >= yesterday;
          });
          recentDescriptions += recent.length;
        } catch (error) {
          console.error(`Error parsing descriptions for key ${key}:`, error);
        }
      });

      // Buscar templates
      const { data: templates, error: templatesError } = await supabase
        .from('templates')
        .select('id');

      if (templatesError) {
        console.error('Error fetching templates:', templatesError);
      }

      const totalTemplates = templates?.length || 0;

      const stats = {
        userStats: {
          total: totalUsers,
          premium: premiumUsers,
          admin: adminUsers,
          newToday: newUsersToday
        },
        descriptions: {
          total: totalDescriptions,
          recent: recentDescriptions
        },
        templates: {
          total: totalTemplates
        },
        subscribers: {
          total: totalSubscribers,
          active: activeSubscribers
        }
      };

      console.log('DashboardService: Stats calculated:', stats);
      return stats;
    } catch (error: any) {
      console.error('DashboardService: Error fetching stats:', error);
      throw new Error(`Erro ao buscar estatísticas: ${error.message}`);
    }
  }
};
