
import { supabase } from '@/integrations/supabase/client';

export const emailAuthService = {
  // Method to send a custom email confirmation
  sendCustomConfirmationEmail: async (email: string, confirmationToken: string, firstName: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-email-confirmation', {
        body: {
          email,
          confirmationToken,
          firstName,
          redirectUrl: `${window.location.origin}/confirmar-email`,
          type: 'confirmation',
        },
      });
      
      if (error) {
        throw error;
      }
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Error sending custom confirmation email:', error);
      return { data: null, error };
    }
  },
  
  // Method to resend confirmation email
  resendConfirmationEmail: async (email: string) => {
    try {
      // Generate OTP for email verification
      const { data, error: otpError } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (otpError) {
        throw otpError;
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
      
      // Safe access to potentially null user data
      const confirmationToken = data?.user?.email_confirm_token || '';
      
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-email-confirmation', {
        body: {
          email,
          confirmationToken,
          firstName,
          redirectUrl: `${window.location.origin}/confirmar-email`,
          type: 'confirmation',
        },
      });
      
      if (emailError) {
        throw emailError;
      }
      
      return { data: emailData, error: null };
    } catch (error: any) {
      console.error('Error resending confirmation email:', error);
      return { data: null, error };
    }
  },
};
