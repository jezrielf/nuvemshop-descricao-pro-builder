
import { ProductDescription } from '@/types/editor';

export const getTextContentFromDescription = (desc: ProductDescription): string => {
  // Extract text content from all blocks
  const textContent = desc.blocks.map(block => {
    switch (block.type) {
      case 'text':
        return 'content' in block ? block.content : '';
      case 'hero':
        return `${'heading' in block ? block.heading : ''} ${'subheading' in block ? block.subheading : ''}`;
      case 'features':
        return `${'heading' in block ? block.heading : ''} ${
          'features' in block && block.features ? 
            block.features.map(f => `${f.title} ${f.description}`).join(' ') : 
            ''
        }`;
      case 'benefits':
        return `${'heading' in block ? block.heading : ''} ${
          'benefits' in block && block.benefits ? 
            block.benefits.map(b => `${b.title} ${b.description}`).join(' ') : 
            ''
        }`;
      case 'specifications':
        return `${'heading' in block ? block.heading : ''} ${
          'specs' in block && block.specs ? 
            block.specs.map(s => `${s.name} ${s.value}`).join(' ') : 
            ''
        }`;
      case 'faq':
        return `${'heading' in block ? block.heading : ''} ${
          'questions' in block && block.questions ? 
            block.questions.map(q => `${q.question} ${q.answer}`).join(' ') : 
            ''
        }`;
      case 'cta':
        return `${'heading' in block ? block.heading : ''} ${'content' in block ? block.content : ''} ${'buttonText' in block ? block.buttonText : ''}`;
      case 'imageText':
      case 'textImage':
        return `${'heading' in block ? block.heading : ''} ${'content' in block ? block.content : ''}`;
      default:
        return '';
    }
  }).join(' ');
  
  return textContent;
};

export const countHeadings = (desc: ProductDescription): number => {
  let headingCount = 0;
  desc.blocks.forEach(block => {
    // Count block headings
    if ('heading' in block && block.heading) headingCount++;
    
    // Count headings in HTML content
    if (block.type === 'text' && 'content' in block && block.content) {
      const h1Count = (block.content.match(/<h1[^>]*>/g) || []).length;
      const h2Count = (block.content.match(/<h2[^>]*>/g) || []).length;
      const h3Count = (block.content.match(/<h3[^>]*>/g) || []).length;
      const h4Count = (block.content.match(/<h4[^>]*>/g) || []).length;
      headingCount += h1Count + h2Count + h3Count + h4Count;
    }
  });
  return headingCount;
};

export const checkImagesAlt = (desc: ProductDescription): boolean => {
  let allHaveAlt = true;
  
  desc.blocks.forEach(block => {
    if (block.type === 'image' && 'alt' in block && block.alt === '') {
      allHaveAlt = false;
    }
    else if (block.type === 'hero' && 'image' in block && block.image && (!block.image.alt || block.image.alt === '')) {
      allHaveAlt = false;
    }
    else if (block.type === 'gallery' && 'images' in block && block.images) {
      block.images.forEach(img => {
        if (!img.alt || img.alt === '') allHaveAlt = false;
      });
    }
    else if ((block.type === 'imageText' || block.type === 'textImage') && 
             'image' in block && block.image && (!block.image.alt || block.image.alt === '')) {
      allHaveAlt = false;
    }
  });
  
  return allHaveAlt;
};

export const getContentLength = (desc: ProductDescription): number => {
  let wordCount = 0;
  desc.blocks.forEach(block => {
    switch (block.type) {
      case 'text':
        if ('content' in block && block.content) {
          // Strip HTML tags and count words
          const content = block.content.replace(/<[^>]+>/g, ' ');
          wordCount += content.split(/\s+/).filter(Boolean).length;
        }
        break;
      case 'hero':
        if ('heading' in block && block.heading) wordCount += block.heading.split(/\s+/).filter(Boolean).length;
        if ('subheading' in block && block.subheading) wordCount += block.subheading.split(/\s+/).filter(Boolean).length;
        break;
      case 'cta':
        if ('heading' in block && block.heading) wordCount += block.heading.split(/\s+/).filter(Boolean).length;
        if ('content' in block && block.content) wordCount += block.content.split(/\s+/).filter(Boolean).length;
        break;
      case 'textImage':
      case 'imageText':
        if ('heading' in block && block.heading) wordCount += block.heading.split(/\s+/).filter(Boolean).length;
        if ('content' in block && block.content) {
          const content = block.content.replace(/<[^>]+>/g, ' ');
          wordCount += content.split(/\s+/).filter(Boolean).length;
        }
        break;
      // Add other block types as needed
    }
  });
  return wordCount;
};
