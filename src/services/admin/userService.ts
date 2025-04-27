
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';

export const userService = {
  getUsers: async (): Promise<Profile[]> => {
    try {
      // Get users from auth.users through the admin API
      const { data: authUsers, error: authError } = await supabase.functions.invoke('admin-list-users', {
        body: {}
      });
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
        throw authError;
      }
      
      console.log('Auth users fetched:', authUsers);
      
      // Now get profiles data
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }
      
      // Create a map of profiles by ID for faster lookup
      const profilesMap = new Map<string, Profile>();
      profilesData?.forEach((profile: Profile) => {
        profilesMap.set(profile.id, profile);
      });
      
      // Map auth users to profiles and enrich with email
      const enrichedProfiles: Profile[] = [];
      
      authUsers?.users?.forEach((user: any) => {
        const profile = profilesMap.get(user.id) || {
          id: user.id,
          nome: null,
          avatar_url: null,
          criado_em: user.created_at,
          atualizado_em: user.created_at,
          role: 'user',
        };
        
        // Add email from auth user to profile
        enrichedProfiles.push({
          ...profile,
          email: user.email
        });
      });
      
      return enrichedProfiles;
    } catch (error) {
      console.error('Error in getUsers:', error);
      throw error;
    }
  },
  
  updateUserProfile: async (userId: string, data: Partial<Profile>): Promise<Profile> => {
    try {
      // Filter out non-string roles to fix compatibility with Supabase
      const updateData: any = { ...data };
      if (updateData.role && Array.isArray(updateData.role)) {
        // If role is an array, convert it to a string (we'll use the first role)
        // This is a workaround for the type mismatch
        updateData.role = updateData.role.join(',');
      }
      
      updateData.atualizado_em = new Date().toISOString();
      
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);
        
      if (error) throw error;
      
      // Fetch the updated profile without using .single()
      const { data: updatedProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      if (fetchError) throw fetchError;
      
      if (!updatedProfile) {
        throw new Error('Profile not found after update');
      }
      
      return updatedProfile;
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      throw error;
    }
  },
  
  updateUserRole: async (userId: string, role: string | string[]): Promise<void> => {
    try {
      // Convert array roles to comma-separated string if needed
      const roleValue = Array.isArray(role) ? role.join(',') : role;
      
      console.log('Updating role for user', userId, 'to', roleValue);
      
      const { error } = await supabase.functions.invoke('admin-update-role', {
        body: { userId, role: roleValue }
      });
      
      if (error) {
        console.error('Error invoking admin-update-role function:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      throw error;
    }
  },
  
  createUser: async (email: string, password: string, userData: any): Promise<any> => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-create-user', {
        body: {
          email,
          password,
          userData
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  },
  
  deleteUser: async (userId: string): Promise<void> => {
    try {
      const { error } = await supabase.functions.invoke('admin-delete-user', {
        body: { userId }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  },
};
