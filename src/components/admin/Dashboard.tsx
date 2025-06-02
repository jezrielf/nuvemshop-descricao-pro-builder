
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, CreditCard, TrendingUp, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalUsers: number;
  premiumUsers: number;
  totalDescriptions: number;
  totalTemplates: number;
  activeSubscriptions: number;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    premiumUsers: 0,
    totalDescriptions: 0,
    totalTemplates: 0,
    activeSubscriptions: 0
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadStats = async () => {
    setLoading(true);
    try {
      // Get users count
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get premium users count
      const { count: premiumUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .or('role.ilike.%premium%,role.ilike.%admin%');

      // Get templates count
      const { count: totalTemplates } = await supabase
        .from('templates')
        .select('*', { count: 'exact', head: true });

      // Get active subscriptions
      const { count: activeSubscriptions } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('subscribed', true);

      // Count descriptions from localStorage
      let totalDescriptions = 0;
      try {
        const allKeys = Object.keys(localStorage);
        const descriptionKeys = allKeys.filter(key => key.startsWith('savedDescriptions_'));
        descriptionKeys.forEach(key => {
          const descriptions = JSON.parse(localStorage.getItem(key) || '[]');
          totalDescriptions += descriptions.length;
        });
      } catch (error) {
        console.error('Error counting descriptions:', error);
      }

      setStats({
        totalUsers: totalUsers || 0,
        premiumUsers: premiumUsers || 0,
        totalDescriptions,
        totalTemplates: totalTemplates || 0,
        activeSubscriptions: activeSubscriptions || 0
      });

      toast({
        title: 'Dashboard atualizado',
        description: 'Estatísticas carregadas com sucesso'
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar estatísticas',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button onClick={loadStats} disabled={loading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.premiumUsers} premium
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assinantes Ativos</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalUsers > 0 ? ((stats.activeSubscriptions / stats.totalUsers) * 100).toFixed(1) : 0}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Descrições Geradas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDescriptions}</div>
            <p className="text-xs text-muted-foreground">
              Total no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTemplates}</div>
            <p className="text-xs text-muted-foreground">
              Disponíveis
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
