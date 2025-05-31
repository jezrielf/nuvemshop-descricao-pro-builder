
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileHeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onMenuToggle: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  onMenuToggle 
}) => {
  return (
    <div className={cn(
      "lg:hidden flex justify-between items-center p-4 border-b",
      darkMode ? "border-gray-700" : "border-gray-200"
    )}>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleDarkMode}
          className="rounded-full"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMenuToggle} 
          className="rounded-full"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MobileHeader;
