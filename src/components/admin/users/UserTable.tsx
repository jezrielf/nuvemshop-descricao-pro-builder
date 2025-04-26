
import React, { useState, useEffect } from 'react';
import { Profile } from '@/types/auth';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, UserCog } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { userService } from '@/services/admin/userService';

interface UserTableProps {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ profiles, loading, error, onRefresh }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Profile | null>(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editedUser, setEditedUser] = useState<{ id: string; nome: string } | null>(null);
  const { toast } = useToast();
  const [users, setUsers] = useState<Profile[]>([]);
  
  useEffect(() => {
    setUsers(profiles);
  }, [profiles]);

  const handleUpdateUser = async (userId: string, data: { nome: string }) => {
    try {
      setUpdating(true);
      await userService.updateUser(userId, data);
      onRefresh();
      toast({
        title: 'Usuário atualizado',
        description: 'O usuário foi atualizado com sucesso.'
      });
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      toast({
        title: 'Erro ao atualizar usuário',
        description: error.message || 'Ocorreu um erro ao atualizar o usuário.',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateRole = async (userId: string, role: string) => {
    try {
      setUpdating(true);
      await userService.updateUser(userId, { role });
      onRefresh();
      toast({
        title: 'Perfil atualizado',
        description: `Perfil alterado para ${role}.`
      });
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      toast({
        title: 'Erro ao atualizar perfil',
        description: error.message || 'Ocorreu um erro ao atualizar o perfil do usuário.',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const handlePromoteToRole = async (userId: string, role: string) => {
    try {
      setUpdating(true);
      await userService.updateUser(userId, { role });
      onRefresh();
      toast({
        title: 'Usuário promovido',
        description: `O usuário foi promovido para ${role}.`
      });
    } catch (error: any) {
      console.error('Erro ao promover usuário:', error);
      toast({
        title: 'Erro ao promover usuário',
        description: error.message || 'Ocorreu um erro ao promover o usuário.',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    try {
      setDeleting(true);
      await userService.deleteUser(userToDelete.id);
      onRefresh();
      setUserToDelete(null);
      setIsDeleteDialogOpen(false);
      toast({
        title: 'Usuário excluído',
        description: 'O usuário foi excluído com sucesso.'
      });
    } catch (error: any) {
      console.error('Erro ao excluir usuário:', error);
      toast({
        title: 'Erro ao excluir usuário',
        description: error.message || 'Ocorreu um erro ao excluir o usuário.',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p>Carregando usuários...</p>;
  }

  if (error) {
    return <p>Erro ao carregar usuários: {error}</p>;
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Perfil</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>
                {editedUser?.id === user.id ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={editedUser.nome}
                      onChange={(e) => setEditedUser({ ...editedUser, nome: e.target.value })}
                      className="max-w-[200px]"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        handleUpdateUser(user.id, { nome: editedUser.nome });
                        setEditedUser(null);
                      }}
                      disabled={updating}
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditedUser(null)}
                    >
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    {user.nome}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditedUser({ id: user.id, nome: user.nome })}
                      className="ml-2"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                )}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {Array.isArray(user.role) ? (
                  user.role.map((role, index) => (
                    <Badge key={index} className="mr-1">{role}</Badge>
                  ))
                ) : (
                  <Badge>{user.role || 'user'}</Badge>
                )}
                <Select onValueChange={(role) => handleUpdateRole(user.id, role)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Alterar Perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuário</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação é irreversível. Tem certeza que deseja excluir este usuário?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction disabled={deleting} onClick={() => {
                        setUserToDelete(user);
                        setIsDeleteDialogOpen(true);
                      }}>
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} disabled={deleting}>
              {deleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserTable;
