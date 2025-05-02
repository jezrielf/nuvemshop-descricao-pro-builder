
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import { adminService } from '@/services/admin';
import { supabase } from '@/integrations/supabase/client';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice,
  [],
  [],
  TemplateLoadingSlice
> = (set, get) => ({
  loadTemplates: async () => {
    console.log('Loading templates from service');
    
    try {
      // Check for authentication
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current authenticated user:', user?.id || 'Not authenticated');
      
      const templates = await adminService.getTemplates();
      console.log(`Loaded ${templates.length} templates`);
      
      // Update state with loaded templates
      set({ templates });
      
      return templates;
    } catch (error) {
      console.error('Error in loadTemplates:', error);
      throw error;
    }
  },
  
  searchTemplates: (query, categoryFilter) => {
    const { templates } = get();
    
    if (!query && !categoryFilter) {
      return templates;
    }
    
    return templates.filter(template => {
      // Match by category if filter is applied
      const categoryMatch = !categoryFilter || template.category === categoryFilter;
      
      // Match by search query if provided
      const searchMatch = !query || 
        template.name.toLowerCase().includes(query.toLowerCase()) ||
        template.category.toLowerCase().includes(query.toLowerCase());
        
      return categoryMatch && searchMatch;
    });
  },
});
