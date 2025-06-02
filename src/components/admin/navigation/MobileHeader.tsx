
import React from 'react';
import { Menu, Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileHeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onMenuToggle: () => void;
  onLogout?: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  darkMode,
  toggleDarkMode,
  onMenuToggle,
  onLogout
}) => {
  return (
    <header className={cn(
      "border-b px-4 py-3 flex items-center justify-between lg:hidden",
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    )}>
      {/* Logo e Menu */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/f6cadb24-e515-45e4-93b9-6d5abf46919d.png" 
            alt="Logo" 
            className="h-8 w-auto"
          />
          <span className={cn(
            "font-bold text-lg",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            Admin
          </span>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        {onLogout && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;
