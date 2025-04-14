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
  
  console.log('Getting roles from:', role);
  
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
  const roles = getRoles(role);
  console.log(`Checking if user has role ${roleToCheck}:`, roles.includes(roleToCheck));
  return roles.includes(roleToCheck);
};

/**
 * Check if a user has admin role
 * @param role string or string[] representing user roles
 * @returns boolean indicating if the user is an admin
 */
export const isAdmin = (role: string | string[] | null): boolean => {
  const isUserAdmin = hasRole(role, 'admin');
  console.log('isAdmin check in roleUtils:', isUserAdmin, 'role:', role);
  return isUserAdmin;
};

/**
 * Check if a user has premium role
 * @param role string or string[] representing user roles
 * @returns boolean indicating if the user is premium
 */
export const isPremium = (role: string | string[] | null): boolean => {
  return hasRole(role, 'premium') || isAdmin(role); // Admin also has premium privileges
};

/**
 * Check if a user has business role
 * @param role string or string[] representing user roles
 * @returns boolean indicating if the user is business
 */
export const isBusiness = (role: string | string[] | null): boolean => {
  return hasRole(role, 'business');
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
  return ['user', 'premium', 'admin'];
};
