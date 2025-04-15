
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { CreateUserFormValues } from './types';
import CreateUserRoleSelector from './CreateUserRoleSelector';
import { authService } from '@/services/authService';

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
      
      // Prepare user data
      const userData = {
        nome: values.nome,
        role: values.role
      };
      
      // Create the user with admin privileges using Edge Function
      const { data: userData1, error: createError } = await authService.adminCreateUser(
        values.email,
        values.password,
        userData
      );
      
      if (createError) {
        throw new Error(createError.message || 'Failed to create user');
      }
      
      if (!userData1?.user) {
        throw new Error('User creation failed. No user returned.');
      }
      
      toast({
        title: 'User created successfully',
        description: `User ${values.nome} was created with email ${values.email}`,
      });
      
      onUserCreated();
      form.reset();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: 'Error creating user',
        description: error.message || 'An error occurred while creating the user',
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
