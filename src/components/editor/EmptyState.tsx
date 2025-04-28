
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import TemplateSelector from '@/components/templates/TemplateSelector';

interface EmptyStateProps {
  isPremiumUser: boolean;
  isBusinessUser: boolean;
  onStartNewDescription: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  isPremiumUser,
  isBusinessUser,
  onStartNewDescription,
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
            <h3 className="font-medium">Ou crie uma descrição do zero</h3>
            <p className="text-sm text-gray-500">Comece com uma descrição em branco e adicione seus blocos</p>
          </div>
          <div className="p-4 flex justify-center">
            <Button 
              onClick={onStartNewDescription}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Iniciar Nova Descrição
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
