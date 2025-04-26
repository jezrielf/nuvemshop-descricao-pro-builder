
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
  
  // Ensure the block has all required base properties
  const blockWithDefaults = {
    visible: true,
    columns: 'full',
    title: block.title || getDefaultTitle(block.type as BlockType),
    style: block.style || {},
    ...block
  };
  
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
    video: 'Vídeo',
    videoText: 'Vídeo e Texto',
    textVideo: 'Texto e Vídeo',
    carousel: 'Carrossel'
  };
  
  return titles[type] || 'Bloco';
}
