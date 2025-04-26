
import { StateCreator } from 'zustand';
import { TemplateState, TemplateLoadingSlice } from './types';
import { Template } from '@/types/editor';
import templateService from '@/services/admin/templateService';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice
> = (set, get) => ({
  templates: [],
  isLoading: false,
  error: null,
  
  loadTemplates: async () => {
    try {
      set({ isLoading: true, error: null });
      const templates = await templateService.getTemplates();
      set({ templates, isLoading: false });
      return templates;
    } catch (error) {
      console.error('Error loading templates:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to load templates' 
      });
      return [];
    }
  }
});
