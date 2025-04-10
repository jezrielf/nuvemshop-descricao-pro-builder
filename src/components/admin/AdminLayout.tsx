
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Settings, LayoutDashboard, FileText, FileCode, CreditCard } from 'lucide-react';

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
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      
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
