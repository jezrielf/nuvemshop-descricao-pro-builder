
import React, { useEffect } from 'react';
import { useEditorStore } from '@/store/editor';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { BadgeAlert, BadgeCheck, Crown } from 'lucide-react';
import UserButton from './UserButton';
import NewDescriptionDialog from './header/NewDescriptionDialog';
import SaveDescriptionButton from './header/SaveDescriptionButton';
import SavedDescriptionsDialog from './header/SavedDescriptionsDialog';
import HtmlOutputDialog from './header/HtmlOutputDialog';
import TutorialManager from './tutorial/TutorialManager';
import SEOAnalyzer from './SEO/analyzers/SEOAnalyzer';
import AIGeneratorButton from './header/AIGeneratorButton';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { description, loadSavedDescriptions, savedDescriptions, setAuthContext } = useEditorStore();
  const auth = useAuth();
  const { isPremium, isBusiness, isSubscribed, descriptionCount, canCreateMoreDescriptions, subscriptionTier } = auth;
  
  console.log("Header component - isPremium:", isPremium());
  console.log("Header component - isBusiness:", isBusiness());
  
  // Set auth context in the store when component mounts
  useEffect(() => {
    setAuthContext(auth);
  }, [auth, setAuthContext]);
  
  useEffect(() => {
    // Load saved descriptions when component mounts or subscription changes
    loadSavedDescriptions();
  }, [loadSavedDescriptions, subscriptionTier]);

  // Determine which badge to render based on subscription tier
  const renderSubscriptionBadge = () => {
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
    
    // Return an empty placeholder badge with the same height but invisible to prevent layout shifts
    return <div className="h-6 w-0 ml-2" aria-hidden="true"></div>;
  };
  
  return (
    <header className="border-b bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <h1 className="text-2xl font-bold text-brand-blue">Descrição Pro</h1>
          </Link>
          {description && (
            <span className="text-sm text-gray-500">
              Editando: <span className="font-medium text-gray-700">{description.name}</span>
            </span>
          )}
          
          {/* Always render a badge container to prevent layout shifts */}
          {renderSubscriptionBadge()}
          
          <Link to="/plans" className="text-sm text-blue-500 hover:text-blue-700 underline">
            Ver planos
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
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
          
          {isPremium() && (
            <SavedDescriptionsDialog 
              isPremium={isPremium}
              descriptionCount={descriptionCount}
              savedDescriptions={savedDescriptions}
            />
          )}
          
          {description && <HtmlOutputDialog />}
          
          {description && (isPremium() || isBusiness()) && <SEOAnalyzer description={description} />}
          
          <AIGeneratorButton />
          
          <TutorialManager />
          
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
