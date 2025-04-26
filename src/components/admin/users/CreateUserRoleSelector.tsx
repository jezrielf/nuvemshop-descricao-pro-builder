
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { FormControl } from '@/components/ui/form';

export interface CreateUserRoleSelectorProps {
  value: string;
  onChange: (...event: any[]) => void;
}

const CreateUserRoleSelector: React.FC<CreateUserRoleSelectorProps> = ({ value, onChange }) => {
  return (
    <Select 
      value={value} 
      onValueChange={(val) => onChange(val)}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o perfil" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="user">Usuário</SelectItem>
        <SelectItem value="premium">Premium</SelectItem>
        <SelectItem value="admin">Administrador</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CreateUserRoleSelector;
