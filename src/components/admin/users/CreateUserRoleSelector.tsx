
import React from 'react';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { CreateUserFormValues } from './types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface CreateUserRoleSelectorProps {
  watch: UseFormWatch<CreateUserFormValues>;
  setValue: UseFormSetValue<CreateUserFormValues>;
}

const CreateUserRoleSelector: React.FC<CreateUserRoleSelectorProps> = ({ watch, setValue }) => {
  const currentRole = watch('role');
  
  console.log('CreateUserRoleSelector - currentRole:', currentRole);
  
  return (
    <RadioGroup
      defaultValue={currentRole}
      value={currentRole}
      onValueChange={(value) => {
        console.log('RadioGroup - value changed to:', value);
        setValue('role', value);
      }}
      className="space-y-3"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="user" id="role-user" />
        <Label htmlFor="role-user">Usuário</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="premium" id="role-premium" />
        <Label htmlFor="role-premium">Premium</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="admin" id="role-admin" />
        <Label htmlFor="role-admin">Admin</Label>
      </div>
    </RadioGroup>
  );
};

export default CreateUserRoleSelector;
