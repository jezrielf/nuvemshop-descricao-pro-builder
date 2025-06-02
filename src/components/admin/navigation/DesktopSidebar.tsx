
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LogOut, Sun, Moon } from 'lucide-react';
import { navigationTabs, AdminTab } from './NavigationTabs';
import { cn } from '@/lib/utils';

interface DesktopSidebarProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ 
  currentTab, 
  onTabChange, 
  onLogout,
  darkMode,
  toggleDarkMode
}) => {
  return (
    <div className={cn(
      "hidden lg:block w-64 border-r p-4 h-full",
      darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200"
    )}>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleDarkMode}
          className="rounded-full"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <nav className="flex flex-col gap-2">
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
        </nav>
      </ScrollArea>
      
      <div className="absolute bottom-4 w-56">
        <Button 
          variant="outline" 
          onClick={onLogout} 
          className="flex items-center w-full mt-4"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default DesktopSidebar;
