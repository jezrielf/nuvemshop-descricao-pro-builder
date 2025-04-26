
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Generate an empty template with default structure
export const createEmptyTemplate = (name: string, category: string): Template => {
  return {
    id: uuidv4(),
    name,
    description: '',
    category: category as any,
    blocks: [],
    thumbnailUrl: '/templates/empty.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// Default category options for templates
export const defaultCategories = [
  { value: 'all', label: 'Todas categorias' },
  { value: 'supplements', label: 'Suplementos' },
  { value: 'clothing', label: 'Roupas' },
  { value: 'accessories', label: 'Acessórios' },
  { value: 'shoes', label: 'Calçados' },
  { value: 'Eletrônicos', label: 'Eletrônicos' },
  { value: 'energy', label: 'Energia' },
  { value: 'Casa e decoração', label: 'Casa e decoração' },
  { value: 'other', label: 'Outros' },
];

// Default templates for new installations
export const defaultTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Template Básico',
    description: 'Um modelo básico para iniciar sua descrição de produto',
    category: 'other' as any,
    blocks: [],
    thumbnailUrl: '/templates/default.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
