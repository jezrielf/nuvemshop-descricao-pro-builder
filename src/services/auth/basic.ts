
import { supabase } from '@/integrations/supabase/client';

export const basicAuthService = {
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
};
