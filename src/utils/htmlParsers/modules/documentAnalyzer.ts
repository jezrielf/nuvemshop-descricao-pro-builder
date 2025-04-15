
import { Block, TextBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators/createBlock';
import { sanitizeHtmlContent } from './utils';
import { processHeroSection, processGallerySection, processFeatureSection, processFAQSection, processCTASection, processImageTextSection } from './sectionAnalyzers';

export const analyzeDocument = (doc: Document, blocks: Block[]): void => {
  const body = doc.body;
  
  const sections = body.querySelectorAll('section, div[class*="section"], div[class*="block"]');
  
  if (sections.length > 0) {
    sections.forEach(section => analyzeSection(section, blocks));
  } else {
    analyzeContent(body, blocks);
  }
};

export const analyzeSection = (section: Element, blocks: Block[]): void => {
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
    textBlock.title = textBlock.title;
    textBlock.content = sanitizeHtmlContent(element.innerHTML);
    blocks.push(textBlock);
  }
};

