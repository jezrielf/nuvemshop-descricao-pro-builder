
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import { supabase } from '@/integrations/supabase/client';
import { ProductCategory } from '@/types/editor/products';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice,
  [],
  [],
  TemplateLoadingSlice
> = (set, get) => ({
  loadTemplates: async () => {
    try {
      console.log('loadTemplates() - Loading templates from Supabase');
      
      // Load templates from Supabase database
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error loading templates from Supabase:', error);
        throw error;
      }
      
      // Convert database response to Template format
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
          thumbnail: '/placeholder.svg',
          user_id: template.user_id
        };
      });
      
      console.log(`loadTemplates() - Successfully loaded ${templates.length} templates from Supabase`);
      set({ templates });
      return templates;
    } catch (error) {
      console.error('Error in loadTemplates:', error);
      set({ templates: [] });
      throw error;
    }
  },
  
  searchTemplates: (query, category) => {
    const { templates } = get();
    
    console.log(`searchTemplates() - Searching in ${templates.length} templates with query: "${query}", category: "${category}"`);
    
    if (!query && !category) {
      console.log('searchTemplates() - No filters, returning all templates');
      return templates;
    }
    
    const filtered = templates.filter(template => {
      const matchesQuery = !query || 
        template.name.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = !category || 
        template.category === category;
      
      return matchesQuery && matchesCategory;
    });
    
    console.log(`searchTemplates() - Filtered to ${filtered.length} templates`);
    return filtered;
  }
});
