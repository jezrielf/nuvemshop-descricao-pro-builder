
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CreateUserFormValues } from './types';

interface CreateUserFormProps {
  onUserCreated: () => Promise<void>;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onUserCreated }) => {
  const [formData, setFormData] = useState<CreateUserFormValues>({
    nome: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use edge function to create user
      const { data, error } = await supabase.functions.invoke('admin-create-user', {
        body: {
          email: formData.email,
          password: formData.password,
          nome: formData.nome,
          role: formData.role
        }
      });

      if (error) throw error;

      toast({
        title: 'Usuário criado',
        description: `Usuário ${formData.nome} criado com sucesso`,
      });

      // Reset form
      setFormData({
        nome: '',
        email: '',
        password: '',
        role: 'user'
      });

      // Refresh user list
      await onUserCreated();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: 'Erro ao criar usuário',
        description: error.message || 'Ocorreu um erro ao criar o usuário',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          minLength={6}
        />
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value) => setFormData({ ...formData, role: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Criando...' : 'Criar Usuário'}
      </Button>
    </form>
  );
};

export default CreateUserForm;
