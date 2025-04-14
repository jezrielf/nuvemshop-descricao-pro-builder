
import React from 'react';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { CreateUserFormValues } from './types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CreateUserRoleSelectorProps {
  watch: UseFormWatch<CreateUserFormValues>;
  setValue: UseFormSetValue<CreateUserFormValues>;
}

const CreateUserRoleSelector: React.FC<CreateUserRoleSelectorProps> = ({ watch, setValue }) => {
  const currentRole = watch('role');
  const roles = Array.isArray(currentRole) ? currentRole : [currentRole];
  
  console.log('CreateUserRoleSelector - currentRole:', currentRole);
  console.log('CreateUserRoleSelector - roles array:', roles);
  
  const handleRoleChange = (role: string, checked: boolean) => {
    let newRoles: string[];
    
    if (checked) {
      // Add role if checked
      newRoles = Array.isArray(currentRole) ? [...currentRole, role] : [currentRole, role];
    } else {
      // Remove role if unchecked
      newRoles = Array.isArray(currentRole) 
        ? currentRole.filter(r => r !== role)
        : currentRole === role ? ['user'] : [currentRole];
    }
    
    // Ensure 'user' is always included
    if (!newRoles.includes('user') && role !== 'user') {
      newRoles.push('user');
    }
    
    // Remove duplicates
    newRoles = [...new Set(newRoles)];
    
    console.log('Setting new roles:', newRoles);
    setValue('role', newRoles.length === 1 ? newRoles[0] : newRoles);
  };
  
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="role-user" 
          checked={roles.includes('user')} 
          onCheckedChange={(checked) => handleRoleChange('user', checked === true)}
          disabled={true} // User role is always enabled
        />
        <Label htmlFor="role-user" className="cursor-pointer">Usuário (Básico)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="role-premium" 
          checked={roles.includes('premium')} 
          onCheckedChange={(checked) => handleRoleChange('premium', checked === true)}
        />
        <Label htmlFor="role-premium" className="cursor-pointer">Premium</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="role-admin" 
          checked={roles.includes('admin')} 
          onCheckedChange={(checked) => handleRoleChange('admin', checked === true)}
        />
        <Label htmlFor="role-admin" className="cursor-pointer">Admin</Label>
      </div>
    </div>
  );
};

export default CreateUserRoleSelector;
