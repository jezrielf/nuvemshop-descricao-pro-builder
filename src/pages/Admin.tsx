
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import UsersPanel from '@/components/admin/UsersPanel';
import SettingsPanel from '@/components/admin/SettingsPanel';
import DescriptionsPanel from '@/components/admin/DescriptionsPanel';
import TemplatesPanel from '@/components/admin/TemplatesPanel';
import PlansPanel from '@/components/admin/PlansPanel';
import DashboardPanel from '@/components/admin/DashboardPanel';
import AccessDenied from '@/components/admin/AccessDenied';
import { useTemplateStore } from '@/store/templateStore';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'descriptions' | 'templates' | 'plans' | 'settings'>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { loadTemplates } = useTemplateStore();
  
  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      navigate('/admin-auth');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [navigate]);
  
  useEffect(() => {
    // Load templates data when the templates tab is active
    if (activeTab === 'templates') {
      loadTemplates();
    }
  }, [activeTab, loadTemplates]);
  
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
      {activeTab === 'templates' && <TemplatesPanel />}
      {activeTab === 'plans' && <PlansPanel />}
      {activeTab === 'settings' && <SettingsPanel />}
    </AdminLayout>
  );
};

export default Admin;
