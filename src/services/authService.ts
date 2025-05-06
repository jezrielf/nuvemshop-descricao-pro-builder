
import { supabase } from '@/integrations/supabase/client';

export const authService = {
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  signUp: async (email: string, password: string, nome: string) => {
    // First register the user with Supabase without sending the default email
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome,
        },
        emailRedirectTo: `${window.location.origin}/confirmar-email`,
      },
    });

    if (error || !data.user) {
      console.error('Error during signup:', error);
      return { data, error };
    }

    // Now send our custom email
    try {
      const confirmToken = data.user.confirmation_token;
      if (confirmToken) {
        await authService.sendCustomConfirmationEmail(email, confirmToken, nome);
      } else {
        console.warn('No confirmation token available for custom email');
      }
    } catch (emailError) {
      console.error('Error sending custom email:', emailError);
      // We don't return an error here as the user is already created
    }

    return { data, error };
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
    } catch (error) {
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
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      return { data: null, error };
    }
  },

  // Method to send a custom email confirmation in Portuguese
  sendCustomConfirmationEmail: async (email: string, confirmationToken: string, firstName: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-email-confirmation', {
        body: {
          email,
          confirmationToken,
          firstName,
          redirectUrl: `${window.location.origin}/confirmar-email`,
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
  }
};
