
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyticsService } from '@/services/admin/analyticsService';
import { Skeleton } from '@/components/ui/skeleton';
import DashboardStatsGrid from './dashboard/DashboardStatsGrid';
import DashboardCharts from './dashboard/DashboardCharts';
import DashboardRecentActivity from './dashboard/DashboardRecentActivity';

const DashboardPanel: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const dashboardStats = await analyticsService.getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-[80px] w-full" />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[200px] w-full" />
              </div>
            </div>
          ) : (
            <>
              <DashboardStatsGrid stats={stats} />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <DashboardCharts stats={stats} />
                <Card className="col-span-1">
                  <CardContent className="p-6">
                    <DashboardRecentActivity stats={stats} />
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Análise Detalhada</h3>
              <p className="text-muted-foreground">
                Esta seção está em desenvolvimento. Em breve você poderá acessar análises detalhadas sobre seu negócio.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Relatórios</h3>
              <p className="text-muted-foreground">
                Esta seção está em desenvolvimento. Em breve você poderá gerar e exportar relatórios personalizados.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPanel;
