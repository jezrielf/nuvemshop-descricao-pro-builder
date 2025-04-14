import React, { useState, useEffect } from 'react';
import { Profile } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import UserTable from './users';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
      
      // Buscar todos os perfis da tabela
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;
      
      console.log('Perfis obtidos:', data);
      
      // Atualizar o estado com os dados obtidos
      if (data) {
        setProfiles(data);
        setFilteredProfiles(data);
      }
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

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
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
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error loading users</AlertTitle>
          <AlertDescription>
            <p>{error}</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchProfiles}
              className="mt-2"
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
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
        Total users: {profiles.length}
      </div>
    </div>
  );
};

export default UsersPanel;
