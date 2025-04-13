
import { Profile } from '@/types/auth';

/**
 * Checks if a profile has a specific role
 */
export const hasRole = (profile: Profile | null, role: string): boolean => {
  if (!profile) return false;
  
  // If the role is stored as an array, check if it includes the role
  if (Array.isArray(profile.role)) {
    return profile.role.includes(role);
  }
  
  // Backward compatibility for profiles with a single role string
  return profile.role === role;
};

/**
 * Checks if a profile has admin role
 */
export const isAdmin = (profile: Profile | null): boolean => {
  return hasRole(profile, 'admin');
};

/**
 * Checks if a profile has premium role
 * Admins are automatically considered premium
 */
export const isPremium = (profile: Profile | null): boolean => {
  if (isAdmin(profile)) return true; // Admins are always premium
  return hasRole(profile, 'premium');
};

/**
 * Get an array of roles from a profile
 */
export const getRoles = (profile: Profile | null): string[] => {
  if (!profile) return [];
  
  // If the role is already an array, return it
  if (Array.isArray(profile.role)) {
    return profile.role;
  }
  
  // If the role is a string, convert it to an array
  if (profile.role) {
    return [profile.role];
  }
  
  // If no role is defined, return an empty array
  return [];
};

/**
 * Add a role to a profile's roles
 */
export const addRole = (profile: Profile, role: string): string[] => {
  const currentRoles = getRoles(profile);
  
  // Only add the role if it's not already in the array
  if (!currentRoles.includes(role)) {
    return [...currentRoles, role];
  }
  
  return currentRoles;
};

/**
 * Remove a role from a profile's roles
 */
export const removeRole = (profile: Profile, role: string): string[] => {
  const currentRoles = getRoles(profile);
  return currentRoles.filter(r => r !== role);
};
