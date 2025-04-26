
import { User } from '@/types/auth';

/**
 * Check if a user has a premium or business subscription
 */
export const isPremium = (user?: User | null): boolean => {
  if (!user) return false;
  
  // Check if user has a subscription role or plan
  const userRole = user.role?.toLowerCase();
  const userPlan = user.plan?.toLowerCase();
  
  return (
    userRole === 'premium' || 
    userRole === 'business' || 
    userPlan === 'premium' || 
    userPlan === 'business'
  );
};

/**
 * Check if a user can create more descriptions 
 * (either premium/business or has created less than the free limit)
 */
export const canCreateMoreDescriptions = (user?: User | null, freeLimit: number = 3): boolean => {
  if (!user) return false;
  
  // Premium users can always create more
  if (isPremium(user)) return true;
  
  // Check if the user has created less than the free limit
  const savedCount = user.savedDescriptionsCount || 0;
  return savedCount < freeLimit;
};

/**
 * Check if a user is an admin
 */
export const isAdmin = (user?: User | null): boolean => {
  if (!user) return false;
  
  const userRole = user.role?.toLowerCase();
  return userRole === 'admin' || userRole === 'administrator';
};

/**
 * Get user roles as an array
 */
export const getRoles = (user?: User | null): string[] => {
  if (!user || !user.role) return ['user'];
  
  // If role is already an array, return it
  if (Array.isArray(user.role)) {
    return user.role;
  }
  
  // If role is a string, convert to array
  return [user.role];
};

/**
 * Check if user has a business role/plan
 */
export const isBusiness = (user?: User | null): boolean => {
  if (!user) return false;
  
  const userRole = user.role?.toLowerCase();
  const userPlan = user.plan?.toLowerCase();
  
  return (
    userRole === 'business' || 
    userPlan === 'business'
  );
};
