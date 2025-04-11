
import React from 'react';
import { cn } from '@/lib/utils';
import { useAdminLayout } from './AdminLayoutProvider';

interface AdminContainerProps {
  children: React.ReactNode;
}

const AdminContainer: React.FC<AdminContainerProps> = ({ children }) => {
  const { darkMode } = useAdminLayout();

  return (
    <div className={cn(
      "min-h-screen transition-colors",
      darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    )}>
      {children}
    </div>
  );
};

export default AdminContainer;
