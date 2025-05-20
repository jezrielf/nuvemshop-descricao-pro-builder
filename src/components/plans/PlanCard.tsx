
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Check } from 'lucide-react';
import PlanFeaturesList from './PlanFeaturesList';

interface StripePlan {
  id: string;
  name: string;
  price: number;
  features: Array<{ name: string; included: boolean }>;
}

interface PlanCardProps {
  plan: StripePlan;
  isPlanActive: boolean;
  loading: boolean;
  onSubscribe: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isPlanActive,
  loading,
  onSubscribe,
}) => {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Grátis';
    
    // For plan with ID prod_SLHhyuSHcuFR0h, show R$ 79,90 regardless of actual price
    if (plan.id === 'prod_SLHhyuSHcuFR0h') {
      return 'R$ 79,90';
    }
    
    // For other plans, use the original formatting
    return `R$ ${(price / 100).toFixed(2).replace('.', ',')}`;
  };

  const getPlanDescription = (planName: string) => {
    switch(planName.toLowerCase()) {
      case 'gratuito':
        return 'Perfeito para começar, com recursos básicos para suas primeiras descrições.';
      case 'premium':
        return 'Ideal para usuários que precisam de recursos avançados e descrições ilimitadas.';
      case 'empresarial':
        return 'Solução completa para empresas com ferramentas avançadas de SEO e IA.';
      default:
        return '';
    }
  };

  return (
    <Card className={`flex flex-col ${isPlanActive ? 'border-primary border-2' : ''}`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {plan.name}
          {isPlanActive && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
              Plano Atual
            </span>
          )}
        </CardTitle>
        <CardDescription className="mt-2">
          {getPlanDescription(plan.name)}
        </CardDescription>
        <div className="text-2xl font-bold mt-3">
          {formatPrice(plan.price)}
          {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground"> /mês</span>}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {plan.id === 'prod_SLHhyuSHcuFR0h' ? (
          <div className="space-y-2">
            {[
              'Descrições ilimitadas',
              'Templates ilimitados',
              'Gestão completa de todas as descrições',
              'Análise e diagnóstico completo de SEO'
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        ) : (
          <PlanFeaturesList features={plan.features} isPriceFree={plan.price === 0} />
        )}
      </CardContent>
      
      <CardFooter className="pt-4">
        {plan.price === 0 ? (
          <Button variant="outline" className="w-full" disabled>
            Plano Gratuito
          </Button>
        ) : (
          <Button 
            variant={isPlanActive ? "outline" : "default"}
            className="w-full" 
            disabled={loading || isPlanActive}
            onClick={() => onSubscribe(plan.id)}
          >
            {loading ? (
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
};

export default PlanCard;
