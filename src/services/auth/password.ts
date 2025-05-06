
import { supabase } from '@/integrations/supabase/client';

export const passwordAuthService = {
  // Method to request password reset
  requestPasswordReset: async (email: string) => {
    try {
      // Simplified approach to avoid deep type inference issues
      const resetResult = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetar-senha`,
      });
      
      // Simple error handling
      if (resetResult.error) {
        throw resetResult.error;
      }
      
      // Try to get user profile to get their name
      let firstName = '';
      try {
        const profileResult = await supabase
          .from('profiles')
          .select('nome')
          .eq('email', email)
          .single();
          
        if (profileResult.data?.nome) {
          firstName = profileResult.data.nome.split(' ')[0];
        }
      } catch (e) {
        console.log('Could not find user profile, continuing without name');
      }
      
      // Send custom password reset email
      const emailResult = await supabase.functions.invoke('send-email-confirmation', {
        body: {
          email,
          firstName,
          redirectUrl: `${window.location.origin}/resetar-senha`,
          type: 'reset_password',
        },
      });
      
      // Simple error handling
      if (emailResult.error) {
        console.warn('Failed to send custom password reset email, falling back to default Supabase email');
      }
      
      return { data: resetResult.data, error: null };
    } catch (error) {
      console.error('Error requesting password reset:', error);
      return { data: null, error };
    }
  },
  
  // Method to update password with token
  updatePasswordWithToken: async (password: string) => {
    try {
      // Simplified approach to avoid deep type inference
      const updateResult = await supabase.auth.updateUser({
        password,
      });
      
      // Simple error handling
      if (updateResult.error) {
        throw updateResult.error;
      }
      
      return { data: updateResult.data, error: null };
    } catch (error) {
      console.error('Error updating password:', error);
      return { data: null, error };
    }
  }
};
