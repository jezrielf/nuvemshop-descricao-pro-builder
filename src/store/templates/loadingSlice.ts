
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import { getAllTemplates } from '@/utils/templates';

// Mock service for templates
const templateService = {
  getTemplates: async (): Promise<Template[]> => {
    // In a real implementation, this would fetch from an API
    return getAllTemplates();
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
      console.log('Loading templates...');
      // Load templates from database, or use local templates if not available
      const loadedTemplates = await templateService.getTemplates();
      console.log(`Loaded ${loadedTemplates.length} templates`);
      set({ templates: loadedTemplates });
      return loadedTemplates;
    } catch (error) {
      console.error('Error loading templates:', error);
      // If there's an error, use local templates as fallback
      const fallbackTemplates = getAllTemplates();
      console.log(`Using ${fallbackTemplates.length} fallback templates`);
      set({ templates: fallbackTemplates });
      return fallbackTemplates;
    }
  },
  
  searchTemplates: (query, category) => {
    const { templates } = get();
    
    if (!query && !category) {
      return templates;
    }
    
    return templates.filter(template => {
      const matchesQuery = !query || 
        template.name.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = !category || 
        template.category === category;
      
      return matchesQuery && matchesCategory;
    });
  }
});
