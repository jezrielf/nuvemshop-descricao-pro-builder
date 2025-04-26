
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export interface UserSearchBarProps {
  onChange: (query: string) => void;
}

export const UserSearchBar: React.FC<UserSearchBarProps> = ({ onChange }) => {
  const [value, setValue] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);
    onChange(query);
  };
  
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar usuários por nome, email ou perfil..."
        className="pl-8"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
