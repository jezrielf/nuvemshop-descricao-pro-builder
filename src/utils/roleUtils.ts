
export const isPremium = (role?: string): boolean => {
  if (!role) return false;
  return role === 'premium' || role === 'business' || role === 'admin';
};

export const isBusiness = (role?: string): boolean => {
  if (!role) return false;
  return role === 'business' || role === 'admin';
};

export const isAdmin = (role?: string): boolean => {
  if (!role) return false;
  return role === 'admin';
};
