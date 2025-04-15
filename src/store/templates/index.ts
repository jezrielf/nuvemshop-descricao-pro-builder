
import { create } from 'zustand';
import { TemplateState, TemplateLoadingSlice, TemplateCRUDSlice, TemplateCategorySlice } from './types';
import { createLoadingSlice } from './loadingSlice';
import { createCRUDSlice } from './crudSlice';
import { createCategorySlice } from './categorySlice';

export const useTemplateStore = create<
  TemplateState & TemplateLoadingSlice & TemplateCRUDSlice & TemplateCategorySlice
>((...args) => ({
  templates: [],
  categories: [],
  selectedCategory: null,
  customCategories: [],
  ...createLoadingSlice(...args),
  ...createCRUDSlice(...args),
  ...createCategorySlice(...args)
}));

// Re-export types for convenience
export * from './types';
