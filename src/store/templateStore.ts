
import { create } from 'zustand';
import { Template } from '@/types/editor';
import { getAllTemplates } from '@/utils/templates';

interface TemplateState {
  templates: Template[];
  categories: string[];
  selectedCategory: string | null;
  loadTemplates: () => void;
  selectCategory: (category: string | null) => void;
  getTemplatesByCategory: (category: string | null) => Template[];
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: [],
  categories: [],
  selectedCategory: null,
  
  loadTemplates: () => {
    // Carrega todos os templates
    const allTemplates = getAllTemplates();
    
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
  }
}));
