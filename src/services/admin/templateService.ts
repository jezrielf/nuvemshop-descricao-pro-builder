
import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/editor';
import { ProductCategory } from '@/types/editor/products';
import { convertBlocks } from '@/utils/blockConverter';

export const templateService = {
  getTemplates: async (): Promise<Template[]> => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      // Convert the database response to Template format with proper type handling
      const templates: Template[] = (data || []).map((template) => {
        // Convert string category to ProductCategory
        let category: ProductCategory = 'other';
        
        // Try to match the string category with a valid ProductCategory
        if (template.category && typeof template.category === 'string') {
          // Check if it's a valid ProductCategory
          const validCategories: ProductCategory[] = [
            'supplements', 'clothing', 'accessories', 'shoes', 
            'electronics', 'energy', 'Casa e decoração', 'other'
          ];
          
          if (validCategories.includes(template.category as ProductCategory)) {
            category = template.category as ProductCategory;
          }
        }
        
        // Ensure blocks is always an array
        let blockData: any[] = [];
        
        if (Array.isArray(template.blocks)) {
          blockData = template.blocks;
        } else if (typeof template.blocks === 'object' && template.blocks !== null) {
          blockData = Object.values(template.blocks);
        }
        
        return {
          id: template.id,
          name: template.name,
          category: category,
          blocks: blockData,
          thumbnail: '/placeholder.svg' // Default thumbnail as it's not in the database
        };
      });
      
      return templates;
    } catch (error) {
      console.error('Error in getTemplates:', error);
      throw error;
    }
  },
  
  createTemplate: async (templateData: Omit<Template, 'id'>): Promise<Template> => {
    try {
      // Generate UUID for new template
      const id = crypto.randomUUID();
      
      // Ensure blocks is serialized properly for storage
      const blockData = templateData.blocks || [];
      
      const { data, error } = await supabase
        .from('templates')
        .insert({
          id,
          name: templateData.name,
          category: templateData.category,
          blocks: blockData
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Ensure blocks is always an array
      let blocks: any[] = [];
      
      if (Array.isArray(data.blocks)) {
        blocks = data.blocks;
      } else if (typeof data.blocks === 'object' && data.blocks !== null) {
        blocks = Object.values(data.blocks);
      }
      
      // Convert returned data to Template format
      const template: Template = {
        id: data.id,
        name: data.name,
        category: data.category as ProductCategory,
        blocks,
        thumbnail: '/placeholder.svg' // Default thumbnail
      };
      
      return template;
    } catch (error) {
      console.error('Error in createTemplate:', error);
      throw error;
    }
  },
  
  updateTemplate: async (templateId: string, templateData: Partial<Template>): Promise<Template> => {
    try {
      // Prepare update data
      const updateData: any = {};
      
      if (templateData.name) updateData.name = templateData.name;
      if (templateData.category) updateData.category = templateData.category;
      if (templateData.blocks) updateData.blocks = templateData.blocks;
      
      updateData.updated_at = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('templates')
        .update(updateData)
        .eq('id', templateId)
        .select()
        .single();
      
      if (error) throw error;
      
      // Ensure blocks is always an array
      let blocks: any[] = [];
      
      if (Array.isArray(data.blocks)) {
        blocks = data.blocks;
      } else if (typeof data.blocks === 'object' && data.blocks !== null) {
        blocks = Object.values(data.blocks);
      }
      
      // Convert returned data to Template format
      const template: Template = {
        id: data.id,
        name: data.name,
        category: data.category as ProductCategory,
        blocks,
        thumbnail: '/placeholder.svg' // Default thumbnail
      };
      
      return template;
    } catch (error) {
      console.error('Error in updateTemplate:', error);
      throw error;
    }
  },
  
  deleteTemplate: async (templateId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error in deleteTemplate:', error);
      throw error;
    }
  }
};
