
import { supabase } from '@/integrations/supabase/client';

export const emailAuthService = {
  // Method to send a custom email confirmation
  sendCustomConfirmationEmail: async (email: string, firstName: string) => {
    try {
      // Call the edge function to send a custom email
      const response = await supabase.functions.invoke('send-email-confirmation', {
        body: {
          email,
          firstName,
          redirectUrl: `${window.location.origin}/confirmar-email`,
          type: 'confirmation',
        },
      });
      
      if (response.error) {
        throw response.error;
      }
      
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error sending custom confirmation email:', error);
      return { data: null, error };
    }
  },
  
  // Method to resend confirmation email
  resendConfirmationEmail: async (email: string) => {
    try {
      // First, generate OTP for email verification using Supabase
      const resendResponse = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      // Simple error handling
      if (resendResponse.error) {
        throw resendResponse.error;
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
      
      // Send the custom confirmation email
      try {
        const emailResult = await supabase.functions.invoke('send-email-confirmation', {
          body: {
            email,
            firstName,
            redirectUrl: `${window.location.origin}/confirmar-email`,
            type: 'confirmation',
          },
        });
        
        if (emailResult.error) {
          throw emailResult.error;
        }
        
        return { data: emailResult.data, error: null };
      } catch (emailError) {
        console.error('Error sending custom email:', emailError);
        // Fall back to the default email that was sent by the resend method
        return { data: resendResponse.data, error: null };
      }
    } catch (error) {
      console.error('Error resending confirmation email:', error);
      return { data: null, error };
    }
  },
};
