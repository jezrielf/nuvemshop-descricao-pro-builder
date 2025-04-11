
import React, { createContext, useState, useContext } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { AdminTab } from '../navigation/NavigationTabs';

interface AdminLayoutContextProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

const AdminLayoutContext = createContext<AdminLayoutContextProps | undefined>(undefined);

export const useAdminLayout = () => {
  const context = useContext(AdminLayoutContext);
  if (context === undefined) {
    throw new Error('useAdminLayout must be used within an AdminLayoutProvider');
  }
  return context;
};

interface AdminLayoutProviderProps {
  children: React.ReactNode;
  initialTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

export const AdminLayoutProvider: React.FC<AdminLayoutProviderProps> = ({ 
  children, 
  initialTab,
  onTabChange
}) => {
  const { darkMode, toggleDarkMode } = useDarkMode('adminDarkMode');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <AdminLayoutContext.Provider value={{
      drawerOpen,
      setDrawerOpen,
      darkMode,
      toggleDarkMode,
      activeTab,
      setActiveTab: handleTabChange
    }}>
      {children}
    </AdminLayoutContext.Provider>
  );
};
