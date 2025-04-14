
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from 'lucide-react';

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const { refreshSubscription } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const updateSubscription = async () => {
      try {
        setLoading(true);
        // Refresh subscription information
        await refreshSubscription();
        setLoading(false);
      } catch (error) {
        console.error('Error updating subscription status:', error);
        setLoading(false);
      }
    };
    
    if (sessionId) {
      updateSubscription();
    } else {
      setLoading(false);
    }
  }, [sessionId, refreshSubscription]);
  
  const handleContinue = () => {
    navigate('/');
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Assinatura Confirmada!</CardTitle>
          <CardDescription>
            Sua assinatura foi processada com sucesso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Obrigado por assinar o Descrição Pro. Você agora tem acesso a todos os recursos do plano.
          </p>
          {loading ? (
            <p className="text-muted-foreground">Atualizando informações da sua conta...</p>
          ) : (
            <p className="text-muted-foreground">Suas informações de assinatura foram atualizadas.</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleContinue} disabled={loading}>
            Continuar para o App
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Success;
