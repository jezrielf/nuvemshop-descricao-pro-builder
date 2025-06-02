
import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/editor';
import { ProductCategory } from '@/types/editor/products';

export const templateService = {
  getTemplates: async (): Promise<Template[]> => {
    try {
      console.log('templateService.getTemplates() - Starting template fetch from Supabase');
      
      // Get templates from Supabase
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching templates from Supabase:', error);
        throw error;
      }
      
      // Convert database response to Template format
      const templates: Template[] = (data || []).map((template) => {
        let category: ProductCategory = 'other';
        
        if (template.category && typeof template.category === 'string') {
          const validCategories: ProductCategory[] = [
            'supplements', 'clothing', 'accessories', 'shoes', 
            'electronics', 'energy', 'Casa e decoração', 'other'
          ];
          
          if (validCategories.includes(template.category as ProductCategory)) {
            category = template.category as ProductCategory;
          }
        }
        
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
          thumbnail: '/placeholder.svg',
          user_id: template.user_id
        };
      });
      
      console.log(`templateService.getTemplates() - Successfully fetched ${templates.length} templates`);
      return templates;
    } catch (error) {
      console.error('Error in templateService.getTemplates:', error);
      throw error;
    }
  },
  
  createTemplate: async (templateData: Omit<Template, 'id'>): Promise<Template> => {
    try {
      console.log('templateService.createTemplate() - Creating template');
      
      // Get current authenticated user
      const { data: authData } = await supabase.auth.getSession();
      const userId = authData.session?.user.id;
      
      if (!userId) {
        throw new Error('Authentication required');
      }
      
      // Create template in Supabase - explicitly type the insert to exclude id
      const { data, error } = await supabase
        .from('templates')
        .insert({
          name: templateData.name,
          category: templateData.category as string,
          blocks: templateData.blocks || [],
          user_id: userId
        } as any) // Use 'as any' to bypass the strict typing for insert
        .select()
        .single();
      
      if (error) {
        console.error('Error creating template:', error);
        throw error;
      }
      
      // Convert to Template format
      const template: Template = {
        id: data.id,
        name: data.name,
        category: data.category as ProductCategory,
        blocks: Array.isArray(data.blocks) ? data.blocks : [],
        thumbnail: '/placeholder.svg',
        user_id: data.user_id
      };
      
      console.log('templateService.createTemplate() - Template created successfully:', template.id);
      return template;
    } catch (error) {
      console.error('Error in templateService.createTemplate:', error);
      throw error;
    }
  },
  
  updateTemplate: async (templateId: string, templateData: Partial<Template>): Promise<Template> => {
    try {
      console.log('templateService.updateTemplate() - Updating template:', templateId);
      
      // Update template in Supabase
      const { data, error } = await supabase
        .from('templates')
        .update({
          name: templateData.name,
          category: templateData.category as string, // Cast to string for database
          blocks: templateData.blocks,
          updated_at: new Date().toISOString()
        })
        .eq('id', templateId)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating template:', error);
        throw error;
      }
      
      // Convert to Template format
      const template: Template = {
        id: data.id,
        name: data.name,
        category: data.category as ProductCategory,
        blocks: Array.isArray(data.blocks) ? data.blocks : [],
        thumbnail: '/placeholder.svg',
        user_id: data.user_id
      };
      
      console.log('templateService.updateTemplate() - Template updated successfully');
      return template;
    } catch (error) {
      console.error('Error in templateService.updateTemplate:', error);
      throw error;
    }
  },
  
  deleteTemplate: async (templateId: string): Promise<void> => {
    try {
      console.log('templateService.deleteTemplate() - Deleting template:', templateId);
      
      // Delete template from Supabase
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateId);
      
      if (error) {
        console.error('Error deleting template:', error);
        throw error;
      }
      
      console.log('templateService.deleteTemplate() - Template deleted successfully');
    } catch (error) {
      console.error('Error in templateService.deleteTemplate:', error);
      throw error;
    }
  }
};
