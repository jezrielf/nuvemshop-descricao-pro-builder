
import { StateCreator } from 'zustand';
import { TemplateState } from './state';
import templateService from '@/services/admin/templateService';

export interface TemplateLoadingSlice {
  isLoading: boolean;
  error: string | null;
  fetchTemplates: () => Promise<void>;
}

export const createTemplateLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice,
  [],
  [],
  TemplateLoadingSlice
> = (set, get) => ({
  isLoading: false,
  error: null,
  
  fetchTemplates: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const templates = await templateService.getTemplates();
      set({ templates, isLoading: false });
    } catch (error) {
      console.error('Error fetching templates:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch templates' 
      });
    }
  }
});
