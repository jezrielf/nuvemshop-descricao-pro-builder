
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import { getAllTemplates } from '@/utils/templates';
import { supabase } from '@/integrations/supabase/client';
import { convertSupabaseToTemplate } from './utils';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice,
  [],
  [],
  TemplateLoadingSlice
> = (set, get) => ({
  loadTemplates: async () => {
    try {
      console.log('Starting template loading process...');
      
      // Load default templates
      const defaultTemplates = getAllTemplates();
      console.log('Default templates loaded, count:', defaultTemplates.length);
      
      // Load user templates from Supabase
      const { data: userTemplatesData, error } = await supabase
        .from('templates')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error loading templates from database:', error);
        throw error;
      }
      
      console.log('User templates from database:', userTemplatesData?.length || 0);
      
      // Convert Supabase templates
      const userTemplates = (userTemplatesData || [])
        .map(template => convertSupabaseToTemplate(template))
        .filter((template): template is Template => template !== null);
      
      // Combine templates and extract categories
      const allTemplates = [...defaultTemplates, ...userTemplates];
      const templateCategories = Array.from(
        new Set(allTemplates.map(template => template.category))
      );
      
      set({ templates: allTemplates, categories: templateCategories });
      console.log('Template store updated successfully');
    } catch (error) {
      console.error('Critical error in loadTemplates:', error);
      const defaultTemplates = getAllTemplates();
      set({
        templates: defaultTemplates,
        categories: Array.from(new Set(defaultTemplates.map(t => t.category)))
      });
    }
  },
  
  getTemplatesByCategory: (category) => {
    const { templates } = get();
    if (!category) return templates;
    return templates.filter(template => template.category === category);
  },
  
  searchTemplates: (searchTerm, category) => {
    const { templates } = get();
    return templates.filter(template => {
      const matchesSearch = searchTerm 
        ? template.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesCategory = category 
        ? template.category === category
        : true;
      return matchesSearch && matchesCategory;
    });
  }
});
