
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
    // Prevent infinite loading loops
    // If already loading, just return current templates
    if (get().isLoading) {
      return get().templates;
    }
    
    // If has templates and no error, don't reload unless forced
    // This prevents unnecessary loading loops
    if (get().templates.length > 0 && !get().error) {
      return get().templates;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      const templates = await templateService.getTemplates();
      
      // Only update state if we actually got templates
      if (templates && templates.length > 0) {
        set({ templates, isLoading: false });
      } else {
        // Handle empty result properly 
        set({ isLoading: false });
        console.log("No templates were loaded");
      }
      return templates;
    } catch (error) {
      console.error("Error loading templates:", error);
      // Convert the Error object to a string to match the expected type
      set({ error: error instanceof Error ? error.message : String(error), isLoading: false });
      return [];
    }
  }
});
