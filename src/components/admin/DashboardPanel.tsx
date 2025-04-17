
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Users, ShoppingCart, FileText, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { adminService } from '@/services/adminService';

// Demo data for charts that don't have backend data yet
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const defaultSalesData = [
  { name: 'Jan', value: 1200 },
  { name: 'Fev', value: 1900 },
  { name: 'Mar', value: 2400 },
  { name: 'Abr', value: 1800 },
  { name: 'Mai', value: 2800 },
  { name: 'Jun', value: 3100 }
];

const defaultTemplateUsage = [
  { name: 'Suplementos', value: 45 },
  { name: 'Eletrônicos', value: 30 },
  { name: 'Roupas', value: 65 },
  { name: 'Calçados', value: 38 },
  { name: 'Outros', value: 22 }
];

const DashboardPanel: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userStats, setUserStats] = useState({
    total: 0,
    premium: 0,
    admin: 0,
    newToday: 0
  });
  const [salesData, setSalesData] = useState(defaultSalesData);
  const [planDistribution, setPlanDistribution] = useState<Array<{ name: string; value: number }>>([]);
  const [templateUsage, setTemplateUsage] = useState(defaultTemplateUsage);
  const [descriptionsStats, setDescriptionsStats] = useState({
    total: 0,
    recent: 0
  });
  const [plansStats, setPlansStats] = useState({
    total: 0,
    active: 0
  });
  
  const { toast } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load dashboard stats from our admin service
      const stats = await adminService.getDashboardStats();
      
      setUserStats(stats.userStats);
      setDescriptionsStats(stats.descriptions);
      setPlansStats(stats.plans);
      
      // Create plan distribution data
      const planDistData = [];
      if (stats.userStats.premium > 0) planDistData.push({ name: 'Premium', value: stats.userStats.premium });
      if (stats.userStats.total - stats.userStats.premium - stats.userStats.admin > 0) {
        planDistData.push({ name: 'Básico', value: stats.userStats.total - stats.userStats.premium - stats.userStats.admin });
      }
      if (stats.userStats.admin > 0) planDistData.push({ name: 'Admin', value: stats.userStats.admin });
      
      setPlanDistribution(planDistData);
      
      // Success toast
      toast({
        title: "Dashboard atualizado",
        description: "Os dados do dashboard foram atualizados com sucesso.",
      });
    } catch (error: any) {
      console.error('Error loading dashboard data:', error);
      
      toast({
        title: 'Erro ao carregar dados',
        description: error.message || 'Ocorreu um erro ao atualizar o dashboard.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button variant="outline" onClick={loadData} disabled={loading}>
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
            <div className="text-2xl font-bold">{userStats.total}</div>
            <p className="text-xs text-muted-foreground">
              +{userStats.newToday} hoje
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Premium</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.premium}</div>
            <p className="text-xs text-muted-foreground">
              {userStats.total > 0 ? Math.round((userStats.premium / userStats.total) * 100) : 0}% do total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planos Ativos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plansStats.active}</div>
            <p className="text-xs text-muted-foreground">
              De {plansStats.total} planos totais
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Descrições Geradas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{descriptionsStats.total}</div>
            <p className="text-xs text-muted-foreground">
              +{descriptionsStats.recent} nas últimas 24h
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vendas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="planos">Planos</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="vendas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendas Mensais</CardTitle>
              <CardDescription>
                Visualização das vendas nos últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value}`, 'Vendas']} />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="planos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Planos</CardTitle>
              <CardDescription>
                Distribuição de usuários por plano
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistribution.length > 0 ? planDistribution : [{ name: 'Sem dados', value: 1 }]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Uso de Templates</CardTitle>
              <CardDescription>
                Templates mais utilizados por categoria
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={templateUsage}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPanel;
