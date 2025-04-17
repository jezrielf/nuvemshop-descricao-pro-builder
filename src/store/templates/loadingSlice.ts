
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import { templateService } from '@/services/admin/templateService';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice,
  [],
  [],
  TemplateLoadingSlice
> = (set, get) => ({
  loadTemplates: async () => {
    try {
      const templates = await templateService.getTemplates();
      set({ templates });
      return templates;
    } catch (error) {
      console.error('Error loading templates:', error);
      set({ templates: [] });
      return [];
    }
  },
  
  searchTemplates: (query, category) => {
    const { templates } = get();
    
    return templates.filter(template => {
      // Filter by category if selected
      if (category && template.category !== category) {
        return false;
      }
      
      // Filter by search query if provided
      if (query && query.trim() !== '') {
        const normalizedQuery = query.toLowerCase().trim();
        return template.name.toLowerCase().includes(normalizedQuery);
      }
      
      return true;
    });
  }
});
