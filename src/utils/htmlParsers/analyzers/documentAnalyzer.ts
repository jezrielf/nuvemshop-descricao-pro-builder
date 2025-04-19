
import { Block, TextBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators/createBlock';
import { sanitizeHtmlContent } from './utils';
import { processHeroSection, processGallerySection, processFeatureSection, processFAQSection, processCTASection, processImageTextSection } from './sectionAnalyzers';
import { extractMetadataFromElement } from './metadataExtractor';

export const analyzeDocument = (doc: Document | Element, blocks: Block[]): void => {
  const body = doc instanceof Document ? doc.body : doc;
  
  // Primeiro, procuramos por divisões explícitas de seção
  const explicits = findExplicitSections(body);
  
  if (explicits.length > 0) {
    console.log('Encontradas seções explícitas:', explicits.length);
    explicits.forEach(section => analyzeSection(section, blocks));
  } else {
    // Se não há divisões explícitas, tentamos identificar estruturas comuns
    const commonStructures = findCommonStructures(body);
    
    if (commonStructures.length > 0) {
      console.log('Encontradas estruturas comuns:', commonStructures.length);
      commonStructures.forEach(section => analyzeSection(section, blocks));
    } else {
      // Se não encontramos estruturas comuns, dividimos por parágrafos ou elementos
      console.log('Dividindo conteúdo em partes menores');
      splitContentIntoParts(body, blocks);
    }
  }
  
  // Se não conseguimos criar nenhum bloco, tentamos como último recurso
  if (blocks.length === 0) {
    console.log('Nenhum bloco criado, tentando último recurso');
    createFallbackBlock(body, blocks);
  }
};

/**
 * Encontra seções explícitas no HTML, como div, section, article, etc.
 */
const findExplicitSections = (container: Element): Element[] => {
  const sections: Element[] = [];
  
  // Elementos que normalmente representam seções
  const sectionElements = container.querySelectorAll('section, div, article, aside, main');
  
  // Filtrar para incluir apenas elementos de primeiro nível que têm conteúdo significativo
  Array.from(sectionElements).forEach(element => {
    // Verifica se é filho direto do container ou se tem classes de seção
    const isDirectChild = element.parentElement === container;
    const hasContent = element.textContent && element.textContent.trim().length > 30;
    const hasImage = element.querySelector('img') !== null;
    const hasSection = element.classList.contains('section') || 
                       element.classList.contains('block') ||
                       element.classList.contains('container');
                       
    if ((isDirectChild && (hasContent || hasImage)) || hasSection) {
      sections.push(element);
    }
  });
  
  return sections;
};

/**
 * Procura por estruturas comuns como cabeçalhos seguidos de conteúdo
 */
const findCommonStructures = (container: Element): Element[] => {
  const structures: Element[] = [];
  const headings = container.querySelectorAll('h1, h2, h3');
  
  if (headings.length === 0) {
    return structures;
  }
  
  // Para cada título, cria uma seção com ele e seu conteúdo seguinte
  headings.forEach((heading, index) => {
    const nextHeading = headings[index + 1];
    const sectionElement = document.createElement('div');
    sectionElement.appendChild(heading.cloneNode(true));
    
    // Adiciona todos os elementos entre este título e o próximo
    let current = heading.nextElementSibling;
    while (current && current !== nextHeading) {
      sectionElement.appendChild(current.cloneNode(true));
      current = current.nextElementSibling;
    }
    
    // Só adiciona se tiver conteúdo significativo
    if (sectionElement.textContent && sectionElement.textContent.trim().length > 20) {
      structures.push(sectionElement);
    }
  });
  
  return structures;
};

/**
 * Divide o conteúdo em partes menores para análise
 */
const splitContentIntoParts = (container: Element, blocks: Block[]): void => {
  // Tentamos diferentes abordagens de divisão
  
  // 1. Dividir por imagens (cada imagem pode ser um bloco)
  const images = container.querySelectorAll('img');
  if (images.length > 0) {
    images.forEach(img => {
      const parent = img.parentElement || container;
      processImageOrWrapper(parent, img, blocks);
    });
    return;
  }
  
  // 2. Dividir por parágrafos agrupados
  const paragraphs = container.querySelectorAll('p');
  if (paragraphs.length > 2) {
    // Agrupa parágrafos em blocos de texto (máximo 3 por bloco)
    for (let i = 0; i < paragraphs.length; i += 3) {
      const groupElement = document.createElement('div');
      for (let j = i; j < i + 3 && j < paragraphs.length; j++) {
        groupElement.appendChild(paragraphs[j].cloneNode(true));
      }
      
      // Cria um bloco de texto para este grupo
      const textBlock = createBlock('text') as TextBlock;
      textBlock.content = sanitizeHtmlContent(groupElement.innerHTML);
      blocks.push(textBlock);
    }
    return;
  }
  
  // 3. Se ainda não criamos blocos, processa o contêiner inteiro
  analyzeContent(container, blocks);
};

/**
 * Processa uma imagem ou seu contêiner como um bloco
 */
const processImageOrWrapper = (parent: Element, img: HTMLImageElement, blocks: Block[]): void => {
  const wrapper = document.createElement('div');
  
  // Se o pai só tem a imagem e talvez algum texto pequeno, usamos o pai
  if (parent.childElementCount <= 3) {
    wrapper.innerHTML = parent.innerHTML;
  } else {
    // Caso contrário, criamos um wrapper com apenas a imagem
    wrapper.appendChild(img.cloneNode(true));
    
    // Adicionamos o texto próximo, se existir
    let nextElement = img.nextElementSibling;
    if (nextElement && nextElement.tagName === 'P') {
      wrapper.appendChild(nextElement.cloneNode(true));
    }
    
    let prevElement = img.previousElementSibling;
    if (prevElement && (prevElement.tagName === 'H2' || prevElement.tagName === 'H3')) {
      wrapper.insertBefore(prevElement.cloneNode(true), wrapper.firstChild);
    }
  }
  
  // Processa esse wrapper como uma seção
  analyzeSection(wrapper, blocks);
};

/**
 * Cria um bloco de fallback quando nenhuma outra técnica funcionou
 */
const createFallbackBlock = (container: Element, blocks: Block[]): void => {
  const textBlock = createBlock('text') as TextBlock;
  textBlock.content = sanitizeHtmlContent(container.innerHTML);
  textBlock.title = 'Conteúdo Importado';
  blocks.push(textBlock);
};

export const analyzeSection = (section: Element, blocks: Block[]): void => {
  // Primeiro check se há metadados explícitos sobre o tipo de seção
  const metadata = extractMetadataFromElement(section);
  
  if (metadata && metadata.confidence > 50) {
    // Use o tipo identificado para processar a seção
    switch (metadata.type) {
      case 'hero':
        processHeroSection(section, blocks);
        return;
      case 'gallery':
        const images = section.querySelectorAll('img');
        processGallerySection(section, images, blocks);
        return;
      case 'features':
        processFeatureSection(section, blocks);
        return;
      case 'faq':
        processFAQSection(section, blocks);
        return;
      case 'cta':
        processCTASection(section, blocks);
        return;
      case 'imageText':
        const imgEl = section.querySelector('img');
        if (imgEl) {
          processImageTextSection(section, imgEl, blocks);
        } else {
          analyzeContent(section, blocks);
        }
        return;
      case 'textImage':
        const imgEl2 = section.querySelector('img');
        if (imgEl2) {
          processImageTextSection(section, imgEl2, blocks, true);
        } else {
          analyzeContent(section, blocks);
        }
        return;
      // Para outros tipos, continua com a análise heurística
    }
  }
  
  // Análise heurística baseada no conteúdo
  const hasHeroFeatures = 
    section.classList.contains('hero') || 
    section.classList.contains('banner') ||
    section.querySelector('h1, .hero, .banner') !== null;
  
  if (hasHeroFeatures) {
    processHeroSection(section, blocks);
    return;
  }
  
  const images = section.querySelectorAll('img');
  if (images.length > 2) {
    processGallerySection(section, images, blocks);
    return;
  }
  
  const hasFeatures = 
    section.querySelectorAll('.features, .benefits, [class*="feature"], [class*="benefit"]').length > 0 ||
    (section.querySelectorAll('li').length >= 3 && section.querySelector('ul, ol'));
  
  if (hasFeatures) {
    processFeatureSection(section, blocks);
    return;
  }
  
  const hasFAQ = 
    section.querySelectorAll('details, .accordion, .faq, [class*="faq"]').length > 0 ||
    (section.querySelectorAll('dt').length > 0 && section.querySelectorAll('dd').length > 0);
  
  if (hasFAQ) {
    processFAQSection(section, blocks);
    return;
  }
  
  const hasCTA = 
    section.classList.contains('cta') || 
    (section.querySelector('a.button, .btn, button') !== null && 
     section.textContent && section.textContent.trim().length < 300);
  
  if (hasCTA) {
    processCTASection(section, blocks);
    return;
  }
  
  if (images.length === 1 && section.textContent && section.textContent.trim().length > 50) {
    processImageTextSection(section, images[0], blocks);
    return;
  }
  
  // Se não identificou nenhum tipo específico, processa como conteúdo genérico
  analyzeContent(section, blocks);
};

export const analyzeContent = (element: Element, blocks: Block[]): void => {
  const text = element.textContent?.trim();
  if (!text || text.length === 0) return;
  
  // Verifica o tipo de conteúdo
  const hasLists = element.querySelectorAll('li').length > 3;
  const hasImagesCount = element.querySelectorAll('img').length;
  const hasHeadings = element.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0;
  
  if (hasImagesCount && hasImagesCount > 2) {
    const images = element.querySelectorAll('img');
    processGallerySection(element, images, blocks);
  } else if (hasImagesCount === 1) {
    const image = element.querySelector('img');
    if (image) {
      processImageTextSection(element, image, blocks);
    }
  } else if (hasLists) {
    processFeatureSection(element, blocks);
  } else {
    // Cria um bloco de texto simples
    const textBlock = createBlock('text') as TextBlock;
    
    // Define o título se houver um cabeçalho
    if (hasHeadings) {
      const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        textBlock.title = heading.textContent || textBlock.title;
      }
    }
    
    textBlock.content = sanitizeHtmlContent(element.innerHTML);
    blocks.push(textBlock);
  }
};
