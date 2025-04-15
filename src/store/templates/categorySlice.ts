
import { StateCreator } from 'zustand';
import { TemplateState, TemplateCategorySlice } from './types';
import { supabase } from '@/integrations/supabase/client';

export const createCategorySlice: StateCreator<
  TemplateState & TemplateCategorySlice,
  [],
  [],
  TemplateCategorySlice
> = (set) => ({
  selectCategory: (category) => {
    set({ selectedCategory: category });
  },
  
  addCustomCategory: async (category) => {
    try {
      const { error } = await supabase
        .from('template_categories')
        .insert({ name: category });
      
      if (error) {
        console.error('Error adding category to database:', error);
        return false;
      }
      
      set(state => ({
        categories: [...state.categories, category],
        customCategories: [...state.customCategories, category]
      }));
      
      return true;
    } catch (error) {
      console.error('Error in addCustomCategory:', error);
      return false;
    }
  }
});
