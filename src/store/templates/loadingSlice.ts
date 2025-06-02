
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import { getAllTemplates } from '@/utils/templates';

// Mock service for templates
const templateService = {
  getTemplates: async (): Promise<Template[]> => {
    console.log('templateService.getTemplates() - Starting template fetch');
    // In a real implementation, this would fetch from an API
    const templates = getAllTemplates();
    console.log('templateService.getTemplates() - Fetched templates:', templates.length);
    templates.forEach((template, index) => {
      console.log(`  ${index + 1}. ${template.name} (category: ${template.category}, blocks: ${template.blocks.length})`);
    });
    return templates;
  }
};

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice,
  [],
  [],
  TemplateLoadingSlice
> = (set, get) => ({
  loadTemplates: async () => {
    try {
      console.log('loadTemplates() - Starting template loading process');
      // Load templates from database, or use local templates if not available
      const loadedTemplates = await templateService.getTemplates();
      console.log(`loadTemplates() - Successfully loaded ${loadedTemplates.length} templates`);
      
      // Verify each template has proper structure
      loadedTemplates.forEach((template, index) => {
        if (!template.id || !template.name || !template.category || !template.blocks) {
          console.error(`Template ${index} has invalid structure:`, template);
        } else {
          console.log(`Template validated: ${template.name} - ${template.blocks.length} blocks`);
        }
      });
      
      set({ templates: loadedTemplates });
      console.log('loadTemplates() - Templates stored in state successfully');
      return loadedTemplates;
    } catch (error) {
      console.error('Error loading templates:', error);
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
