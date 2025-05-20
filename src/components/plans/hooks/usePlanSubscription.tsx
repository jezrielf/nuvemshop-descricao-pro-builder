
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { subscriptionService } from '@/services/subscriptionService';

export const usePlanSubscription = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { isSubscribed, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = async (planId: string) => {
    console.log("Plano clicado:", planId);
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
      
      // Special case for the Premium plan with direct Stripe checkout URL
      if (planId === 'prod_SLHhyuSHcuFR0h') {
        window.location.href = 'https://buy.stripe.com/eVqcN7crCd4w67Q1kF5EY00';
        return;
      }
      
      // Regular flow for other plans
      const checkoutUrl = await subscriptionService.createCheckout(planId);
      window.location.href = checkoutUrl;
    } catch (error: any) {
      toast({
        title: 'Erro ao processar assinatura',
        description: error.message || "Não foi possível iniciar o processo de assinatura.",
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
        description: error.message || "Não foi possível abrir o portal de gerenciamento.",
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  return {
    loading,
    handleSubscribe,
    handleManageSubscription
  };
};
