
import { Profile } from '@/types/auth';

export const hasRole = (profile: Profile | null, role: string): boolean => {
  if (!profile) return false;
  return profile.role === role;
};

export const isAdmin = (profile: Profile | null): boolean => {
  return hasRole(profile, 'admin');
};

export const isPremium = (profile: Profile | null): boolean => {
  if (isAdmin(profile)) return true; // Admins are always premium
  return hasRole(profile, 'premium');
};
