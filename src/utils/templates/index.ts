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
import { validateTemplateBlocks } from './faqValidator';
import { deepClone } from '@/utils/deepClone';

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

// Enhanced validation function that also creates deep copies
const validateTemplate = (template: Template): Template => {
  // Create deep copy to prevent reference sharing between template instances
  const clonedTemplate = deepClone(template);
  
  return {
    ...clonedTemplate,
    blocks: validateTemplateBlocks(clonedTemplate.blocks)
  };
};

// Combining all templates including the new ones and validating them
export const allTemplates: Template[] = [
  ...supplementsTemplates.map(validateTemplate),
  ...fashionTemplates.map(validateTemplate),
  ...accessoriesTemplates.map(validateTemplate),
  validateTemplate(gemBlendTemplate),
  ...shoesTemplates.map(validateTemplate),
  ...casaDecoracaoTemplates.map(validateTemplate),
  ...eletronicoTemplates.map(validateTemplate),
  ...belezaTemplates.map(validateTemplate),
  ...petShopTemplates.map(validateTemplate),
  ...saudeTemplates.map(validateTemplate),
  ...vestuarioTemplates.map(validateTemplate),
  ...acessoriosLuxoTemplates.map(validateTemplate),
  ...modaLuxoTemplates.map(validateTemplate),
  ...produtosIntimosTemplates.map(validateTemplate)
];

console.log('Total templates combined:', allTemplates.length);
console.log('Template names:', allTemplates.map(t => t.name));

export const getAllTemplates = (): Template[] => {
  try {
    console.log(`getAllTemplates() - Successfully loaded ${allTemplates.length} templates`);
    allTemplates.forEach((template, index) => {
      console.log(`Template ${index + 1}: ${template.name} (${template.category}) - ${template.blocks.length} blocks`);
      
      template.blocks.forEach(block => {
        if (block.type === 'faq') {
          console.log(`FAQ block in ${template.name}: ${(block as any).questions?.length || 0} questions with IDs`);
        }
      });
    });
    
    // Return deep copies to ensure each usage gets independent instances
    return allTemplates.map(template => deepClone(template));
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

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
export * from './faqValidator';
