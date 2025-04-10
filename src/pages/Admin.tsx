
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import UsersPanel from '@/components/admin/UsersPanel';
import SettingsPanel from '@/components/admin/SettingsPanel';
import DescriptionsPanel from '@/components/admin/DescriptionsPanel';
import TemplatesPanel from '@/components/admin/TemplatesPanel';
import PlansPanel from '@/components/admin/PlansPanel';
import DashboardPanel from '@/components/admin/DashboardPanel';
import AccessDenied from '@/components/admin/AccessDenied';

const Admin: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'descriptions' | 'templates' | 'plans' | 'settings'>('dashboard');
  
  if (!isAdmin()) {
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
