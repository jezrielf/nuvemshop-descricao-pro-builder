
import { Template } from '@/types/editor';
import { basicTemplate } from './basic';
import { supplementsTemplates } from './supplements';
import { shoesTemplates } from './shoes';
import { electronicsTemplates } from './electronics';
import { healthTemplates } from './health';
import { fashionTemplates } from './fashion';
import { accessoriesTemplates } from './accessories';
import { hauteCoutureTemplates } from './hauteCouture';

// Combining all templates
export const basicTemplates = [basicTemplate];

// Combining all templates
export const advancedTemplates: Template[] = [
  ...supplementsTemplates,
  ...shoesTemplates,
  ...electronicsTemplates,
  ...healthTemplates,
  ...fashionTemplates,
  ...accessoriesTemplates,
  ...hauteCoutureTemplates
];

export const getAllTemplates = (): Template[] => {
  return [...basicTemplates, ...advancedTemplates];
};

export * from './basic';
export * from './supplements';
export * from './shoes';
export * from './electronics';
export * from './health';
export * from './fashion';
export * from './accessories';
export * from './hauteCouture';
