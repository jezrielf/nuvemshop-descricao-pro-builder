
import { Profile } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';

// Get all users
const getUsers = async (): Promise<Profile[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return data as Profile[];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Get a user by ID
const getUserById = async (id: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return data as Profile;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return null;
  }
};

// Create a new user
const createUser = async (user: Omit<Profile, 'id'>): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([user])
      .select();
      
    if (error) throw error;
    
    return data[0] as Profile;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

// Update a user's profile
const updateUserProfile = async (id: string, profile: Partial<Profile>): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    return data[0] as Profile;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    return null;
  }
};

// Update a user's role
const updateUserRole = async (id: string, role: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error(`Error updating role for user ${id}:`, error);
    return false;
  }
};

// Delete a user
const deleteUser = async (id: string): Promise<boolean> => {
  try {
    // First delete from Supabase Auth (will cascade to profile due to RLS)
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    if (authError) throw authError;
    
    return true;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    
    // Try direct profile deletion as fallback
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return true;
    } catch (fallbackError) {
      console.error(`Fallback deletion failed for user ${id}:`, fallbackError);
      return false;
    }
  }
};

export const userService = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserRole,
  deleteUser
};
