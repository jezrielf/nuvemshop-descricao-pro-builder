
import React, { useState, useEffect } from 'react';
import { Profile } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import UserTable from './users';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const UsersPanel: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
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
      
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('criado_em', { ascending: false });

      if (profilesError) throw profilesError;

      // Get auth users data to get their emails
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;

      // Make sure authData and authData.users exist and is an array before using find()
      const users = authData?.users || [];
      
      // Merge profiles with auth data to get emails
      const mergedProfiles = profilesData.map(profile => {
        const authUser = users.find(user => user && user.id === profile.id);
        return {
          ...profile,
          email: authUser?.email || null
        };
      });
      
      console.log('Perfis obtidos (total):', mergedProfiles.length);
      
      setProfiles(mergedProfiles);
      setFilteredProfiles(mergedProfiles);
    } catch (error: any) {
      console.error('Erro ao buscar perfis:', error);
      setError(error.message);
      
      toast({
        title: 'Erro ao carregar perfis',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">Gerenciar Usuários</h2>
        
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-[300px]"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={fetchProfiles}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="border border-red-200 bg-red-50 text-red-700 p-4 rounded-md mb-4">
          <p className="font-medium">Erro ao carregar usuários</p>
          <p className="text-sm">{error}</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchProfiles}
            className="mt-2"
          >
            Tentar novamente
          </Button>
        </div>
      )}
      
      <div className="border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <UserTable 
            profiles={filteredProfiles} 
            loading={loading}
            onRefresh={fetchProfiles}
          />
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Total de usuários: {profiles.length}
      </div>
    </div>
  );
};

export default UsersPanel;
