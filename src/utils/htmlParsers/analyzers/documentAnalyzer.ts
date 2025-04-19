
import { Block } from '@/types/editor';
import { isSimpleTextFragment, createSimpleTextBlock } from './utils/textFragmentAnalyzer';
import { findExplicitSections, findCommonStructures } from './utils/sectionFinder';
import { createFallbackBlock } from './utils/fallbackAnalyzer';
import { splitContentIntoParts } from './contentSplitter';
import { processHeroSection, processGallerySection, processFeatureSection, processFAQSection, processCTASection, processImageTextSection } from './sectionAnalyzers';
import { extractMetadataFromElement } from './metadataExtractor';

export const analyzeDocument = (body: Element, blocks: Block[]): void => {
  if (isSimpleTextFragment(body)) {
    createSimpleTextBlock(body, blocks);
    return;
  }
  
  const explicits = findExplicitSections(body);
  
  if (explicits.length > 0) {
    console.log('Found explicit sections:', explicits.length);
    explicits.forEach(section => analyzeSection(section, blocks));
  } else {
    const commonStructures = findCommonStructures(body);
    
    if (commonStructures.length > 0) {
      console.log('Found common structures:', commonStructures.length);
      commonStructures.forEach(section => analyzeSection(section, blocks));
    } else {
      console.log('Dividing content into smaller parts');
      splitContentIntoParts(body, blocks);
    }
  }
  
  if (blocks.length === 0) {
    console.log('No blocks created, trying last resort');
    createFallbackBlock(body, blocks);
  }
};

export const analyzeSection = (section: Element, blocks: Block[]): void => {
  const metadata = extractMetadataFromElement(section);
  
  if (metadata && metadata.confidence > 50) {
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
      case 'textImage':
        const imgEl = section.querySelector('img');
        if (imgEl) {
          processImageTextSection(section, imgEl as HTMLImageElement, blocks, metadata.type === 'textImage');
        } else {
          analyzeContent(section, blocks);
        }
        return;
    }
  }
  
  if (isSimpleTextFragment(section)) {
    createSimpleTextBlock(section, blocks);
    return;
  }
  
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
    (section.querySelectorAll('li').length >= 3 && section.querySelector('ul, ol') !== null);
  
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
     section.textContent && section.textContent.length < 300);
  
  if (hasCTA) {
    processCTASection(section, blocks);
    return;
  }
  
  if (images.length === 1 && section.textContent && section.textContent.trim().length > 50) {
    processImageTextSection(section, images[0] as HTMLImageElement, blocks);
    return;
  }
  
  // Import analyzeContent from contentSplitter instead of defining it here
  const { analyzeContent } = require('./contentSplitter');
  analyzeContent(section, blocks);
};
