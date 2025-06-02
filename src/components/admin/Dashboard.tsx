
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, ShoppingCart, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalUsers: number;
  premiumUsers: number;
  totalTemplates: number;
  totalDescriptions: number;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    premiumUsers: 0,
    totalTemplates: 0,
    totalDescriptions: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Load total users
      const { count: totalUsers, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      if (usersError) throw usersError;
      
      // Load premium users
      const { count: premiumUsers, error: premiumError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .in('role', ['premium', 'admin']);
      
      if (premiumError) throw premiumError;
      
      // Load total templates
      const { count: totalTemplates, error: templatesError } = await supabase
        .from('templates')
        .select('*', { count: 'exact', head: true });
      
      if (templatesError) throw templatesError;
      
      // For descriptions, we'll use a placeholder since we need to identify the correct table
      const totalDescriptions = 0; // TODO: Connect to correct descriptions table
      
      setStats({
        totalUsers: totalUsers || 0,
        premiumUsers: premiumUsers || 0,
        totalTemplates: totalTemplates || 0,
        totalDescriptions
      });
      
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar estatísticas do dashboard',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const dashboardCards = [
    {
      title: 'Total de Usuários',
      value: stats.totalUsers,
      description: 'Usuários cadastrados',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Usuários Premium',
      value: stats.premiumUsers,
      description: 'Usuários com planos pagos',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Templates',
      value: stats.totalTemplates,
      description: 'Templates disponíveis',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      title: 'Descrições',
      value: stats.totalDescriptions,
      description: 'Descrições criadas',
      icon: ShoppingCart,
      color: 'text-orange-600'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carregando...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">-</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          onClick={loadDashboardStats}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Atualizar
        </button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Estatísticas Recentes</CardTitle>
            <CardDescription>
              Atividade dos últimos 30 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Taxa de conversão:</span>
                <span className="text-sm font-medium">
                  {stats.totalUsers > 0 ? ((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Templates por usuário:</span>
                <span className="text-sm font-medium">
                  {stats.totalUsers > 0 ? (stats.totalTemplates / stats.totalUsers).toFixed(1) : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Links úteis para administração
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="text-sm text-blue-600 hover:underline block">
                Ver todos os usuários
              </button>
              <button className="text-sm text-blue-600 hover:underline block">
                Gerenciar templates
              </button>
              <button className="text-sm text-blue-600 hover:underline block">
                Configurações do sistema
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
