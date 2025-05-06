
import { supabase } from '@/integrations/supabase/client';

// Tipos auxiliares para evitar a inferência profunda de tipos
type AuthResponse = {
  data: any;
  error: Error | null;
}

type EmailConfirmationResponse = {
  confirmed: boolean;
  error: Error | null;
}

export const basicAuthService = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  signUp: async (email: string, password: string, nome: string) => {
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome,
          },
        },
      });
      return response;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      return await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },
  
  verifyEmail: async (token: string) => {
    try {
      return await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      });
    } catch (error) {
      console.error('Error verifying email:', error);
      throw error;
    }
  },

  checkEmailConfirmationStatus: async (email: string): Promise<EmailConfirmationResponse> => {
    try {
      // Buscamos primeiro o perfil do usuário
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
      
      if (profileError) {
        console.error('Error finding user profile:', profileError);
        return { confirmed: false, error: profileError };
      }
      
      if (userProfile) {
        try {
          // Usamos tipagem explícita para evitar inferência profunda
          const response = await supabase.auth.admin.getUserById(userProfile.id);
          
          // Extraímos os dados necessários de forma segura
          const userData = response.data?.user;
          const userError = response.error;
          
          if (userError) {
            console.error('Error checking email confirmation via admin API:', userError);
            return { confirmed: false, error: userError };
          }
          
          // Verificamos se o email foi confirmado
          const isConfirmed = userData?.email_confirmed_at !== null;
          return { confirmed: Boolean(isConfirmed), error: null };
        } catch (adminError) {
          console.log('Error checking email confirmation via admin API:', adminError);
          // Fallback para não confirmado se não conseguirmos verificar
          return { confirmed: false, error: adminError as Error };
        }
      }
      
      return { confirmed: false, error: null };
    } catch (error) {
      console.error('Error checking email confirmation:', error);
      return { confirmed: false, error: error as Error };
    }
  }
};
