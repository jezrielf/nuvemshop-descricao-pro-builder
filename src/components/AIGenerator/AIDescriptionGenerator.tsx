
import React from 'react';
import AIDescriptionForm from './AIDescriptionForm';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIDescriptionGenerator: React.FC = () => {
  const { isPremium } = useAuth();
  const navigate = useNavigate();
  const userIsPremium = isPremium();

  // For premium users, render the AIDescriptionForm
  if (userIsPremium) {
    return <AIDescriptionForm />;
  }

  // For non-premium users, render the upgrade card
  return (
    <Card className="p-6 bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-100">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-600" />
          <h2 className="text-xl font-semibold text-violet-900">Gerador de Descrição com IA</h2>
        </div>
        
        <div className="bg-white rounded-md p-4 border border-violet-100">
          <h3 className="font-medium text-gray-900 mb-2">Recurso Premium</h3>
          <p className="text-gray-600 mb-4">
            Crie descrições completas de produtos automaticamente com nossa tecnologia de IA avançada.
            Forneça algumas informações básicas e deixe a IA fazer o trabalho pesado.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="bg-violet-100 p-1 rounded-full mt-0.5">
                <Sparkles className="h-4 w-4 text-violet-600" />
              </div>
              <p className="text-sm text-gray-700">Gere blocos de conteúdo com um clique</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-violet-100 p-1 rounded-full mt-0.5">
                <Sparkles className="h-4 w-4 text-violet-600" />
              </div>
              <p className="text-sm text-gray-700">Economize tempo na criação de descrições</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-violet-100 p-1 rounded-full mt-0.5">
                <Sparkles className="h-4 w-4 text-violet-600" />
              </div>
              <p className="text-sm text-gray-700">Textos otimizados e persuasivos</p>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full bg-violet-600 hover:bg-violet-700 flex items-center justify-center gap-2"
          onClick={() => navigate('/plans')}
        >
          <Crown className="h-4 w-4" />
          Fazer Upgrade para Premium
        </Button>
      </div>
    </Card>
  );
};

export default AIDescriptionGenerator;
