
import { supabase } from '@/integrations/supabase/client';

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
      // Don't use emailRedirectTo here as we'll handle custom email confirmation
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

  checkEmailConfirmationStatus: async (email: string) => {
    try {
      // Using a simplified approach to avoid complex type inference
      const { data: userResponse, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
      
      if (userError) {
        console.error('Error finding user profile:', userError);
        return { confirmed: false, error: userError };
      }
      
      if (userResponse) {
        // If we found a user profile, try to check if they have confirmed their email
        try {
          // Use a direct query with simpler return type to avoid complex type inference
          const { data: userData, error: userDataError } = await supabase.auth.admin.getUserById(userResponse.id);
          
          if (userDataError) {
            console.error('Error checking email confirmation via admin API:', userDataError);
            return { confirmed: false, error: userDataError };
          }
          
          // Check if email is confirmed
          const isConfirmed = userData?.user?.email_confirmed_at !== null;
          return { confirmed: isConfirmed, error: null };
        } catch (adminError) {
          console.log('Error checking email confirmation via admin API:', adminError);
          // Fallback to assuming unconfirmed if we can't verify
          return { confirmed: false, error: adminError };
        }
      }
      
      return { confirmed: false, error: null };
    } catch (error) {
      console.error('Error checking email confirmation:', error);
      return { confirmed: false, error };
    }
  }
};
