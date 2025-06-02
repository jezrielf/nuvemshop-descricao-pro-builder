
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';

interface ProfileUpdate {
  nome?: string;
  avatar_url?: string;
}

export const userService = {
  // Buscar todos os usuários
  getUsers: async (): Promise<Profile[]> => {
    try {
      console.log('UserService: Fetching all users');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('criado_em', { ascending: false });

      if (error) {
        console.error('UserService: Error fetching users:', error);
        throw new Error(`Erro ao buscar usuários: ${error.message}`);
      }

      console.log('UserService: Users fetched successfully:', data?.length || 0);
      return data || [];
    } catch (error: any) {
      console.error('UserService: Unexpected error:', error);
      throw new Error(`Erro inesperado: ${error.message}`);
    }
  },

  // Atualizar perfil do usuário
  updateUserProfile: async (userId: string, updates: ProfileUpdate): Promise<Profile> => {
    try {
      console.log('UserService: Updating profile for user:', userId, updates);
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          atualizado_em: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('UserService: Error updating profile:', error);
        throw new Error(`Erro ao atualizar perfil: ${error.message}`);
      }

      console.log('UserService: Profile updated successfully:', data);
      return data;
    } catch (error: any) {
      console.error('UserService: Unexpected error:', error);
      throw new Error(`Erro inesperado: ${error.message}`);
    }
  },

  // Atualizar role do usuário usando a edge function
  updateUserRole: async (userId: string, newRole: string | string[]): Promise<Profile> => {
    try {
      console.log('UserService: Updating role for user:', userId, 'to:', newRole);
      
      // Chamar a edge function para atualizar o role
      const { data, error } = await supabase.functions.invoke('admin-update-role', {
        body: { 
          userId, 
          role: Array.isArray(newRole) ? newRole.join(',') : newRole 
        }
      });

      if (error) {
        console.error('UserService: Error calling edge function:', error);
        throw new Error(`Erro ao atualizar papel: ${error.message}`);
      }

      if (data.error) {
        console.error('UserService: Edge function returned error:', data.error);
        throw new Error(`Erro na função: ${data.error}`);
      }

      console.log('UserService: Role updated successfully:', data.data);
      return data.data;
    } catch (error: any) {
      console.error('UserService: Unexpected error:', error);
      throw new Error(`Erro inesperado: ${error.message}`);
    }
  },

  // Criar novo usuário usando edge function
  createUser: async (email: string, password: string, nome: string, role: string = 'user'): Promise<any> => {
    try {
      console.log('UserService: Creating user:', { email, nome, role });
      
      const { data, error } = await supabase.functions.invoke('admin-create-user', {
        body: { email, password, nome, role }
      });

      if (error) {
        console.error('UserService: Error calling create user function:', error);
        throw new Error(`Erro ao criar usuário: ${error.message}`);
      }

      if (data.error) {
        console.error('UserService: Create user function returned error:', data.error);
        throw new Error(`Erro na criação: ${data.error}`);
      }

      console.log('UserService: User created successfully:', data);
      return data;
    } catch (error: any) {
      console.error('UserService: Unexpected error:', error);
      throw new Error(`Erro inesperado: ${error.message}`);
    }
  },

  // Deletar usuário usando edge function
  deleteUser: async (userId: string): Promise<void> => {
    try {
      console.log('UserService: Deleting user:', userId);
      
      const { data, error } = await supabase.functions.invoke('admin-delete-user', {
        body: { userId }
      });

      if (error) {
        console.error('UserService: Error calling delete user function:', error);
        throw new Error(`Erro ao deletar usuário: ${error.message}`);
      }

      if (data.error) {
        console.error('UserService: Delete user function returned error:', data.error);
        throw new Error(`Erro na exclusão: ${data.error}`);
      }

      console.log('UserService: User deleted successfully');
    } catch (error: any) {
      console.error('UserService: Unexpected error:', error);
      throw new Error(`Erro inesperado: ${error.message}`);
    }
  }
};
