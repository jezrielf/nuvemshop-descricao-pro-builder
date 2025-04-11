
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import TemplatesPanel from '@/components/admin/TemplatesPanel';
import AccessDenied from '@/components/admin/AccessDenied';
import { useTemplateStore } from '@/store/templateStore';
import { useToast } from '@/hooks/use-toast';

const AdminTemplates: React.FC = () => {
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
  
  // Pré-carregar templates quando a página carrega
  useEffect(() => {
    try {
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
    <AdminLayout activeTab="templates" onTabChange={() => {}}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Templates</h1>
        <p className="text-muted-foreground">Crie, edite e gerencie os templates do sistema</p>
      </div>
      <TemplatesPanel />
    </AdminLayout>
  );
};

export default AdminTemplates;
