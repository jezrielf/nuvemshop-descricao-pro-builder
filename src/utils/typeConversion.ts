
import { Profile } from '@/types/auth';
import { Block } from '@/types/editor/blocks';

// Convert Profile to User for storage service compatibility
export const convertProfileToUser = (profile: Profile): any => {
  return {
    id: profile.id,
    email: profile.email,
    name: typeof profile.name === 'string' ? profile.name : '',
    role: getRoleAsString(profile),
    avatar_url: profile.avatarUrl,
    created_at: profile.created_at
  };
};

// Get role as string from Profile.role which could be string or string[]
export const getRoleAsString = (profile: Profile): string => {
  if (!profile.role) return 'user';
  
  if (Array.isArray(profile.role)) {
    return profile.role.length > 0 ? profile.role[0] : 'user';
  }
  
  return profile.role;
};

// Ensure a block has the correct type 
export const ensureBlockType = (block: any): Block => {
  if (!block || typeof block !== 'object') {
    throw new Error('Invalid block data');
  }
  
  // Ensure the block has all required base properties
  const ensuredBlock = {
    id: block.id || '',
    type: block.type || 'text',
    title: block.title || block.type || 'Block',
    visible: block.visible !== undefined ? block.visible : true,
    columns: block.columns || 'full',
    style: block.style || {},
    ...block
  };
  
  return ensuredBlock as Block;
};
