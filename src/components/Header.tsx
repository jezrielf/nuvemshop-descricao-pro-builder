
import React, { useEffect, memo } from 'react';
import { useEditorStore } from '@/store/editor';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BadgeAlert, BadgeCheck, Crown, ListTodo, Settings } from 'lucide-react';
import UserButton from './UserButton';
import NewDescriptionDialog from './header/NewDescriptionDialog';
import SaveDescriptionButton from './header/SaveDescriptionButton';
import SavedDescriptionsDialog from './header/SavedDescriptionsDialog';
import HtmlOutputDialog from './header/HtmlOutputDialog';
import TutorialManager from './tutorial/TutorialManager';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

// Memorizando o componente de badge de assinatura para evitar re-renderizações desnecessárias
const SubscriptionBadge = memo(({ 
  isPremium, 
  isBusiness, 
  descriptionCount 
}: { 
  isPremium: boolean;
  isBusiness: boolean;
  descriptionCount: number;
}) => {
  if (isPremium) {
    return (
      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-300">
        <BadgeCheck className="mr-1 h-3 w-3" />
        Premium
      </Badge>
    );
  }
  
  if (isBusiness) {
    return (
      <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-700 border-purple-300">
        <Crown className="mr-1 h-3 w-3" />
        Empresarial
      </Badge>
    );
  }
  
  // Usuário gratuito
  return (
    <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-300">
      <BadgeAlert className="mr-1 h-3 w-3" />
      Modo Grátis ({descriptionCount}/3)
    </Badge>
  );
});

// Componente otimizado para a barra de controles do cabeçalho
const HeaderControls = memo(({ description, isPremium, isSubscribed, canCreateMore }: any) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2">
        <NewDescriptionDialog 
          isPremium={isPremium} 
          descriptionCount={description?.descriptionCount}
          canCreateMoreDescriptions={canCreateMore}
        />
        
        <SaveDescriptionButton 
          isPremium={isPremium}
          isSubscribed={isSubscribed}
          hasDescription={!!description}
          canCreateMoreDescriptions={canCreateMore}
        />
        
        <SavedDescriptionsDialog 
          isPremium={isPremium}
          descriptionCount={description?.descriptionCount}
          savedDescriptions={description?.savedDescriptions}
        />
        
        {description && (
          <>
            <HtmlOutputDialog />
            <Button variant="outline" asChild>
              <Link to="/description-analysis" className="flex items-center text-sm">
                <Settings className="mr-2 h-3 w-3" />
                Análise SEO
              </Link>
            </Button>
          </>
        )}
        
        <div className="flex items-center gap-2">
          <TutorialManager />
          <UserButton />
        </div>
      </div>
    </div>
  );
});

const Header: React.FC = () => {
  const { description, loadSavedDescriptions, savedDescriptions, setAuthContext } = useEditorStore();
  const auth = useAuth();
  const { 
    isPremium, 
    isBusiness, 
    isSubscribed, 
    descriptionCount, 
    canCreateMoreDescriptions, 
    subscriptionTier,
    profile
  } = auth;
  const isMobile = useIsMobile();
  
  // Calcular esses valores uma vez por renderização
  const isPremiumUser = isPremium();
  const isBusinessUser = isBusiness();
  const isSubscribedUser = isSubscribed();
  const canCreateMore = canCreateMoreDescriptions();
  
  // Set auth context in the store when component mounts or auth changes
  useEffect(() => {
    setAuthContext(auth);
  }, [auth, setAuthContext]);
  
  // Load saved descriptions when component mounts or subscription changes
  useEffect(() => {
    loadSavedDescriptions();
  }, [loadSavedDescriptions, subscriptionTier]);
  
  return (
    <header className="border-b bg-white shadow-sm px-2 sm:px-4 py-2 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/">
            <h1 className="text-lg sm:text-xl font-bold text-brand-blue">Descrição Pro</h1>
          </Link>
          
          {description && (
            <span className="text-xs sm:text-sm text-gray-500">
              Editando: <span className="font-medium text-gray-700">{description.name}</span>
            </span>
          )}
          
          <SubscriptionBadge 
            isPremium={isPremiumUser} 
            isBusiness={isBusinessUser} 
            descriptionCount={descriptionCount} 
          />
          
          {!isPremiumUser && !isBusinessUser && (
            <Link to="/plans" className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 underline">
              Ver planos
            </Link>
          )}
        </div>
        
        <HeaderControls 
          description={description}
          isPremium={isPremiumUser}
          isSubscribed={isSubscribedUser}
          canCreateMore={canCreateMore}
        />
      </div>
    </header>
  );
};

export default Header;
