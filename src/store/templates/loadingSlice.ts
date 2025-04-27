
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import templateService from '@/services/admin/templateService';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice
> = (set, get) => ({
  templates: [],
  isLoading: false,
  error: null,
  
  loadTemplates: async () => {
    // If already loading or has templates, don't fetch again
    if (get().isLoading || (get().templates.length > 0 && !get().error)) {
      return get().templates;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      const templates = await templateService.getTemplates();
      set({ templates, isLoading: false });
      return templates;
    } catch (error) {
      console.error("Error loading templates:", error);
      set({ error: error as Error, isLoading: false });
      return [];
    }
  }
});
