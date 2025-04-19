
import { Block } from '@/types/editor';
import { analyzeDocument } from './analyzers/documentAnalyzer';
import { createBasicTextBlock } from './creators/sectionCreators';
import { cleanupHtml } from './utils/htmlCleaner';
import { isSimpleTextFragment } from './analyzers/sectionTypeDetector';

export const parseHtmlToBlocks = (htmlContent: string): Block[] => {
  if (!htmlContent.trim()) {
    return [];
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    const parsedBlocks: Block[] = [];
    
    const hasCustomBlocks = doc.querySelector('.nuvemshop-product-description') !== null;
    
    if (hasCustomBlocks) {
      console.log('Detectada descrição personalizada gerada pelo editor');
      processCustomBlocks(doc, parsedBlocks);
    } else {
      console.log('Convertendo HTML simples em blocos estruturados');
      analyzeDocument(doc.body, parsedBlocks);
    }

    if (parsedBlocks.length === 0) {
      console.log('Nenhum bloco identificado, criando bloco de texto básico');
      createBasicTextBlock(htmlContent, parsedBlocks);
    }

    console.log('Blocos gerados:', parsedBlocks);
    return parsedBlocks;
  } catch (error) {
    console.error('Erro ao analisar HTML em blocos:', error);
    const blocks: Block[] = [];
    createBasicTextBlock(htmlContent, blocks);
    return blocks;
  }
};

const processCustomBlocks = (doc: Document, blocks: Block[]): void => {
  const container = doc.querySelector('.nuvemshop-product-description');
  if (!container) return;
  
  const blockElements = container.querySelectorAll('[id^="product-block-"]');
  
  if (blockElements.length > 0) {
    blockElements.forEach(element => {
      if (isSimpleTextFragment(element)) {
        createBasicTextBlock(element.innerHTML, blocks);
      } else {
        analyzeDocument(element, blocks);
      }
    });
  } else {
    analyzeDocument(container, blocks);
  }
};
