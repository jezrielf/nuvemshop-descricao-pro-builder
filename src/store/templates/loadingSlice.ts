
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import templateService from '@/services/admin/templateService';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice
> = (set) => ({
  templates: [],
  isLoading: false,
  error: null,
  
  loadTemplates: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const templates = await templateService.getTemplates();
      set({ templates, isLoading: false });
      return templates;
    } catch (error) {
      console.error("Error loading templates:", error);
      set({ error, isLoading: false });
      return [];
    }
  }
});
