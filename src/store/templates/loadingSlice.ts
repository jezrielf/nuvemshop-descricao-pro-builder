
import { StateCreator } from 'zustand';
import { Template, ProductCategory } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import { supabase } from '@/integrations/supabase/client';
import { getAllTemplates } from '@/utils/templates';
import { deserializeBlocks, convertSupabaseToTemplate } from './utils';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice,
  [],
  [],
  TemplateLoadingSlice
> = (set, get) => ({
  loadTemplates: async () => {
    try {
      console.log('Loading templates from database...');
      
      // First try to load from database
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading templates from database:', error);
        // Fall back to loading from static templates
        console.log('Falling back to static templates...');
        const staticTemplates = getAllTemplates();
        set({ 
          templates: staticTemplates,
          categories: Array.from(new Set(staticTemplates.map(t => t.category)))
        });
        return;
      }
      
      // Process database templates
      if (data && data.length > 0) {
        console.log(`Loaded ${data.length} templates from database`);
        
        const templates: Template[] = data
          .map(item => convertSupabaseToTemplate(item))
          .filter((template): template is Template => template !== null);
        
        const categories = Array.from(new Set(templates.map(t => t.category)));
        set({ templates, categories });
      } else {
        // No templates in database, load from static
        console.log('No templates in database, loading static templates');
        const staticTemplates = getAllTemplates();
        set({ 
          templates: staticTemplates,
          categories: Array.from(new Set(staticTemplates.map(t => t.category)))
        });
      }
    } catch (error) {
      console.error('Error in loadTemplates:', error);
      // Fall back to static templates
      const staticTemplates = getAllTemplates();
      set({ 
        templates: staticTemplates,
        categories: Array.from(new Set(staticTemplates.map(t => t.category)))
      });
    }
  },
  
  getTemplatesByCategory: (category) => {
    const { templates } = get();
    if (!category) return templates;
    return templates.filter(template => template.category === category);
  },
  
  searchTemplates: (query, category) => {
    const { templates } = get();
    
    if (!query && !category) return templates;
    
    return templates.filter(template => {
      const matchesQuery = !query || 
        template.name.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = !category || template.category === category;
      
      return matchesQuery && matchesCategory;
    });
  }
});
