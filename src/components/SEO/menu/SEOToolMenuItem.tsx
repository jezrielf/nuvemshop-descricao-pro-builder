
import React from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface SEOToolMenuItemProps {
  children: React.ReactNode;
}

export const SEOToolMenuItem: React.FC<SEOToolMenuItemProps> = ({ children }) => {
  return (
    <DropdownMenuItem asChild>
      <div className="cursor-default w-full">
        {children}
      </div>
    </DropdownMenuItem>
  );
};
