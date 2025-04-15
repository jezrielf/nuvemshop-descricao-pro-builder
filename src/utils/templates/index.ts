
import { Template } from '@/types/editor';
import { basicTemplate } from './basic';
import { supplementsTemplates } from './supplements';
// Import templates individually
import { shoesTemplateA, shoesTemplateB } from './shoes';
import { electronicsTemplate } from './electronics';
import { healthTemplate } from './health';
import { fashionTemplate } from './fashion';
import { accessoriesTemplate } from './accessories';
import { hauteCoutureTemplate } from './hauteCouture';

// Combining all templates
export const basicTemplates = [basicTemplate];

// Create arrays for templates that are exported as single objects
export const shoesTemplates = [shoesTemplateA, shoesTemplateB];
export const electronicsTemplates = [electronicsTemplate];
export const healthTemplates = [healthTemplate];
export const fashionTemplates = [fashionTemplate];
export const accessoriesTemplates = [accessoriesTemplate];
export const hauteCoutureTemplates = [hauteCoutureTemplate];

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
