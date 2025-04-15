
import React, { useState } from 'react';
import { Profile } from '@/types/auth';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableHead, 
  TableHeader, 
  TableRow,
  TableCell 
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { UserTableProps, UserFormValues } from './types';
import { authService } from '@/services/authService';
import { supabase } from '@/integrations/supabase/client';
import UserTableRow from './table/UserTableRow';
import UserEditSheet from './edit/UserEditSheet';

const UserTable: React.FC<UserTableProps> = ({ profiles, loading, onRefresh }) => {
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

  const openEditSheet = (profile: Profile) => {
    setEditingUser(profile);
    setIsSheetOpen(true);
  };

  const updateUserProfile = async (values: UserFormValues) => {
    if (!editingUser) return;
    
    try {
      setUpdatingUser(editingUser.id);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          nome: values.nome,
          atualizado_em: new Date().toISOString()
        })
        .eq('id', editingUser.id);
        
      if (error) throw error;
      
      const { error: roleError } = await authService.updateUserRole(
        editingUser.id,
        values.role
      );
      
      if (roleError) throw roleError;
      
      toast({
        title: 'Perfil atualizado',
        description: 'Os dados do usuário foram atualizados com sucesso.',
      });
      
      setIsSheetOpen(false);
      setEditingUser(null);
      onRefresh();
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar perfil',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUpdatingUser(null);
    }
  };

  const updateUserRole = async (userId: string, newRole: string | string[]) => {
    try {
      setUpdatingUser(userId);
      
      const { error } = await authService.updateUserRole(userId, newRole);
        
      if (error) {
        console.error('Erro ao atualizar papel:', error);
        throw error;
      }
      
      toast({
        title: 'Papel atualizado',
        description: 'O papel do usuário foi atualizado com sucesso.',
        duration: 5000,
      });
      
      onRefresh();
    } catch (error: any) {
      console.error('Erro completo:', error);
      toast({
        title: 'Erro ao atualizar papel',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUpdatingUser(null);
    }
  };

  const deleteUser = async (profileId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      setUpdatingUser(profileId);
      
      const { error } = await supabase.auth.admin.deleteUser(profileId);
        
      if (error) throw error;
      
      toast({
        title: 'Usuário excluído',
        description: 'O usuário foi excluído com sucesso.',
      });
      
      onRefresh();
    } catch (error: any) {
      toast({
        title: 'Erro ao excluir usuário',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUpdatingUser(null);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Table>
        <TableCaption>Lista de todos os usuários registrados no sistema</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Papel</TableHead>
            <TableHead>Data de Registro</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <UserTableRow
                key={profile.id}
                profile={profile}
                updatingUser={updatingUser}
                onEdit={openEditSheet}
                onDelete={deleteUser}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                Nenhum usuário encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <UserEditSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        editingUser={editingUser}
        onUpdateProfile={updateUserProfile}
        onUpdateRole={updateUserRole}
      />
    </>
  );
};

export default UserTable;
