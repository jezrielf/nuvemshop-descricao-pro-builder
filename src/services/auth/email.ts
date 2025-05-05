
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
      const result = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (result.error) {
        throw result.error;
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
      
      // Extract confirmation token safely
      let confirmationToken = '';
      if (result.data && result.data.user) {
        // Type assertion for the user object
        const userObj = result.data.user as { [key: string]: unknown };
        if (typeof userObj.email_confirm_token === 'string') {
          confirmationToken = userObj.email_confirm_token;
        }
      }
      
      // Send the custom confirmation email
      const emailResponse = await supabase.functions.invoke('send-email-confirmation', {
        body: {
          email,
          confirmationToken,
          firstName,
          redirectUrl: `${window.location.origin}/confirmar-email`,
          type: 'confirmation',
        },
      });
      
      if (emailResponse.error) {
        throw emailResponse.error;
      }
      
      return { data: emailResponse.data, error: null };
    } catch (error: any) {
      console.error('Error resending confirmation email:', error);
      return { data: null, error };
    }
  },
};
