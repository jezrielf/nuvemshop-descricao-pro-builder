
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { convertToProfile } from '@/utils/typeConversion';

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
