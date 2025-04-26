
import { Template, ProductCategory } from '@/types/editor';

export interface TemplateState {
  templates: Template[];
}

export interface TemplateLoadingSlice {
  isLoading: boolean;
  error: string | null;
  loadTemplates: () => Promise<void>;
}

export interface TemplateCRUDSlice {
  addTemplate: (template: Template) => void;
  updateTemplate: (id: string, template: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  applyTemplate: (template: Template) => void;
}

export interface TemplateCategorySlice {
  categories: string[];
  selectedCategory: string | null;
  customCategories: string[];
  getTemplatesByCategory: (category: string | null) => Template[];
  setSelectedCategory: (category: string | null) => void;
}
