import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/editor';
import { ProductCategory } from '@/types/editor/products';
import { getAllTemplates } from '@/utils/templates';

export const templateService = {
  getTemplates: async (): Promise<Template[]> => {
    try {
      console.log('Iniciando carregamento de templates do banco de dados');
      
      // First try to get templates from database
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.warn('Erro ao carregar templates do banco de dados:', error);
        // If there's an error, return local templates
        const localTemplates = getAllTemplates();
        console.log(`Fallback para ${localTemplates.length} templates locais devido a erro no banco`);
        return localTemplates;
      }
      
      // If no data or empty array, return local templates
      if (!data || data.length === 0) {
        console.log('Nenhum template encontrado no banco de dados, usando templates locais');
        const localTemplates = getAllTemplates();
        console.log(`Carregados ${localTemplates.length} templates locais como fallback`);
        return localTemplates;
      }
      
      // Convert database response to Template format with proper type handling
      const templates: Template[] = (data || []).map((template) => {
        // Convert string category to ProductCategory with validation
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
          thumbnail: '/placeholder.svg' // Default thumbnail
        };
      });
      
      console.log(`Carregados ${templates.length} templates do banco de dados com sucesso`);
      
      // If we have database templates but they're few, combine with local ones
      if (templates.length < 10) {
        const localTemplates = getAllTemplates();
        // Filter to avoid duplicate IDs
        const localWithoutDuplicates = localTemplates.filter(
          local => !templates.some(db => db.id === local.id)
        );
        const combined = [...templates, ...localWithoutDuplicates];
        console.log(`Combinando ${templates.length} templates do banco com ${localWithoutDuplicates.length} templates locais`);
        return combined;
      }
      
      return templates;
    } catch (error) {
      console.error('Error in getTemplates:', error);
      // In case of any error, return local templates as fallback
      const localTemplates = getAllTemplates();
      console.log(`Usando ${localTemplates.length} templates locais como fallback devido a erro geral`);
      return localTemplates;
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
