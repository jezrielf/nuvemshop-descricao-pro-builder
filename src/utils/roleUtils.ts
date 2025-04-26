
/**
 * Checks if a role or array of roles includes 'premium'
 */
export const isPremium = (role: string | string[]): boolean => {
  if (Array.isArray(role)) {
    return role.includes('premium') || role.includes('business') || role.includes('admin');
  }
  return role === 'premium' || role === 'business' || role === 'admin';
};

/**
 * Checks if a role or array of roles includes 'business'
 */
export const isBusiness = (role: string | string[]): boolean => {
  if (Array.isArray(role)) {
    return role.includes('business') || role.includes('admin');
  }
  return role === 'business' || role === 'admin';
};

/**
 * Checks if a role or array of roles includes 'admin'
 */
export const isAdmin = (role: string | string[]): boolean => {
  if (Array.isArray(role)) {
    return role.includes('admin');
  }
  return role === 'admin';
};

/**
 * Checks if a role or array of roles includes a specific role
 */
export const hasRole = (role: string | string[], requiredRole: string): boolean => {
  if (Array.isArray(role)) {
    return role.includes(requiredRole);
  }
  return role === requiredRole;
};
