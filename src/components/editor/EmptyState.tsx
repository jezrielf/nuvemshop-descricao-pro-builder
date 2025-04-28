
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Lock } from 'lucide-react';
import TemplateSelector from '@/components/templates/TemplateSelector';
import AIContentRecommender from '@/components/AIGenerator/AIContentRecommender';

interface EmptyStateProps {
  isPremiumUser: boolean;
  isBusinessUser: boolean;
  isAIGeneratorOpen: boolean;
  setIsAIGeneratorOpen: (open: boolean) => void;
  handleUpgradePlan: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  isPremiumUser,
  isBusinessUser,
  isAIGeneratorOpen,
  setIsAIGeneratorOpen,
  handleUpgradePlan,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8">
      <div className="flex flex-col items-center space-y-6 max-w-md w-full">
        <div className="w-full bg-white border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Comece com um template</h3>
            <p className="text-sm text-gray-500">Escolha um de nossos templates prontos</p>
          </div>
          <div className="p-4">
            <TemplateSelector />
          </div>
        </div>
        
        <div className="w-full bg-white border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Ou crie uma descrição com IA</h3>
            <p className="text-sm text-gray-500">Deixe nossa IA criar uma descrição completa para você</p>
          </div>
          <div className="p-4 flex justify-center">
            {isPremiumUser || isBusinessUser ? (
              <Button 
                onClick={() => setIsAIGeneratorOpen(true)}
                className="border-yellow-400 bg-gradient-to-r from-yellow-50 to-white"
              >
                <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                Gerar Descrição com IA
              </Button>
            ) : (
              <Button 
                onClick={handleUpgradePlan}
                variant="outline"
              >
                <Lock className="h-4 w-4 mr-2" />
                Recurso do Plano Premium ou Empresarial
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <AIContentRecommender 
        isOpen={isAIGeneratorOpen} 
        onOpenChange={setIsAIGeneratorOpen} 
        description={null}
      />
    </div>
  );
};

export default EmptyState;
