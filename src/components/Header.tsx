
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useEditorStore } from '@/store/editor';
import UserButton from './UserButton';
import NewDescriptionDialog from './header/NewDescriptionDialog';
import SaveDescriptionButton from './header/SaveDescriptionButton';
import SavedDescriptionsDialog from './header/SavedDescriptionsDialog';
import HtmlOutputDialog from './header/HtmlOutputDialog';
import AIGeneratorButton from './header/AIGeneratorButton';

const Header = () => {
  const { user, isPremium, isSubscribed, canCreateMoreDescriptions, descriptionCount, incrementDescriptionCount } = useAuth();
  const { description, setAuthContext } = useEditorStore();

  // Set auth context in the store so save actions can access it
  useEffect(() => {
    setAuthContext({
      user,
      isPremium,
      isSubscribed,
      canCreateMoreDescriptions,
      descriptionCount,
      incrementDescriptionCount
    });
  }, [user, isPremium, isSubscribed, canCreateMoreDescriptions, descriptionCount, incrementDescriptionCount, setAuthContext]);

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">
            Descrição Pro
          </h1>
          
          <Separator orientation="vertical" className="h-6" />
          
          <div className="flex items-center space-x-2">
            <NewDescriptionDialog
              isPremium={isPremium}
              descriptionCount={descriptionCount}
              canCreateMoreDescriptions={canCreateMoreDescriptions}
              incrementDescriptionCount={incrementDescriptionCount}
            />
            
            <SaveDescriptionButton
              isPremium={isPremium}
              isSubscribed={isSubscribed}
              hasDescription={!!description}
              canCreateMoreDescriptions={canCreateMoreDescriptions}
            />
            
            <SavedDescriptionsDialog />
            
            <Separator orientation="vertical" className="h-6" />
            
            <HtmlOutputDialog />
            
            <AIGeneratorButton />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
