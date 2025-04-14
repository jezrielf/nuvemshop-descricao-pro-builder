
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Profile } from '@/types/auth';
import { UserFormValues } from './types';
import UserRoleSelector from './UserRoleSelector';
import UserQuickActions from './UserQuickActions';
import { getRoles } from '@/utils/roleUtils';

interface UserEditFormProps {
  profile: Profile;
  onUpdateProfile: (values: UserFormValues) => Promise<void>;
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ 
  profile, 
  onUpdateProfile, 
  onUpdateRole 
}) => {
  // Get the primary role from the profile
  const primaryRole = Array.isArray(profile.role) 
    ? profile.role[0] || 'user' 
    : profile.role || 'user';
    
  console.log('UserEditForm - profile:', profile);
  console.log('UserEditForm - primaryRole:', primaryRole);

  const form = useForm<UserFormValues>({
    defaultValues: {
      nome: profile.nome || '',
      role: primaryRole
    }
  });

  const handleSubmit = async (values: UserFormValues) => {
    console.log('Submitting form with values:', values);
    await onUpdateProfile(values);
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
          currentRole={primaryRole}
          onUpdateRole={onUpdateRole}
        />
      </div>
    </div>
  );
};

export default UserEditForm;
