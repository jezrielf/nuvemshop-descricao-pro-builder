
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { v4 as uuidv4 } from 'uuid';
import { rolesToString } from '@/utils/roleUtils';

// Define allowed roles to match database constraints
type AllowedRole = 'user' | 'premium' | 'admin';

const validateRole = (role: string): AllowedRole => {
  if (role === "user" || role === "premium" || role === "admin") {
    return role as AllowedRole;
  }
  return "user"; // Default to user if invalid role
};

export const userService = {
  // Get all users
  getUsers: async (): Promise<Profile[]> => {
    try {
      console.log('Fetching users...');
      
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('criado_em', { ascending: false });
        
      if (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
      
      console.log(`Found ${profiles.length} users`);
      return profiles as Profile[];
    } catch (error: any) {
      console.error('Error in getUsers:', error);
      throw new Error(error.message || 'Failed to fetch users');
    }
  },
  
  // Get user by ID
  getUserById: async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      return data as Profile;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },
  
  // Create new user
  createUser: async (email: string, password: string, userData: Partial<Profile>): Promise<Profile | null> => {
    try {
      // First create the user in auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      
      if (authError) throw authError;
      
      if (!authData.user) {
        throw new Error('Failed to create user account');
      }
      
      const userId = authData.user.id;
      
      // Then create the profile
      const newProfile: Profile = {
        id: userId,
        nome: userData.nome || email.split('@')[0],
        avatar_url: userData.avatar_url || null,
        role: userData.role || 'user',
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
      };
      
      // Ensure role is a string when inserting into the database
      const profileToInsert = {
        ...newProfile,
        role: typeof newProfile.role === 'string' ? newProfile.role : rolesToString(newProfile.role),
      };
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([profileToInsert]);
        
      if (profileError) throw profileError;
      
      // If role is specified and not 'user', set it in the user_roles table
      if (userData.role && userData.role !== 'user') {
        const validatedRole = validateRole(typeof userData.role === 'string' ? userData.role : 'user');
        
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: validatedRole
          });
          
        if (roleError) {
          console.error('Error setting user role:', roleError);
          // We don't throw here since the user was already created
        }
      }
      
      return newProfile;
    } catch (error: any) {
      console.error('Error creating user:', error);
      throw new Error(error.message || 'Failed to create user');
    }
  },
  
  // Update user
  updateUser: async (userId: string, userData: Partial<Profile>): Promise<Profile | null> => {
    try {
      const updateData: any = {
        ...userData,
        atualizado_em: new Date().toISOString()
      };
      
      // Ensure role is string if passed
      if (userData.role) {
        updateData.role = typeof userData.role === 'string' ? userData.role : rolesToString(userData.role);
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();
        
      if (error) throw error;
      
      // If role is being updated, update the user_roles table
      if (userData.role) {
        const validatedRole = validateRole(
          typeof userData.role === 'string' ? userData.role : 'user'
        );
        
        // Check if there's an existing role
        const { data: existingRole, error: fetchError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', userId)
          .single();
          
        if (fetchError && !fetchError.message.includes('No rows found')) {
          console.error('Error fetching user role:', fetchError);
        }
        
        if (existingRole) {
          // Update existing role
          const { error: updateError } = await supabase
            .from('user_roles')
            .update({ role: validatedRole })
            .eq('id', existingRole.id);
            
          if (updateError) console.error('Error updating user role:', updateError);
        } else {
          // Create new role
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert({ user_id: userId, role: validatedRole });
            
          if (insertError) console.error('Error creating user role:', insertError);
        }
      }
      
      return data as Profile;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  },
  
  // Delete user
  deleteUser: async (userId: string): Promise<boolean> => {
    try {
      // This will cascade delete the profile due to RLS
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  },

  // New method: Update user profile (wrapper for updateUser)
  updateUserProfile: async (userId: string, data: { nome: string }): Promise<Profile | null> => {
    return userService.updateUser(userId, data);
  },
  
  // New method: Update user role
  updateUserRole: async (userId: string, role: string | string[]): Promise<Profile | null> => {
    return userService.updateUser(userId, { role });
  }
};
