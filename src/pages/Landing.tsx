import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Rocket } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { pricing } from '@/config/pricing';
import { cn } from '@/lib/utils';
import { Plan } from '@/types/subscription';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { planService } from '@/services/admin/planService';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user, isPremium, isBusiness } = useAuth();
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      if (isPremium()) {
        navigate('/editor');
        toast({
          title: 'Bem-vindo de volta!',
          description: 'Aproveite sua experiência premium.',
        });
      } else if (isBusiness()) {
        navigate('/editor');
        toast({
          title: 'Bem-vindo de volta!',
          description: 'Aproveite sua experiência business.',
        });
      } else {
        navigate('/editor');
        toast({
          title: 'Bem-vindo de volta!',
          description: 'Comece a criar descrições incríveis.',
        });
      }
    }
  }, [user, navigate, isPremium, isBusiness, toast]);
  
  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      const plans = await planService.getPlans();
      setPlans(plans.filter(plan => plan.isActive !== false));
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: 'Erro ao carregar planos',
        description: 'Não foi possível carregar os planos disponíveis.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPlans();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Otimize suas descrições de produtos com IA
          </h1>
          <p className="text-xl text-gray-600">
            Crie descrições envolventes e otimizadas para SEO em segundos.
          </p>
          <div className="mt-8">
            <Link to="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Começar agora
              </Button>
            </Link>
          </div>
        </header>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                <Rocket className="mr-2 h-4 w-4 inline-block align-middle" />
                Gere descrições rapidamente
              </CardTitle>
              <CardDescription className="text-gray-500">
                Use a IA para criar descrições de alta qualidade em segundos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Economize tempo e esforço na criação de conteúdo.
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                <CheckCircle2 className="mr-2 h-4 w-4 inline-block align-middle" />
                Otimize para SEO
              </CardTitle>
              <CardDescription className="text-gray-500">
                Melhore o ranking dos seus produtos nos motores de busca.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Aumente a visibilidade e atraia mais clientes.
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Converta mais clientes
              </CardTitle>
              <CardDescription className="text-gray-500">
                Descrições persuasivas que destacam os benefícios do seu produto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Aumente suas vendas com conteúdo de alta conversão.
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Nossos planos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <p className="text-center text-gray-500">Carregando planos...</p>
            ) : (
              plans.map((plan) => (
                <Card key={plan.id} className="bg-white shadow-md">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-500">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="font-bold text-xl">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: plan.currency,
                        }).format(plan.price)}
                        <span className="text-sm text-gray-500">/{plan.interval}</span>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-gray-700">
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/auth">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Escolher plano
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
        
        <footer className="text-center text-gray-500 mt-12">
          <p>&copy; 2024 Otimize Descrições. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
