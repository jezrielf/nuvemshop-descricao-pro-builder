import { supabase } from '@/integrations/supabase/client';

export const authService = {
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  signUp: async (email: string, password: string, nome: string) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome,
        },
        emailRedirectTo: `${window.location.origin}/confirmar-email`,
      },
    });
  },

  signOut: async () => {
    return await supabase.auth.signOut();
  },
  
  verifyEmail: async (token: string) => {
    return await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    });
  },
  
  // Updated method for admin to create users - using functions.invoke to use service role
  adminCreateUser: async (email: string, password: string, userData: any) => {
    try {
      console.log('Calling admin-create-user function with:', { email, userData });
      
      // Use Edge Function without verifying JWT since the function now handles authorization
      const { data, error } = await supabase.functions.invoke('admin-create-user', {
        body: {
          email,
          password,
          userData
        }
      });
      
      if (error) {
        console.error('Error returned from adminCreateUser function:', error);
        return { data: null, error };
      }
      
      if (!data?.user) {
        console.error('No user returned from adminCreateUser function');
        return { 
          data: null, 
          error: new Error('User creation failed. No user returned.') 
        };
      }
      
      console.log('User created successfully, function returned:', data);
      return { data, error: null };
    } catch (error: any) {
      console.error('Error in adminCreateUser:', error);
      return { data: null, error };
    }
  },
  
  // Add a method to update user role
  updateUserRole: async (userId: string, role: string | string[]) => {
    try {
      console.log('Calling admin-update-role function for user:', userId, 'with role:', role);
      
      // Use Edge Function without verifying JWT since the function now handles authorization
      const { data, error } = await supabase.functions.invoke('admin-update-role', {
        body: { 
          userId,
          role
        }
      });
      
      if (error) {
        console.error('Error returned from updateUserRole function:', error);
        throw error;
      }
      
      console.log('Role updated successfully for user:', userId);
      console.log('Response data:', data);
      return { data, error: null };
    } catch (error: any) {
      console.error('Error in updateUserRole:', error);
      return { data: null, error };
    }
  },

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
  
  // Fixed method to resend confirmation email
  resendConfirmationEmail: async (email: string) => {
    try {
      // Generate OTP for email verification
      const { data: otpData, error: otpError } = await supabase.auth.resend({
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
      
      // Fixed null check issue with optional chaining and fallback
      const confirmationToken = otpData?.user?.email_confirm_token || '';
      
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
      console.error('Error resending confirmation email:', error);
      return { data: null, error };
    }
  },
  
  // New method to request password reset
  requestPasswordReset: async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetar-senha`,
      });
      
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
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-email-confirmation', {
        body: {
          email,
          confirmationToken: 'custom-flow', // The token is handled by Supabase, we just indicate this is a different type
          firstName,
          redirectUrl: `${window.location.origin}/resetar-senha`,
          type: 'reset_password',
        },
      });
      
      if (emailError) {
        console.warn('Failed to send custom password reset email, falling back to default Supabase email');
      }
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Error requesting password reset:', error);
      return { data: null, error };
    }
  },
  
  // New method to update password with token
  updatePasswordWithToken: async (password: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });
      
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
