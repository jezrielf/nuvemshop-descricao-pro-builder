import React, { useEffect, useMemo } from 'react';
import { useEditorStore } from '@/store/editor';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BadgeAlert, BadgeCheck, Crown, Save, Lock, Settings, HelpCircle } from 'lucide-react';
import UserButton from './UserButton';
import NewDescriptionDialog from './header/NewDescriptionDialog';
import SaveDescriptionButton from './header/SaveDescriptionButton';
import SavedDescriptionsDialog from './header/SavedDescriptionsDialog';
import HtmlOutputDialog from './header/HtmlOutputDialog';
import TutorialManager from './tutorial/TutorialManager';
import HelpCenter from './help/HelpCenter';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNuvemshopAuth } from './Nuvemshop/hooks/useNuvemshopAuth';
import { useNimbusUI } from './Nuvemshop/NimbusProvider';
import { NimbusButton } from './Nuvemshop/NimbusProvider';

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
    profile,
    user
  } = auth;
  const isMobile = useIsMobile();
  const { success: isNuvemshopConnected } = useNuvemshopAuth();
  const [helpCenterOpen, setHelpCenterOpen] = React.useState(false);
  
  // Log para debug dos papéis e status
  useEffect(() => {
    if (profile) {
      console.log('Header - Perfil do usuário:', profile);
      console.log('Header - Roles:', profile.role);
      console.log('Header - isPremium:', isPremium());
      console.log('Header - isBusiness:', isBusiness());
      console.log('Header - isSubscribed:', isSubscribed());
      console.log('Header - subscriptionTier:', subscriptionTier);
    }
  }, [profile, isPremium, isBusiness, isSubscribed, subscriptionTier]);
  
  // Log user info for debugging
  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);
  
  // Calculate these values once
  const isPremiumUser = isPremium();
  const isBusinessUser = isBusiness();
  const isSubscribedUser = isSubscribed();
  const canCreateMore = canCreateMoreDescriptions();
  
  // Set auth context in the store when component mounts or auth changes
  useEffect(() => {
    setAuthContext(auth);
    console.log('Auth context set in store');
  }, [auth, setAuthContext]);
  
  // Load saved descriptions when component mounts or user changes
  useEffect(() => {
    if (user) {
      console.log('Loading saved descriptions for user:', user.id);
    } else {
      console.log('Loading saved descriptions for anonymous user');
    }
    loadSavedDescriptions();
  }, [loadSavedDescriptions, user, auth]);

  // Debug saved descriptions count
  useEffect(() => {
    console.log('Current saved descriptions count:', savedDescriptions.length);
  }, [savedDescriptions]);

  // Memoize the subscription badge to prevent unnecessary re-renders
  const subscriptionBadge = useMemo(() => {
    // Debug log
    console.log('Rendering subscription badge with tier:', subscriptionTier, 'isPremium:', isPremiumUser);
    
    if (isPremiumUser) {
      return (
        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-300">
          <BadgeCheck className="mr-1 h-3 w-3" />
          Premium
        </Badge>
      );
    }
    
    if (isBusinessUser) {
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
  }, [subscriptionTier, isPremiumUser, isBusinessUser, descriptionCount]);
  
  
  return (
    <header className="border-b bg-white shadow-sm px-3 sm:px-6 py-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/3844fc6f-0538-43f8-a969-8aff8742921b.png" 
              alt="DescriçãoPRO Logo"
              className="h-8 w-auto"
            />
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
          
          {isNuvemshopConnected && (
            <>
              <Link to="/nimbus-nexo-info">
                <NimbusButton variant="text" size="small" className="ml-2">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Ajuda
                </NimbusButton>
              </Link>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <NewDescriptionDialog 
              data-action="new-description"
              isPremium={isPremium} 
              descriptionCount={descriptionCount}
              canCreateMoreDescriptions={canCreateMoreDescriptions}
            />
            
            <SaveDescriptionButton 
              data-action="save-description"
              isPremium={isPremium}
              isSubscribed={isSubscribed}
              hasDescription={!!description}
              canCreateMoreDescriptions={canCreateMoreDescriptions}
            />
            
            <SavedDescriptionsDialog 
              data-action="saved-descriptions"
              isPremium={isPremium}
              descriptionCount={descriptionCount}
              savedDescriptions={savedDescriptions}
            />
            
            {description && (
              <>
                <HtmlOutputDialog />
                <Button variant="outline" asChild>
                  <Link to="/description-analysis" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Análise SEO
                  </Link>
                </Button>
              </>
            )}
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setHelpCenterOpen(true)}
                className="flex items-center text-xs"
                data-action="start-tutorial"
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">Ajuda</span>
              </Button>
              <UserButton />
            </div>
          </div>
        </div>
      </div>
      
      <HelpCenter open={helpCenterOpen} onOpenChange={setHelpCenterOpen} />
    </header>
  );
};

export default Header;
