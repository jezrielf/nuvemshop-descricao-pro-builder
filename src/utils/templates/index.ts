
import { Template } from '@/types/editor';
import { basicTemplate } from './basic';
import { supplementsTemplates } from './supplements';
// Import with the correct names
import { shoesTemplateA, shoesTemplateB } from './shoes';
import { electronicsTemplate } from './electronics';
import { healthTemplate } from './health';
import { fashionTemplate } from './fashion';
import { accessoriesTemplate } from './accessories';
import { hauteCoutureTemplate } from './hauteCouture';

// Combining all templates
export const basicTemplates = [basicTemplate];

// Create arrays for templates that are exported as single objects
const shoesTemplates = [shoesTemplateA, shoesTemplateB];
const electronicsTemplates = [electronicsTemplate];
const healthTemplates = [healthTemplate];
const fashionTemplates = [fashionTemplate];
const accessoriesTemplates = [accessoriesTemplate];
const hauteCoutureTemplates = [hauteCoutureTemplate];

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

// Export the arrays for use in other files
export { shoesTemplates, electronicsTemplates, healthTemplates, fashionTemplates, accessoriesTemplates, hauteCoutureTemplates };
