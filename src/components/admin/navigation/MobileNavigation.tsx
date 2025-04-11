
import React from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { LogOut } from 'lucide-react';
import { navigationTabs, AdminTab } from './NavigationTabs';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  darkMode: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  open, 
  onOpenChange, 
  currentTab, 
  onTabChange, 
  onLogout,
  darkMode
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={cn(
        "p-4 rounded-t-lg",
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      )}>
        <div className="flex flex-col gap-2 mb-6">
          {navigationTabs.map(tab => (
            <Button 
              key={tab.id}
              variant={currentTab === tab.id ? 'default' : 'outline'} 
              onClick={() => onTabChange(tab.id)}
              className="flex items-center justify-start w-full"
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </Button>
          ))}
          <Button 
            variant="destructive" 
            onClick={onLogout} 
            className="flex items-center justify-start w-full mt-4"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sair
          </Button>
        </div>
        <DrawerClose className="sr-only">Close</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigation;
