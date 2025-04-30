
import { Block } from '@/types/editor';
import { analyzeDocument } from './analyzers/documentAnalyzer';
import { createBasicTextBlock } from './creators/sectionCreators';
import { cleanupHtml } from './utils/htmlCleaner';
import { isSimpleTextFragment } from './analyzers/utils/textFragmentAnalyzer';
import { processCustomBlocks } from './analyzers/utils/customBlockProcessor';
import { processSpecificationsFromList } from './analyzers/specificationsListAnalyzer';

export const parseHtmlToBlocks = (htmlContent: string): Block[] => {
  if (!htmlContent.trim()) {
    return [];
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Remover scripts, iframes e outros elementos potencialmente perigosos
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.remove());
    
    // Limpa a palavra "check" que aparece na importação
    const checkTexts = doc.querySelectorAll('body *');
    checkTexts.forEach(element => {
      if (element.childNodes.length === 1 && 
          element.childNodes[0].nodeType === Node.TEXT_NODE && 
          element.textContent?.trim() === 'check') {
        element.remove();
      }
      
      // Também limpa nós de texto que começam com "check "
      element.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim().startsWith('check ')) {
          node.textContent = node.textContent.replace(/^check\s+/, '');
        }
      });
    });

    const parsedBlocks: Block[] = [];
    
    // Verifica se é uma descrição personalizada do nosso editor
    const hasCustomBlocks = doc.querySelector('.nuvemshop-product-description') !== null;
    
    if (hasCustomBlocks) {
      console.log('Detectada descrição personalizada gerada pelo editor');
      processCustomBlocks(doc, parsedBlocks);
    } else {
      console.log('Convertendo HTML simples em blocos estruturados');
      
      // Verifica se temos uma lista que parece ser especificações ou cuidados
      const hasCareInstructions = doc.body.textContent?.includes('Cuidados') || 
                                doc.body.textContent?.includes('cuidados') ||
                                doc.body.textContent?.includes('Instruções');
      
      // Se encontramos elementos que parecem ser uma lista de cuidados ou especificações
      const hasListItems = doc.querySelectorAll('li, dt, dd').length > 0 ||
                          doc.querySelectorAll('p + p').length >= 3;
      
      if (hasCareInstructions && hasListItems) {
        console.log('Detectadas instruções de cuidados, convertendo para bloco de especificações');
        processSpecificationsFromList(doc.body, parsedBlocks);
      } else {
        analyzeDocument(doc.body, parsedBlocks);
      }
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
