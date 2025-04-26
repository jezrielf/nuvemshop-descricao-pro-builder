
import { Profile } from '@/types/auth';
import { Block } from '@/types/editor';

/**
 * Converts a Profile's role field to a string array for consistent handling
 */
export const getRoleAsString = (role: string | string[] | null): string[] => {
  if (!role) return [];
  if (Array.isArray(role)) return role;
  return role.split(',').map(r => r.trim());
};

/**
 * Converts database data to a Profile object
 */
export const convertToProfile = (data: any): Profile => {
  return {
    id: data.id || '',
    nome: data.nome || null,
    avatar_url: data.avatar_url || null,
    criado_em: data.criado_em || new Date().toISOString(),
    atualizado_em: data.atualizado_em || new Date().toISOString(),
    role: data.role || null,
    email: data.email || null
  };
};

/**
 * Ensures that a block has all the required properties for its type
 * Returns a properly typed Block object
 */
export const ensureBlockType = (block: any): Block => {
  if (!block) {
    throw new Error('Block is undefined or null');
  }

  if (!block.type) {
    console.warn('Block is missing type property:', block);
    block.type = 'text'; // Default to text block if no type is provided
  }

  // Ensure all blocks have the base required properties
  if (!block.id) block.id = crypto.randomUUID();
  if (block.visible === undefined) block.visible = true;
  if (!block.style) block.style = {};

  // Return the block with proper typing
  return block as Block;
};
