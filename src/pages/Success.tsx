
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionInfo {
  status: string;
  plan: string;
}

const Success: React.FC = () => {
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      try {
        // Mock subscription info for now
        const mockSubscription = {
          status: 'active',
          plan: 'premium'
        };
        
        setSubscriptionInfo(mockSubscription);
      } catch (error) {
        console.error('Error fetching subscription info:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível verificar sua assinatura.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionInfo();
  }, [toast]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!subscriptionInfo) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold">Assinatura confirmada!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-500">
              Parabéns! Sua assinatura {subscriptionInfo.plan} está {subscriptionInfo.status === 'active' ? 'ativa' : 'pendente'}.
            </p>
            <p className="text-gray-500">
              Agora você pode aproveitar todos os recursos premium da plataforma.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={() => navigate('/editor')}>
            Ir para o Editor
          </Button>
          <Button variant="outline" onClick={() => navigate('/account')}>
            Ver minha conta
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Success;
