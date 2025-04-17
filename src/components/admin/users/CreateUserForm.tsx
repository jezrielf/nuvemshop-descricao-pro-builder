
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { CreateUserFormValues } from './types';
import CreateUserRoleSelector from './CreateUserRoleSelector';
import { adminService } from '@/services/adminService';

interface CreateUserFormProps {
  onUserCreated: () => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onUserCreated }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<CreateUserFormValues>({
    defaultValues: {
      email: '',
      password: '',
      nome: '',
      role: 'user'
    }
  });

  const handleSubmit = async (values: CreateUserFormValues) => {
    try {
      setLoading(true);
      console.log('Creating user with values:', values);
      
      // Prepare user data
      const userData = {
        nome: values.nome,
        role: values.role
      };
      
      // Create the user using the admin service
      const data = await adminService.createUser(values.email, values.password, userData);
      
      console.log('User created successfully:', data);
      
      toast({
        title: 'Usuário criado com sucesso',
        description: `Usuário ${values.nome} foi criado com email ${values.email}`,
      });
      
      onUserCreated();
      form.reset();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: 'Erro ao criar usuário',
        description: error.message || 'Ocorreu um erro ao criar o usuário',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com"
          {...form.register('email', { required: true })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          placeholder="Nome do usuário"
          {...form.register('nome', { required: true })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          {...form.register('password', { required: true })}
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Tipo de Usuário</h3>
        <CreateUserRoleSelector 
          watch={form.watch} 
          setValue={form.setValue} 
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full mt-6" 
        disabled={loading}
      >
        {loading ? <Spinner className="mr-2" /> : null}
        Criar Usuário
      </Button>
    </form>
  );
};

export default CreateUserForm;
