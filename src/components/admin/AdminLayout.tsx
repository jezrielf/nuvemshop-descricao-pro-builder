
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Settings } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'users' | 'settings';
  onTabChange: (tab: 'users' | 'settings') => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      
      <div className="flex space-x-4 mb-6">
        <Button 
          variant={activeTab === 'users' ? 'default' : 'outline'} 
          onClick={() => onTabChange('users')}
          className="flex items-center"
        >
          <Users className="mr-2 h-4 w-4" />
          Usuários
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
