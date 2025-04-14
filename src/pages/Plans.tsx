
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CurrentPlanCard from '@/components/plans/CurrentPlanCard';
import PlanCard from '@/components/plans/PlanCard';
import { usePlanSubscription } from '@/components/plans/hooks/usePlanSubscription';

interface StripePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  isActive: boolean;
  features: string[];
  isDefault: boolean;
}

const Plans: React.FC = () => {
  const { isSubscribed, subscriptionTier, user, refreshSubscription } = useAuth();
  const [plans, setPlans] = useState<StripePlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loading, handleSubscribe, handleManageSubscription } = usePlanSubscription();

  const fetchPlans = useCallback(async () => {
    try {
      setPlansLoading(true);
      setLoadError(null);
      console.log("Fetching plans for public display...");
      
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { method: 'GET', action: 'list-products' }
      });
      
      if (error || (data && !data.success)) {
        throw new Error(error?.message || data?.error || "Erro ao carregar planos");
      }
      
      if (!data.products) {
        console.log("No plans data returned");
        setPlans([]);
        return;
      }
      
      const activePlans = data.products
        .filter((product: StripePlan) => product.isActive)
        .sort((a: StripePlan, b: StripePlan) => a.price - b.price);
      
      console.log("Retrieved active plans:", activePlans.length);
      setPlans(activePlans);
    } catch (error: any) {
      console.error("Error fetching plans:", error);
      setLoadError(error.message || "Erro ao carregar planos");
      setPlans([]);
    } finally {
      setPlansLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleRefreshPlans = () => {
    fetchPlans();
    if (user) {
      refreshSubscription();
    }
  };

  if (plansLoading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 mx-auto animate-spin text-primary" />
          <p className="mt-4 text-lg">Carregando planos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-center">Planos de Assinatura</h1>
          <p className="text-center text-muted-foreground">
            Escolha o plano ideal para suas necessidades
          </p>
        </div>
        <Button variant="outline" onClick={handleRefreshPlans} size="sm">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>
      
      {loadError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {loadError}. Tente atualizar a página ou tente novamente mais tarde.
          </AlertDescription>
        </Alert>
      )}
      
      {user && (
        <CurrentPlanCard
          isSubscribed={isSubscribed()}
          subscriptionTier={subscriptionTier}
          onManageSubscription={handleManageSubscription}
          loading={loading === 'manage'}
        />
      )}
      
      {plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isPlanActive={plan.price === 0 
                ? !isSubscribed() 
                : subscriptionTier?.toLowerCase() === plan.name.toLowerCase()}
              loading={loading === plan.id}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      ) : !loadError ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-4">Nenhum plano disponível no momento</h3>
          <p className="text-muted-foreground mb-6">
            Não encontramos planos disponíveis. Tente novamente mais tarde.
          </p>
          <Button variant="outline" onClick={handleRefreshPlans}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar Novamente
          </Button>
        </div>
      ) : null}
      
      {!user && (
        <div className="mt-10 text-center">
          <p className="mb-4 text-muted-foreground">
            Para assinar um plano, faça login em sua conta primeiro.
          </p>
          <Button onClick={() => navigate('/auth')}>
            Fazer Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Plans;
