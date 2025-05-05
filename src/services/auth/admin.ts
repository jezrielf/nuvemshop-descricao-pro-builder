
import { supabase } from '@/integrations/supabase/client';

export const adminAuthService = {
  // Method for admin to create users - using functions.invoke to use service role
  createUser: async (email: string, password: string, userData: any) => {
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
    } catch (error: any) {
      console.error('Error in adminCreateUser:', error);
      return { data: null, error };
    }
  },
  
  // Method to update user role
  updateUserRole: async (userId: string, role: string | string[]) => {
    try {
      console.log('Calling admin-update-role function for user:', userId, 'with role:', role);
      
      // Use Edge Function without verifying JWT since the function now handles authorization
      const { data, error } = await supabase.functions.invoke('admin-update-role', {
        body: { 
          userId,
          role
        }
      });
      
      if (error) {
        console.error('Error returned from updateUserRole function:', error);
        throw error;
      }
      
      console.log('Role updated successfully for user:', userId);
      console.log('Response data:', data);
      return { data, error: null };
    } catch (error: any) {
      console.error('Error in updateUserRole:', error);
      return { data: null, error };
    }
  },
};
