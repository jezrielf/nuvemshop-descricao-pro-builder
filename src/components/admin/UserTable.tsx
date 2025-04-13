
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Check, X } from 'lucide-react';

interface UserTableProps {
  profiles: Profile[];
  loading: boolean;
  onRefresh: () => void;
}

interface UserFormValues {
  nome: string;
  role: string;
}

const UserTable: React.FC<UserTableProps> = ({ profiles, loading, onRefresh }) => {
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  
  const form = useForm<UserFormValues>({
    defaultValues: {
      nome: '',
      role: 'user'
    }
  });

  const openEditSheet = (profile: Profile) => {
    setEditingUser(profile);
    form.reset({
      nome: profile.nome || '',
      role: profile.role || 'user'
    });
  };

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
      
      // Atualizar a lista de perfis
      onRefresh();
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar perfil',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const updateUserProfile = async (values: UserFormValues) => {
    if (!editingUser) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          nome: values.nome,
          role: values.role,
          atualizado_em: new Date().toISOString()
        })
        .eq('id', editingUser.id);
        
      if (error) throw error;
      
      toast({
        title: 'Perfil atualizado',
        description: 'Os dados do usuário foram atualizados com sucesso.',
      });
      
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
            <TableHead>ID</TableHead>
            <TableHead>Papel</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.length > 0 ? (
            profiles.map((profile) => (
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
                      <Button variant="outline" size="sm" onClick={() => openEditSheet(profile)}>Editar</Button>
                    </SheetTrigger>
                    <SheetContent className="sm:max-w-md">
                      <SheetHeader>
                        <SheetTitle>Editar Usuário</SheetTitle>
                        <SheetDescription>
                          Altere as informações do usuário {profile.nome || 'Sem nome'}
                        </SheetDescription>
                      </SheetHeader>
                      
                      <div className="mt-6 space-y-6">
                        <form onSubmit={form.handleSubmit(updateUserProfile)} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="nome">Nome</Label>
                            <Input
                              id="nome"
                              {...form.register('nome')}
                              placeholder="Nome do usuário"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Tipo de Usuário</h3>
                            <div className="grid grid-cols-3 gap-2">
                              <Button 
                                type="button"
                                variant={form.watch('role') === 'user' ? 'default' : 'outline'} 
                                size="sm"
                                onClick={() => form.setValue('role', 'user')}
                                className="flex items-center justify-center"
                              >
                                {form.watch('role') === 'user' && <Check className="mr-1 h-4 w-4" />}
                                Usuário
                              </Button>
                              <Button 
                                type="button"
                                variant={form.watch('role') === 'premium' ? 'default' : 'outline'} 
                                size="sm"
                                onClick={() => form.setValue('role', 'premium')}
                                className="flex items-center justify-center"
                              >
                                {form.watch('role') === 'premium' && <Check className="mr-1 h-4 w-4" />}
                                Premium
                              </Button>
                              <Button 
                                type="button"
                                variant={form.watch('role') === 'admin' ? 'default' : 'outline'} 
                                size="sm"
                                onClick={() => form.setValue('role', 'admin')}
                                className="flex items-center justify-center"
                              >
                                {form.watch('role') === 'admin' && <Check className="mr-1 h-4 w-4" />}
                                Admin
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-2 pt-4">
                            <Button type="submit" size="sm">Salvar Alterações</Button>
                          </div>
                        </form>
                        
                        <div className="border-t pt-4">
                          <h3 className="text-sm font-medium mb-2">Alterar Papel Rápido</h3>
                          <div className="flex flex-wrap gap-2">
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
