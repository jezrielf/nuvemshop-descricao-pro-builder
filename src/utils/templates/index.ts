
import { Template } from '@/types/editor';
import { supplementsTemplates } from './supplements';
import { fashionTemplates } from './fashion';
import { accessoriesTemplates } from './accessories';
import { gemBlendTemplate } from './products/gem-blend';
import { shoesTemplates } from './shoes';
import { casaDecoracaoTemplates } from './casa-decoracao';

// Debug logging for template loading
console.log('Loading templates from individual files:');
console.log('- Supplements templates:', supplementsTemplates.length);
console.log('- Fashion templates:', fashionTemplates.length);
console.log('- Accessories templates:', accessoriesTemplates.length);
console.log('- Gem blend template:', gemBlendTemplate ? 1 : 0);
console.log('- Shoes templates:', shoesTemplates.length);
console.log('- Casa decoração templates:', casaDecoracaoTemplates.length);

// Combining only the selected templates
export const allTemplates: Template[] = [
  ...supplementsTemplates,
  ...fashionTemplates,
  ...accessoriesTemplates,
  gemBlendTemplate,
  ...shoesTemplates,
  ...casaDecoracaoTemplates
];

console.log('Total templates combined:', allTemplates.length);
console.log('Template names:', allTemplates.map(t => t.name));

// Enhanced getAllTemplates function with error handling
export const getAllTemplates = (): Template[] => {
  try {
    console.log(`getAllTemplates() - Successfully loaded ${allTemplates.length} templates`);
    allTemplates.forEach((template, index) => {
      console.log(`Template ${index + 1}: ${template.name} (${template.category}) - ${template.blocks.length} blocks`);
    });
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
