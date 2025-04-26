
import { Template, ProductCategory } from '@/types/editor';

export interface TemplateState {
  templates: Template[];
}

export interface TemplateLoadingSlice {
  isLoading: boolean;
  error: string | null;
  loadTemplates: () => Promise<Template[]>;
}

export interface TemplateCRUDSlice {
  addTemplate: (template: Template) => void;
  updateTemplate: (id: string, template: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  applyTemplate: (template: Template) => void;
  createTemplate: (template: Omit<Template, "id">) => Promise<Template>;
  searchTemplates: (query?: string, category?: string | null) => Template[];
}

export interface TemplateCategorySlice {
  categories: string[];
  selectedCategory: string | null;
  customCategories: string[];
  getTemplatesByCategory: (category: string | null) => Template[];
  setSelectedCategory: (category: string | null) => void;
}
