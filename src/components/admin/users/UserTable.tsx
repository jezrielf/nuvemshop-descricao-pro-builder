import React, { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserTableProps, UserFormValues } from './types';
import UserRoleBadge from './UserRoleBadge';
import UserEditForm from './UserEditForm';

const UserTable: React.FC<UserTableProps> = ({ profiles, loading, onRefresh }) => {
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openEditSheet = (profile: Profile) => {
    setEditingUser(profile);
    setIsSheetOpen(true);
  };

  const updateUserProfile = async (values: UserFormValues) => {
    if (!editingUser) return;
    
    try {
      // Ensure role is properly formatted for database - convert array to string if needed
      const roleValue = Array.isArray(values.role) 
        ? values.role.join(',') // Convert array to comma-separated string
        : values.role;
      
      // TypeScript fix: Type the update object explicitly with roleValue as string
      const profileUpdate: {
        nome: string;
        role: string;
        atualizado_em: string;
      } = {
        nome: values.nome,
        role: roleValue,
        atualizado_em: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(profileUpdate)
        .eq('id', editingUser.id);
        
      if (error) throw error;
      
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
    }
  };

  const updateUserRole = async (userId: string, newRole: string | string[]) => {
    try {
      console.log(`Atualizando papel do usuário ${userId} para ${JSON.stringify(newRole)}`);
      
      // Ensure role is properly formatted for database - convert array to string if needed
      const roleValue = Array.isArray(newRole) 
        ? newRole.join(',') // Convert array to comma-separated string
        : newRole;
      
      // TypeScript fix: Type the update object explicitly with roleValue as string
      const profileUpdate: {
        role: string;
        atualizado_em: string;
      } = {
        role: roleValue,
        atualizado_em: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(profileUpdate)
        .eq('id', userId);
        
      if (error) {
        console.error('Erro ao atualizar papel:', error);
        throw error;
      }
      
      toast({
        title: 'Papel atualizado',
        description: 'O papel do usuário foi atualizado com sucesso. Peça para o usuário fazer login novamente para aplicar as alterações.',
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
    }
  };

  const deleteUser = async (profileId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profileId);
        
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
              <TableRow key={profile.id}>
                <TableCell className="font-medium">{profile.nome || 'Sem nome'}</TableCell>
                <TableCell>{profile.email || 'N/A'}</TableCell>
                <TableCell>
                  <UserRoleBadge role={profile.role} />
                </TableCell>
                <TableCell>{new Date(profile.criado_em).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Sheet open={isSheetOpen && editingUser?.id === profile.id} onOpenChange={setIsSheetOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => openEditSheet(profile)}>Editar</Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-md">
                        <SheetHeader>
                          <SheetTitle>Editar Usuário</SheetTitle>
                          <SheetDescription>
                            Editar informações para usuário {profile.nome || 'Sem nome'}
                          </SheetDescription>
                        </SheetHeader>
                        
                        {editingUser && (
                          <UserEditForm 
                            profile={editingUser}
                            onUpdateProfile={updateUserProfile}
                            onUpdateRole={(userId, newRole) => updateUserRole(userId, newRole)}
                          />
                        )}
                      </SheetContent>
                    </Sheet>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteUser(profile.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
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
    </>
  );
};

export default UserTable;
