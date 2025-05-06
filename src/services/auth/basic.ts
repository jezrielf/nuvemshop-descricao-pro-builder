
import { supabase } from '@/integrations/supabase/client';

// Simple response types to avoid excessive type inference
interface AuthResponse {
  data: any;
  error: Error | null;
}

interface EmailConfirmationResponse {
  confirmed: boolean;
  error: Error | null;
}

export const basicAuthService = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  signUp: async (email: string, password: string, nome: string) => {
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome,
          },
        },
      });
      return response;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      return await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },
  
  verifyEmail: async (token: string) => {
    try {
      return await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      });
    } catch (error) {
      console.error('Error verifying email:', error);
      throw error;
    }
  },

  checkEmailConfirmationStatus: async (email: string): Promise<EmailConfirmationResponse> => {
    try {
      // First get the user profile
      const profileQuery = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
      
      // Handle profile query error
      if (profileQuery.error) {
        console.error('Error finding user profile:', profileQuery.error);
        return { confirmed: false, error: profileQuery.error };
      }
      
      // If we found the user profile
      if (profileQuery.data) {
        try {
          // Get user data from admin API
          // Use any types to avoid deep type inference issues
          const userQuery: any = await supabase.auth.admin.getUserById(profileQuery.data.id);
          
          if (userQuery.error) {
            console.error('Error checking email confirmation:', userQuery.error);
            return { confirmed: false, error: userQuery.error };
          }
          
          // Check if email is confirmed
          const isEmailConfirmed = userQuery.data?.user?.email_confirmed_at !== null;
          return { confirmed: Boolean(isEmailConfirmed), error: null };
        } catch (error: any) {
          console.log('Error in admin API call:', error);
          return { confirmed: false, error };
        }
      }
      
      // User not found
      return { confirmed: false, error: null };
    } catch (error: any) {
      console.error('Error checking email confirmation:', error);
      return { confirmed: false, error };
    }
  }
};
