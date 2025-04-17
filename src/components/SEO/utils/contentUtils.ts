
import { ProductDescription } from '@/types/editor';

/**
 * Counts the number of headings (h1, h2, h3) in the product description.
 * @param description The product description object.
 * @returns The number of headings in the description.
 */
export const countHeadings = (description: ProductDescription | null): number => {
  if (!description || !description.blocks) {
    return 0;
  }

  let headingCount = 0;
  description.blocks.forEach(block => {
    if (block.type === 'heading') {
      headingCount++;
    }
  });
  return headingCount;
};

/**
 * Checks if all images in the product description have alt text.
 * @param description The product description object.
 * @returns True if all images have alt text, false otherwise.
 */
export const checkImagesAlt = (description: ProductDescription | null): boolean => {
  if (!description || !description.blocks) {
    return true; // Consider no images as having all alt texts
  }

  for (const block of description.blocks) {
    if (block.type === 'image' && (!block.image?.alt || block.image.alt.trim() === '')) {
      return false;
    }
    if (block.type === 'gallery' && block.images) {
      for (const image of block.images) {
        if (!image.alt || image.alt.trim() === '') {
          return false;
        }
      }
    }
    if (block.type === 'hero' && (!block.image?.alt || block.image.alt.trim() === '')) {
      return false;
    }
    if (block.type === 'imageText' && (!block.image?.alt || block.image.alt.trim() === '')) {
      return false;
    }
    if (block.type === 'textImage' && (!block.image?.alt || block.image.alt.trim() === '')) {
      return false;
    }
  }

  return true;
};

/**
 * Gets the length of the content in the product description.
 * @param description The product description object.
 * @returns The length of the content in the description.
 */
export const getContentLength = (description: ProductDescription | null): number => {
  if (!description || !description.blocks) {
    return 0;
  }

  let contentLength = 0;
  description.blocks.forEach(block => {
    if (block.type === 'text' && block.content) {
      // Remove HTML tags and count words
      const textContent = block.content.replace(/<[^>]*>/g, '');
      const words = textContent.trim().split(/\s+/);
      contentLength += words.length;
    }
  });
  return contentLength;
};

/**
 * Extracts text content from all blocks in a product description.
 * @param description The product description object.
 * @returns The extracted text content as a string.
 */
export const getTextContentFromDescription = (description: ProductDescription | null): string => {
  if (!description || !description.blocks) {
    return '';
  }

  let allContent = '';
  
  description.blocks.forEach(block => {
    // Extract text from different block types
    if (block.type === 'text' && block.content) {
      // Remove HTML tags from text blocks
      const textContent = block.content.replace(/<[^>]*>/g, '');
      allContent += textContent + ' ';
    } else if (block.type === 'hero' && block.title) {
      allContent += block.title + ' ';
      if (block.subtitle) allContent += block.subtitle + ' ';
    } else if (block.type === 'imageText' || block.type === 'textImage') {
      if (block.title) allContent += block.title + ' ';
      if (block.content) {
        const textContent = block.content.replace(/<[^>]*>/g, '');
        allContent += textContent + ' ';
      }
    } else if (block.type === 'features' && block.features) {
      block.features.forEach(feature => {
        if (feature.title) allContent += feature.title + ' ';
        if (feature.description) allContent += feature.description + ' ';
      });
    } else if (block.type === 'specifications' && block.specifications) {
      block.specifications.forEach(spec => {
        if (spec.name) allContent += spec.name + ' ';
        if (spec.value) allContent += spec.value + ' ';
      });
    } else if (block.type === 'faq' && block.questions) {
      block.questions.forEach(q => {
        if (q.question) allContent += q.question + ' ';
        if (q.answer) allContent += q.answer + ' ';
      });
    } else if (block.type === 'cta') {
      if (block.title) allContent += block.title + ' ';
      if (block.description) allContent += block.description + ' ';
    }
  });
  
  return allContent.trim();
};

/**
 * Check if SEO Analyzer is present in the layout
 * @returns boolean indicating if analyzer is integrated
 */
export const checkAnalyzerPresence = (): boolean => {
  // Check if SEOAnalyzer component is mounted in DOM
  const analyzerElement = document.querySelector('[data-testid="seo-analyzer"]');
  return !!analyzerElement;
};

/**
 * Track dialog timing analytics
 * @param startTime Opening timestamp
 * @returns number Time in milliseconds
 */
export const calculateDialogTiming = (startTime: number): number => {
  return Date.now() - startTime;
};

/**
 * Calculate if dialog timing is within acceptable range
 * Ideal time: < 500ms for opening
 * @param timing Time in milliseconds
 * @returns boolean
 */
export const isDialogTimingAcceptable = (timing: number): boolean => {
  const IDEAL_TIMING = 500; // 500ms
  return timing <= IDEAL_TIMING;
};
