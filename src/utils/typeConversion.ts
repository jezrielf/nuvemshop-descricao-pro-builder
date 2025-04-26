
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

// Convert any data to Profile format for auth context
export const convertToProfile = (userData: any): Profile => {
  return {
    id: userData.id || '',
    email: userData.email || '',
    name: userData.nome || userData.name || '',
    role: userData.role || 'user',
    avatarUrl: userData.avatar_url || userData.avatarUrl || null,
    app_metadata: userData.app_metadata || {},
    user_metadata: userData.user_metadata || {},
    aud: userData.aud || '',
    created_at: userData.criado_em || userData.created_at || new Date().toISOString()
  };
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
