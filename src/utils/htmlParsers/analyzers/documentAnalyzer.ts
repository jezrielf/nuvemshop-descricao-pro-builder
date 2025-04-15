
import { Block, TextBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators/createBlock';
import { sanitizeHtmlContent } from './utils';
import { processHeroSection, processGallerySection, processFeatureSection, processFAQSection, processCTASection, processImageTextSection } from './sectionAnalyzers';
import { extractMetadataFromElement } from './metadataExtractor';

export const analyzeDocument = (doc: Document, blocks: Block[]): void => {
  const body = doc.body;
  
  // First look for sections that are explicitly marked as sections
  const sections = body.querySelectorAll('section, div[class*="section"], div[class*="block"]');
  
  if (sections.length > 0) {
    sections.forEach(section => analyzeSection(section, blocks));
  } else {
    // If no explicit sections are found, try to identify implicit sections
    identifyImplicitSections(body, blocks);
  }
};

// Try to identify logical sections even when they're not explicitly marked
const identifyImplicitSections = (container: Element, blocks: Block[]): void => {
  const headings = container.querySelectorAll('h1, h2');
  
  if (headings.length > 0) {
    // Each heading might indicate the start of a new section
    let lastIndex = 0;
    
    headings.forEach((heading, index) => {
      // Find all elements between this heading and the next one
      const sectionElements: Element[] = [];
      let current = heading.nextElementSibling;
      
      const nextHeading = headings[index + 1] || null;
      
      while (current && current !== nextHeading) {
        sectionElements.push(current);
        current = current.nextElementSibling;
      }
      
      // Create a temporary container for these elements
      const tempSection = document.createElement('div');
      tempSection.appendChild(heading.cloneNode(true));
      sectionElements.forEach(el => tempSection.appendChild(el.cloneNode(true)));
      
      // Analyze this implicit section
      analyzeSection(tempSection, blocks);
      
      lastIndex = index;
    });
  } else {
    // No headings to separate content, analyze the whole container
    analyzeContent(container, blocks);
  }
};

export const analyzeSection = (section: Element, blocks: Block[]): void => {
  // First check if there are explicit metadata about the section type
  const metadata = extractMetadataFromElement(section);
  
  if (metadata && metadata.confidence > 50) {
    // Use the identified type to process the section
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
      // For other types, fall through to the existing analyzers
    }
  }
  
  // Fall back to the existing heuristic-based analysis
  if (
    section.classList.contains('hero') || 
    section.classList.contains('banner') ||
    section.querySelector('h1, .hero, .banner') !== null
  ) {
    processHeroSection(section, blocks);
    return;
  }
  
  const images = section.querySelectorAll('img');
  if (images.length > 2) {
    processGallerySection(section, images, blocks);
    return;
  }
  
  const featureSets = section.querySelectorAll('.features, .benefits, [class*="feature"], [class*="benefit"]');
  if (featureSets.length > 0) {
    processFeatureSection(section, blocks);
    return;
  }
  
  const faqItems = section.querySelectorAll('details, .accordion, .faq, [class*="faq"]');
  if (faqItems.length > 0) {
    processFAQSection(section, blocks);
    return;
  }
  
  if (
    section.classList.contains('cta') || 
    (section.querySelector('a.button, .btn, button') !== null && 
     section.textContent && section.textContent.length < 300)
  ) {
    processCTASection(section, blocks);
    return;
  }
  
  if (images.length === 1 && section.textContent && section.textContent.trim().length > 50) {
    processImageTextSection(section, images[0], blocks);
    return;
  }
  
  analyzeContent(section, blocks);
};

export const analyzeContent = (element: Element, blocks: Block[]): void => {
  const text = element.textContent?.trim();
  if (!text || text.length === 0) return;
  
  const images = element.querySelectorAll('img');
  
  if (images.length > 0) {
    if (images.length > 2) {
      processGallerySection(element, images, blocks);
    } else if (images.length === 1) {
      processImageTextSection(element, images[0], blocks);
    }
  } else if (element.querySelectorAll('li').length > 3) {
    processFeatureSection(element, blocks);
  } else {
    const textBlock = createBlock('text', 1) as TextBlock;
    textBlock.title = element.querySelector('h1, h2, h3')?.textContent || textBlock.title;
    textBlock.content = sanitizeHtmlContent(element.innerHTML);
    blocks.push(textBlock);
  }
};
