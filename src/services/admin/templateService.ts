
import { Template, BlockType } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { convertBlock } from '@/utils/blockConverter';

// Mock database of templates
let templates: Template[] = [
  {
    id: '1',
    name: 'Template Básico',
    description: 'Template simples com estrutura básica',
    category: 'supplements',
    blocks: [],
    thumbnailUrl: '/templates/basic.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Vitaminas e Minerais',
    description: 'Para produtos de suplementação diária',
    category: 'supplements',
    blocks: [],
    thumbnailUrl: '/templates/vitamins.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Roupas Esportivas',
    description: 'Para produtos de vestuário esportivo',
    category: 'clothing',
    blocks: [],
    thumbnailUrl: '/templates/sportswear.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

export const fetchTemplates = async (): Promise<Template[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return the templates
  return templates;
};

export const fetchTemplatesByCategory = async (category: string): Promise<Template[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Filter templates by category
  return templates.filter(template => template.category === category);
};

export const fetchTemplateById = async (id: string): Promise<Template | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Find template by ID
  const template = templates.find(t => t.id === id);
  return template || null;
};

export const createTemplate = async (template: Omit<Template, 'id'>): Promise<Template> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Create a new template with a unique ID
  const newTemplate: Template = {
    ...template,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Add to the templates array
  templates = [...templates, newTemplate];

  return newTemplate;
};

export const updateTemplate = async (id: string, update: Partial<Template>): Promise<Template | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Find the index of the template to update
  const index = templates.findIndex(t => t.id === id);
  if (index === -1) {
    return null;
  }

  // Update the template
  const updatedTemplate: Template = {
    ...templates[index],
    ...update,
    updatedAt: new Date().toISOString()
  };
  templates[index] = updatedTemplate;

  return updatedTemplate;
};

export const deleteTemplate = async (id: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Filter out the template to delete
  const initialLength = templates.length;
  templates = templates.filter(t => t.id !== id);
  return templates.length < initialLength;
};

export const convertLegacyTemplates = async (legacyTemplates: any[]): Promise<Template[]> => {
  return legacyTemplates.map(item => {
    const template: Template = {
      id: item.id || uuidv4(),
      name: item.name || 'Template sem título',
      description: item.description || '',
      category: item.category as any || 'other',
      blocks: Array.isArray(item.blocks) ? item.blocks : [],
      thumbnailUrl: item.thumbnailUrl || '',
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
    };
    return template;
  });
};

export const cloneTemplate = async (id: string): Promise<Template | null> => {
  // Find the template to clone
  const template = templates.find(t => t.id === id);
  if (!template) {
    return null;
  }

  // Create a clone with a new ID
  const clone: Template = {
    ...template,
    id: uuidv4(),
    name: `${template.name} (Cópia)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Add to the templates array
  templates = [...templates, clone];

  return clone;
};

export default {
  fetchTemplates,
  fetchTemplatesByCategory,
  fetchTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  convertLegacyTemplates,
  cloneTemplate,
};
