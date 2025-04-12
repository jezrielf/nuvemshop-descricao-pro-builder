
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, Check, BadgeCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const SubscriptionBanner: React.FC = () => {
  const { isPremium } = useAuth();
  const navigate = useNavigate();
  
  const isPremiumUser = isPremium();
  
  if (isPremiumUser) {
    return (
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-100 p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 text-emerald-700 p-2 rounded-full">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-emerald-800">Conta Premium Ativa</h3>
              <p className="text-sm text-emerald-600">Acesso ilimitado a todas as funcionalidades</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1 flex items-center gap-1"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Premium
          </Badge>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-purple-100 p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 text-purple-700 p-3 rounded-full flex-shrink-0">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-purple-800">Desbloqueie recursos Premium</h3>
              <p className="text-sm text-purple-600">Crie descrições ilimitadas com todos os templates</p>
            </div>
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white w-full md:w-auto"
            onClick={() => navigate('/plans')}
          >
            Ver planos disponíveis
          </Button>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-sm text-gray-700">Descrições ilimitadas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-sm text-gray-700">Todos os templates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-sm text-gray-700">Suporte prioritário</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionBanner;
