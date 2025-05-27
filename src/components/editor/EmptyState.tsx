
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EmptyStateProps {
  isPremiumUser: boolean;
  isBusinessUser: boolean;
  onStartNewDescription: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  isPremiumUser, 
  isBusinessUser, 
  onStartNewDescription 
}) => {
  const { canCreateMoreDescriptions, descriptionCount, incrementDescriptionCount } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartNewDescription = () => {
    if (!canCreateMoreDescriptions()) {
      toast({
        title: "Limite atingido",
        description: "Você atingiu o limite de 3 descrições gratuitas. Faça upgrade para o plano premium para criar mais.",
        variant: "destructive"
      });
      
      // Redirect to plans page after showing the toast
      setTimeout(() => {
        navigate('/plans');
      }, 2000);
      return;
    }

    // Increment counter for free users BEFORE creating the description
    if (!isPremiumUser && !isBusinessUser) {
      incrementDescriptionCount();
      console.log('Incremented description count from EmptyState to:', descriptionCount + 1);
    }

    onStartNewDescription();
  };

  const remainingDescriptions = Math.max(0, 3 - descriptionCount);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Bem-vindo ao Descrição Pro
        </h2>
        <p className="text-gray-600 mb-6">
          Crie descrições profissionais e atrativas para seus produtos usando nossa ferramenta de edição visual.
        </p>
        
        {!isPremiumUser && !isBusinessUser && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Crown className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">Plano Gratuito</span>
            </div>
            {remainingDescriptions > 0 ? (
              <p className="text-blue-700 text-sm">
                Você pode criar {remainingDescriptions} descrição{remainingDescriptions > 1 ? 'ões' : ''} gratuita{remainingDescriptions > 1 ? 's' : ''}.
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-red-700 text-sm">
                  Você atingiu o limite de 3 descrições gratuitas.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/plans')}
                  className="text-blue-600 border-blue-300 hover:bg-blue-50"
                >
                  Ver Planos Premium
                </Button>
              </div>
            )}
          </div>
        )}

        <Button 
          onClick={handleStartNewDescription} 
          size="lg"
          disabled={!canCreateMoreDescriptions()}
          className="mb-4"
        >
          <Plus className="mr-2 h-5 w-5" />
          {canCreateMoreDescriptions() ? 'Iniciar Nova Descrição' : 'Limite Atingido - Upgrade Necessário'}
        </Button>
        
        {!canCreateMoreDescriptions() && (
          <p className="text-sm text-gray-500">
            Faça upgrade para um plano premium para criar descrições ilimitadas.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
