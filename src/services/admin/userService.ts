
import { supabase } from '@/integrations/supabase/client';

// Define valid roles for typing
type UserRole = 'user' | 'premium' | 'admin';

// Get all users
const getUsers = async () => {
  try {
    // Get profiles with user details
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('criado_em', { ascending: false });
      
    if (error) throw error;
    
    return profiles || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Get a user by ID
const getUserById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return null;
  }
};

// Create a new user (admin only)
const createUser = async (email: string, password: string, userData: any) => {
  try {
    // Create a new user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        nome: userData.nome
      }
    });

    if (authError) throw authError;
    
    // Update the user role if specified
    if (userData.role && userData.role !== 'user') {
      // Make sure role is a valid role type
      const role = validateRole(userData.role);
      
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: role
        });
        
      if (roleError) throw roleError;
    }
    
    return authData.user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update user profile
const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        nome: profileData.nome,
        atualizado_em: new Date().toISOString()
      })
      .eq('id', userId)
      .select();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Error updating user profile ${userId}:`, error);
    throw error;
  }
};

// Helper to validate role string to enum type
const validateRole = (role: string): UserRole => {
  if (role === 'user' || role === 'premium' || role === 'admin') {
    return role as UserRole;
  }
  return 'user'; // Default to user if invalid role
};

// Update user role
const updateUserRole = async (userId: string, role: string | string[]) => {
  try {
    // Delete existing roles
    const { error: deleteError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId);
      
    if (deleteError) throw deleteError;
    
    // Add new roles
    const roles = Array.isArray(role) ? role : [role];
    
    // Insert role data one by one to avoid array insertion issues
    for (const r of roles) {
      const validRole = validateRole(r);
      
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: validRole
        });
        
      if (error) throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error updating user role ${userId}:`, error);
    throw error;
  }
};

// Delete user
const deleteUser = async (userId: string) => {
  try {
    // Delete user authentication
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);
    
    if (authError) throw authError;
    
    // Profile should be automatically deleted by trigger
    return true;
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    throw error;
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
