
import { v4 as uuidv4 } from 'uuid';

// Types for users
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

// Get all users
const getUsers = async (): Promise<User[]> => {
  try {
    // In a real app, this would be fetched from an API or database
    // Return mock data for now
    return [
      {
        id: uuidv4(),
        email: "demo@example.com",
        name: "Demo User",
        role: "user",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
      },
      {
        id: uuidv4(),
        email: "admin@example.com",
        name: "Admin User",
        role: "admin",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
      }
    ];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Create a new user
const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  try {
    const newUser = {
      ...userData,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    
    // In a real app, save to database
    console.log('Creating user:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update a user's profile
const updateUserProfile = async (id: string, userData: Partial<User>): Promise<User> => {
  try {
    // In a real app, update in database
    console.log('Updating user profile:', id, userData);
    
    // Mock response for now
    return {
      id,
      email: userData.email || "user@example.com",
      name: userData.name || "Updated User",
      role: userData.role || "user",
      createdAt: new Date().toISOString(),
      lastLogin: userData.lastLogin,
      isActive: userData.isActive !== undefined ? userData.isActive : true
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Update a user's role
const updateUserRole = async (id: string, role: string): Promise<User> => {
  try {
    // In a real app, update in database
    console.log('Updating user role:', id, role);
    
    // Mock response for now
    return {
      id,
      email: "user@example.com",
      name: "User",
      role,
      createdAt: new Date().toISOString(),
      isActive: true
    };
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

// Delete a user
const deleteUser = async (id: string): Promise<boolean> => {
  try {
    // In a real app, delete from database
    console.log('Deleting user:', id);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const userService = {
  getUsers,
  createUser,
  updateUserProfile,
  updateUserRole,
  deleteUser,
};
