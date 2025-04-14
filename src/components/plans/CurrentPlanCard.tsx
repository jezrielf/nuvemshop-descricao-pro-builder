
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface CurrentPlanCardProps {
  isSubscribed: boolean;
  subscriptionTier?: string;
  onManageSubscription: () => void;
  loading: boolean;
}

const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({
  isSubscribed,
  subscriptionTier,
  onManageSubscription,
  loading
}) => {
  return (
    <div className="mb-12 max-w-md mx-auto">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Seu Plano Atual</CardTitle>
          <CardDescription>
            {isSubscribed 
              ? `Você tem uma assinatura ${subscriptionTier} ativa.`
              : 'Você está usando o plano Gratuito.'}
          </CardDescription>
        </CardHeader>
        {isSubscribed && (
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onManageSubscription}
              disabled={loading}
            >
              {loading ? (
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
  );
};

export default CurrentPlanCard;
