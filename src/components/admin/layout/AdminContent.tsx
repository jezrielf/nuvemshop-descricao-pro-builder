
import React from 'react';
import { cn } from '@/lib/utils';
import { useAdminLayout } from './AdminLayoutProvider';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AdminContentProps {
  children: React.ReactNode;
}

const AdminContent: React.FC<AdminContentProps> = ({ children }) => {
  const { darkMode } = useAdminLayout();

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full max-h-full">
        <div className={cn(
          "p-3 sm:p-6 max-w-7xl mx-auto",
          darkMode ? "bg-gray-900" : "bg-white"
        )}>
          {children}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdminContent;
