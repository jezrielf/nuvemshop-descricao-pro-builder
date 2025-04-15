
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
  
  // Add a new method for admin to create users
  adminCreateUser: async (email: string, password: string, userData: any) => {
    try {
      // Create user with the admin API (requires service role)
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto confirm email
        user_metadata: userData
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
      
      // Use explicit type casting to handle both string and string[] formats
      // This ensures compatibility with the database column type
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          role: roleValue as unknown as string, // Use double type assertion to bypass TypeScript check
          atualizado_em: new Date().toISOString() 
        })
        .eq('id', userId);
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      return { data: null, error };
    }
  }
};
