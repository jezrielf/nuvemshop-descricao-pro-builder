
import { StateCreator } from 'zustand';
import { TemplateState, TemplateCategorySlice } from './types';

export const createCategorySlice: StateCreator<
  TemplateState & TemplateCategorySlice,
  [],
  [],
  TemplateCategorySlice
> = (set, get) => ({
  categories: [
    'supplements',
    'clothing',
    'accessories',
    'shoes',
    'electronics',
    'energy',
    'Casa e decoração',
    'other'
  ],
  selectedCategory: null,
  customCategories: [],
  
  getTemplatesByCategory: (category) => {
    const { templates } = get();
    
    if (!category) {
      return templates;
    }
    
    return templates.filter(template => template.category === category);
  },
  
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  }
});
