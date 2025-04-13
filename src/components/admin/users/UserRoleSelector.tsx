
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { UserFormValues } from './types';

interface UserRoleSelectorProps {
  watch: UseFormWatch<UserFormValues>;
  setValue: UseFormSetValue<UserFormValues>;
}

const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({ watch, setValue }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button 
        type="button"
        variant={watch('role') === 'user' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setValue('role', 'user')}
        className="flex items-center justify-center"
      >
        {watch('role') === 'user' && <Check className="mr-1 h-4 w-4" />}
        Usuário
      </Button>
      <Button 
        type="button"
        variant={watch('role') === 'premium' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setValue('role', 'premium')}
        className="flex items-center justify-center"
      >
        {watch('role') === 'premium' && <Check className="mr-1 h-4 w-4" />}
        Premium
      </Button>
      <Button 
        type="button"
        variant={watch('role') === 'admin' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setValue('role', 'admin')}
        className="flex items-center justify-center"
      >
        {watch('role') === 'admin' && <Check className="mr-1 h-4 w-4" />}
        Admin
      </Button>
    </div>
  );
};

export default UserRoleSelector;
