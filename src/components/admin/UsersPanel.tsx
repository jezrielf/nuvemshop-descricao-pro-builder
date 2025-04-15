
import React, { useState, useEffect } from 'react';
import { Profile } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import UserPanelHeader from './users/panels/UserPanelHeader';
import UserPanelContent from './users/panels/UserPanelContent';

interface AuthUser {
  id: string;
  email: string;
  created_at: string;
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
      
      // First, get users from auth.users through the admin API
      const { data: authUsers, error: authError } = await supabase.functions.invoke('admin-list-users', {
        body: {}
      });
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
        throw authError;
      }
      
      console.log('Auth users fetched:', authUsers);
      
      // Now get profiles data
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }
      
      // Create a map of profiles by ID for faster lookup
      const profilesMap = new Map<string, Profile>();
      profilesData?.forEach((profile: Profile) => {
        profilesMap.set(profile.id, profile);
      });
      
      // Map auth users to profiles and enrich with email
      const enrichedProfiles: Profile[] = [];
      
      authUsers?.users?.forEach((user: AuthUser) => {
        const profile = profilesMap.get(user.id) || {
          id: user.id,
          nome: null,
          avatar_url: null,
          criado_em: user.created_at,
          atualizado_em: user.created_at,
          role: 'user',
        };
        
        // Add email from auth user to profile
        enrichedProfiles.push({
          ...profile,
          email: user.email
        });
      });
      
      console.log('Enriched profiles:', enrichedProfiles);
      
      setProfiles(enrichedProfiles);
      setFilteredProfiles(enrichedProfiles);
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
      
      <div className="mt-4 text-sm text-gray-500">
        Total de usuários: {profiles.length}
      </div>
    </div>
  );
};

export default UsersPanel;
