import { Block, BlockType, ColumnLayout, Template, ProductCategory, TextBlock, HeroBlock, GalleryBlock, FeaturesBlock, FAQBlock, CTABlock, ImageTextBlock, TextImageBlock } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { createBlock } from '@/utils/blockCreators/createBlock';
import { extractHeading, sanitizeHtmlContent } from './utils';

export const processHeroSection = (section: Element, blocks: Block[]): void => {
  const heroBlock = createBlock('hero', 1) as HeroBlock;
  
  const h1 = section.querySelector('h1');
  const headings = section.querySelectorAll('h1, h2');
  const buttons = section.querySelectorAll('a.button, .btn, button, a[class*="button"], a[class*="btn"]');
  
  heroBlock.title = h1 ? h1.textContent || 'Heading' : extractHeading(section) || 'Heading';
  
  if (headings.length > 1) {
    heroBlock.subheading = headings[1].textContent || '';
  } else {
    const paragraphs = section.querySelectorAll('p');
    if (paragraphs.length > 0) {
      heroBlock.subheading = paragraphs[0].textContent || '';
    }
  }
  
  if (buttons.length > 0) {
    const button = buttons[0];
    heroBlock.buttonText = button.textContent || 'Learn More';
    heroBlock.buttonUrl = button.getAttribute('href') || '#';
  }
  
  blocks.push(heroBlock);
};

export const processGallerySection = (section: Element, images: NodeListOf<HTMLImageElement>, blocks: Block[]): void => {
  const columns = Math.min(4, Math.max(1, images.length)) as ColumnLayout;
  const galleryBlock = createBlock('gallery', columns) as GalleryBlock;
  
  const headingText = extractHeading(section) || 'Gallery';
  galleryBlock.title = headingText;
  
  galleryBlock.images = Array.from(images).map((img, index) => {
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

export const processFeatureSection = (section: Element, blocks: Block[]): void => {
  const isBenefits = 
    section.classList.contains('benefits') || 
    section.classList.contains('advantage') || 
    section.innerHTML.toLowerCase().includes('benefit') ||
    section.innerHTML.toLowerCase().includes('advantage');
  
  const blockType: BlockType = isBenefits ? 'benefits' : 'features';
  const featureBlock = createBlock(blockType, 3) as FeaturesBlock;
  
  featureBlock.title = extractHeading(section) || (isBenefits ? 'Benefits' : 'Features');
  
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

export const processFAQSection = (section: Element, blocks: Block[]): void => {
  const faqBlock = createBlock('faq', 1) as FAQBlock;
  
  faqBlock.title = extractHeading(section) || 'Frequently Asked Questions';
  
  const questionItems = section.querySelectorAll('details, .faq-item, .accordion-item, dt, .question');
  
  if (questionItems.length > 0) {
    faqBlock.questions = Array.from(questionItems).map((item, index) => {
      let question = '';
      let answer = '';
      
      if (item.tagName === 'DETAILS') {
        const summary = item.querySelector('summary');
        question = summary ? summary.textContent || '' : `Question ${index + 1}`;
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

export const processCTASection = (section: Element, blocks: Block[]): void => {
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

export const processImageTextSection = (
  section: Element, 
  image: HTMLImageElement, 
  blocks: Block[],
  textFirst: boolean = false
): void => {
  const blockType: BlockType = textFirst ? 'textImage' : 'imageText';
  
  const mediaBlock = createBlock(blockType, 1) as ImageTextBlock | TextImageBlock;
  
  mediaBlock.title = extractHeading(section) || 'Image and Text';
  
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
    mediaBlock.content = section.textContent || '';
  }
  
  mediaBlock.image = {
    src: image.src,
    alt: image.alt || 'Product image'
  };
  
  blocks.push(mediaBlock);
};
