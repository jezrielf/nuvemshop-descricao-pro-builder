
import { Block, BlockType, ColumnLayout, Template, ProductCategory, TextBlock, HeroBlock, GalleryBlock, FeaturesBlock, FAQBlock, CTABlock, ImageTextBlock, TextImageBlock } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { createBlock } from '../blockCreators/createBlock';

// Parses HTML and creates template blocks
export const analyzeHtmlForTemplate = (htmlInput: string, category: ProductCategory): Template => {
  const parsedBlocks: Block[] = [];
  let doc: Document;

  try {
    // Create a DOM parser to work with the HTML
    const parser = new DOMParser();
    doc = parser.parseFromString(htmlInput, 'text/html');
  
    // Remove any script tags for security
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    // Start analyzing the document structure
    analyzeDocument(doc, parsedBlocks);

    // If no blocks were detected, create a default text block with the HTML content
    if (parsedBlocks.length === 0) {
      const textBlock = createBlock('text', 1) as TextBlock;
      textBlock.content = sanitizeHtmlContent(htmlInput);
      parsedBlocks.push(textBlock);
    }
  } catch (error) {
    console.error('Error parsing HTML:', error);
    // Fallback: create a text block with the raw HTML
    const textBlock = createBlock('text', 1) as TextBlock;
    textBlock.content = sanitizeHtmlContent(htmlInput);
    parsedBlocks.push(textBlock);
  }

  return {
    id: uuidv4(),
    name: 'Template from HTML',
    category,
    blocks: parsedBlocks
  };
};

// Main document analysis function
const analyzeDocument = (doc: Document, blocks: Block[]): void => {
  const body = doc.body;
  
  // First, check for major sections that could be separated blocks
  const sections = body.querySelectorAll('section, div[class*="section"], div[class*="block"]');
  
  if (sections.length > 0) {
    // Process each section as a potential block
    sections.forEach(section => analyzeSection(section, blocks));
  } else {
    // If no sections, analyze the content directly
    analyzeContent(body, blocks);
  }
};

// Analyze a section to determine what type of block it might be
const analyzeSection = (section: Element, blocks: Block[]): void => {
  // Check for hero/banner sections first
  if (
    section.classList.contains('hero') || 
    section.classList.contains('banner') ||
    section.querySelector('h1, .hero, .banner') !== null
  ) {
    processHeroSection(section, blocks);
    return;
  }
  
  // Check for image galleries
  const images = section.querySelectorAll('img');
  if (images.length > 2) {
    processGallerySection(section, images, blocks);
    return;
  }
  
  // Check for feature lists
  const featureSets = section.querySelectorAll('.features, .benefits, [class*="feature"], [class*="benefit"]');
  if (featureSets.length > 0) {
    processFeatureSection(section, blocks);
    return;
  }
  
  // Check for FAQ sections
  const faqItems = section.querySelectorAll('details, .accordion, .faq, [class*="faq"]');
  if (faqItems.length > 0) {
    processFAQSection(section, blocks);
    return;
  }
  
  // Check for CTA sections
  if (
    section.classList.contains('cta') || 
    (section.querySelector('a.button, .btn, button') !== null && 
     section.textContent && section.textContent.length < 300)
  ) {
    processCTASection(section, blocks);
    return;
  }
  
  // Check for image+text combinations
  if (images.length === 1 && section.textContent && section.textContent.trim().length > 50) {
    processImageTextSection(section, images[0], blocks);
    return;
  }
  
  // Default: process as generic content
  analyzeContent(section, blocks);
};

// Process content that doesn't fit specific block types
const analyzeContent = (element: Element, blocks: Block[]): void => {
  const text = element.textContent?.trim();
  if (!text || text.length === 0) return;
  
  const images = element.querySelectorAll('img');
  const hasHeading = element.querySelector('h1, h2, h3, h4, h5, h6') !== null;
  
  // Process based on content characteristics
  if (images.length > 0) {
    if (images.length > 2) {
      processGallerySection(element, images, blocks);
    } else if (images.length === 1) {
      processImageTextSection(element, images[0], blocks);
    }
  } else if (element.querySelectorAll('li').length > 3) {
    // List-heavy content could be features or specifications
    const listBlock = createBlock('features', 1) as FeaturesBlock;
    listBlock.title = extractHeading(element) || 'Features';
    listBlock.features = Array.from(element.querySelectorAll('li')).map((item, index) => ({
      id: uuidv4(),
      title: `Feature ${index + 1}`,
      description: item.textContent || '',
      icon: 'Check'
    }));
    blocks.push(listBlock);
  } else {
    // Default to a text block
    const textBlock = createBlock('text', 1) as TextBlock;
    textBlock.title = extractHeading(element) || '';
    textBlock.content = sanitizeHtmlContent(element.innerHTML);
    blocks.push(textBlock);
  }
};

// Process a section that looks like a hero/banner
const processHeroSection = (section: Element, blocks: Block[]): void => {
  const heroBlock = createBlock('hero', 1) as HeroBlock;
  
  // Extract heading, subheading, and button
  const h1 = section.querySelector('h1');
  const headings = section.querySelectorAll('h1, h2');
  const buttons = section.querySelectorAll('a.button, .btn, button, a[class*="button"], a[class*="btn"]');
  
  heroBlock.title = h1 ? h1.textContent || 'Heading' : extractHeading(section) || 'Heading';
  
  // Look for subheading text
  if (headings.length > 1) {
    heroBlock.subheading = headings[1].textContent || '';
  } else {
    const paragraphs = section.querySelectorAll('p');
    if (paragraphs.length > 0) {
      heroBlock.subheading = paragraphs[0].textContent || '';
    }
  }
  
  // Look for a button/CTA
  if (buttons.length > 0) {
    const button = buttons[0];
    heroBlock.buttonText = button.textContent || 'Learn More';
    heroBlock.buttonUrl = button.getAttribute('href') || '#';
  }
  
  blocks.push(heroBlock);
};

// Process a section with multiple images as a gallery
const processGallerySection = (section: Element, images: NodeListOf<HTMLImageElement>, blocks: Block[]): void => {
  // Ensure columns is a valid ColumnLayout value (1, 2, 3, or 4)
  const columns = Math.min(4, Math.max(1, images.length)) as ColumnLayout;
  const galleryBlock = createBlock('gallery', columns) as GalleryBlock;
  
  // Instead of setting the heading property directly, update the title property
  // which is part of the BlockBase interface that GalleryBlock extends
  const headingText = extractHeading(section) || 'Gallery';
  galleryBlock.title = headingText;
  
  galleryBlock.images = Array.from(images).map((img, index) => {
    // Try to find a caption for this image
    let caption = '';
    const figcaption = img.closest('figure')?.querySelector('figcaption');
    if (figcaption) {
      caption = figcaption.textContent || '';
    }
    
    return {
      id: uuidv4(),
      src: img.src,
      alt: img.alt || `Image ${index + 1}`,
      caption: caption
    };
  });
  
  blocks.push(galleryBlock);
};

// Process a section that looks like a features/benefits list
const processFeatureSection = (section: Element, blocks: Block[]): void => {
  // Determine if it's more like benefits or features
  const isBenefits = 
    section.classList.contains('benefits') || 
    section.classList.contains('advantage') || 
    section.innerHTML.toLowerCase().includes('benefit') ||
    section.innerHTML.toLowerCase().includes('advantage');
  
  const blockType: BlockType = isBenefits ? 'benefits' : 'features';
  const featureBlock = createBlock(blockType, 3) as FeaturesBlock; // Default to 3 columns
  
  featureBlock.title = extractHeading(section) || (isBenefits ? 'Benefits' : 'Features');
  
  // Try to identify individual feature items
  const featureItems = section.querySelectorAll('.feature, .benefit, .item, .card, li');
  
  if (featureItems.length > 0) {
    const items = Array.from(featureItems).map((item, index) => {
      const title = item.querySelector('h3, h4, strong, b, .title') || null;
      const description = item.querySelector('p, .description') || null;
      
      return {
        id: uuidv4(),
        title: title ? title.textContent || `Item ${index + 1}` : `Item ${index + 1}`,
        description: description ? description.textContent || '' : item.textContent || '',
        icon: 'Star'
      };
    });
    
    if (blockType === 'benefits') {
      (featureBlock as any).benefits = items;
    } else {
      (featureBlock as FeaturesBlock).features = items;
    }
  }
  
  blocks.push(featureBlock);
};

// Process a section that looks like FAQs
const processFAQSection = (section: Element, blocks: Block[]): void => {
  const faqBlock = createBlock('faq', 1) as FAQBlock;
  
  faqBlock.title = extractHeading(section) || 'Frequently Asked Questions';
  
  // Look for question/answer pairs
  const questionItems = section.querySelectorAll('details, .faq-item, .accordion-item, dt, .question');
  
  if (questionItems.length > 0) {
    faqBlock.questions = Array.from(questionItems).map((item, index) => {
      let question = '';
      let answer = '';
      
      // Handle different FAQ formats
      if (item.tagName === 'DETAILS') {
        const summary = item.querySelector('summary');
        question = summary ? summary.textContent || '' : `Question ${index + 1}`;
        // Remove summary from content when getting the answer
        const content = item.innerHTML.replace(/<summary.*?<\/summary>/s, '');
        answer = sanitizeHtmlContent(content);
      } else if (item.tagName === 'DT') {
        question = item.textContent || `Question ${index + 1}`;
        const dd = item.nextElementSibling;
        answer = dd && dd.tagName === 'DD' ? dd.innerHTML : '';
      } else {
        const questionEl = item.querySelector('.question, h3, h4, strong');
        const answerEl = item.querySelector('.answer, p, div:not(.question)');
        
        question = questionEl ? questionEl.textContent || `Question ${index + 1}` : `Question ${index + 1}`;
        answer = answerEl ? answerEl.innerHTML : item.innerHTML;
      }
      
      return {
        id: uuidv4(),
        question: question.trim(),
        answer: sanitizeHtmlContent(answer).trim()
      };
    });
  }
  
  blocks.push(faqBlock);
};

// Process a section that looks like a CTA
const processCTASection = (section: Element, blocks: Block[]): void => {
  const ctaBlock = createBlock('cta', 1) as CTABlock;
  
  ctaBlock.title = extractHeading(section) || 'Take Action';
  
  const paragraphs = section.querySelectorAll('p');
  if (paragraphs.length > 0) {
    ctaBlock.content = paragraphs[0].textContent || '';
  }
  
  const button = section.querySelector('a.button, .btn, button, a[class*="button"], a[class*="btn"]');
  if (button) {
    ctaBlock.buttonText = button.textContent || 'Click Here';
    ctaBlock.buttonUrl = button.getAttribute('href') || '#';
  }
  
  blocks.push(ctaBlock);
};

// Process a section with a single image and text
const processImageTextSection = (section: Element, image: HTMLImageElement, blocks: Block[]): void => {
  // Determine if image comes before text or after
  const imageIndex = Array.from(section.children).findIndex(el => el.contains(image));
  const totalElements = section.children.length;
  
  // If image is in the first half, it's an image+text, otherwise text+image
  const blockType: BlockType = imageIndex < totalElements / 2 ? 'imageText' : 'textImage';
  
  const mediaBlock = createBlock(blockType, 1) as ImageTextBlock | TextImageBlock;
  
  mediaBlock.title = extractHeading(section) || 'Image and Text';
  
  // Extract text content
  const paragraphs = section.querySelectorAll('p');
  if (paragraphs.length > 0) {
    let content = '';
    paragraphs.forEach(p => {
      if (!p.contains(image)) {
        content += p.outerHTML;
      }
    });
    mediaBlock.content = sanitizeHtmlContent(content);
  } else {
    // Get all text not in the image
    mediaBlock.content = section.textContent || '';
  }
  
  // Set image properties
  mediaBlock.image = {
    src: image.src,
    alt: image.alt || 'Product image'
  };
  
  blocks.push(mediaBlock);
};

// Helper function to extract heading from a section
const extractHeading = (element: Element): string | null => {
  const heading = element.querySelector('h1, h2, h3');
  return heading ? heading.textContent : null;
};

// Helper function to sanitize HTML content
const sanitizeHtmlContent = (html: string): string => {
  // Basic sanitization - in a real app you might want to use a library
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/onerror=/gi, '')
    .replace(/onclick=/gi, '');
};
