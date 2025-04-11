
import React from 'react';
import { cn } from '@/lib/utils';
import { useAdminLayout } from './AdminLayoutProvider';

interface AdminContentProps {
  children: React.ReactNode;
}

const AdminContent: React.FC<AdminContentProps> = ({ children }) => {
  const { darkMode } = useAdminLayout();

  return (
    <div className="flex-1 overflow-auto">
      <div className={cn(
        "p-6 max-w-7xl mx-auto",
        darkMode ? "bg-gray-900" : "bg-white"
      )}>
        {children}
      </div>
    </div>
  );
};

export default AdminContent;
