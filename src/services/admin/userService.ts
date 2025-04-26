
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';

// Add the convertToProfile function here instead of importing it
export const convertToProfile = (userData: any): Profile => {
  return {
    id: userData.id || '',
    email: userData.email || '',
    name: userData.nome || userData.name || '',
    role: userData.role || 'user',
    avatarUrl: userData.avatar_url || userData.avatarUrl || null,
    app_metadata: userData.app_metadata || {},
    user_metadata: userData.user_metadata || {},
    aud: userData.aud || '',
    created_at: userData.criado_em || userData.created_at || new Date().toISOString()
  };
};

export const getUserList = async (): Promise<Profile[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
      
    if (error) {
      throw new Error(error.message);
    }
    
    return data.map(user => convertToProfile(user));
  } catch (err) {
    console.error('Error fetching user list:', err);
    return [];
  }
};

// Export the service object
export const userService = {
  getUserList,
  convertToProfile
};
