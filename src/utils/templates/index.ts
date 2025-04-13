
import { Template } from '@/types/editor';
import { basicTemplates } from './basic';
import { supplementsTemplate } from './supplements';
import { shoesTemplate } from './shoes';
import { electronicsTemplate } from './electronics';
import { healthTemplate } from './health';

// Combinando todos os templates
export const advancedTemplates: Template[] = [
  supplementsTemplate,
  shoesTemplate,
  electronicsTemplate,
  healthTemplate
];

export const getAllTemplates = (): Template[] => {
  return [...basicTemplates, ...advancedTemplates];
};

export * from './basic';
export * from './supplements';
export * from './shoes';
export * from './electronics';
export * from './health';
