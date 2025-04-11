
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
import { useToast } from '@/hooks/use-toast';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'descriptions' | 'templates' | 'plans' | 'settings'>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { loadTemplates } = useTemplateStore();
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
  
  // Pré-carregar templates quando a página admin carrega
  useEffect(() => {
    try {
      // Carregar dados dos templates quando o componente monta
      loadTemplates();
    } catch (error) {
      console.error('Erro ao carregar templates:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os templates.',
        variant: 'destructive'
      });
    }
  }, [loadTemplates, toast]);
  
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
