
import { Template, ProductCategory, TextBlock } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { createBlock } from '../blockCreators/createBlock';
import { analyzeDocument } from './modules/documentAnalyzer';
import { sanitizeHtmlContent } from './modules/utils';

export const analyzeHtmlForTemplate = (htmlInput: string, category: ProductCategory): Template => {
  const parsedBlocks = [];
  let doc: Document;

  try {
    const parser = new DOMParser();
    doc = parser.parseFromString(htmlInput, 'text/html');
  
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    analyzeDocument(doc, parsedBlocks);

    if (parsedBlocks.length === 0) {
      const textBlock = createBlock('text', 1) as TextBlock;
      textBlock.content = sanitizeHtmlContent(htmlInput);
      parsedBlocks.push(textBlock);
    }
  } catch (error) {
    console.error('Error parsing HTML:', error);
    const textBlock = createBlock('text', 1) as TextBlock;
    textBlock.content = sanitizeHtmlContent(htmlInput);
    parsedBlocks.push(textBlock);
  }

  return {
    id: uuidv4(),
    name: 'Template from HTML',
    category,
    blocks: parsedBlocks
  };
};

