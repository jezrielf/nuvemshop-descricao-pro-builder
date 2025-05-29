import { Template } from '@/types/editor';
import { supplementsTemplates } from './supplements';
import { fashionTemplates } from './fashion';
import { accessoriesTemplates } from './accessories';
import { gemBlendTemplate } from './products/gem-blend';
import { shoesTemplates } from './shoes';
import { casaDecoracaoTemplates } from './casa-decoracao';
import { eletronicoTemplates } from './eletronicos';
import { belezaTemplates } from './beleza';
import { petShopTemplates } from './pet-shop';
import { saudeTemplates } from './saude';
import { vestuarioTemplates } from './vestuario';
import { acessoriosLuxoTemplates } from './acessorios-luxo';
import { modaLuxoTemplates } from './moda-luxo';
import { produtosIntimosTemplates } from './produtos-intimos';

// Debug logging for template loading
console.log('Loading templates from individual files:');
console.log('- Supplements templates:', supplementsTemplates.length);
console.log('- Fashion templates:', fashionTemplates.length);
console.log('- Accessories templates:', accessoriesTemplates.length);
console.log('- Gem blend template:', gemBlendTemplate ? 1 : 0);
console.log('- Shoes templates:', shoesTemplates.length);
console.log('- Casa decoração templates:', casaDecoracaoTemplates.length);
console.log('- Eletrônicos templates:', eletronicoTemplates.length);
console.log('- Beleza templates:', belezaTemplates.length);
console.log('- Pet Shop templates:', petShopTemplates.length);
console.log('- Saúde templates:', saudeTemplates.length);
console.log('- Vestuário templates:', vestuarioTemplates.length);
console.log('- Acessórios Luxo templates:', acessoriosLuxoTemplates.length);
console.log('- Moda Luxo templates:', modaLuxoTemplates.length);
console.log('- Produtos Íntimos templates:', produtosIntimosTemplates.length);

// Combining all templates including the new ones
export const allTemplates: Template[] = [
  ...supplementsTemplates,
  ...fashionTemplates,
  ...accessoriesTemplates,
  gemBlendTemplate,
  ...shoesTemplates,
  ...casaDecoracaoTemplates,
  ...eletronicoTemplates,
  ...belezaTemplates,
  ...petShopTemplates,
  ...saudeTemplates,
  ...vestuarioTemplates,
  ...acessoriosLuxoTemplates,
  ...modaLuxoTemplates,
  ...produtosIntimosTemplates
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
export * from './eletronicos';
export * from './beleza';
export * from './pet-shop';
export * from './saude';
export * from './vestuario';
export * from './acessorios-luxo';
export * from './moda-luxo';
export * from './produtos-intimos';
