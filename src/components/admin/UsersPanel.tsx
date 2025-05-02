
import React, { useState, useEffect } from 'react';
import { Profile } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import UserPanelHeader from './users/panels/UserPanelHeader';
import UserPanelContent from './users/panels/UserPanelContent';
import { adminService } from '@/services/admin';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, CheckCircledIcon } from "@radix-ui/react-icons";

const UsersPanel: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateUserSheetOpen, setIsCreateUserSheetOpen] = useState(false);
  const [lastOperation, setLastOperation] = useState<{
    type: 'success' | 'error',
    message: string
  } | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchProfiles();
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProfiles(profiles);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = profiles.filter(profile => {
        const profileRoles = typeof profile.role === 'string' 
          ? profile.role.split(',') 
          : (Array.isArray(profile.role) ? profile.role : [profile.role || '']);
        
        return (profile.nome && profile.nome.toLowerCase().includes(lowercasedSearch)) || 
          profile.id.toLowerCase().includes(lowercasedSearch) ||
          (profile.email && profile.email.toLowerCase().includes(lowercasedSearch)) ||
          profileRoles.some(r => r && r.toLowerCase().includes(lowercasedSearch));
      });
      setFilteredProfiles(filtered);
    }
  }, [searchTerm, profiles]);
  
  // Show status message for 5 seconds
  useEffect(() => {
    if (lastOperation) {
      const timer = setTimeout(() => {
        setLastOperation(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [lastOperation]);
  
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching user profiles...');
      const users = await adminService.getUsers();
      console.log('Fetched users:', users);
      
      setProfiles(users);
      setFilteredProfiles(users);
      
      setLastOperation({
        type: 'success',
        message: 'Usuários carregados com sucesso'
      });
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setError(error.message || 'Erro ao carregar usuários');
      
      setLastOperation({
        type: 'error',
        message: `Erro ao carregar usuários: ${error.message || 'Erro desconhecido'}`
      });
      
      toast({
        title: 'Erro ao carregar usuários',
        description: error.message || 'Erro ao acessar os dados',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    await fetchProfiles();
    setIsCreateUserSheetOpen(false);
    
    setLastOperation({
      type: 'success',
      message: 'Novo usuário criado com sucesso'
    });
    
    toast({
      title: 'Usuário criado',
      description: 'O novo usuário foi criado com sucesso.',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <UserPanelHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRefresh={fetchProfiles}
        loading={loading}
        isCreateUserSheetOpen={isCreateUserSheetOpen}
        setIsCreateUserSheetOpen={setIsCreateUserSheetOpen}
        handleCreateUser={handleCreateUser}
      />
      
      {lastOperation && (
        <Alert 
          variant={lastOperation.type === 'success' ? 'default' : 'destructive'}
          className="mb-4"
        >
          {lastOperation.type === 'success' ? 
            <CheckCircledIcon className="h-4 w-4" /> : 
            <ExclamationTriangleIcon className="h-4 w-4" />
          }
          <AlertTitle>
            {lastOperation.type === 'success' ? 'Sucesso!' : 'Erro!'}
          </AlertTitle>
          <AlertDescription>
            {lastOperation.message}
          </AlertDescription>
        </Alert>
      )}
      
      <UserPanelContent
        loading={loading}
        error={error}
        profiles={filteredProfiles}
        onRefresh={fetchProfiles}
      />
      
      <div className="mt-4 text-sm text-gray-500">
        Total de usuários: {profiles.length}
      </div>
    </div>
  );
};

export default UsersPanel;
