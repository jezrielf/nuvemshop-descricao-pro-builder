
import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import UserTableRow from './table/UserTableRow';
import { UserTableProps } from './types';

const UserTable: React.FC<UserTableProps> = ({ profiles, loading, onRefresh }) => {
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEdit = async (profile: any) => {
    // Implementation for editing user
    console.log('Edit user:', profile);
  };

  const handleDelete = async (profileId: string) => {
    setUpdatingUser(profileId);
    try {
      // Use edge function to delete user
      const { error } = await supabase.functions.invoke('admin-delete-user', {
        body: { userId: profileId }
      });

      if (error) throw error;

      toast({
        title: 'Usuário excluído',
        description: 'Usuário excluído com sucesso',
      });

      onRefresh();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao excluir usuário',
        variant: 'destructive',
      });
    } finally {
      setUpdatingUser(null);
    }
  };

  if (profiles.length === 0 && !loading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">Nenhum usuário encontrado</p>
        <Button onClick={onRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {profiles.map((profile) => (
          <UserTableRow
            key={profile.id}
            profile={profile}
            updatingUser={updatingUser}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
