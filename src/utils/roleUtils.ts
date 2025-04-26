
/**
 * Utility function to convert various role formats to a unified array format
 * Uses memoization to avoid repeated calculations
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
 * Optimized to handle common cases quickly
 */
export const hasRole = (userRole: string | string[] | null, roleToCheck: string): boolean => {
  // Early return for direct match in string format
  if (userRole === roleToCheck) return true;
  
  const roles = getRoles(userRole);
  return roles.includes(roleToCheck);
};

/**
 * Checks if user has admin role
 */
export const isAdmin = (role: string | string[] | null): boolean => {
  return hasRole(role, 'admin');
};

/**
 * Checks if user has premium role
 */
export const isPremium = (role: string | string[] | null): boolean => {
  // Early return for direct match to avoid array processing
  if (role === 'admin' || role === 'premium') return true;
  
  return hasRole(role, 'premium') || isAdmin(role);
};

/**
 * Checks if user has business role
 */
export const isBusiness = (role: string | string[] | null): boolean => {
  // Early return for common direct matches
  if (role === 'admin' || role === 'premium' || role === 'business') return true;
  
  return hasRole(role, 'business') || isPremium(role) || isAdmin(role);
};
