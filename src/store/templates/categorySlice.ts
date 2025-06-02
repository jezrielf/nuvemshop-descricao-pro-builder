
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateCategorySlice } from './types';

export const createCategorySlice: StateCreator<
  TemplateState & TemplateCategorySlice,
  [],
  [],
  TemplateCategorySlice
> = (set, get) => ({
  categories: [
    'supplements',
    'electronics', 
    'clothing',
    'shoes',
    'accessories',
    'energy',
    'Casa e decoração',
    'other'
  ],
  selectedCategory: null,
  customCategories: [],

  getTemplatesByCategory: (category: string | null) => {
    const { templates } = get();
    
    if (!category || category === 'all') {
      return templates;
    }
    
    return templates.filter(template => template.category === category);
  },

  setSelectedCategory: (category: string | null) => {
    set({ selectedCategory: category });
  }
});
