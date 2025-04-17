
import { Block, TextBlock, HeroBlock, GalleryBlock, FeaturesBlock, FAQBlock, CTABlock, ImageTextBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators/createBlock';
import { sanitizeHtmlContent } from './utils';
import { v4 as uuidv4 } from 'uuid';

export function processHeroSection(section: Element, blocks: Block[]): void {
  try {
    const heroBlock = createBlock('hero') as HeroBlock;
    
    // Extract heading
    const heading = section.querySelector('h1, h2, .heading, .title');
    heroBlock.heading = heading?.textContent?.trim() || 'Título Principal';
    
    // Extract subheading
    const subheading = section.querySelector('h3, h4, .subheading, .subtitle, p:not(:first-child)');
    heroBlock.subheading = subheading?.textContent?.trim() || 'Subtítulo';
    
    // Extract button if available
    const button = section.querySelector('a.button, .btn, button, a.cta');
    if (button) {
      heroBlock.buttonText = button.textContent?.trim() || 'Saiba mais';
      if (button instanceof HTMLAnchorElement) {
        heroBlock.buttonUrl = button.href || '#';
      }
    }
    
    // Extract background image if available
    const style = section.getAttribute('style') || '';
    const bgImageMatch = style.match(/background-image:\s*url\(['"]?([^'"]+)['"]?\)/i);
    if (bgImageMatch && bgImageMatch[1]) {
      heroBlock.backgroundImage = bgImageMatch[1];
    }
    
    // Extract image if available
    const image = section.querySelector('img');
    if (image) {
      heroBlock.image = {
        src: image.getAttribute('src') || '',
        alt: image.getAttribute('alt') || 'Hero image'
      };
    }
    
    blocks.push(heroBlock);
  } catch (error) {
    console.error('Error processing hero section:', error);
    // Fallback to a simple text block
    const textBlock = createBlock('text') as TextBlock;
    textBlock.content = sanitizeHtmlContent(section.innerHTML);
    blocks.push(textBlock);
  }
}

export function processGallerySection(section: Element, images: NodeListOf<HTMLImageElement>, blocks: Block[]): void {
  try {
    const galleryBlock = createBlock('gallery') as GalleryBlock;
    
    // Extract heading if available
    const heading = section.querySelector('h2, h3, .heading, .title');
    galleryBlock.heading = heading?.textContent?.trim();
    
    // Process images
    galleryBlock.images = Array.from(images).map(img => ({
      id: uuidv4(),
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt') || 'Imagem da galeria',
      caption: img.getAttribute('title') || img.getAttribute('data-caption') || ''
    }));
    
    blocks.push(galleryBlock);
  } catch (error) {
    console.error('Error processing gallery section:', error);
    // Fallback to a simple text block
    const textBlock = createBlock('text') as TextBlock;
    textBlock.content = sanitizeHtmlContent(section.innerHTML);
    blocks.push(textBlock);
  }
}

export function processFeatureSection(section: Element, blocks: Block[]): void {
  try {
    const featuresBlock = createBlock('features') as FeaturesBlock;
    
    // Extract heading if available
    const heading = section.querySelector('h2, h3, .heading, .title');
    featuresBlock.heading = heading?.textContent?.trim() || 'Recursos';
    
    // Try to identify feature items
    const featureItems = section.querySelectorAll('.feature, li, .item');
    
    if (featureItems.length > 0) {
      featuresBlock.features = Array.from(featureItems).map((item, index) => {
        const title = item.querySelector('h3, h4, strong, .title, .name') || item;
        const description = item.querySelector('p, .description, .content') || item;
        
        return {
          id: uuidv4(),
          title: title.textContent?.trim() || `Recurso ${index + 1}`,
          description: description.textContent?.trim() || '',
          icon: 'check' // Default icon
        };
      });
    } else {
      // If specific feature items not found, try to create from paragraphs
      const paragraphs = section.querySelectorAll('p');
      featuresBlock.features = Array.from(paragraphs).map((p, index) => ({
        id: uuidv4(),
        title: `Recurso ${index + 1}`,
        description: p.textContent?.trim() || '',
        icon: 'check'
      }));
    }
    
    // Ensure we have at least one feature
    if (featuresBlock.features.length === 0) {
      featuresBlock.features = [{
        id: uuidv4(),
        title: 'Recurso 1',
        description: 'Descrição do recurso',
        icon: 'check'
      }];
    }
    
    blocks.push(featuresBlock);
  } catch (error) {
    console.error('Error processing features section:', error);
    // Fallback to a simple text block
    const textBlock = createBlock('text') as TextBlock;
    textBlock.content = sanitizeHtmlContent(section.innerHTML);
    blocks.push(textBlock);
  }
}

export function processFAQSection(section: Element, blocks: Block[]): void {
  try {
    const faqBlock = createBlock('faq') as FAQBlock;
    
    // Extract heading if available
    const heading = section.querySelector('h2, h3, .heading, .title');
    faqBlock.heading = heading?.textContent?.trim() || 'Perguntas Frequentes';
    
    // Try to identify FAQ items
    const faqItems = section.querySelectorAll('details, .faq-item, .accordion-item');
    
    if (faqItems.length > 0) {
      faqBlock.questions = Array.from(faqItems).map((item, index) => {
        const question = item.querySelector('summary, .question, h3, h4') || item;
        const answer = item.querySelector('.answer, p') || item;
        
        return {
          id: uuidv4(),
          question: question.textContent?.trim() || `Pergunta ${index + 1}`,
          answer: answer.textContent?.trim() || 'Resposta à pergunta.'
        };
      });
    } else {
      // If specific FAQ items not found, try to identify question paragraphs
      const paragraphs = section.querySelectorAll('p');
      const questions = [];
      
      for (let i = 0; i < paragraphs.length; i += 2) {
        const question = paragraphs[i];
        const answer = paragraphs[i + 1] || paragraphs[i];
        
        questions.push({
          id: uuidv4(),
          question: question.textContent?.trim() || `Pergunta ${i/2 + 1}`,
          answer: (i + 1 < paragraphs.length ? answer.textContent?.trim() : 'Resposta à pergunta') || 'Resposta à pergunta'
        });
      }
      
      faqBlock.questions = questions;
    }
    
    // Ensure we have at least one question
    if (faqBlock.questions.length === 0) {
      faqBlock.questions = [{
        id: uuidv4(),
        question: 'Pergunta de exemplo',
        answer: 'Resposta à pergunta de exemplo.'
      }];
    }
    
    blocks.push(faqBlock);
  } catch (error) {
    console.error('Error processing FAQ section:', error);
    // Fallback to a simple text block
    const textBlock = createBlock('text') as TextBlock;
    textBlock.content = sanitizeHtmlContent(section.innerHTML);
    blocks.push(textBlock);
  }
}

export function processCTASection(section: Element, blocks: Block[]): void {
  try {
    const ctaBlock = createBlock('cta') as CTABlock;
    
    // Extract heading if available
    const heading = section.querySelector('h2, h3, .heading, .title');
    ctaBlock.heading = heading?.textContent?.trim() || 'Chamada para Ação';
    
    // Extract content/description
    const content = section.querySelector('p, .content, .description');
    ctaBlock.content = content?.textContent?.trim() || 'Descrição da chamada para ação.';
    
    // Extract button if available
    const button = section.querySelector('a.button, .btn, button, a.cta');
    if (button) {
      ctaBlock.buttonText = button.textContent?.trim() || 'Clique Aqui';
      if (button instanceof HTMLAnchorElement) {
        ctaBlock.buttonUrl = button.href || '#';
      }
    } else {
      ctaBlock.buttonText = 'Clique Aqui';
    }
    
    blocks.push(ctaBlock);
  } catch (error) {
    console.error('Error processing CTA section:', error);
    // Fallback to a simple text block
    const textBlock = createBlock('text') as TextBlock;
    textBlock.content = sanitizeHtmlContent(section.innerHTML);
    blocks.push(textBlock);
  }
}

export function processImageTextSection(section: Element, image: HTMLImageElement, blocks: Block[], isReversed: boolean = false): void {
  try {
    const blockType = isReversed ? 'textImage' : 'imageText';
    const imageTextBlock = createBlock(blockType) as ImageTextBlock;
    
    // Extract heading if available
    const heading = section.querySelector('h2, h3, .heading, .title');
    imageTextBlock.heading = heading?.textContent?.trim() || 'Título da Seção';
    
    // Process image
    imageTextBlock.image = {
      src: image.getAttribute('src') || '',
      alt: image.getAttribute('alt') || 'Imagem da seção'
    };
    
    // Extract content
    let content = '';
    const paragraphs = section.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (!p.contains(image)) { // Don't include paragraph that contains the image
        content += `<p>${p.textContent?.trim()}</p>`;
      }
    });
    
    imageTextBlock.content = content || '<p>Conteúdo da seção.</p>';
    
    blocks.push(imageTextBlock);
  } catch (error) {
    console.error('Error processing image-text section:', error);
    // Fallback to a simple text block
    const textBlock = createBlock('text') as TextBlock;
    textBlock.content = sanitizeHtmlContent(section.innerHTML);
    blocks.push(textBlock);
  }
}
