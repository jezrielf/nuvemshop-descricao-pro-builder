
import React from 'react';
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UserTableProps {
  profiles: Profile[];
  loading: boolean;
  onRefresh: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ profiles, loading, onRefresh }) => {
  const { toast } = useToast();

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: 'Perfil atualizado',
        description: 'O papel do usuário foi atualizado com sucesso.',
      });
      
      // Refresh the profiles list
      onRefresh();
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar perfil',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
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
  );
};

export default UserTable;
