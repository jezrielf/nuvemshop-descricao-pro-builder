import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { userService } from '@/services/admin/userService';
import { cn } from '@/lib/utils';

interface CreateUserFormProps {
  onClose: () => void;
  onUserCreated?: (user: any) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onClose, onUserCreated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('CreateUserForm: Submitting form with:', { email, nome, role });
      
      const result = await userService.createUser(email, password, nome, Array.isArray(role) ? role.join(',') : role);
      
      toast({
        title: 'Usuário criado com sucesso',
        description: `O usuário ${nome} foi criado e receberá um email de confirmação.`,
      });

      onUserCreated?.(result);
      onClose();
    } catch (error: any) {
      console.error('CreateUserForm: Error creating user:', error);
      setError(error.message || 'Erro ao criar usuário');
      
      toast({
        title: 'Erro ao criar usuário',
        description: error.message || 'Ocorreu um erro inesperado',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Select onValueChange={setRole} defaultValue="user">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Usuário'}
        </Button>
      </div>
    </form>
  );
};

export default CreateUserForm;
