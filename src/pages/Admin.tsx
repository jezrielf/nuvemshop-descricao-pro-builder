
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import UsersPanel from '@/components/admin/UsersPanel';
import SettingsPanel from '@/components/admin/SettingsPanel';
import AccessDenied from '@/components/admin/AccessDenied';

const Admin: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'settings'>('users');
  
  if (!isAdmin()) {
    return <AccessDenied />;
  }
  
  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'users' && <UsersPanel />}
      {activeTab === 'settings' && <SettingsPanel />}
    </AdminLayout>
  );
};

export default Admin;
