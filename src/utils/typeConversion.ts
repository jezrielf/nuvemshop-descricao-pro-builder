
import { Block, BlockType } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators/createBlock';

export function ensureBlockType(block: any): Block {
  if (!block || typeof block !== 'object') {
    console.warn('Invalid block provided:', block);
    return createBlock('text');
  }
  
  if (!block.type || !block.id) {
    console.warn('Block missing required properties:', block);
    return createBlock('text');
  }
  
  // First, make a shallow copy of the block to avoid mutation
  const blockCopy = { ...block };
  
  // Ensure the block has all required base properties
  const blockWithDefaults = {
    visible: true,
    columns: 'full',
    title: blockCopy.title || getDefaultTitle(blockCopy.type as BlockType),
    style: blockCopy.style || {},
    ...blockCopy
  };
  
  // Make sure required type-specific properties exist
  switch (blockWithDefaults.type) {
    case 'text':
      if (!blockWithDefaults.content) blockWithDefaults.content = '';
      if (!blockWithDefaults.heading) blockWithDefaults.heading = 'Texto';
      break;
    case 'hero':
      if (!blockWithDefaults.heading) blockWithDefaults.heading = 'Título Principal';
      if (!blockWithDefaults.subheading) blockWithDefaults.subheading = 'Subtítulo';
      break;
    case 'features':
      if (!blockWithDefaults.features) blockWithDefaults.features = [];
      break;
    case 'benefits':
      if (!blockWithDefaults.benefits) blockWithDefaults.benefits = [];
      break;
    case 'specifications':
      if (!blockWithDefaults.specs) blockWithDefaults.specs = [];
      break;
    case 'image':
      if (!blockWithDefaults.src) blockWithDefaults.src = '';
      if (!blockWithDefaults.alt) blockWithDefaults.alt = '';
      break;
    case 'gallery':
      if (!blockWithDefaults.images) blockWithDefaults.images = [];
      break;
    case 'imageText':
    case 'textImage':
      if (!blockWithDefaults.image) blockWithDefaults.image = { src: '', alt: '' };
      if (!blockWithDefaults.content) blockWithDefaults.content = '';
      break;
    case 'faq':
      if (!blockWithDefaults.questions) blockWithDefaults.questions = [];
      break;
    case 'cta':
      if (!blockWithDefaults.heading) blockWithDefaults.heading = 'Chamada para ação';
      if (!blockWithDefaults.content) blockWithDefaults.content = '';
      if (!blockWithDefaults.buttonText) blockWithDefaults.buttonText = 'Clique aqui';
      break;
    case 'video':
      if (!blockWithDefaults.videoUrl) blockWithDefaults.videoUrl = '';
      break;
  }
  
  return blockWithDefaults as Block;
}

function getDefaultTitle(type: BlockType): string {
  const titles: Record<BlockType, string> = {
    hero: 'Banner Principal',
    text: 'Texto',
    features: 'Recursos',
    benefits: 'Benefícios',
    specifications: 'Especificações',
    image: 'Imagem',
    gallery: 'Galeria',
    imageText: 'Imagem e Texto',
    textImage: 'Texto e Imagem',
    faq: 'Perguntas Frequentes',
    cta: 'Chamada para Ação',
    video: 'Vídeo'
  };
  
  return titles[type] || 'Bloco';
}
