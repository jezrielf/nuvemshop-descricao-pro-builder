
import { Block, TextBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators/createBlock';
import { sanitizeHtmlContent } from '../analyzers/utils';

export const createBasicTextBlock = (htmlContent: string, blocks: Block[], title?: string): void => {
  try {
    const textBlock = createBlock('text') as TextBlock;
    
    // Limpar o HTML
    htmlContent = sanitizeHtmlContent(htmlContent);
    
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    
    const heading = tempElement.querySelector('h1, h2, h3');
    if (heading) {
      textBlock.heading = heading.textContent?.trim() || title || 'Texto';
      heading.remove();
    } else if (title) {
      textBlock.heading = title;
    }
    
    textBlock.content = tempElement.innerHTML.trim() || '<p>Adicione conteúdo aqui</p>';
    blocks.push(textBlock);
  } catch (error) {
    console.error('Erro ao criar bloco de texto básico:', error);
    try {
      const fallbackBlock = createBlock('text') as TextBlock;
      fallbackBlock.title = title || 'Texto Importado';
      fallbackBlock.heading = title || 'Texto Importado';
      fallbackBlock.content = '<p>Conteúdo importado</p>';
      blocks.push(fallbackBlock);
    } catch (e) {
      console.error('Erro crítico ao criar bloco de fallback:', e);
    }
  }
};
