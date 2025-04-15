
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
      console.log('Calling admin-create-user function with:', { email, userData });
      
      // Use Edge Function without verifying JWT since the function now handles authorization
      const { data, error } = await supabase.functions.invoke('admin-create-user', {
        body: {
          email,
          password,
          userData
        }
      });
      
      if (error) {
        console.error('Error returned from adminCreateUser function:', error);
        return { data: null, error };
      }
      
      if (!data?.user) {
        console.error('No user returned from adminCreateUser function');
        return { 
          data: null, 
          error: new Error('User creation failed. No user returned.') 
        };
      }
      
      console.log('User created successfully, function returned:', data);
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
      
      console.log('Calling admin-update-role function for user:', userId);
      
      // Use Edge Function without verifying JWT since the function now handles authorization
      const { data, error } = await supabase.functions.invoke('admin-update-role', {
        body: { 
          userId,
          role: roleValue
        }
      });
      
      if (error) {
        console.error('Error returned from updateUserRole function:', error);
        throw error;
      }
      
      console.log('Role updated successfully for user:', userId);
      return { data, error: null };
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      return { data: null, error };
    }
  }
};
