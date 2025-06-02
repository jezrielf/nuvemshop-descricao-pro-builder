
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  LogOut, 
  Moon, 
  Sun,
  Layout
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Usuários', icon: Users },
  { id: 'descriptions', label: 'Descrições', icon: FileText },
  { id: 'templates', label: 'Templates', icon: Layout },
  { id: 'plans', label: 'Planos', icon: CreditCard },
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
      "w-64 h-screen flex flex-col border-r",
      darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
    )}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/ea72f039-790b-455c-b2ea-0c2a7981d2d2.png" 
            alt="Logo" 
            className="w-8 h-8"
          />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <>
                <Sun className="h-4 w-4 mr-3" />
                Modo Claro
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 mr-3" />
                Modo Escuro
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};
