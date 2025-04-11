
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, Check, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionBanner: React.FC = () => {
  const { isPremium } = useAuth();
  const navigate = useNavigate();
  
  const isPremiumUser = isPremium();
  
  if (isPremiumUser) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 text-green-700 p-2 rounded-full">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-green-800">Sua conta é Premium</h3>
              <p className="text-sm text-green-600">Você tem acesso ilimitado a todas as funcionalidades</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 px-3 py-1">
            Assinante Premium
          </Badge>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100 p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-100 text-purple-700 p-3 rounded-full">
            <Crown className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-purple-800">Desbloqueie recursos Premium</h3>
            <p className="text-sm text-purple-600">Crie descrições ilimitadas e acesse todos os templates</p>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-auto space-y-2">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white w-full md:w-auto"
            onClick={() => navigate('/plans')}
          >
            Ver planos disponíveis
          </Button>
          <div className="flex items-center justify-center md:justify-start text-xs text-purple-600 space-x-1">
            <Check className="h-3 w-3" />
            <span>Sem taxa de instalação</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-purple-600" />
          <span className="text-sm text-gray-700">Descrições ilimitadas</span>
        </div>
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-purple-600" />
          <span className="text-sm text-gray-700">Todos os templates</span>
        </div>
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-purple-600" />
          <span className="text-sm text-gray-700">Suporte prioritário</span>
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionBanner;
