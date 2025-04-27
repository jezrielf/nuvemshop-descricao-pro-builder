
import { Template } from '@/types/editor';
import { basicTemplates } from './basic';
import { supplementsTemplates } from './supplements';
import { shoesTemplates } from './shoes';
import { electronicsTemplates } from './electronics';
import { fashionTemplates } from './fashion';
import { accessoriesTemplates } from './accessories';
import { hauteCoutureTemplates } from './hauteCouture';
import { waterFilterTemplate } from './products/water-filter';

// Combining all templates
export const advancedTemplates: Template[] = [
  waterFilterTemplate,
  ...supplementsTemplates,
  ...shoesTemplates,
  ...electronicsTemplates,
  ...fashionTemplates,
  ...accessoriesTemplates,
  ...hauteCoutureTemplates
];

export const getAllTemplates = (): Template[] => {
  return [...basicTemplates, ...advancedTemplates];
};

// Export individual template collections
export * from './basic';
export * from './supplements';
export * from './shoes';
export * from './electronics';
export * from './fashion';
export * from './accessories';
export * from './hauteCouture';
export * from './products/water-filter';
