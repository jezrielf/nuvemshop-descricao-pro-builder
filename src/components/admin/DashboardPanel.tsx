
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Users, ShoppingCart, FileText, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { mockPlans } from './plans/mockData';
import { useToast } from '@/hooks/use-toast';

// Demo data
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DashboardPanel: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userStats, setUserStats] = useState({
    total: 125,
    premium: 45,
    admin: 3,
    newToday: 5
  });
  const [salesData, setSalesData] = useState([
    { name: 'Jan', value: 1200 },
    { name: 'Fev', value: 1900 },
    { name: 'Mar', value: 2400 },
    { name: 'Abr', value: 1800 },
    { name: 'Mai', value: 2800 },
    { name: 'Jun', value: 3100 }
  ]);
  const [planDistribution, setPlanDistribution] = useState([
    { name: 'Básico', value: 80 },
    { name: 'Premium', value: 35 },
    { name: 'Empresarial', value: 10 }
  ]);
  const [templateUsage, setTemplateUsage] = useState([
    { name: 'Suplementos', value: 45 },
    { name: 'Eletrônicos', value: 30 },
    { name: 'Roupas', value: 65 },
    { name: 'Calçados', value: 38 },
    { name: 'Outros', value: 22 }
  ]);
  const { toast } = useToast();

  const refreshData = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Dashboard atualizado",
        description: "Os dados do dashboard foram atualizados com sucesso.",
      });
    }, 1500);
  };

  useEffect(() => {
    // Load data when component mounts
    refreshData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button variant="outline" onClick={refreshData} disabled={loading}>
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
              {Math.round((userStats.premium / userStats.total) * 100)}% do total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planos Ativos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPlans.filter(p => p.isActive).length}</div>
            <p className="text-xs text-muted-foreground">
              De {mockPlans.length} planos totais
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Descrições Geradas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +48 nas últimas 24h
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
                    data={planDistribution}
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
