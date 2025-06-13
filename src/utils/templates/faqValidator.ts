
import { Block } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { deepClone } from '@/utils/deepClone';

/**
 * Valida e corrige blocos FAQ garantindo que cada pergunta tenha um ID único
 */
export const validateFAQBlock = (block: any): Block => {
  if (block.type === 'faq') {
    // Garantir que questions é um array
    if (!Array.isArray(block.questions)) {
      block.questions = [];
    }
    
    // Garantir que cada pergunta tem um ID único
    block.questions = block.questions.map((q: any) => ({
      ...q,
      id: q.id || uuidv4()
    }));
  }
  
  return block;
};

/**
 * Valida e corrige blocos de benefícios garantindo estrutura consistente
 */
export const validateBenefitsBlock = (block: any): Block => {
  if (block.type === 'benefits') {
    // Garantir que benefits é um array
    if (!Array.isArray(block.benefits)) {
      block.benefits = [];
    }
    
    // Garantir que cada benefício tem um ID único e icon
    block.benefits = block.benefits.map((benefit: any) => ({
      ...benefit,
      id: benefit.id || uuidv4(),
      icon: benefit.icon || '✓'
    }));
    
    // Garantir que existe a propriedade style
    if (!block.style || typeof block.style !== 'object') {
      block.style = {};
    }
  }
  
  return block;
};

/**
 * Valida e corrige blocos de recursos garantindo estrutura consistente
 */
export const validateFeaturesBlock = (block: any): Block => {
  if (block.type === 'features') {
    // Garantir que features é um array
    if (!Array.isArray(block.features)) {
      block.features = [];
    }
    
    // Garantir que cada recurso tem um ID único e icon
    block.features = block.features.map((feature: any) => ({
      ...feature,
      id: feature.id || uuidv4(),
      icon: feature.icon || '✓'
    }));
    
    // Garantir que existe a propriedade style
    if (!block.style || typeof block.style !== 'object') {
      block.style = {};
    }
  }
  
  return block;
};

/**
 * Valida e corrige blocos de especificações garantindo estrutura consistente
 */
export const validateSpecificationsBlock = (block: any): Block => {
  if (block.type === 'specifications') {
    // Corrigir estruturas inconsistentes nos templates
    if (Array.isArray(block.specifications)) {
      // Converter de specifications para specs com estrutura correta
      block.specs = block.specifications.map((spec: any) => ({
        id: spec.id || uuidv4(),
        name: spec.label || spec.name || 'Especificação',
        value: spec.value || 'Valor'
      }));
      delete block.specifications;
    }
    
    // Garantir que specs é um array
    if (!Array.isArray(block.specs)) {
      block.specs = [];
    }
    
    // Garantir que cada especificação tem um ID único
    block.specs = block.specs.map((spec: any) => ({
      ...spec,
      id: spec.id || uuidv4(),
      name: spec.name || 'Especificação',
      value: spec.value || 'Valor'
    }));
    
    // Garantir que existe a propriedade style
    if (!block.style || typeof block.style !== 'object') {
      block.style = {};
    }
  }
  
  return block;
};

/**
 * Valida e corrige blocos de galeria garantindo estrutura consistente
 */
export const validateGalleryBlock = (block: any): Block => {
  if (block.type === 'gallery') {
    // Garantir que images é um array
    if (!Array.isArray(block.images)) {
      block.images = [];
    }
    
    // Garantir que cada imagem tem um ID único
    block.images = block.images.map((image: any) => ({
      ...image,
      id: image.id || uuidv4(),
      src: image.src || 'https://via.placeholder.com/800x600',
      alt: image.alt || 'Imagem da galeria',
      caption: image.caption || ''
    }));
    
    // Garantir que existe a propriedade style
    if (!block.style || typeof block.style !== 'object') {
      block.style = {};
    }
  }
  
  return block;
};

/**
 * Valida e corrige todos os tipos de blocos com estruturas complexas
 */
export const validateTemplateBlocks = (blocks: Block[]): Block[] => {
  return blocks.map(block => {
    // Criar deep copy do bloco para evitar mutação do original
    let validatedBlock = deepClone(block);
    
    // Aplicar validações específicas por tipo de bloco
    validatedBlock = validateFAQBlock(validatedBlock);
    validatedBlock = validateBenefitsBlock(validatedBlock);
    validatedBlock = validateFeaturesBlock(validatedBlock);
    validatedBlock = validateSpecificationsBlock(validatedBlock);
    validatedBlock = validateGalleryBlock(validatedBlock);
    
    // Garantir que todos os blocos tenham ID único
    if (!validatedBlock.id) {
      validatedBlock.id = uuidv4();
    }
    
    // Garantir que todos os blocos tenham style inicializado
    if (!validatedBlock.style || typeof validatedBlock.style !== 'object') {
      validatedBlock.style = {};
    }
    
    return validatedBlock;
  });
};
