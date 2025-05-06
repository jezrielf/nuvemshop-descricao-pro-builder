
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
      // This is a simplified approach - we query the user's email status
      const { data, error } = await supabase.rpc('check_email_confirmed', { 
        email_address: email 
      });
      
      if (error) {
        console.error('Error checking email confirmation status:', error);
        return { confirmed: false, error };
      }
      
      return { confirmed: !!data, error: null };
    } catch (error) {
      console.error('Error checking email confirmation:', error);
      return { confirmed: false, error };
    }
  }
};
