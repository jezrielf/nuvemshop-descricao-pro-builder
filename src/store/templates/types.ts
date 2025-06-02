
import { Template, ProductCategory } from '@/types/editor';

// Base template state
export interface TemplateState {
  templates: Template[];
  categories: string[];
  selectedCategory: string | null;
}

// Template loading actions
export interface TemplateLoadingSlice {
  loadTemplates: () => Promise<Template[]>;
  searchTemplates: (query: string, category: string | null) => Template[];
}

// Template CRUD actions
export interface TemplateCRUDSlice {
  createTemplate: (templateData: Omit<Template, "id">) => Promise<Template>;
  updateTemplate: (id: string, templateData: Partial<Template>) => Promise<Template | null>;
  deleteTemplate: (id: string) => Promise<boolean>;
}

// Template category management
export interface TemplateCategorySlice {
  customCategories: string[];
  getTemplatesByCategory: (category: string | null) => Template[];
  setSelectedCategory: (category: string | null) => void;
}

// Extend the Template interface to include user_id if it's not already included in @/types/editor
declare module '@/types/editor' {
  interface Template {
    user_id?: string;
  }
}
