
import { Template } from '@/types/editor';
import { basicTemplates } from './basic';
import { supplementsTemplates } from './supplements';
import { shoesTemplates } from './shoes';
import { electronicsTemplates } from './electronics';
import { fashionTemplates } from './fashion';
import { accessoriesTemplates } from './accessories';
import { hauteCoutureTemplates } from './hauteCouture';
import { waterFilterTemplate } from './products/water-filter';

// Combining all templates with proper categorization
export const advancedTemplates: Template[] = [
  waterFilterTemplate,
  ...supplementsTemplates,
  ...shoesTemplates,
  ...electronicsTemplates,
  ...fashionTemplates,
  ...accessoriesTemplates,
  ...hauteCoutureTemplates
];

// Enhanced getAllTemplates function with error handling
export const getAllTemplates = (): Template[] => {
  try {
    const templates = [...basicTemplates, ...advancedTemplates];
    console.log(`Successfully loaded ${templates.length} templates`);
    return templates;
  } catch (error) {
    console.error('Error loading templates:', error);
    // Return at least basic templates as fallback
    return [...basicTemplates];
  }
};

// Export individual template collections for granular access
export * from './basic';
export * from './supplements';
export * from './shoes';
export * from './electronics';
export * from './fashion';
export * from './accessories';
export * from './hauteCouture';
export * from './products/water-filter';
