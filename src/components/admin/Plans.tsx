
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, DollarSign, Users, TrendingUp, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface StripePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  isActive: boolean;
  features: Array<{ name: string; included: boolean }>;
}

interface SubscriptionStats {
  total: number;
  active: number;
  cancelled: number;
  revenue: number;
}

export const Plans: React.FC = () => {
  const [plans, setPlans] = useState<StripePlan[]>([]);
  const [subscriptionStats, setSubscriptionStats] = useState<SubscriptionStats>({
    total: 0,
    active: 0,
    cancelled: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadPlansAndStats = async () => {
    setLoading(true);
    try {
      // Load plans from Stripe
      const { data: plansData, error: plansError } = await supabase.functions.invoke('manage-plans', {
        body: { method: 'GET', action: 'list-products' }
      });

      if (plansError) throw plansError;

      if (plansData?.products) {
        const formattedPlans = plansData.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description || '',
          price: product.price,
          priceId: product.priceId,
          isActive: product.isActive,
          features: product.features || []
        }));
        setPlans(formattedPlans);
      }

      // Load subscription stats from Supabase
      const { count: totalSubs } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true });

      const { count: activeSubs } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('subscribed', true);

      const { count: cancelledSubs } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('subscribed', false);

      // Calculate estimated revenue (simplified)
      const estimatedRevenue = (activeSubs || 0) * 29.99; // Assuming average plan price

      setSubscriptionStats({
        total: totalSubs || 0,
        active: activeSubs || 0,
        cancelled: cancelledSubs || 0,
        revenue: estimatedRevenue
      });

      toast({
        title: 'Dados atualizados',
        description: 'Planos e estatísticas carregados com sucesso'
      });
    } catch (error) {
      console.error('Error loading plans and stats:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar dados dos planos',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlansAndStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Planos e Assinaturas</h2>
        <Button onClick={loadPlansAndStats} disabled={loading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assinantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Total de assinantes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assinantes Ativos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionStats.active}</div>
            <p className="text-xs text-muted-foreground">
              {subscriptionStats.total > 0 ? 
                Math.round((subscriptionStats.active / subscriptionStats.total) * 100) : 0}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Estimada</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {subscriptionStats.revenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Receita mensal estimada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planos Ativos</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {plans.filter(p => p.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              De {plans.length} planos totais
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Plans List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Planos no Stripe</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <Badge variant={plan.isActive ? 'default' : 'secondary'}>
                    {plan.isActive ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  R$ {plan.price.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground">/mês</span>
                </div>
                
                {plan.features.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Recursos:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className={feature.included ? "text-green-600" : "text-red-600"}>
                            {feature.included ? "✓" : "✗"}
                          </span>
                          <span className="ml-2">{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {plans.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum plano encontrado no Stripe</p>
          </div>
        )}
      </div>
    </div>
  );
};
