
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, PackageCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

// Define the Plan interface (same as in PlansPanel)
interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  features: PlanFeature[];
  isActive: boolean;
  isDefault: boolean;
}

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // For now, we're using mock data (same as in PlansPanel)
  // In a real app, this would come from Supabase or another backend
  useEffect(() => {
    // Mock getting plans from admin
    const mockPlans = [
      {
        id: '1',
        name: 'Gratuito',
        price: 0,
        features: [
          { id: '1', name: 'Até 3 descrições', included: true },
          { id: '2', name: 'Templates básicos', included: true },
          { id: '3', name: 'Exportação HTML', included: true },
          { id: '4', name: 'Descrições ilimitadas', included: false },
          { id: '5', name: 'Todos os templates', included: false },
          { id: '6', name: 'Suporte prioritário', included: false },
        ],
        isActive: true,
        isDefault: true
      },
      {
        id: '2',
        name: 'Premium',
        price: 29.90,
        features: [
          { id: '1', name: 'Até 3 descrições', included: true },
          { id: '2', name: 'Templates básicos', included: true },
          { id: '3', name: 'Exportação HTML', included: true },
          { id: '4', name: 'Descrições ilimitadas', included: true },
          { id: '5', name: 'Todos os templates', included: true },
          { id: '6', name: 'Suporte prioritário', included: true },
        ],
        isActive: true,
        isDefault: false
      },
      {
        id: '3',
        name: 'Empresarial',
        price: 99.90,
        features: [
          { id: '1', name: 'Até 3 descrições', included: true },
          { id: '2', name: 'Templates básicos', included: true },
          { id: '3', name: 'Exportação HTML', included: true },
          { id: '4', name: 'Descrições ilimitadas', included: true },
          { id: '5', name: 'Todos os templates', included: true },
          { id: '6', name: 'Suporte prioritário', included: true },
          { id: '7', name: 'API para integração', included: true },
          { id: '8', name: 'White label', included: true },
        ],
        isActive: true,
        isDefault: false
      }
    ];

    // Only show active plans to customers
    setPlans(mockPlans.filter(plan => plan.isActive));
    setLoading(false);
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para assinar este plano",
        variant: "default",
      });
      navigate('/auth');
      return;
    }

    toast({
      title: `Plano ${plan.name} selecionado`,
      description: "Você será redirecionado para o checkout",
    });
    
    // In a real app, this would redirect to a checkout page
    // navigate('/checkout', { state: { planId: plan.id } });
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Grátis';
    return `R$ ${price.toFixed(2)}/mês`;
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
          <Card key={plan.id} className={`flex flex-col h-full ${plan.isDefault ? 'border-primary' : ''}`}>
            <CardHeader>
              {plan.isDefault && (
                <Badge className="self-start mb-2">Recomendado</Badge>
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
                variant={plan.isDefault ? "default" : "outline"}
              >
                <PackageCheck className="mr-2 h-4 w-4" />
                Assinar {plan.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Plans;
