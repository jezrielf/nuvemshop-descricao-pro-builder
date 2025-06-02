
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AdminTab, getTabPath } from './navigation/NavigationTabs';
import MobileNavigation from './navigation/MobileNavigation';
import DesktopSidebar from './navigation/DesktopSidebar';
import AdminHeader from './layout/AdminHeader';
import AdminContainer from './layout/AdminContainer';
import AdminContent from './layout/AdminContent';
import { AdminLayoutProvider, useAdminLayout } from './layout/AdminLayoutProvider';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

const AdminLayoutContent: React.FC<Omit<AdminLayoutProps, 'onTabChange'>> = ({ 
  children
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    darkMode, 
    toggleDarkMode, 
    drawerOpen, 
    setDrawerOpen, 
    activeTab,
    setActiveTab
  } = useAdminLayout();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado do painel administrativo',
    });
    navigate('/admin-auth');
  };

  const handleTabChange = (tab: AdminTab) => {
    const path = getTabPath(tab);
    setActiveTab(tab);
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <AdminContainer>
      {/* Mobile Header */}
      <AdminHeader onLogout={handleLogout} />
      
      {/* Mobile Navigation Drawer */}
      <MobileNavigation 
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        currentTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
        darkMode={darkMode}
      />
      
      {/* Desktop Layout */}
      <div className="flex h-screen lg:overflow-hidden">
        {/* Desktop Sidebar */}
        <DesktopSidebar 
          currentTab={activeTab}
          onTabChange={handleTabChange}
          onLogout={handleLogout}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        {/* Main Content */}
        <AdminContent>
          {children}
        </AdminContent>
      </div>
    </AdminContainer>
  );
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <AdminLayoutProvider initialTab={activeTab} onTabChange={onTabChange}>
      <AdminLayoutContent activeTab={activeTab}>
        {children}
      </AdminLayoutContent>
    </AdminLayoutProvider>
  );
};

export default AdminLayout;
