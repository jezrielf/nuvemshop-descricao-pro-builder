
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FileCode, 
  CreditCard,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Usuários', icon: Users },
  { id: 'descriptions', label: 'Descrições', icon: FileText },
  { id: 'templates', label: 'Templates', icon: FileCode },
  { id: 'plans', label: 'Planos', icon: CreditCard }
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  darkMode,
  toggleDarkMode
}) => {
  return (
    <div className={cn(
      "w-64 border-r h-full flex flex-col",
      darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
    )}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/ea72f039-790b-455c-b2ea-0c2a7981d2d2.png" 
              alt="Logo" 
              className="w-8 h-8"
            />
            <h1 className="text-lg font-bold">Admin Panel</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => onTabChange(tab.id)}
              className="w-full justify-start"
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button 
          variant="outline" 
          onClick={onLogout}
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
};
