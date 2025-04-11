
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const { isPremium } = useAuth();
  
  const userHasPremium = isPremium();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Escolha seu plano</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desbloqueie todo o potencial do Descrição Pro com nossos planos acessíveis
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Grátis */}
          <Card className="p-6 border shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">Plano Grátis</h2>
                <p className="text-gray-500 text-sm mt-1">Experimente grátis</p>
              </div>
              <Badge variant="outline" className="bg-gray-100">
                Grátis
              </Badge>
            </div>
            
            <div className="mt-6 mb-6">
              <p className="text-3xl font-bold">R$ 0<span className="text-lg text-gray-500 font-normal">/mês</span></p>
              <p className="text-gray-500 text-sm mt-1">Sem cartão de crédito</p>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <p className="text-gray-700">Até 3 descrições salvas</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <p className="text-gray-700">Acesso a templates básicos</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <p className="text-gray-700">Acesso à ferramentas SEO básicas</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              Continuar com o plano grátis
            </Button>
          </Card>
          
          {/* Plano Premium */}
          <Card className="p-6 border border-purple-200 shadow-sm transition-all hover:shadow-md bg-gradient-to-br from-white to-purple-50 relative overflow-hidden">
            <div className="absolute top-0 right-0">
              <div className="bg-purple-600 text-white px-4 py-1 transform rotate-45 translate-x-2 translate-y-3 text-xs font-medium">
                Popular
              </div>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">Plano Premium</h2>
                <p className="text-gray-500 text-sm mt-1">Para profissionais</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            </div>
            
            <div className="mt-6 mb-6">
              <p className="text-3xl font-bold">R$ 29<span className="text-lg text-gray-500 font-normal">/mês</span></p>
              <p className="text-purple-600 text-sm mt-1">7 dias de garantia</p>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <BadgeCheck className="h-5 w-5 text-purple-500 mr-3 mt-0.5 shrink-0" />
                <p className="text-gray-700">Descrições <strong>ilimitadas</strong></p>
              </div>
              <div className="flex items-start">
                <BadgeCheck className="h-5 w-5 text-purple-500 mr-3 mt-0.5 shrink-0" />
                <p className="text-gray-700">Acesso a <strong>todos</strong> os templates</p>
              </div>
              <div className="flex items-start">
                <BadgeCheck className="h-5 w-5 text-purple-500 mr-3 mt-0.5 shrink-0" />
                <p className="text-gray-700">Ferramentas de análise SEO avançadas</p>
              </div>
              <div className="flex items-start">
                <BadgeCheck className="h-5 w-5 text-purple-500 mr-3 mt-0.5 shrink-0" />
                <p className="text-gray-700">Geração de descrições com IA</p>
              </div>
              <div className="flex items-start">
                <BadgeCheck className="h-5 w-5 text-purple-500 mr-3 mt-0.5 shrink-0" />
                <p className="text-gray-700">Suporte prioritário</p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={userHasPremium}
            >
              {userHasPremium ? (
                <span className="flex items-center justify-center">
                  <BadgeCheck className="h-5 w-5 mr-2" />
                  Plano atual
                </span>
              ) : (
                "Assinar agora"
              )}
            </Button>
            
            {!userHasPremium && (
              <p className="text-center text-sm text-gray-500 mt-3">
                Cancele a qualquer momento
              </p>
            )}
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium mb-4">Todas as nossas assinaturas incluem</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="p-4 text-center">
              <div className="bg-purple-100 text-purple-600 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                <Check className="h-6 w-6" />
              </div>
              <p className="font-medium">Sem limite de visualizações</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="bg-purple-100 text-purple-600 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                <Check className="h-6 w-6" />
              </div>
              <p className="font-medium">Acesso a todas as atualizações</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="bg-purple-100 text-purple-600 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                <Check className="h-6 w-6" />
              </div>
              <p className="font-medium">Exportação HTML</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="bg-purple-100 text-purple-600 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                <Check className="h-6 w-6" />
              </div>
              <p className="font-medium">Suporte por email</p>
            </Card>
          </div>
        </div>
      </div>
      
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 Descrição Pro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Plans;
