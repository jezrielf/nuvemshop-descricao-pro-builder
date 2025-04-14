
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Check, CircleX, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { subscriptionService } from '@/services/subscriptionService';
import { supabase } from '@/integrations/supabase/client';

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
  const [loading, setLoading] = useState<string | null>(null);
  const [plans, setPlans] = useState<StripePlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Fetch plans from Stripe
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setPlansLoading(true);
        const { data, error } = await supabase.functions.invoke('manage-plans', {
          body: { method: 'GET', action: 'list-products' }
        });
        
        if (error) throw error;
        
        // Only show active plans
        const activePlans = data.products
          .filter((product: StripePlan) => product.isActive)
          .sort((a: StripePlan, b: StripePlan) => a.price - b.price);
        
        setPlans(activePlans);
      } catch (error: any) {
        console.error("Error fetching plans:", error);
        toast({
          title: 'Erro ao carregar planos',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setPlansLoading(false);
      }
    };
    
    fetchPlans();
  }, [toast]);
  
  const formatPrice = (price: number) => {
    if (price === 0) return 'Grátis';
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate('/auth');
      toast({
        title: 'Login necessário',
        description: 'Faça login para assinar um plano',
      });
      return;
    }
    
    try {
      setLoading(planId);
      const checkoutUrl = await subscriptionService.createCheckout(planId);
      window.location.href = checkoutUrl;
    } catch (error: any) {
      toast({
        title: 'Erro ao processar assinatura',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    if (!user || !isSubscribed()) {
      toast({
        title: 'Nenhuma assinatura ativa',
        description: 'Você não possui uma assinatura ativa para gerenciar.',
      });
      return;
    }
    
    try {
      setLoading('manage');
      const portalUrl = await subscriptionService.openCustomerPortal();
      window.location.href = portalUrl;
    } catch (error: any) {
      toast({
        title: 'Erro ao abrir portal de assinatura',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
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
      <h1 className="text-3xl font-bold mb-2 text-center">Planos de Assinatura</h1>
      <p className="text-center text-muted-foreground mb-12">
        Escolha o plano ideal para suas necessidades
      </p>
      
      {/* Current Subscription Info */}
      {user && (
        <div className="mb-12 max-w-md mx-auto">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Seu Plano Atual</CardTitle>
              <CardDescription>
                {isSubscribed() 
                  ? `Você tem uma assinatura ${subscriptionTier} ativa.`
                  : 'Você está usando o plano Gratuito.'}
              </CardDescription>
            </CardHeader>
            {isSubscribed() && (
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleManageSubscription}
                  disabled={loading === 'manage'}
                >
                  {loading === 'manage' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Carregando...
                    </>
                  ) : 'Gerenciar Assinatura'}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          // If there's a free plan, handle it specially
          const isPlanActive = plan.price === 0 
            ? !isSubscribed() 
            : subscriptionTier?.toLowerCase() === plan.name.toLowerCase();
          
          // Parse the features from the Stripe format
          const planFeatures = plan.features.map(feature => {
            const [name, included] = feature.split(':');
            return { name, included: included === 'true' };
          });
          
          return (
            <Card 
              key={plan.id}
              className={`flex flex-col ${isPlanActive ? 'border-primary border-2' : ''}`}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {plan.name}
                  {isPlanActive && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      Plano Atual
                    </span>
                  )}
                </CardTitle>
                <CardDescription className="text-2xl font-bold mt-2">
                  {formatPrice(plan.price)}
                  {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground"> /mês</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {planFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      ) : (
                        <CircleX className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.price === 0 ? (
                  <Button variant="outline" className="w-full" disabled>
                    Plano Gratuito
                  </Button>
                ) : (
                  <Button 
                    variant={isPlanActive ? "outline" : "default"}
                    className="w-full" 
                    disabled={loading === plan.id || isPlanActive}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {loading === plan.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : isPlanActive ? (
                      'Plano Atual'
                    ) : (
                      'Assinar'
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;
