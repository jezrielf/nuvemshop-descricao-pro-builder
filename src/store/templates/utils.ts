
import { Block } from '@/types/editor';
import { Template } from '@/types/editor';

interface SupabaseTemplate {
  id: string;
  name: string;
  category: string;
  blocks: any;
  thumbnail?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export const convertSupabaseToTemplate = (supaTemplate: SupabaseTemplate): Template | null => {
  try {
    let blocks = [];
    
    if (Array.isArray(supaTemplate.blocks)) {
      blocks = supaTemplate.blocks;
    } else if (typeof supaTemplate.blocks === 'object' && supaTemplate.blocks !== null) {
      blocks = Object.values(supaTemplate.blocks);
    }
    
    return {
      id: supaTemplate.id,
      name: supaTemplate.name,
      category: supaTemplate.category,
      blocks: blocks,
      thumbnail: supaTemplate.thumbnail || '/placeholder.svg' // Default placeholder if no thumbnail
    };
  } catch (error) {
    console.error('Error converting template:', error, supaTemplate);
    return null;
  }
};

export const serializeBlocks = (blocks: Block[]): any => {
  return JSON.parse(JSON.stringify(blocks));
};

/**
 * Deserializes blocks from JSON format to Block[] format
 * This function handles any transformation needed when loading blocks from database
 */
export const deserializeBlocks = (blocks: any): Block[] => {
  if (!blocks) return [];
  
  try {
    if (typeof blocks === 'string') {
      return JSON.parse(blocks);
    }
    
    if (Array.isArray(blocks)) {
      return blocks;
    }
    
    if (typeof blocks === 'object') {
      return Object.values(blocks);
    }
    
    return [];
  } catch (error) {
    console.error('Error deserializing blocks:', error);
    return [];
  }
};
