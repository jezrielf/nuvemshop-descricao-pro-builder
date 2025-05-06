
import { supabase } from '@/integrations/supabase/client';

export const emailAuthService = {
  // Method to send a custom email confirmation
  sendCustomConfirmationEmail: async (email: string, firstName: string) => {
    try {
      // We're simplifying the approach to avoid deep type inference issues
      const { data, error } = await supabase.functions.invoke('send-email-confirmation', {
        body: {
          email,
          firstName,
          redirectUrl: `${window.location.origin}/confirmar-email`,
          type: 'confirmation',
        },
      });
      
      if (error) {
        throw error;
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Error sending custom confirmation email:', error);
      return { data: null, error };
    }
  },
  
  // Method to resend confirmation email
  resendConfirmationEmail: async (email: string) => {
    try {
      // First, generate OTP for email verification using Supabase
      const resendResult = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      // Avoid deep type inference by simplifying error handling
      if (resendResult.error) {
        throw resendResult.error;
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
      
      // Send the custom confirmation email
      const emailResult = await supabase.functions.invoke('send-email-confirmation', {
        body: {
          email,
          firstName,
          redirectUrl: `${window.location.origin}/confirmar-email`,
          type: 'confirmation',
        },
      });
      
      // Simple error handling to avoid deep type inference
      if (emailResult.error) {
        throw emailResult.error;
      }
      
      return { data: emailResult.data, error: null };
    } catch (error) {
      console.error('Error resending confirmation email:', error);
      return { data: null, error };
    }
  },
};
