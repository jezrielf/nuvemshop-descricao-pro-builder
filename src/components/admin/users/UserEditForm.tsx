
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Profile } from '@/types/auth';
import { UserFormValues } from './types';
import UserRoleSelector from './UserRoleSelector';
import UserQuickActions from './UserQuickActions';
import { useToast } from '@/hooks/use-toast';

interface UserEditFormProps {
  profile: Profile;
  onUpdateProfile: (values: UserFormValues) => Promise<void>;
  onUpdateRole: (userId: string, newRole: string | string[]) => Promise<void>;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ 
  profile, 
  onUpdateProfile, 
  onUpdateRole 
}) => {
  const { toast } = useToast();
  // Get the primary role from the profile
  // Convert string roles (comma-separated) to array if needed
  const profileRoles = typeof profile.role === 'string' && profile.role.includes(',') 
    ? profile.role.split(',') 
    : (Array.isArray(profile.role) ? profile.role : [profile.role || 'user']);
    
  console.log('UserEditForm - profile:', profile);
  console.log('UserEditForm - profileRoles:', profileRoles);

  const form = useForm<UserFormValues>({
    defaultValues: {
      nome: profile.nome || '',
      role: profileRoles
    }
  });

  const handleSubmit = async (values: UserFormValues) => {
    try {
      console.log('Submitting form with values:', values);
      await onUpdateProfile(values);
      toast({
        title: 'Perfil atualizado',
        description: 'As informações do usuário foram atualizadas com sucesso',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Erro ao atualizar perfil',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
          <UserRoleSelector 
            watch={form.watch} 
            setValue={form.setValue} 
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" size="sm">Salvar Alterações</Button>
        </div>
      </form>
      
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Mudança Rápida de Papel</h3>
        <UserQuickActions 
          profileId={profile.id}
          currentRole={profile.role}
          onUpdateRole={onUpdateRole}
        />
      </div>
    </div>
  );
};

export default UserEditForm;
