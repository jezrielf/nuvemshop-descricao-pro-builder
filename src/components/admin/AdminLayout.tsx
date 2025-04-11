
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useDarkMode } from '@/hooks/useDarkMode';
import { cn } from '@/lib/utils';
import { AdminTab, getTabPath } from './navigation/NavigationTabs';
import MobileHeader from './navigation/MobileHeader';
import MobileNavigation from './navigation/MobileNavigation';
import DesktopSidebar from './navigation/DesktopSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { darkMode, toggleDarkMode } = useDarkMode('adminDarkMode');
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    onTabChange(tab);
    navigate(path);
    setDrawerOpen(false);
  };

  // Determine active tab based on current path or activeTab prop
  const currentTab = location.pathname === '/admin-templates' ? 'templates' : activeTab;

  return (
    <div className={cn(
      "min-h-screen transition-colors",
      darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    )}>
      {/* Mobile Header */}
      <MobileHeader 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onMenuToggle={() => setDrawerOpen(true)}
      />
      
      {/* Mobile Navigation Drawer */}
      <MobileNavigation 
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        currentTab={currentTab as AdminTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
        darkMode={darkMode}
      />
      
      {/* Desktop Layout */}
      <div className="flex h-screen lg:overflow-hidden">
        {/* Desktop Sidebar */}
        <DesktopSidebar 
          currentTab={currentTab as AdminTab}
          onTabChange={handleTabChange}
          onLogout={handleLogout}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className={cn(
            "p-6 max-w-7xl mx-auto",
            darkMode ? "bg-gray-900" : "bg-white"
          )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
