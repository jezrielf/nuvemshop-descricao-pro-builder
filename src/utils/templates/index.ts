
import { Template } from '@/types/editor';
import { supplementsTemplates } from './supplements';
import { fashionTemplates } from './fashion';
import { accessoriesTemplates } from './accessories';
import { gemBlendTemplate } from './products/gem-blend';
import { shoesTemplates } from './shoes';
import { casaDecoracaoTemplates } from './casa-decoracao';

// Combining only the selected templates
export const allTemplates: Template[] = [
  ...supplementsTemplates,
  ...fashionTemplates,
  ...accessoriesTemplates,
  gemBlendTemplate,
  ...shoesTemplates,
  ...casaDecoracaoTemplates
];

// Enhanced getAllTemplates function with error handling
export const getAllTemplates = (): Template[] => {
  try {
    console.log(`Successfully loaded ${allTemplates.length} templates`);
    return allTemplates;
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

// Export individual template collections for granular access
export * from './supplements';
export * from './fashion';
export * from './accessories';
export * from './products/gem-blend';
export * from './shoes';
export * from './casa-decoracao';
