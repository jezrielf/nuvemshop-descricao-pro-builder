
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
import UserTableRow from './table/UserTableRow';
import UserEditSheet from './edit/UserEditSheet';
import { adminService } from '@/services/admin';
import { Spinner } from '@/components/ui/spinner';

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
      
      console.log('Updating profile with values:', values);
      
      // Update profile basic data
      await adminService.updateUserProfile(editingUser.id, {
        nome: values.nome
      });
      
      // Update user role if provided
      if (values.role) {
        await adminService.updateUserRole(editingUser.id, values.role);
      }
      
      toast({
        title: 'Perfil atualizado',
        description: 'Os dados do usuário foram atualizados com sucesso.',
      });
      
      // Close modal and refresh data
      setIsSheetOpen(false);
      setEditingUser(null);
      onRefresh();
    } catch (error: any) {
      console.error('Complete error object:', error);
      toast({
        title: 'Erro ao atualizar perfil',
        description: error.message || "Ocorreu um erro ao atualizar o perfil",
        variant: 'destructive',
      });
    } finally {
      setUpdatingUser(null);
    }
  };

  const updateUserRole = async (userId: string, newRole: string | string[]) => {
    try {
      setUpdatingUser(userId);
      
      console.log('Atualizando papel do usuário:', userId, 'para:', newRole);
      
      await adminService.updateUserRole(userId, newRole);
      
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
        description: error.message || "Ocorreu um erro ao atualizar o papel",
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
      
      await adminService.deleteUser(profileId);
      
      toast({
        title: 'Usuário excluído',
        description: 'O usuário foi excluído com sucesso.',
      });
      
      onRefresh();
    } catch (error: any) {
      toast({
        title: 'Erro ao excluir usuário',
        description: error.message || "Ocorreu um erro ao excluir o usuário",
        variant: 'destructive',
      });
    } finally {
      setUpdatingUser(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner /> 
        <span className="ml-2">Carregando usuários...</span>
      </div>
    );
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
