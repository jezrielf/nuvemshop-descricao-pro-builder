import React, { useEffect, useMemo } from 'react';
import { useEditorStore } from '@/store/editor';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { BadgeAlert, BadgeCheck, Crown, Settings, Plus, Save, Lock, ListTodo } from 'lucide-react';
import UserButton from './UserButton';
import NewDescriptionDialog from './header/NewDescriptionDialog';
import SaveDescriptionButton from './header/SaveDescriptionButton';
import SavedDescriptionsDialog from './header/SavedDescriptionsDialog';
import HtmlOutputDialog from './header/HtmlOutputDialog';
import TutorialManager from './tutorial/TutorialManager';
import SEOAnalyzer from './SEO/analyzers/SEOAnalyzer';
import AIGeneratorButton from './header/AIGeneratorButton';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { description, loadSavedDescriptions, savedDescriptions, setAuthContext } = useEditorStore();
  const auth = useAuth();
  const { 
    isPremium, 
    isBusiness, 
    isSubscribed, 
    descriptionCount, 
    canCreateMoreDescriptions, 
    subscriptionTier 
  } = auth;
  const isMobile = useIsMobile();
  
  // Verificar se há uma loja Nuvemshop conectada
  const isNuvemshopConnected = !!localStorage.getItem('nuvemshop_access_token');
  
  // Calculate these values once
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

  // Memoize the subscription badge to prevent unnecessary re-renders
  const subscriptionBadge = useMemo(() => {
    if (subscriptionTier === 'free') {
      return (
        <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-300">
          <BadgeAlert className="mr-1 h-3 w-3" />
          Modo Grátis ({descriptionCount}/3)
        </Badge>
      );
    }
    
    if (subscriptionTier === 'premium') {
      return (
        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-300">
          <BadgeCheck className="mr-1 h-3 w-3" />
          Premium
        </Badge>
      );
    }
    
    if (subscriptionTier === 'business') {
      return (
        <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-700 border-purple-300">
          <Crown className="mr-1 h-3 w-3" />
          Empresarial
        </Badge>
      );
    }
    
    return <div className="h-6 w-0 ml-2" aria-hidden="true"></div>;
  }, [subscriptionTier, descriptionCount]);

  const handleConnectNuvemshop = (e: React.MouseEvent) => {
    e.preventDefault();
    // Limpar cache antes de conectar
    localStorage.removeItem('nuvemshop_access_token');
    localStorage.removeItem('nuvemshop_user_id');
    
    // Limpar qualquer outro item potencial de cache relacionado à Nuvemshop
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('nuvemshop')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Redirecionar para a página de autorização da Nuvemshop
    window.location.href = 'https://www.tiendanube.com/apps/17194/authorize?state=csrf-code';
  };
  
  return (
    <header className="border-b bg-white shadow-sm px-3 sm:px-6 py-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Link to="/">
            <h1 className="text-xl sm:text-2xl font-bold text-brand-blue">Descrição Pro</h1>
          </Link>
          {description && (
            <span className="text-xs sm:text-sm text-gray-500">
              Editando: <span className="font-medium text-gray-700">{description.name}</span>
            </span>
          )}
          
          {subscriptionBadge}
          
          {!isPremiumUser && !isBusinessUser && (
            <Link to="/plans" className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 underline">
              Ver planos
            </Link>
          )}
          
          {!isNuvemshopConnected && (
            <a href="#" onClick={handleConnectNuvemshop} className="text-xs sm:text-sm text-green-500 hover:text-green-700 underline ml-2">
              Nova Conexão Nuvemshop
            </a>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <NewDescriptionDialog 
              isPremium={isPremium} 
              descriptionCount={descriptionCount}
              canCreateMoreDescriptions={canCreateMoreDescriptions}
            />
            
            <SaveDescriptionButton 
              isPremium={isPremium}
              isSubscribed={isSubscribed}
              hasDescription={!!description}
              canCreateMoreDescriptions={canCreateMoreDescriptions}
            />
            
            {isPremiumUser && (
              <SavedDescriptionsDialog 
                isPremium={isPremium}
                descriptionCount={descriptionCount}
                savedDescriptions={savedDescriptions}
              />
            )}
            
            {description && <HtmlOutputDialog />}
            
            <div className="flex items-center gap-2">
              {description && (isPremiumUser || isBusinessUser) && <SEOAnalyzer description={description} />}
              
              <AIGeneratorButton />
              
              <TutorialManager />
              
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
