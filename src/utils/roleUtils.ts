
// If this file doesn't exist, we'll create it with the necessary functions

export const getRoles = (roleData: string | string[]): string[] => {
  if (Array.isArray(roleData)) {
    return roleData;
  } else if (typeof roleData === 'string') {
    return roleData.split(',').map(r => r.trim());
  }
  return [];
};

export const hasRole = (userRole: string | string[], requiredRole: string): boolean => {
  const roles = getRoles(userRole);
  return roles.includes(requiredRole) || roles.includes('admin');
};

export const isPremium = (role: string | string[]): boolean => {
  const roles = getRoles(role);
  return roles.includes('premium') || roles.includes('business') || roles.includes('admin');
};

export const isBusiness = (role: string | string[]): boolean => {
  const roles = getRoles(role);
  return roles.includes('business') || roles.includes('admin');
};

export const isAdmin = (role: string | string[]): boolean => {
  const roles = getRoles(role);
  return roles.includes('admin');
};
