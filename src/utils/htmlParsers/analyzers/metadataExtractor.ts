
import { BlockType } from '@/types/editor';

export interface SectionMetadata {
  type: BlockType;
  confidence: number;
  heading?: string;
  description?: string;
}

/**
 * Extracts metadata from HTML elements to identify section types
 */
export const extractMetadataFromElement = (element: Element): SectionMetadata | null => {
  // Default metadata with low confidence
  let metadata: SectionMetadata = {
    type: 'text',
    confidence: 10
  };

  // Check for class names and IDs that might indicate section type
  const className = element.className || '';
  const id = element.id || '';
  const tagName = element.tagName.toLowerCase();
  const textContent = element.textContent || '';
  
  // Look for heading elements
  const heading = element.querySelector('h1, h2, h3');
  if (heading) {
    metadata.heading = heading.textContent?.trim();
  }

  // Look for paragraph elements as description
  const paragraph = element.querySelector('p');
  if (paragraph) {
    metadata.description = paragraph.textContent?.trim();
  }

  // Check for footer content
  if (
    className.includes('footer') || 
    id.includes('footer') || 
    (textContent.includes('direitos reservados') || textContent.includes('copyright') || textContent.includes('©'))
  ) {
    metadata.type = 'text';
    metadata.confidence = 80;
    return metadata;
  }

  // Check for header/hero elements
  if (
    className.includes('header') || 
    className.includes('hero') || 
    id.includes('header') || 
    id.includes('hero') ||
    tagName === 'header' ||
    element.querySelector('h1')
  ) {
    metadata.type = 'hero';
    metadata.confidence = 70;
    return metadata;
  }

  // Check for contact information
  if (
    className.includes('contact') || 
    id.includes('contact') ||
    textContent.includes('contato') || 
    textContent.includes('fale conosco') ||
    element.querySelector('form')
  ) {
    metadata.type = 'cta';
    metadata.confidence = 60;
    return metadata;
  }

  // Check for about us sections
  if (
    className.includes('about') || 
    id.includes('about') ||
    textContent.toLowerCase().includes('sobre nós') || 
    textContent.toLowerCase().includes('nossa empresa') ||
    textContent.toLowerCase().includes('quem somos')
  ) {
    metadata.type = 'text';
    metadata.confidence = 60;
    return metadata;
  }

  // Check for copyright notices or disclaimers (typically footer content)
  if (
    textContent.includes('©') || 
    textContent.includes('copyright') ||
    textContent.includes('todos os direitos') ||
    textContent.toLowerCase().includes('meramente ilustrativas')
  ) {
    metadata.type = 'text';
    metadata.confidence = 75;
    return metadata;
  }

  // If we can't determine a specific type with confidence, return null
  return metadata.confidence > 30 ? metadata : null;
}
