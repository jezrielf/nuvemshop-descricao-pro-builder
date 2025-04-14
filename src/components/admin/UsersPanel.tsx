import React, { useState, useEffect } from 'react';
import { Profile } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import UserPanelHeader from './users/panels/UserPanelHeader';
import UserPanelContent from './users/panels/UserPanelContent';

interface AuthUser {
  id: string;
  email?: string;
}

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
      const filtered = profiles.filter(profile => 
        (profile.nome && profile.nome.toLowerCase().includes(lowercasedSearch)) || 
        profile.id.toLowerCase().includes(lowercasedSearch) ||
        (profile.email && profile.email.toLowerCase().includes(lowercasedSearch)) ||
        (profile.role && (
          typeof profile.role === 'string' 
            ? profile.role.toLowerCase().includes(lowercasedSearch)
            : profile.role.some(r => r.toLowerCase().includes(lowercasedSearch))
        ))
      );
      setFilteredProfiles(filtered);
    }
  }, [searchTerm, profiles]);
  
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Buscar todos os perfis da tabela
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;
      
      // Now get the emails from auth.users
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Erro ao buscar usuários auth:', authError);
        // Continue with just the profiles
      }
      
      // Map emails to profiles if auth data is available
      let enrichedProfiles = profilesData || [];
      
      if (authData && authData.users) {
        // Create a map of user IDs to emails
        const userEmailMap = new Map<string, string>();
        authData.users.forEach((user: AuthUser) => {
          if (user.id && user.email) {
            userEmailMap.set(user.id, user.email);
          }
        });
        
        // Add emails to profiles
        enrichedProfiles = enrichedProfiles.map(profile => ({
          ...profile,
          email: userEmailMap.get(profile.id) || null
        }));
      }
      
      console.log('Perfis obtidos:', enrichedProfiles);
      
      // Atualizar o estado com os dados obtidos
      setProfiles(enrichedProfiles);
      setFilteredProfiles(enrichedProfiles);
    } catch (error: any) {
      console.error('Erro ao buscar perfis:', error);
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
      
      <div className="mt-4 text-sm text-gray-500">
        Total de usuários: {profiles.length}
      </div>
    </div>
  );
};

export default UsersPanel;
