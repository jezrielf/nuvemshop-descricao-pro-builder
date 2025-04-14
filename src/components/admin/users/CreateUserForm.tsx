
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CreateUserFormValues } from './types';
import CreateUserRoleSelector from './CreateUserRoleSelector';

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
      
      // 1. Criar o usuário na autenticação
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: values.email,
        password: values.password,
        email_confirm: true,
        user_metadata: {
          nome: values.nome
        }
      });
      
      if (authError) throw authError;
      
      if (!authData.user) {
        throw new Error('Falha ao criar usuário. Nenhum usuário retornado.');
      }
      
      // 2. Atualizar o perfil com o papel (role) especificado
      // Convert role to string if it's an array
      const roleValue = Array.isArray(values.role) 
        ? values.role 
        : values.role;
        
      // TypeScript fix: Type the update object explicitly
      const profileUpdate: {
        nome: string;
        role: string | string[];
      } = {
        nome: values.nome,
        role: roleValue
      };
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update(profileUpdate)
        .eq('id', authData.user.id);
      
      if (profileError) throw profileError;
      
      onUserCreated();
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      toast({
        title: 'Erro ao criar usuário',
        description: error.message,
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
          placeholder="email@exemplo.com"
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
