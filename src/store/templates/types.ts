
import { Template } from '@/types/editor';

export interface TemplateState {
  templates: Template[];
  categories: string[];
  selectedCategory: string | null;
  customCategories: string[];
}

export interface TemplateLoadingSlice {
  loadTemplates: () => Promise<Template[]>;
  getTemplatesByCategory: (category: string | null) => Template[];
  searchTemplates: (searchTerm: string, category: string | null) => Template[];
}

export interface TemplateCategorySlice {
  selectCategory: (category: string | null) => void;
  addCustomCategory: (category: string) => Promise<boolean>;
}

export interface TemplateCRUDSlice {
  createTemplate: (template: Omit<Template, "id">) => Promise<Template>;
  updateTemplate: (id: string, template: Partial<Template>) => Promise<Template | null>;
  deleteTemplate: (id: string) => Promise<boolean>;
}
