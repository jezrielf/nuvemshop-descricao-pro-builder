
import { supabase } from '@/integrations/supabase/client';

export const passwordAuthService = {
  // Method to request password reset
  requestPasswordReset: async (email: string) => {
    try {
      // Call the reset password method
      const resetResponse = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetar-senha`,
      });
      
      // Simple error handling
      if (resetResponse.error) {
        throw resetResponse.error;
      }
      
      // Try to get user profile to get their name
      let firstName = '';
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('nome')
          .eq('email', email)
          .single();
          
        if (!profileError && profileData?.nome) {
          firstName = profileData.nome.split(' ')[0];
        }
      } catch (e) {
        console.log('Could not find user profile, continuing without name');
      }
      
      // Send custom password reset email
      try {
        const emailResult = await supabase.functions.invoke('send-email-confirmation', {
          body: {
            email,
            firstName,
            redirectUrl: `${window.location.origin}/resetar-senha`,
            type: 'reset_password',
          },
        });
        
        if (emailResult.error) {
          console.warn('Failed to send custom password reset email, falling back to default Supabase email');
        }
      } catch (emailError) {
        console.warn('Error sending custom email:', emailError);
      }
      
      return { data: resetResponse.data, error: null };
    } catch (error) {
      console.error('Error requesting password reset:', error);
      return { data: null, error };
    }
  },
  
  // Method to update password with token
  updatePasswordWithToken: async (password: string) => {
    try {
      // Update user password
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
