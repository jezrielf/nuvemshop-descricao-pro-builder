
import { Template } from '@/types/editor';
import { gemBlendTemplate } from './products/gem-blend';

// Log para debug dos templates premium
console.log('Loading premium templates only...');

// Mantemos apenas o template Gem Blend do sistema antigo (será substituído pelo premium)
export const allTemplates: Template[] = [
  gemBlendTemplate
];

console.log('Total templates from utils:', allTemplates.length);

// Enhanced getAllTemplates function with error handling
export const getAllTemplates = (): Template[] => {
  try {
    console.log(`getAllTemplates() - Successfully loaded ${allTemplates.length} templates from utils`);
    return allTemplates;
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

// Re-export apenas o que será usado
export * from './products/gem-blend';
