
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, AlertCircle, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CurrentPlanCard from '@/components/plans/CurrentPlanCard';
import PlanCard from '@/components/plans/PlanCard';
import { usePlanSubscription } from '@/components/plans/hooks/usePlanSubscription';
import { supabase } from '@/integrations/supabase/client';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from '@/hooks/use-toast';

// Updated interface to match the format expected by PlanCard
interface StripePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  isActive: boolean;
  features: Array<{ name: string; included: boolean }>;
  isDefault: boolean;
}

const Plans: React.FC = () => {
  const { isSubscribed, subscriptionTier, user, profile, refreshSubscription } = useAuth();
  const [plans, setPlans] = useState<StripePlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loading, handleSubscribe, handleManageSubscription } = usePlanSubscription();

  // Function to check user authentication status
  const checkAuthStatus = useCallback(() => {
    if (!user) {
      setAuthStatus("Você precisa estar logado para gerenciar planos");
      return false;
    }
    
    if (!profile?.role || profile.role !== 'admin') {
      setAuthStatus("Você precisa ser administrador para gerenciar planos");
      return false;
    }
    
    setAuthStatus(null);
    return true;
  }, [user, profile]);

  const fetchPlans = useCallback(async () => {
    try {
      setPlansLoading(true);
      setLoadError(null);
      console.log("Fetching plans for public display...");
      
      // Get the current session to check authorization
      const { data: { session } } = await supabase.auth.getSession();
      
      // For public plans display, we don't need admin access
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { method: 'GET', action: 'list-products' },
        headers: session ? {
          Authorization: `Bearer ${session.access_token}`
        } : undefined
      });
      
      if (error || (data && !data.success)) {
        throw new Error(error?.message || data?.error || "Erro ao carregar planos");
      }
      
      if (!data.products) {
        console.log("No plans data returned");
        setPlans([]);
        return;
      }
      
      // Importante: Filtramos apenas planos ativos para a página pública
      const activePlans = data.products
        .filter((product: any) => product.isActive)
        .sort((a: any, b: any) => a.price - b.price)
        .map((product: any) => {
          // Transform the features array to match our StripePlan interface
          let transformedFeatures = [];
          
          if (Array.isArray(product.features)) {
            transformedFeatures = product.features.map((feature: any, index: number) => {
              // If feature is already in the correct format, use it
              if (typeof feature === 'object' && 'name' in feature && 'included' in feature) {
                return feature;
              }
              // If feature is a string, parse it (assuming format like "Feature Name:true")
              if (typeof feature === 'string') {
                const [name, includedStr] = feature.split(':');
                return {
                  name: name,
                  included: includedStr === 'true'
                };
              }
              // Default fallback
              return {
                name: String(feature),
                included: false
              };
            });
          }
          
          return {
            id: product.id,
            name: product.name,
            description: product.description || '',
            price: product.price,
            priceId: product.priceId,
            isActive: product.isActive,
            features: transformedFeatures,
            isDefault: product.isDefault || false
          };
        });
      
      console.log("Retrieved active plans:", activePlans.length);
      setPlans(activePlans);
    } catch (error: any) {
      console.error("Error fetching plans:", error);
      // Provide more descriptive error messages for authentication issues
      if (error.message?.includes("Authentication required")) {
        setLoadError("É necessário estar autenticado como administrador para gerenciar planos");
        toast({
          variant: "destructive",
          title: "Erro de autenticação",
          description: "É necessário estar autenticado como administrador para gerenciar planos",
        });
      } else {
        setLoadError(error.message || "Erro ao carregar planos");
      }
      setPlans([]);
    } finally {
      setPlansLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchPlans();
    checkAuthStatus();
  }, [fetchPlans, checkAuthStatus]);

  const handleRefreshPlans = () => {
    fetchPlans();
    if (user) {
      refreshSubscription();
    }
    checkAuthStatus();
  };

  if (plansLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <LoadingSpinner size="lg" text="Carregando planos..." />
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
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            {loadError}. Tente atualizar a página ou tente novamente mais tarde.
          </AlertDescription>
        </Alert>
      )}
      
      {authStatus && (
        <Alert variant="default" className="mb-6">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Aviso de Autenticação</AlertTitle>
          <AlertDescription>
            {authStatus}
            {!user && (
              <div className="mt-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                  Fazer Login
                </Button>
              </div>
            )}
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
