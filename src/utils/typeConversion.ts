
import { Block, BlockType } from '@/types/editor';

/**
 * Ensures that a block object is properly typed based on its type property
 * This is useful when retrieving blocks from a database or API
 */
export function ensureBlockType(block: any): Block {
  // Check if the block is valid
  if (!block || typeof block !== 'object') {
    throw new Error('Invalid block: Block must be an object');
  }

  // Check if block has a valid type
  if (!block.type || typeof block.type !== 'string') {
    throw new Error('Invalid block: Block must have a type property');
  }

  // Check if block type is among the allowed types
  const validTypes: BlockType[] = [
    'hero', 'text', 'features', 'benefits', 'specifications',
    'image', 'gallery', 'imageText', 'textImage', 'faq', 'cta',
    'video', 'videoText', 'textVideo', 'carousel'
  ];

  if (!validTypes.includes(block.type as BlockType)) {
    throw new Error(`Invalid block type: ${block.type}`);
  }

  // Ensure block has an id
  if (!block.id || typeof block.id !== 'string') {
    throw new Error('Invalid block: Block must have an id property');
  }

  return block as Block;
}

/**
 * Converts user profile from auth to a standard user object
 */
export function convertProfileToUser(profile: any): any {
  if (!profile) return null;

  // Basic conversion
  return {
    id: profile.id,
    email: profile.email,
    name: profile.user_metadata?.full_name || profile.user_metadata?.name || '',
    role: profile.user_metadata?.role || 'user',
    plan: profile.user_metadata?.plan || 'free',
    savedDescriptionsCount: profile.user_metadata?.savedDescriptionsCount || 0
  };
}
