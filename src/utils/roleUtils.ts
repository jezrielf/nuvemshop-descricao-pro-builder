
export const isPremium = (role?: string | string[]): boolean => {
  if (!role) return false;
  
  const roles = getRoles(role);
  return roles.includes('premium') || roles.includes('business') || roles.includes('admin');
};

export const isBusiness = (role?: string | string[]): boolean => {
  if (!role) return false;
  
  const roles = getRoles(role);
  return roles.includes('business') || roles.includes('admin');
};

export const isAdmin = (role?: string | string[]): boolean => {
  if (!role) return false;
  
  const roles = getRoles(role);
  return roles.includes('admin');
};

// Add the getRoles function to extract roles from a role string
export const getRoles = (role?: string | string[]): string[] => {
  if (!role) return ['user'];
  
  // If it's already an array, return it
  if (Array.isArray(role)) return role;
  
  // If it's a string with comma-separated values, split it
  if (role.includes(',')) {
    return role.split(',').map(r => r.trim());
  }
  
  // Otherwise, just return it as a single-element array
  return [role];
};

// Add hasRole function to check if user has a specific role
export const hasRole = (userRole: string | string[] | undefined, requiredRole: string): boolean => {
  const roles = getRoles(userRole);
  return roles.includes(requiredRole);
};
