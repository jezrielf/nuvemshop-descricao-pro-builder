
import { BlockType } from '@/types/editor';

interface SectionMetadata {
  type: BlockType;
  confidence: number;  // 0-100 scale
  properties: Record<string, any>;
}

export const extractMetadataFromElement = (element: Element): SectionMetadata | null => {
  // Default metadata with low confidence
  let metadata: SectionMetadata = {
    type: 'text',
    confidence: 10,
    properties: {}
  };
  
  // Check for data attributes that explicitly define the section type
  const dataType = element.getAttribute('data-section-type') || 
                   element.getAttribute('data-block-type') || 
                   element.getAttribute('data-type');
  
  if (dataType) {
    const mappedType = mapDataTypeToBlockType(dataType);
    if (mappedType) {
      metadata.type = mappedType;
      metadata.confidence = 90;
      
      // Extract additional properties from data attributes
      Array.from(element.attributes)
        .filter(attr => attr.name.startsWith('data-'))
        .forEach(attr => {
          const propName = attr.name.replace('data-', '');
          if (propName !== 'section-type' && propName !== 'block-type' && propName !== 'type') {
            metadata.properties[propName] = attr.value;
          }
        });
      
      return metadata;
    }
  }
  
  // Analyze classes to determine section type
  const classes = Array.from(element.classList);
  const classBasedType = determineTypeFromClasses(classes);
  if (classBasedType && classBasedType.confidence > metadata.confidence) {
    metadata = classBasedType;
  }
  
  // Analyze content structure to determine section type
  const structureBasedType = determineTypeFromStructure(element);
  if (structureBasedType && structureBasedType.confidence > metadata.confidence) {
    metadata = structureBasedType;
  }
  
  return metadata;
};

// Map common data-type values to our block types
const mapDataTypeToBlockType = (dataType: string): BlockType | null => {
  const typeMap: Record<string, BlockType> = {
    'hero': 'hero',
    'banner': 'hero',
    'header': 'hero',
    'intro': 'hero',
    'text': 'text',
    'content': 'text',
    'features': 'features',
    'feature-list': 'features',
    'benefits': 'benefits',
    'specs': 'specifications',
    'specifications': 'specifications',
    'image': 'image',
    'picture': 'image',
    'gallery': 'gallery',
    'slideshow': 'gallery',
    'carousel': 'gallery',
    'image-text': 'imageText',
    'text-image': 'textImage',
    'faq': 'faq',
    'questions': 'faq',
    'accordion': 'faq',
    'cta': 'cta',
    'action': 'cta',
    'call-to-action': 'cta',
    'video': 'video'
  };
  
  const normalizedType = dataType.toLowerCase().trim();
  return typeMap[normalizedType] || null;
};

// Analyze classes to determine section type
const determineTypeFromClasses = (classes: string[]): SectionMetadata | null => {
  const classPatterns: Record<BlockType, RegExp[]> = {
    'hero': [/hero/i, /banner/i, /jumbotron/i, /header-section/i, /main-banner/i],
    'text': [/text/i, /content/i, /article/i, /paragraph/i],
    'features': [/features?/i, /services/i, /offerings?/i],
    'benefits': [/benefits?/i, /advantages?/i],
    'specifications': [/specs?/i, /specifications?/i, /details?/i, /technical/i],
    'image': [/image-?(?:section|block|container)?$/i, /picture/i, /photo/i],
    'gallery': [/gallery/i, /carousel/i, /slider/i, /slideshow/i],
    'imageText': [/image-?text/i, /media-?text/i, /image-?content/i],
    'textImage': [/text-?image/i, /content-?image/i, /text-?media/i],
    'faq': [/faq/i, /questions?/i, /accordion/i],
    'cta': [/cta/i, /call-?to-?action/i, /action-?section/i, /subscribe/i],
    'video': [/video/i, /media-?player/i]
  };
  
  let bestMatch: SectionMetadata | null = null;
  let highestConfidence = 0;
  
  for (const [blockType, patterns] of Object.entries(classPatterns)) {
    for (const pattern of patterns) {
      const matchingClasses = classes.filter(cls => pattern.test(cls));
      if (matchingClasses.length > 0) {
        const confidence = 30 + (matchingClasses.length * 10);
        if (confidence > highestConfidence) {
          highestConfidence = confidence;
          bestMatch = {
            type: blockType as BlockType,
            confidence: Math.min(confidence, 80),  // Cap at 80% for class-based detection
            properties: {}
          };
        }
      }
    }
  }
  
  return bestMatch;
};

// Analyze content structure to determine section type
const determineTypeFromStructure = (element: Element): SectionMetadata | null => {
  // Check for hero/banner patterns
  if (element.querySelector('h1, h2.hero-title') && 
      (element.querySelector('a.btn, button.btn, .button, a.cta') || 
       element.querySelector('img.hero-image, .banner-image'))) {
    return {
      type: 'hero',
      confidence: 75,
      properties: {}
    };
  }
  
  // Check for gallery patterns
  const images = element.querySelectorAll('img');
  if (images.length > 2) {
    return {
      type: 'gallery',
      confidence: 70,
      properties: {
        columns: Math.min(4, images.length)
      }
    };
  }
  
  // Check for FAQ patterns
  const possibleFaqElements = element.querySelectorAll('details, summary, dt, .question, .accordion-header, [data-toggle="collapse"]');
  if (possibleFaqElements.length > 1) {
    return {
      type: 'faq',
      confidence: 70,
      properties: {}
    };
  }
  
  // Check for CTA patterns
  if (element.querySelector('a.btn, button.btn, .button, a.cta') && 
      element.textContent && element.textContent.length < 300) {
    return {
      type: 'cta',
      confidence: 65,
      properties: {}
    };
  }
  
  // Check for image + text patterns
  if (images.length === 1 && element.textContent && element.textContent.trim().length > 50) {
    const imageIndex = Array.from(element.children).findIndex(el => el.querySelector('img') !== null);
    const totalElements = element.children.length;
    
    if (imageIndex !== -1) {
      if (imageIndex < totalElements / 2) {
        return {
          type: 'imageText',
          confidence: 60,
          properties: {}
        };
      } else {
        return {
          type: 'textImage',
          confidence: 60,
          properties: {}
        };
      }
    }
  }
  
  // Check for features/benefits patterns
  const listItems = element.querySelectorAll('li, .card, .feature, .item');
  if (listItems.length >= 3) {
    // Try to determine if these are features or benefits
    const text = element.textContent?.toLowerCase() || '';
    if (text.includes('benefit') || text.includes('advantage')) {
      return {
        type: 'benefits',
        confidence: 60,
        properties: {}
      };
    } else {
      return {
        type: 'features',
        confidence: 55,
        properties: {}
      };
    }
  }
  
  return null;
};
