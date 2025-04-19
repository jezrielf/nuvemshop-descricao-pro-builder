
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators/createBlock';
import { TextBlock } from '@/types/editor';
import { sanitizeHtmlContent } from '../utils';

export const createFallbackBlock = (container: Element, blocks: Block[]): void => {
  const textBlock = createBlock('text') as TextBlock;
  textBlock.content = sanitizeHtmlContent(container.innerHTML);
  textBlock.title = 'Conteúdo Importado';
  blocks.push(textBlock);
};
