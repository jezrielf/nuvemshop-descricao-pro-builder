
/**
 * Utility function to convert various role formats to a unified array format
 */
export const getRoles = (role: string | string[] | null): string[] => {
  if (!role) return ['user'];
  
  if (typeof role === 'string') {
    if (role.includes(',')) {
      return role.split(',').map(r => r.trim()).filter(Boolean);
    }
    return [role];
  }
  
  return role;
};

/**
 * Converts role(s) to string format for database operations
 */
export const rolesToString = (role: string | string[] | null): string => {
  const roles = getRoles(role);
  return roles.join(',');
};

/**
 * Checks if user has a specific role
 */
export const hasRole = (userRole: string | string[] | null, roleToCheck: string): boolean => {
  const roles = getRoles(userRole);
  return roles.includes(roleToCheck);
};
