
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

  const form = useForm<UserFormValues>({
    defaultValues: {
      nome: profile.nome || '',
      role: primaryRole
    }
  });

  return (
    <div className="mt-6 space-y-6">
      <form onSubmit={form.handleSubmit(onUpdateProfile)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Name</Label>
          <Input
            id="nome"
            {...form.register('nome')}
            placeholder="User name"
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">User Type</h3>
          <UserRoleSelector 
            watch={form.watch} 
            setValue={form.setValue} 
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" size="sm">Save Changes</Button>
        </div>
      </form>
      
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Quick Role Change</h3>
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
