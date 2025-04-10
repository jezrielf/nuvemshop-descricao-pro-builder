
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Settings, LayoutDashboard, FileText, FileCode, CreditCard, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'users' | 'descriptions' | 'templates' | 'plans' | 'settings';
  onTabChange: (tab: 'dashboard' | 'users' | 'descriptions' | 'templates' | 'plans' | 'settings') => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado do painel administrativo',
    });
    navigate('/admin-auth');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <Button variant="outline" onClick={handleLogout} className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={activeTab === 'dashboard' ? 'default' : 'outline'} 
          onClick={() => onTabChange('dashboard')}
          className="flex items-center"
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button 
          variant={activeTab === 'users' ? 'default' : 'outline'} 
          onClick={() => onTabChange('users')}
          className="flex items-center"
        >
          <Users className="mr-2 h-4 w-4" />
          Usuários
        </Button>
        <Button 
          variant={activeTab === 'descriptions' ? 'default' : 'outline'} 
          onClick={() => onTabChange('descriptions')}
          className="flex items-center"
        >
          <FileText className="mr-2 h-4 w-4" />
          Descrições
        </Button>
        <Button 
          variant={activeTab === 'templates' ? 'default' : 'outline'} 
          onClick={() => onTabChange('templates')}
          className="flex items-center"
        >
          <FileCode className="mr-2 h-4 w-4" />
          Templates
        </Button>
        <Button 
          variant={activeTab === 'plans' ? 'default' : 'outline'} 
          onClick={() => onTabChange('plans')}
          className="flex items-center"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Planos
        </Button>
        <Button 
          variant={activeTab === 'settings' ? 'default' : 'outline'} 
          onClick={() => onTabChange('settings')}
          className="flex items-center"
        >
          <Settings className="mr-2 h-4 w-4" />
          Configurações
        </Button>
      </div>
      
      {children}
    </div>
  );
};

export default AdminLayout;
