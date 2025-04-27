
import { Block, ProductCategory } from '@/types/editor';
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
    
    // Convert category to a valid ProductCategory
    let category: ProductCategory = 'other';
    
    // Check if it's a valid ProductCategory
    const validCategories: ProductCategory[] = [
      'supplements', 'clothing', 'accessories', 'shoes', 
      'electronics', 'energy', 'Casa e decoração', 'other'
    ];
    
    if (supaTemplate.category && validCategories.includes(supaTemplate.category as ProductCategory)) {
      category = supaTemplate.category as ProductCategory;
    }
    
    return {
      id: supaTemplate.id,
      name: supaTemplate.name,
      category: category,
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
