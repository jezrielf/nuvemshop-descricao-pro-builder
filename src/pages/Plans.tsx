
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, PackageCheck, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Plan } from '@/components/admin/plans/types';
import { mockPlans } from '@/components/admin/plans/mockData';
import { subscriptionService } from '@/services/subscriptionService';

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, subscriptionTier, openCustomerPortal, refreshSubscription } = useAuth();

  // For now, we're using mock data (same as in PlansPanel)
  useEffect(() => {
    // Refresh subscription status when component mounts
    if (user) {
      refreshSubscription();
    }
    
    // Only show active plans to customers
    setPlans(mockPlans.filter(plan => plan.isActive));
    setLoading(false);
  }, [user, refreshSubscription]);

  const handleSelectPlan = async (plan: Plan) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para assinar este plano",
        variant: "default",
      });
      navigate('/auth');
      return;
    }

    // Handle current subscribers
    if (subscriptionTier !== 'free') {
      openCustomerPortal();
      return;
    }

    try {
      setCheckoutLoading(plan.id);
      
      let planId = '';
      if (plan.name === 'Premium') {
        planId = 'premium';
      } else if (plan.name === 'Empresarial') {
        planId = 'business';
      } else {
        return; // Free plan doesn't need checkout
      }
      
      const checkoutUrl = await subscriptionService.createCheckout(planId);
      window.location.href = checkoutUrl;
    } catch (error: any) {
      toast({
        title: "Erro ao processar pagamento",
        description: error.message || "Ocorreu um erro ao processar seu pagamento",
        variant: "destructive",
      });
      setCheckoutLoading(null);
    }
  };

  const getPlanButtonText = (plan: Plan) => {
    if (plan.price === 0) return 'Plano Atual';
    
    if (subscriptionTier === 'free') {
      return `Assinar ${plan.name}`;
    }
    
    if ((subscriptionTier === 'premium' && plan.name === 'Premium') || 
        (subscriptionTier === 'business' && plan.name === 'Empresarial')) {
      return 'Gerenciar Plano';
    }
    
    if (subscriptionTier === 'premium' && plan.name === 'Empresarial') {
      return 'Fazer Upgrade';
    }
    
    if (subscriptionTier === 'business' && plan.name === 'Premium') {
      return 'Fazer Downgrade';
    }
    
    return `Assinar ${plan.name}`;
  };

  const isCurrentPlan = (plan: Plan) => {
    if (plan.price === 0 && subscriptionTier === 'free') return true;
    if (plan.name === 'Premium' && subscriptionTier === 'premium') return true;
    if (plan.name === 'Empresarial' && subscriptionTier === 'business') return true;
    return false;
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Grátis';
    return `R$ ${(price / 100).toFixed(2)}/mês`;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Carregando planos...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-2">Nossos Planos</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Escolha o plano ideal para o seu negócio e comece a criar descrições incríveis para seus produtos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`flex flex-col h-full ${
              isCurrentPlan(plan) 
                ? 'border-primary ring-2 ring-primary ring-opacity-50' 
                : plan.isDefault ? 'border-primary' : ''
            }`}
          >
            <CardHeader>
              {plan.isDefault && (
                <Badge className="self-start mb-2">Recomendado</Badge>
              )}
              {isCurrentPlan(plan) && (
                <Badge className="self-start mb-2 bg-green-500">Seu Plano Atual</Badge>
              )}
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-start">
                    {feature.included ? (
                      <>
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature.name}</span>
                      </>
                    ) : (
                      <span className="ml-7 text-muted-foreground">{feature.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSelectPlan(plan)} 
                className="w-full" 
                variant={isCurrentPlan(plan) ? "secondary" : plan.isDefault ? "default" : "outline"}
                disabled={checkoutLoading !== null || (plan.price === 0 && subscriptionTier === 'free')}
              >
                {checkoutLoading === plan.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : isCurrentPlan(plan) ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {getPlanButtonText(plan)}
                  </>
                ) : (
                  <>
                    <PackageCheck className="mr-2 h-4 w-4" />
                    {getPlanButtonText(plan)}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Plans;
