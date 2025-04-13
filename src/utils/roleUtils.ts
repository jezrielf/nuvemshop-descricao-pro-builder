
/**
 * Utility functions for handling user roles
 */

/**
 * Get user roles as an array
 * @param role string or string[] representing user roles
 * @returns array of roles
 */
export const getRoles = (role: string | string[] | null): string[] => {
  if (!role) return ['user'];
  return Array.isArray(role) ? role : [role];
};

/**
 * Check if a user has a specific role
 * @param role string or string[] representing user roles
 * @param roleToCheck the role to check for
 * @returns boolean indicating if the user has the role
 */
export const hasRole = (role: string | string[] | null, roleToCheck: string): boolean => {
  const roles = getRoles(role);
  return roles.includes(roleToCheck);
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
