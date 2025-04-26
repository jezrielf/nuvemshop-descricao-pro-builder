
import { Block } from '@/types/editor';
import { Profile } from '@/types/auth';

/**
 * Ensures that a block object conforms to the Block type
 * This is useful when dealing with blocks that might come from external sources or JSON
 */
export function ensureBlockType(block: any): Block {
  if (!block) {
    throw new Error('Cannot convert null or undefined to Block type');
  }
  
  // Basic validation to ensure it has the minimum required properties
  if (!block.id || !block.type) {
    throw new Error('Invalid block: missing required properties');
  }
  
  return block as Block;
}

/**
 * Converts a Profile object to a User-compatible object
 * This is useful when dealing with Profile objects that need to be used as User objects
 */
export function convertProfileToUser(profile: Profile): any {
  if (!profile) return null;
  
  return {
    ...profile,
    // Ensure required User properties exist
    app_metadata: profile.app_metadata || {},
    user_metadata: profile.user_metadata || {},
    aud: profile.aud || '',
    created_at: profile.created_at || '',
    // Convert role to string if it's an array
    role: Array.isArray(profile.role) ? (profile.role[0] || '') : (profile.role || '')
  };
}

/**
 * Gets role as string from a user/profile object that might have role as string or string[]
 */
export function getRoleAsString(user: Profile | null | { role: string | string[] }): string {
  if (!user?.role) return '';
  return Array.isArray(user.role) ? (user.role[0] || '') : user.role;
}
