
import React from 'react';
import { cn } from '@/lib/utils';
import MobileHeader from '../navigation/MobileHeader';
import { useAdminLayout } from './AdminLayoutProvider';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
  const { darkMode, toggleDarkMode, setDrawerOpen } = useAdminLayout();

  return (
    <MobileHeader 
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      onMenuToggle={() => setDrawerOpen(true)}
    />
  );
};

export default AdminHeader;
