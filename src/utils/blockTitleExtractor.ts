
import { Block } from '@/types/editor';

/**
 * Extrai o título/cabeçalho de um bloco baseado no seu tipo
 */
export function extractBlockTitle(block: Block): string | null {
  if (!block) return null;

  switch (block.type) {
    case 'hero':
      return block.heading || null;
    
    case 'text':
      return block.heading || null;
    
    case 'features':
      return block.heading || null;
    
    case 'benefits':
      return block.heading || null;
    
    case 'specifications':
      return block.heading || null;
    
    case 'gallery':
      return block.heading || null;
    
    case 'imageText':
      return block.heading || null;
    
    case 'textImage':
      return block.heading || null;
    
    case 'faq':
      return block.heading || null;
    
    case 'cta':
      return block.heading || null;
    
    case 'image':
      return block.alt || block.caption || null;
    
    case 'video':
      return block.title || block.caption || null;
    
    default:
      return null;
  }
}

/**
 * Trunca um texto se for muito longo e adiciona reticências
 */
export function truncateText(text: string, maxLength: number = 25): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Formata o título do bloco para exibição no header
 */
export function formatBlockTitle(blockType: string, blockTitle: string | null): string {
  if (!blockTitle || blockTitle.trim() === '') {
    return blockType;
  }
  
  const truncatedTitle = truncateText(blockTitle.trim());
  return `${blockType} - ${truncatedTitle}`;
}
