
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, FileCode, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DashboardPanel: React.FC = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    descriptionCount: 0,
    templateCount: 0,
    planCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch user count
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (userError) throw userError;

        // For demonstration, we'll use the templates from the template store
        // In a real app, you would fetch from the database
        const templateStore = await import('@/store/templateStore');
        const templateCount = templateStore.useTemplateStore.getState().templates.length;

        // For demo purposes, set some placeholder values for the other stats
        // In a real app, these would come from database queries
        
        setStats({
          userCount: userCount || 0,
          descriptionCount: localStorage.length, // Simple approximation
          templateCount,
          planCount: 3, // Placeholder
        });
      } catch (error: any) {
        toast({
          title: 'Erro ao carregar estatísticas',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [toast]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Visão Geral do Sistema</h2>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
              <CardDescription>Total de contas no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-2xl font-bold">{stats.userCount}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Descrições</CardTitle>
              <CardDescription>Descrições de produtos criadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-2xl font-bold">{stats.descriptionCount}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Templates</CardTitle>
              <CardDescription>Templates disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileCode className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-2xl font-bold">{stats.templateCount}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Planos</CardTitle>
              <CardDescription>Planos de assinatura ativos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-2xl font-bold">{stats.planCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações realizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Esta seção mostrará um log de atividades recentes. Será implementado quando o sistema de logs estiver disponível.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Estatísticas de Uso</CardTitle>
            <CardDescription>Dados de uso da plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gráficos de uso serão exibidos aqui. Será implementado quando o sistema de estatísticas estiver disponível.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPanel;
