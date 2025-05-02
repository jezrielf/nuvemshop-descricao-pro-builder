
import { Template } from '@/types/editor';
import { basicTemplates } from './basic';
import { supplementsTemplates } from './supplements';
import { shoesTemplates } from './shoes';
import { electronicsTemplates } from './electronics';
import { fashionTemplates } from './clothing';
import { accessoriesTemplates } from './accessories';
import { casaDecoracaoTemplates } from './casa-decoracao';

// Combining all templates with proper categorization
export const allTemplates: Template[] = [
  ...supplementsTemplates,
  ...shoesTemplates,
  ...electronicsTemplates,
  ...fashionTemplates,
  ...accessoriesTemplates,
  ...casaDecoracaoTemplates,
  ...basicTemplates
];

// Enhanced getAllTemplates function with error handling
export const getAllTemplates = (): Template[] => {
  try {
    console.log(`Successfully loaded ${allTemplates.length} templates`);
    return allTemplates;
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
export * from './clothing';
export * from './accessories';
export * from './casa-decoracao';
