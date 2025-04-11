
import { create } from 'zustand';
import { Template, ProductCategory } from '@/types/editor';
import { getAllTemplates } from '@/utils/templates';
import { v4 as uuidv4 } from 'uuid';

interface TemplateState {
  templates: Template[];
  categories: string[];
  selectedCategory: string | null;
  loadTemplates: () => void;
  selectCategory: (category: string | null) => void;
  getTemplatesByCategory: (category: string | null) => Template[];
  searchTemplates: (searchTerm: string, category: string | null) => Template[];
  createTemplate: (template: Omit<Template, "id">) => Template;
  updateTemplate: (id: string, template: Partial<Template>) => Template | null;
  deleteTemplate: (id: string) => boolean;
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: [],
  categories: [],
  selectedCategory: null,
  
  loadTemplates: () => {
    // Carrega todos os templates
    const allTemplates = getAllTemplates();
    console.log('Loading templates from store, total count:', allTemplates.length);
    
    // Extrai categorias únicas dos templates
    const uniqueCategories = Array.from(
      new Set(allTemplates.map(template => template.category))
    );
    
    set({
      templates: allTemplates,
      categories: uniqueCategories
    });
  },
  
  selectCategory: (category) => {
    set({ selectedCategory: category });
  },
  
  getTemplatesByCategory: (category) => {
    const { templates } = get();
    if (!category) return templates;
    return templates.filter(template => template.category === category);
  },
  
  searchTemplates: (searchTerm, category) => {
    const { templates } = get();
    let filtered = [...templates];
    
    if (searchTerm) {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(template => template.category === category);
    }
    
    return filtered;
  },

  createTemplate: (templateData) => {
    const newTemplate: Template = {
      id: uuidv4(),
      ...templateData
    };

    set(state => ({
      templates: [...state.templates, newTemplate]
    }));

    console.log('Template created:', newTemplate.name);
    return newTemplate;
  },

  updateTemplate: (id, templateData) => {
    let updatedTemplate: Template | null = null;

    set(state => {
      const updatedTemplates = state.templates.map(template => {
        if (template.id === id) {
          updatedTemplate = { ...template, ...templateData };
          return updatedTemplate;
        }
        return template;
      });

      return { templates: updatedTemplates };
    });

    console.log('Template updated:', updatedTemplate?.name);
    return updatedTemplate;
  },

  deleteTemplate: (id) => {
    let success = false;

    set(state => {
      const filteredTemplates = state.templates.filter(template => {
        if (template.id === id) {
          success = true;
          return false;
        }
        return true;
      });

      return { templates: filteredTemplates };
    });

    console.log('Template deleted, success:', success);
    return success;
  }
}));
