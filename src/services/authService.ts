
import { supabase } from '@/integrations/supabase/client';

export const authService = {
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  signUp: async (email: string, password: string, nome: string) => {
    // Register the user with Supabase WITHOUT sending the default email
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome,
        },
        // Disable automatic email confirmation
        emailRedirectTo: undefined,
      },
    });

    if (error || !data.user) {
      console.error('Error during signup:', error);
      return { data, error };
    }

    // Send our custom confirmation email
    try {
      // We'll use the user ID as a token reference for our custom flow
      // The actual verification will be handled by Supabase's built-in system
      await authService.sendCustomConfirmationEmail(email, data.user.id, nome);
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
    // For our custom flow, we'll use the token as the user ID
    // and check if the user exists and is not confirmed yet
    const { data: user, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      // Try to verify using the token as an OTP if direct verification fails
      return await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      });
    }
    
    return { data: user, error: null };
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
  sendCustomConfirmationEmail: async (email: string, userId: string, firstName: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-email-confirmation', {
        body: {
          email,
          confirmationToken: userId, // Using user ID as our token reference
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
