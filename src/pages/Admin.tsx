
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user, session, isAdmin } = useAuth();
  
  useEffect(() => {
    // Verificar se o usuário está autenticado e é administrador
    if (!user) {
      toast({
        title: "Acesso negado",
        description: "Você precisa estar logado para acessar o painel administrativo.",
        variant: "destructive"
      });
      navigate('/auth');
    } else if (!isAdmin()) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão de administrador.",
        variant: "destructive"
      });
      navigate('/');
    } else {
      // Usuário autenticado e com permissão de admin
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    }
    setLoading(false);
  }, [user, isAdmin, navigate, toast]);
  
  // Observar a aba 'templates' e redirecionar
  useEffect(() => {
    if (activeTab === 'templates') {
      navigate('/admin-templates');
      // Resetar para o dashboard para evitar loop de redirecionamento se o usuário voltar
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
