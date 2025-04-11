
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, FileCode, CreditCard, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useTemplateStore } from '@/store/templateStore';

const DashboardPanel: React.FC = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    descriptionCount: 0,
    templateCount: 0,
    planCount: 3, // Fixed value for now
    userGrowth: 0,
    contentGrowth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any[]>([]);
  const [contentData, setContentData] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const { toast } = useToast();
  const { templates } = useTemplateStore();

  useEffect(() => {
    fetchStats();
    generateMockChartData();
    generateMockActivities();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Get exact count of profiles - this should match the total user count
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (userError) throw userError;

      console.log('Fetched user count:', userCount);

      // Get real template count from the store
      const templateCount = templates.length;

      // Calculate approximate user growth (mock calculation)
      const userGrowth = userCount && userCount > 0 ? Math.floor(Math.random() * 25) + 5 : 0;
      
      // Estimate content growth (mock calculation)
      const contentGrowth = templateCount > 0 ? Math.floor(Math.random() * 30) + 10 : 0;

      // Count local storage items as descriptions (approximation)
      const localStorageCount = Object.keys(localStorage).filter(key => 
        key.startsWith('description_')).length;
      
      setStats({
        userCount: userCount || 0,
        descriptionCount: localStorageCount,
        templateCount,
        planCount: 3, // Fixed value for demo
        userGrowth,
        contentGrowth,
      });
    } catch (error: any) {
      console.error('Error fetching stats:', error);
      toast({
        title: 'Erro ao carregar estatísticas',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMockChartData = () => {
    // Generate realistic user data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const userDataPoints = months.map((name, index) => {
      // Create a growing trend
      const baseValue = 4;
      const growth = index * 4 + Math.floor(Math.random() * 3);
      return { name, users: baseValue + growth };
    });
    
    // Generate content data
    const contentDataPoints = months.map((name, index) => {
      // Base values with some randomness
      const baseDescriptions = 10;
      const descGrowth = index * 5 + Math.floor(Math.random() * 5);
      
      const baseTemplates = 2;
      const templateGrowth = Math.floor(index * 1.2) + Math.floor(Math.random() * 2);
      
      return { 
        name, 
        descriptions: baseDescriptions + descGrowth,
        templates: baseTemplates + templateGrowth
      };
    });
    
    setUserData(userDataPoints);
    setContentData(contentDataPoints);
  };

  const generateMockActivities = () => {
    const activities = [
      { id: 1, user: 'Ana Silva', action: 'Criou uma nova descrição', timestamp: '2 horas atrás', type: 'creation' },
      { id: 2, user: 'João Lima', action: 'Atualizou template', timestamp: '5 horas atrás', type: 'update' },
      { id: 3, user: 'Maria Costa', action: 'Registrou-se', timestamp: '1 dia atrás', type: 'registration' },
      { id: 4, user: 'Pedro Santos', action: 'Alterou plano', timestamp: '2 dias atrás', type: 'billing' },
      { id: 5, user: 'Carla Oliveira', action: 'Criou uma nova descrição', timestamp: '3 dias atrás', type: 'creation' },
    ];
    
    setRecentActivities(activities);
  };

  const getActionBadge = (type: string) => {
    switch (type) {
      case 'creation':
        return <Badge className="bg-green-500">Criação</Badge>;
      case 'update':
        return <Badge className="bg-blue-500">Atualização</Badge>;
      case 'registration':
        return <Badge className="bg-purple-500">Registro</Badge>;
      case 'billing':
        return <Badge className="bg-yellow-500">Faturamento</Badge>;
      default:
        return <Badge>Outro</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      {/* KPI Cards */}
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
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Usuários Totais
                <div className="flex items-center text-green-500">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span className="text-xs">{stats.userGrowth}%</span>
                </div>
              </CardTitle>
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
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Descrições
                <div className="flex items-center text-green-500">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span className="text-xs">{stats.contentGrowth}%</span>
                </div>
              </CardTitle>
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
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Crescimento de Usuários</CardTitle>
            <CardDescription>Usuários registrados por mês</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={userData}>
                  <defs>
                    <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#userGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Criado</CardTitle>
            <CardDescription>Evolução do conteúdo ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={contentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="descriptions" fill="#8884d8" />
                  <Bar dataKey="templates" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações realizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items.center space-x-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{activity.user}</p>
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.action}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {getActionBadge(activity.type)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Perfil de Uso</CardTitle>
            <CardDescription>Estatísticas detalhadas de uso do sistema</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="usage">
              <TabsList className="w-full">
                <TabsTrigger value="usage" className="flex-1">Uso</TabsTrigger>
                <TabsTrigger value="performance" className="flex-1">Performance</TabsTrigger>
                <TabsTrigger value="errors" className="flex-1">Erros</TabsTrigger>
              </TabsList>
              <TabsContent value="usage" className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recurso</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Tendência</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Páginas Geradas</TableCell>
                      <TableCell>{stats.descriptionCount * 3}</TableCell>
                      <TableCell className="text-green-500">↑ 12%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Templates Usados</TableCell>
                      <TableCell>{Math.floor(stats.templateCount * 0.7)}</TableCell>
                      <TableCell className="text-green-500">↑ 8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>AI Utilizações</TableCell>
                      <TableCell>{stats.descriptionCount * 2}</TableCell>
                      <TableCell className="text-green-500">↑ 23%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="performance" className="p-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={userData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="errors" className="p-4">
                <p className="text-center text-muted-foreground p-4">
                  Nenhum erro reportado nas últimas 24 horas.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPanel;
