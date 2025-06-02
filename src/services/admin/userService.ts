
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';

export const userService = {
  getUsers: async (): Promise<Profile[]> => {
    try {
      console.log('UserService: Fetching users from admin-list-users edge function');
      
      // Get users from auth.users through the admin API
      const { data, error } = await supabase.functions.invoke('admin-list-users');
      
      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
      
      if (!data?.users) {
        console.warn('No users returned from admin-list-users');
        return [];
      }
      
      console.log(`UserService: Fetched ${data.users.length} users from admin API`);
      
      // Map the combined user data to profile format for compatibility
      const enrichedProfiles: Profile[] = data.users.map((user: any) => {
        // Get the profile from the user data, or construct a default one
        const profile = user.profile || {
          id: user.id,
          nome: user.email?.split('@')[0] || 'Usuário',
          avatar_url: null,
          role: 'user',
          criado_em: user.created_at,
          atualizado_em: user.created_at
        };
        
        // Ensure email is included and role is properly formatted
        return {
          ...profile,
          email: user.email,
          role: profile.role || 'user'
        };
      });
      
      return enrichedProfiles;
    } catch (error) {
      console.error('Error in getUsers:', error);
      throw error;
    }
  },
  
  updateUserProfile: async (userId: string, data: Partial<Profile>): Promise<Profile> => {
    try {
      console.log('UserService: Updating user profile:', userId, data);
      
      // Handle base profile data update (nome, avatar_url, etc)
      const updateData: Record<string, any> = { ...data };
      
      // Remove role from updateData as it's handled separately
      delete updateData.role;
      updateData.atualizado_em = new Date().toISOString();
      
      // Ensure we're only passing fields that are expected by the profiles table
      const profileUpdateData = {
        nome: updateData.nome,
        avatar_url: updateData.avatar_url,
        atualizado_em: updateData.atualizado_em
      };
      
      const { data: updatedProfile, error } = await supabase
        .from('profiles')
        .update(profileUpdateData)
        .eq('id', userId)
        .select()
        .single();
        
      if (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
      
      console.log('UserService: Profile updated successfully:', updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      throw error;
    }
  },
  
  updateUserRole: async (userId: string, role: string | string[]): Promise<Profile> => {
    try {
      console.log('UserService: Updating role for user', userId, 'to', role);
      
      // Convert role to string format if it's an array
      const roleValue = Array.isArray(role) ? role.join(',') : role;
      
      // Use edge function for role update to ensure proper permissions
      const { data, error } = await supabase.functions.invoke('admin-update-role', {
        body: { userId, role: roleValue }
      });
      
      if (error) {
        console.error('Error invoking admin-update-role function:', error);
        throw new Error(`Erro ao atualizar role: ${error.message}`);
      }
      
      if (!data?.data) {
        throw new Error('Resposta inválida da função de atualização');
      }
      
      console.log('UserService: Role updated successfully:', data.data);
      return data.data;
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      throw error;
    }
  },
  
  createUser: async (email: string, password: string, userData: any): Promise<any> => {
    try {
      console.log('UserService: Creating new user:', email, userData);
      
      const { data, error } = await supabase.functions.invoke('admin-create-user', {
        body: {
          email,
          password,
          userData: {
            nome: userData.nome || email.split('@')[0],
            role: userData.role || 'user'
          }
        }
      });
      
      if (error) {
        console.error('Error invoking admin-create-user function:', error);
        throw error;
      }
      
      console.log('UserService: User created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  },
  
  deleteUser: async (userId: string): Promise<void> => {
    try {
      console.log('UserService: Deleting user:', userId);
      
      const { data, error } = await supabase.functions.invoke('admin-delete-user', {
        body: { userId }
      });
      
      if (error) {
        console.error('Error invoking admin-delete-user function:', error);
        throw error;
      }
      
      console.log('UserService: User deleted successfully:', data);
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  },
};
