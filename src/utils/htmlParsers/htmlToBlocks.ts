
import { Block } from '@/types/editor';
import { analyzeDocument } from './analyzers/documentAnalyzer';
import { v4 as uuidv4 } from 'uuid';

/**
 * Analisa descrições HTML de produtos e converte em blocos editáveis
 * @param htmlContent string HTML da descrição do produto
 * @returns Array de blocos estruturados
 */
export const parseHtmlToBlocks = (htmlContent: string): Block[] => {
  if (!htmlContent.trim()) {
    return [];
  }

  try {
    // Criar um documento DOM para analisar
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Remove scripts por segurança
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    // Array para armazenar os blocos analisados
    const parsedBlocks: Block[] = [];

    // Verificar se este HTML já foi gerado pelo nosso editor
    const hasCustomBlocks = doc.querySelector('.nuvemshop-product-description') !== null;
    
    if (hasCustomBlocks) {
      console.log('Detectada descrição personalizada gerada pelo editor');
      // Processar HTML com blocos já marcados pelo editor
      processCustomBlocks(doc, parsedBlocks);
    } else {
      console.log('Convertendo HTML simples em blocos estruturados');
      // Para HTML normal, usa o analisador para identificar e converter seções
      analyzeDocument(doc, parsedBlocks);
    }

    // Garantir que temos pelo menos um bloco
    if (parsedBlocks.length === 0) {
      console.log('Nenhum bloco identificado, criando bloco de texto básico');
      // Se nenhum bloco for identificado, cria pelo menos um bloco de texto com o conteúdo
      createBasicTextBlock(htmlContent, parsedBlocks);
    }

    console.log('Blocos gerados:', parsedBlocks);
    return parsedBlocks;
  } catch (error) {
    console.error('Erro ao analisar HTML em blocos:', error);
    return [];
  }
};

/**
 * Processa HTML que já foi gerado pelo nosso editor anteriormente
 */
const processCustomBlocks = (doc: Document, blocks: Block[]): void => {
  // Encontra o container principal das descrições
  const container = doc.querySelector('.nuvemshop-product-description');
  if (!container) return;
  
  // Procura por blocos individuais que tenham ID ou atributos que indicam tipo
  const blockElements = container.querySelectorAll('[id^="product-block-"]');
  
  if (blockElements.length > 0) {
    // Processa cada elemento de bloco
    blockElements.forEach(element => {
      // Tenta extrair o ID original do bloco
      const idMatch = element.id?.match(/product-block-(.*)/);
      const blockId = idMatch ? idMatch[1] : uuidv4();
      
      // Verifica se há atributos que indicam o tipo de bloco
      let blockType = element.getAttribute('data-block-type') || 'text';
      
      // Se não tiver tipo explícito, tenta inferir pelo conteúdo
      if (blockType === 'text') {
        if (element.querySelector('img')) {
          if (element.querySelectorAll('img').length > 1) {
            blockType = 'gallery';
          } else {
            blockType = 'image';
          }
        } else if (element.querySelector('h1, h2') && element.querySelector('a.button, .btn, button')) {
          blockType = 'hero';
        } else if (element.querySelectorAll('li').length > 3) {
          blockType = 'features';
        } else if (element.querySelectorAll('dt, dd').length > 0) {
          blockType = 'specifications';
        }
      }
      
      // Passa para o analisador de blocos para criar o bloco apropriado
      analyzeSection(element, blocks, blockType, blockId);
    });
  } else {
    // Se não encontrar blocos marcados, analisa o conteúdo do container
    analyzeDocument(container, blocks);
  }
};

/**
 * Analisa uma seção e cria o bloco apropriado
 */
const analyzeSection = (element: Element, blocks: Block[], forcedType: string = '', blockId: string = uuidv4()): void => {
  // Importa os analisadores de seção
  import('./analyzers/sectionAnalyzers').then(({ 
    processHeroSection, 
    processGallerySection, 
    processFeatureSection, 
    processFAQSection, 
    processCTASection, 
    processImageTextSection 
  }) => {
    // Aplica o tipo forçado se fornecido
    const type = forcedType || determineBlockType(element);
    
    try {
      switch (type) {
        case 'hero':
          processHeroSection(element, blocks);
          break;
        case 'gallery':
          const images = element.querySelectorAll('img');
          processGallerySection(element, images, blocks);
          break;
        case 'features':
          processFeatureSection(element, blocks);
          break;
        case 'faq':
          processFAQSection(element, blocks);
          break;
        case 'cta':
          processCTASection(element, blocks);
          break;
        case 'image':
          const img = element.querySelector('img');
          if (img) {
            processImageTextSection(element, img, blocks, false, true);
          } else {
            createBasicTextBlock(element.innerHTML, blocks);
          }
          break;
        case 'imageText':
          const imgEl = element.querySelector('img');
          if (imgEl) {
            processImageTextSection(element, imgEl, blocks);
          } else {
            createBasicTextBlock(element.innerHTML, blocks);
          }
          break;
        case 'textImage':
          const imgEl2 = element.querySelector('img');
          if (imgEl2) {
            processImageTextSection(element, imgEl2, blocks, true);
          } else {
            createBasicTextBlock(element.innerHTML, blocks);
          }
          break;
        default:
          createBasicTextBlock(element.innerHTML, blocks);
      }
    } catch (error) {
      console.error(`Erro ao processar seção do tipo ${type}:`, error);
      createBasicTextBlock(element.innerHTML, blocks);
    }
  }).catch(error => {
    console.error('Erro ao importar analisadores de seção:', error);
    createBasicTextBlock(element.innerHTML, blocks);
  });
};

/**
 * Determina o tipo de bloco com base no conteúdo do elemento
 */
const determineBlockType = (element: Element): string => {
  if (element.querySelector('h1, .hero, .banner')) {
    return 'hero';
  }
  
  const images = element.querySelectorAll('img');
  if (images.length > 2) {
    return 'gallery';
  } else if (images.length === 1) {
    return 'imageText';
  }
  
  if (element.querySelectorAll('li').length > 3) {
    return 'features';
  }
  
  if (element.querySelectorAll('dt, dd').length > 0) {
    return 'specifications';
  }
  
  if (element.querySelector('details, .faq-item, .accordion-item')) {
    return 'faq';
  }
  
  if (element.querySelector('a.button, .btn, button') && 
      element.textContent && element.textContent.length < 300) {
    return 'cta';
  }
  
  return 'text';
};

/**
 * Cria um bloco de texto básico com o conteúdo HTML fornecido
 */
const createBasicTextBlock = (htmlContent: string, blocks: Block[]): void => {
  import('@/utils/blockCreators/createBlock').then(({ createBlock }) => {
    import('@/types/editor').then(({ TextBlock }) => {
      try {
        const textBlock = createBlock('text') as TextBlock;
        
        // Limpar o HTML
        htmlContent = cleanupHtml(htmlContent);
        
        // Extrair título se houver
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlContent;
        
        const heading = tempElement.querySelector('h1, h2, h3');
        if (heading) {
          textBlock.heading = heading.textContent?.trim() || 'Texto';
          heading.remove(); // Remove o heading para não duplicar no conteúdo
        }
        
        textBlock.content = tempElement.innerHTML.trim();
        blocks.push(textBlock);
      } catch (error) {
        console.error('Erro ao criar bloco de texto básico:', error);
      }
    }).catch(error => {
      console.error('Erro ao importar tipos:', error);
    });
  }).catch(error => {
    console.error('Erro ao importar createBlock:', error);
  });
};

/**
 * Limpa o HTML removendo elementos problemáticos e atributos desnecessários
 */
const cleanupHtml = (html: string): string => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;
  
  // Remove scripts, iframes e outros elementos potencialmente perigosos
  const dangerous = tempElement.querySelectorAll('script, iframe, object, embed, style');
  dangerous.forEach(el => el.remove());
  
  // Mantém apenas os atributos essenciais em imagens
  const images = tempElement.querySelectorAll('img');
  images.forEach(img => {
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt') || '';
    img.removeAttribute('style');
    img.removeAttribute('class');
    img.setAttribute('src', src || '');
    img.setAttribute('alt', alt);
  });
  
  // Remove classes e estilos inline que podem interferir com nosso layout
  const elements = tempElement.querySelectorAll('*');
  elements.forEach(el => {
    if (el.tagName !== 'IMG') {
      el.removeAttribute('style');
      el.removeAttribute('class');
    }
  });
  
  return tempElement.innerHTML;
};

