
import { supabase } from '@/integrations/supabase/client';

export const passwordAuthService = {
  // Method to request password reset
  requestPasswordReset: async (email: string) => {
    try {
      // Use a simple type approach - avoid deep type inference completely
      const result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetar-senha`,
      });
      
      // Extract with simple variables
      const data = result.data;
      const error = result.error;
      
      if (error) {
        throw error;
      }
      
      // Try to get user profile to get their name
      let firstName = '';
      try {
        const { data: userData } = await supabase
          .from('profiles')
          .select('nome')
          .eq('email', email)
          .single();
          
        if (userData?.nome) {
          firstName = userData.nome.split(' ')[0];
        }
      } catch (e) {
        console.log('Could not find user profile, continuing without name');
      }
      
      // Send custom password reset email
      const emailResult = await supabase.functions.invoke('send-email-confirmation', {
        body: {
          email,
          confirmationToken: 'custom-flow', // The token is handled by Supabase, we just indicate this is a different type
          firstName,
          redirectUrl: `${window.location.origin}/resetar-senha`,
          type: 'reset_password',
        },
      });
      
      const emailData = emailResult.data;
      const emailError = emailResult.error;
      
      if (emailError) {
        console.warn('Failed to send custom password reset email, falling back to default Supabase email');
      }
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Error requesting password reset:', error);
      return { data: null, error };
    }
  },
  
  // Method to update password with token
  updatePasswordWithToken: async (password: string) => {
    try {
      // Use a simple type approach - avoid deep type inference completely
      const result = await supabase.auth.updateUser({
        password,
      });
      
      // Extract with simple variables
      const data = result.data;
      const error = result.error;
      
      if (error) {
        throw error;
      }
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating password:', error);
      return { data: null, error };
    }
  }
};
