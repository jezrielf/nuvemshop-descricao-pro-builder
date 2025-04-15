
import { supabase } from '@/integrations/supabase/client';

export const authService = {
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  signUp: async (email: string, password: string, nome: string) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome,
        },
      },
    });
  },

  signOut: async () => {
    return await supabase.auth.signOut();
  },
  
  // Updated method for admin to create users - using functions.invoke to use service role
  adminCreateUser: async (email: string, password: string, userData: any) => {
    try {
      // Use Edge Function with service role to create user
      const { data, error } = await supabase.functions.invoke('admin-create-user', {
        body: {
          email,
          password,
          userData
        }
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Error in adminCreateUser:', error);
      return { data: null, error };
    }
  },
  
  // Add a method to update user role
  updateUserRole: async (userId: string, role: string | string[]) => {
    try {
      // Convert role to array format for database storage
      const roleValue = Array.isArray(role) ? role : [role];
      
      // Use Edge Function with service role to update user role
      const { data, error } = await supabase.functions.invoke('admin-update-role', {
        body: { 
          userId,
          role: roleValue
        }
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      return { data: null, error };
    }
  }
};
