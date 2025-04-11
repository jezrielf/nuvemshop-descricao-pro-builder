
import React, { useEffect } from 'react';
import { useEditorStore } from '@/store/editor';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { BadgeAlert } from 'lucide-react';
import UserButton from './UserButton';
import NewDescriptionDialog from './header/NewDescriptionDialog';
import SaveDescriptionButton from './header/SaveDescriptionButton';
import SavedDescriptionsDialog from './header/SavedDescriptionsDialog';
import HtmlOutputDialog from './header/HtmlOutputDialog';
import TutorialManager from './tutorial/TutorialManager';
import SEOAnalyzer from './SEO/SEOAnalyzer';

const Header: React.FC = () => {
  const { description, loadSavedDescriptions, savedDescriptions, setAuthContext } = useEditorStore();
  const auth = useAuth();
  const { isPremium, descriptionCount, canCreateMoreDescriptions } = auth;
  
  // Set auth context in the store when component mounts
  useEffect(() => {
    setAuthContext(auth);
  }, [auth, setAuthContext]);
  
  useEffect(() => {
    // Load saved descriptions when component mounts
    loadSavedDescriptions();
  }, [loadSavedDescriptions]);
  
  return (
    <header className="border-b bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-brand-blue">Descrição Pro</h1>
          {description && (
            <span className="text-sm text-gray-500">
              Editando: <span className="font-medium text-gray-700">{description.name}</span>
            </span>
          )}
          
          {!isPremium() && (
            <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-300">
              <BadgeAlert className="mr-1 h-3 w-3" />
              Modo Grátis ({descriptionCount}/3)
            </Badge>
          )}
          
          {isPremium() && (
            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-300">
              <Badge className="mr-1 h-3 w-3" />
              Premium
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <NewDescriptionDialog 
            isPremium={isPremium} 
            descriptionCount={descriptionCount}
            canCreateMoreDescriptions={canCreateMoreDescriptions}
          />
          
          <SaveDescriptionButton 
            isPremium={isPremium}
            hasDescription={!!description}
          />
          
          <SavedDescriptionsDialog 
            isPremium={isPremium}
            descriptionCount={descriptionCount}
            savedDescriptions={savedDescriptions}
          />
          
          {description && <HtmlOutputDialog />}
          
          {description && <SEOAnalyzer description={description} />}
          
          <TutorialManager />
          
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
