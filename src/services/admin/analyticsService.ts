
import { supabase } from '@/integrations/supabase/client';

// Get main dashboard statistics
const getDashboardStats = async () => {
  try {
    // In a real app, we would get this data from Supabase
    // For now, we return mock data
    return getMockDashboardStats();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return getMockDashboardStats();
  }
};

// Get sales performance data
const getSalesPerformance = async (startDate: string, endDate: string) => {
  try {
    // Mock implementation for now
    return getMockSalesPerformance(startDate, endDate);
  } catch (error) {
    console.error('Error fetching sales performance:', error);
    return [];
  }
};

// Get user growth data
const getUserGrowth = async (period: 'day' | 'week' | 'month' | 'year') => {
  try {
    // Mock implementation for now
    return getMockUserGrowth(period);
  } catch (error) {
    console.error('Error fetching user growth:', error);
    return [];
  }
};

// Mock data for development
const getMockDashboardStats = () => {
  return {
    users: {
      total: 245,
      growth: 12.5,
      new: 18
    },
    sales: {
      total: 384,
      growth: 8.2
    },
    revenue: {
      total: 12950.75,
      growth: 14.3
    },
    conversions: {
      rate: 2.8,
      growth: 1.2
    },
    charts: {
      revenue: [
        { name: 'Jan', value: 4000 },
        { name: 'Fev', value: 3000 },
        { name: 'Mar', value: 5000 },
        { name: 'Abr', value: 4500 },
        { name: 'Mai', value: 6000 },
        { name: 'Jun', value: 5500 }
      ],
      visits: [
        { name: 'Jan', value: 2400 },
        { name: 'Fev', value: 1398 },
        { name: 'Mar', value: 3000 },
        { name: 'Abr', value: 2780 },
        { name: 'Mai', value: 3908 },
        { name: 'Jun', value: 3800 }
      ]
    },
    recentActivities: [
      {
        title: 'Novo usuário registrado',
        description: 'João Silva se cadastrou na plataforma',
        time: 'Há 5 minutos'
      },
      {
        title: 'Novo template adicionado',
        description: 'O template "Produto Premium" foi criado',
        time: 'Há 2 horas'
      },
      {
        title: 'Assinatura atualizada',
        description: 'Maria Oliveira atualizou para o plano Business',
        time: 'Há 4 horas'
      }
    ]
  };
};

const getMockSalesPerformance = (startDate: string, endDate: string) => {
  return [
    { date: '2023-01-01', sales: 12, revenue: 1250.75 },
    { date: '2023-01-02', sales: 8, revenue: 845.20 },
    { date: '2023-01-03', sales: 15, revenue: 1876.50 }
  ];
};

const getMockUserGrowth = (period: string) => {
  return [
    { date: '2023-01-01', users: 120 },
    { date: '2023-01-02', users: 125 },
    { date: '2023-01-03', users: 132 }
  ];
};

export const analyticsService = {
  getDashboardStats,
  getSalesPerformance,
  getUserGrowth
};
