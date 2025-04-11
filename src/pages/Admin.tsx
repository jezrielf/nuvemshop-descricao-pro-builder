
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import UsersPanel from '@/components/admin/UsersPanel';
import SettingsPanel from '@/components/admin/SettingsPanel';
import DescriptionsPanel from '@/components/admin/DescriptionsPanel';
import PlansPanel from '@/components/admin/PlansPanel';
import DashboardPanel from '@/components/admin/DashboardPanel';
import AccessDenied from '@/components/admin/AccessDenied';
import { useToast } from '@/hooks/use-toast';
import { AdminTab } from '@/components/admin/navigation/NavigationTabs';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Verificar se o admin está autenticado
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      navigate('/admin-auth');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [navigate]);
  
  // Watch for 'templates' tab and redirect
  useEffect(() => {
    if (activeTab === 'templates') {
      navigate('/admin-templates');
      // Reset to dashboard to avoid redirect loop if user comes back
      setActiveTab('dashboard');
    }
  }, [activeTab, navigate]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  if (!isAuthenticated) {
    return <AccessDenied />;
  }
  
  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <DashboardPanel />}
      {activeTab === 'users' && <UsersPanel />}
      {activeTab === 'descriptions' && <DescriptionsPanel />}
      {activeTab === 'plans' && <PlansPanel />}
      {activeTab === 'settings' && <SettingsPanel />}
    </AdminLayout>
  );
};

export default Admin;
