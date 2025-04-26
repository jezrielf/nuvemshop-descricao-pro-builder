
import React, { useState, useEffect } from 'react';
import { Profile } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import UserPanelHeader from './users/panels/UserPanelHeader';
import UserPanelContent from './users/panels/UserPanelContent';
import { userService } from '@/services/admin/userService';

const UsersPanel: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateUserSheetOpen, setIsCreateUserSheetOpen] = useState(false);
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
        // Handle array or string roles for search
        const profileRoles = typeof profile.role === 'string' 
          ? profile.role.split(',') 
          : (Array.isArray(profile.role) ? profile.role : [profile.role || '']);
        
        return (profile.nome && profile.nome.toLowerCase().includes(lowercasedSearch)) || 
          profile.id.toLowerCase().includes(lowercasedSearch) ||
          (profile.email && profile.email.toLowerCase().includes(lowercasedSearch)) ||
          profileRoles.some(r => r.toLowerCase().includes(lowercasedSearch));
      });
      setFilteredProfiles(filtered);
    }
  }, [searchTerm, profiles]);
  
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const users = await userService.getUsers();
      setProfiles(users);
      setFilteredProfiles(users);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setError(error.message || 'Erro ao carregar usuários');
      
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
      
      <UserPanelContent
        loading={loading}
        error={error}
        profiles={filteredProfiles}
        onRefresh={fetchProfiles}
      />
    </div>
  );
};

export default UsersPanel;
