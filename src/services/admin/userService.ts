import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';

export const userService = {
  getUsers: async (): Promise<Profile[]> => {
    try {
      console.log('Fetching users from admin-list-users edge function');
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
      
      console.log(`Fetched ${data.users.length} users from admin API`);
      
      // Map the combined user data to profile format for compatibility
      const enrichedProfiles: Profile[] = data.users.map((user: any) => {
        // Get the profile from the user data, or construct a default one
        const profile = user.profile || {
          id: user.id,
          nome: null,
          avatar_url: null,
          role: 'user',
          criado_em: user.created_at,
          atualizado_em: user.created_at
        };
        
        // Ensure email is included
        return {
          ...profile,
          email: user.email
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
      console.log('Updating user profile:', userId, data);
      // Handle base profile data update (nome, avatar_url, etc)
      // Keep role handling separate to match the admin panel's approach
      const updateData = { ...data };
      
      // Remove role from updateData as it's handled separately
      delete updateData.role;
      updateData.atualizado_em = new Date().toISOString();
      
      const { data: updatedProfile, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .maybeSingle();
        
      if (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
      
      if (!updatedProfile) {
        throw new Error('Profile not found after update');
      }
      
      console.log('Profile updated successfully:', updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      throw error;
    }
  },
  
  updateUserRole: async (userId: string, role: string | string[]): Promise<Profile> => {
    try {
      console.log('Updating role for user', userId, 'to', role);
      
      const { data, error } = await supabase.functions.invoke('admin-update-role', {
        body: { userId, role }
      });
      
      if (error || !data) {
        console.error('Error invoking admin-update-role function:', error);
        throw error || new Error('Failed to update user role');
      }
      
      console.log('Role updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      throw error;
    }
  },
  
  createUser: async (email: string, password: string, userData: any): Promise<any> => {
    try {
      console.log('Creating new user:', email, userData);
      const { data, error } = await supabase.functions.invoke('admin-create-user', {
        body: {
          email,
          password,
          userData
        }
      });
      
      if (error) {
        console.error('Error invoking admin-create-user function:', error);
        throw error;
      }
      
      console.log('User created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  },
  
  deleteUser: async (userId: string): Promise<void> => {
    try {
      console.log('Deleting user:', userId);
      const { data, error } = await supabase.functions.invoke('admin-delete-user', {
        body: { userId }
      });
      
      if (error) {
        console.error('Error invoking admin-delete-user function:', error);
        throw error;
      }
      
      console.log('User deleted successfully:', data);
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  },
};
