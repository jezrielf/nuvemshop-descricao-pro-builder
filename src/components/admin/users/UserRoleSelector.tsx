
import React from 'react';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { UserFormValues } from './types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getAvailableRoles } from '@/utils/roleUtils';

interface UserRoleSelectorProps {
  watch: UseFormWatch<UserFormValues>;
  setValue: UseFormSetValue<UserFormValues>;
  multiSelect?: boolean;
}

const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({ 
  watch, 
  setValue, 
  multiSelect = false 
}) => {
  const currentRole = watch('role');
  const availableRoles = getAvailableRoles();
  
  const handleRoleChange = (role: string) => {
    // For now, since the form expects a single role, we just set that role
    // In the future, we can update this to handle multiple roles
    setValue('role', role);
  };

  return (
    <div className="space-y-2">
      {availableRoles.map((role) => (
        <div key={role} className="flex items-center space-x-2">
          <Checkbox 
            id={`role-${role}`} 
            checked={currentRole === role}
            onCheckedChange={() => handleRoleChange(role)}
          />
          <Label htmlFor={`role-${role}`} className="capitalize">
            {role}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default UserRoleSelector;
