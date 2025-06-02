
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import { supabase } from '@/integrations/supabase/client';
import { getAllTemplates } from '@/utils/templates';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice,
  [],
  [],
  TemplateLoadingSlice
> = (set, get) => ({
  loadTemplates: async () => {
    try {
      console.log('loadTemplates() - Starting template loading from Supabase');
      
      // Try to load templates from Supabase first
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.warn('Error loading templates from Supabase:', error);
        // Use local templates as fallback
        const localTemplates = getAllTemplates();
        console.log(`loadTemplates() - Using ${localTemplates.length} local templates as fallback`);
        set({ templates: localTemplates });
        return localTemplates;
      }
      
      // If no data, use local templates
      if (!data || data.length === 0) {
        console.log('No templates found in Supabase, using local templates');
        const localTemplates = getAllTemplates();
        console.log(`loadTemplates() - Loaded ${localTemplates.length} local templates as fallback`);
        set({ templates: localTemplates });
        return localTemplates;
      }
      
      // Convert Supabase data to Template format
      const templates: Template[] = data.map((template) => ({
        id: template.id,
        name: template.name,
        category: template.category as any,
        blocks: Array.isArray(template.blocks) ? template.blocks : [],
        thumbnail: '/placeholder.svg',
        user_id: template.user_id
      }));
      
      console.log(`loadTemplates() - Successfully loaded ${templates.length} templates from Supabase`);
      
      // Verify each template has proper structure
      templates.forEach((template, index) => {
        if (!template.id || !template.name || !template.category || !template.blocks) {
          console.error(`Template ${index} has invalid structure:`, template);
        } else {
          console.log(`Template validated: ${template.name} - ${template.blocks.length} blocks`);
        }
      });
      
      set({ templates });
      console.log('loadTemplates() - Templates stored in state successfully');
      return templates;
    } catch (error) {
      console.error('Exception in loadTemplates:', error);
      // If there's an error, use local templates as fallback
      const fallbackTemplates = getAllTemplates();
      console.log(`loadTemplates() - Using ${fallbackTemplates.length} fallback templates`);
      set({ templates: fallbackTemplates });
      return fallbackTemplates;
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
