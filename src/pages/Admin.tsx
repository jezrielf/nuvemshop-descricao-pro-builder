
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Users, Settings } from 'lucide-react';

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'users' | 'settings'>('users');
  
  useEffect(() => {
    fetchProfiles();
  }, []);
  
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
        
      if (error) throw error;
      
      // Convert to our Profile type with role
      const profilesWithRole = data?.map(profile => ({
        ...profile,
        role: profile.role || 'user' // Default to 'user' if role is not set
      })) || [];
      
      setProfiles(profilesWithRole);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar perfis',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      // Update using metadata instead of a direct column
      const { error } = await supabase
        .from('profiles')
        .update({ 
          role: newRole 
        })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: 'Perfil atualizado',
        description: 'O papel do usuário foi atualizado com sucesso.',
      });
      
      // Refresh the profiles list
      fetchProfiles();
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar perfil',
        description: error.message,
        variant: 'destructive',
      });
    }
  };
  
  if (!isAdmin()) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-2xl font-bold mb-2">Acesso Restrito</h1>
        <p className="text-gray-600 mb-4">Você não tem permissão para acessar esta área.</p>
        <Button onClick={() => window.location.href = '/'}>Voltar para a Página Inicial</Button>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      
      <div className="flex space-x-4 mb-6">
        <Button 
          variant={activeTab === 'users' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('users')}
          className="flex items-center"
        >
          <Users className="mr-2 h-4 w-4" />
          Usuários
        </Button>
        <Button 
          variant={activeTab === 'settings' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('settings')}
          className="flex items-center"
        >
          <Settings className="mr-2 h-4 w-4" />
          Configurações
        </Button>
      </div>
      
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Gerenciar Usuários</h2>
          
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <Table>
              <TableCaption>Lista de todos os usuários registrados no sistema</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Papel</TableHead>
                  <TableHead>Data de Criação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{profile.nome || 'Sem nome'}</TableCell>
                    <TableCell className="text-xs truncate max-w-[150px]">{profile.id}</TableCell>
                    <TableCell>
                      <Badge variant={profile.role === 'admin' ? 'default' : profile.role === 'premium' ? 'outline' : 'secondary'}>
                        {profile.role || 'user'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(profile.criado_em).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm">Editar</Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Editar Usuário</SheetTitle>
                            <SheetDescription>
                              Altere as informações do usuário {profile.nome || 'Sem nome'}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-6 space-y-4">
                            <div>
                              <h3 className="text-sm font-medium mb-2">Alterar Papel</h3>
                              <div className="flex space-x-2">
                                <Button 
                                  variant={profile.role === 'user' ? 'default' : 'outline'} 
                                  size="sm"
                                  onClick={() => updateUserRole(profile.id, 'user')}
                                >
                                  Usuário
                                </Button>
                                <Button 
                                  variant={profile.role === 'premium' ? 'default' : 'outline'} 
                                  size="sm"
                                  onClick={() => updateUserRole(profile.id, 'premium')}
                                >
                                  Premium
                                </Button>
                                <Button 
                                  variant={profile.role === 'admin' ? 'default' : 'outline'} 
                                  size="sm"
                                  onClick={() => updateUserRole(profile.id, 'admin')}
                                >
                                  Admin
                                </Button>
                              </div>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Configurações do Sistema</h2>
          <p className="text-gray-500">Esta é a área de configurações do sistema. Aqui você poderá definir parâmetros globais e configurações avançadas.</p>
          
          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium mb-2">Limite de Descrições para Usuários Gratuitos</h3>
            <p className="text-sm text-gray-600 mb-4">Usuários gratuitos podem criar até 3 descrições. Usuários premium têm acesso ilimitado.</p>
          </div>
          
          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium mb-2">Períodos de Inatividade</h3>
            <p className="text-sm text-gray-600 mb-4">Aqui você poderá configurar períodos de inatividade e outras políticas relacionadas a contas de usuário.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
