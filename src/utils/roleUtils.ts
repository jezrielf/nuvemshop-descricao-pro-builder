/**
 * Convert role property (string or string[]) to array of strings
 */
export const getRoles = (role: string | string[] | null): string[] => {
  // If no role is provided, default to 'user'
  if (!role) return ['user'];
  
  // If role is already an array, return it
  if (Array.isArray(role)) {
    return role.length > 0 ? role : ['user'];
  }
  
  // If role is a comma-separated string, split it
  if (typeof role === 'string' && role.includes(',')) {
    return role.split(',').map(r => r.trim());
  }
  
  // Otherwise, return as single-item array
  return [role];
};

/**
 * Check if a user has a specific role
 */
export const hasRole = (userRole: string | string[] | null, roleToCheck: string): boolean => {
  const roles = getRoles(userRole);
  return roles.includes(roleToCheck);
};
