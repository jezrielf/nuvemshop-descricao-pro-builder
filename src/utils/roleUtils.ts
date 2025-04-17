/**
 * Utility functions for handling user roles
 */

/**
 * Get user roles as an array from either the profiles table or user_roles table
 * @param role string or string[] representing user roles from profiles table
 * @returns array of roles
 */
export const getRoles = (role: string | string[] | null): string[] => {
  if (!role) return ['user'];
  
  // If it's already an array, return it directly
  if (Array.isArray(role)) {
    return role;
  }
  
  // If it's a comma-separated string, split it
  if (role?.includes(',')) {
    return role.split(',').map(r => r.trim());
  }
  
  // If it's a single string value
  return [role];
};

/**
 * Check if a user has a specific role
 * @param role string or string[] representing user roles
 * @param roleToCheck the role to check for
 * @returns boolean indicating if the user has the role
 */
export const hasRole = (role: string | string[] | null, roleToCheck: string): boolean => {
  // Fast path: if role is null and checking for 'user'
  if (!role && roleToCheck === 'user') return true;
  
  // Fast path: if role is the exact string we're checking
  if (typeof role === 'string' && role === roleToCheck) return true;
  
  // If it's a comma-separated string
  if (typeof role === 'string' && role.includes(',')) {
    const roles = role.split(',').map(r => r.trim());
    return roles.includes(roleToCheck);
  }
  
  // Otherwise, get the full roles array and check
  const roles = getRoles(role);
  return roles.includes(roleToCheck);
};

/**
 * Check if a user has admin role
 * @param role string or string[] representing user roles
 * @returns boolean indicating if the user is an admin
 */
export const isAdmin = (role: string | string[] | null): boolean => {
  // Fast path check for exact match
  if (typeof role === 'string' && role === 'admin') return true;
  
  // Check for comma-separated roles containing admin
  if (typeof role === 'string' && role.includes(',')) {
    return role.split(',').map(r => r.trim()).includes('admin');
  }
  
  return hasRole(role, 'admin');
};

/**
 * Check if a user has premium role
 * @param role string or string[] representing user roles
 * @returns boolean indicating if the user is premium
 */
export const isPremium = (role: string | string[] | null): boolean => {
  // Fast path: direct match for premium
  if (typeof role === 'string' && role === 'premium') return true;
  
  // Fast path: admin is always premium
  if (typeof role === 'string' && role === 'admin') return true;
  
  // Check for comma-separated roles
  if (typeof role === 'string' && role.includes(',')) {
    const roles = role.split(',').map(r => r.trim());
    return roles.includes('premium') || roles.includes('admin');
  }
  
  // Otherwise, check more thoroughly
  return hasRole(role, 'premium') || isAdmin(role);
};

/**
 * Check if a user has business role
 * @param role string or string[] representing user roles
 * @returns boolean indicating if the user is business
 */
export const isBusiness = (role: string | string[] | null): boolean => {
  // Fast path: direct match for business
  if (typeof role === 'string' && role === 'business') return true;
  
  // Fast path: premium users should also have business privileges
  if (typeof role === 'string' && (role === 'premium' || role === 'admin')) return true;
  
  // Check for comma-separated roles
  if (typeof role === 'string' && role.includes(',')) {
    const roles = role.split(',').map(r => r.trim());
    return roles.includes('business') || roles.includes('premium') || roles.includes('admin');
  }
  
  // Otherwise, check more thoroughly
  return hasRole(role, 'business') || isPremium(role);
};

/**
 * Add a role to a user's roles
 * @param currentRoles string or string[] representing current user roles
 * @param roleToAdd the role to add
 * @returns updated roles array
 */
export const addRole = (currentRoles: string | string[] | null, roleToAdd: string): string[] => {
  const roles = getRoles(currentRoles);
  if (!roles.includes(roleToAdd)) {
    roles.push(roleToAdd);
  }
  return roles;
};

/**
 * Remove a role from a user's roles
 * @param currentRoles string or string[] representing current user roles
 * @param roleToRemove the role to remove
 * @returns updated roles array
 */
export const removeRole = (currentRoles: string | string[] | null, roleToRemove: string): string[] => {
  const roles = getRoles(currentRoles);
  return roles.filter(r => r !== roleToRemove);
};

/**
 * Get available system roles
 * @returns array of available system roles
 */
export const getAvailableRoles = (): string[] => {
  return ['user', 'premium', 'business', 'admin'];
};
