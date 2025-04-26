
import { Template, ProductCategory, BlockBase } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { DOMParser } from 'linkedom';

export const analyzeHtmlToTemplate = (html: string): Template => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Get title from metadata or h1
  const title = doc.querySelector('title')?.textContent ||
               doc.querySelector('h1')?.textContent || 
               'Template Importado';
  
  // Get description from meta description or first paragraph
  const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content');
  const firstParagraph = doc.querySelector('p')?.textContent;
  const description = metaDescription || firstParagraph || 'Descrição importada do HTML';
  
  // Detect main category based on content
  const content = doc.body.textContent?.toLowerCase() || '';
  const category = detectCategory(content);
  
  // Generate blocks from HTML content
  const blocks = generateBlocksFromHtml(doc);
  
  // Create template object
  const template: Template = {
    id: uuidv4(),
    name: title,
    description: description,
    category: category,
    blocks: blocks,
    thumbnailUrl: extractFirstImageUrl(doc) || '/templates/default.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return template;
};

// Detect category based on content
const detectCategory = (content: string): ProductCategory => {
  const keywords: Record<ProductCategory, string[]> = {
    'supplements': ['suplemento', 'proteína', 'whey', 'creatina', 'vitamina'],
    'clothing': ['roupa', 'camiseta', 'calça', 'vestido', 'jaqueta'],
    'accessories': ['acessório', 'bolsa', 'colar', 'pulseira', 'anel'],
    'shoes': ['sapato', 'tênis', 'sandália', 'bota', 'chinelo'],
    'electronics': ['eletrônico', 'smartphone', 'notebook', 'tablet', 'câmera'],
    'Alimentos': ['alimento', 'comida', 'lanche', 'refeição', 'biscoito'],
    'Bebidas': ['bebida', 'água', 'refrigerante', 'suco', 'café'],
    'Beleza': ['beleza', 'maquiagem', 'perfume', 'creme', 'shampoo'],
    'Casa': ['casa', 'móvel', 'utensílio', 'cozinha', 'quarto'],
    'Decoração': ['decoração', 'quadro', 'vaso', 'almofada', 'luminária'],
    'Eletrônicos': ['eletrônicos', 'celular', 'computador', 'televisão', 'fone'],
    'Esporte': ['esporte', 'fitness', 'exercício', 'treino', 'academia'],
    'Moda': ['moda', 'fashion', 'estilo', 'tendência', 'acessório'],
    'Saúde': ['saúde', 'bem-estar', 'remédio', 'vitamina', 'suplemento'],
    'other': ['outro', 'diversos', 'variados']
  };
  
  let bestMatch: { category: ProductCategory, matches: number } = { category: 'other', matches: 0 };
  
  for (const [category, keywordList] of Object.entries(keywords) as [ProductCategory, string[]][]) {
    const matches = keywordList.filter(keyword => content.includes(keyword)).length;
    if (matches > bestMatch.matches) {
      bestMatch = { category: category as ProductCategory, matches };
    }
  }
  
  return bestMatch.category;
};

// Extract first image URL from HTML
const extractFirstImageUrl = (doc: Document): string | null => {
  const firstImage = doc.querySelector('img');
  if (firstImage && firstImage.src) {
    return firstImage.src;
  }
  
  // Check for background images in style attributes
  const elementsWithBg = doc.querySelectorAll('[style*="background-image"]');
  for (const element of Array.from(elementsWithBg)) {
    const style = element.getAttribute('style') || '';
    const urlMatch = style.match(/background-image:\s*url\(['"]?([^'"()]+)['"]?\)/i);
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }
  }
  
  return null;
};

// Generate blocks from HTML
const generateBlocksFromHtml = (doc: Document): BlockBase[] => {
  const blocks: BlockBase[] = [];
  
  // Extract hero section if exists
  const heroSection = doc.querySelector('header, .hero, [class*="hero"]');
  if (heroSection) {
    blocks.push(createHeroBlock(heroSection));
  }
  
  // Extract text content
  const contentSections = doc.querySelectorAll('section, article, div.content, .description');
  for (const section of Array.from(contentSections)) {
    // Skip if it's nested inside another section that we already processed
    if (section.parentElement && Array.from(contentSections).includes(section.parentElement)) {
      continue;
    }
    
    blocks.push(...createContentBlocks(section));
  }
  
  // If no blocks were created, create a basic text block
  if (blocks.length === 0) {
    const bodyContent = doc.body.textContent || 'Conteúdo importado';
    blocks.push({
      id: uuidv4(),
      type: 'text',
      title: 'Texto',
      content: bodyContent.substring(0, 1000), // Limit to 1000 chars
      style: {
        textAlign: 'left',
        color: '#000000',
        fontSize: 'md',
        fontWeight: 'normal',
      }
    });
  }
  
  return blocks;
};

// Create hero block
const createHeroBlock = (element: Element): BlockBase => {
  const heading = element.querySelector('h1, h2')?.textContent || 'Título Principal';
  const subheading = element.querySelector('h3, h4, p')?.textContent || 'Subtítulo';
  const bgImage = extractBackgroundImage(element);
  
  return {
    id: uuidv4(),
    type: 'hero',
    title: 'Hero',
    heading,
    subheading,
    backgroundImage: bgImage || '',
    style: {
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 'lg',
      fontWeight: 'bold',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textShadow: true
    }
  };
};

// Extract background image from element
const extractBackgroundImage = (element: Element): string | null => {
  // Check for inline style
  const style = element.getAttribute('style') || '';
  const inlineMatch = style.match(/background-image:\s*url\(['"]?([^'"()]+)['"]?\)/i);
  if (inlineMatch && inlineMatch[1]) {
    return inlineMatch[1];
  }
  
  // Check for img child
  const img = element.querySelector('img');
  if (img && img.src) {
    return img.src;
  }
  
  return null;
};

// Create content blocks from a section
const createContentBlocks = (element: Element): BlockBase[] => {
  const blocks: BlockBase[] = [];
  const text = element.textContent?.trim() || '';
  
  if (text.length < 10) {
    return blocks; // Skip very short text sections
  }
  
  // Check if it has images and text - could be image+text block
  const images = element.querySelectorAll('img');
  if (images.length === 1) {
    const img = images[0];
    const imgSrc = img.src || '';
    const imgAlt = img.alt || 'Imagem';
    
    // Text content excluding the image
    let textContent = '';
    for (const child of Array.from(element.childNodes)) {
      if (child instanceof Element) {
        if (child.tagName.toLowerCase() !== 'img') {
          textContent += child.textContent || '';
        }
      } else {
        textContent += child.textContent || '';
      }
    }
    
    if (textContent.trim().length > 0) {
      blocks.push({
        id: uuidv4(),
        type: 'image-text',
        title: 'Imagem e Texto',
        content: textContent,
        src: imgSrc,
        alt: imgAlt,
        style: {
          textAlign: 'left',
          color: '#000000',
          fontSize: 'md',
          fontWeight: 'normal',
          imagePosition: 'left'
        }
      });
      return blocks;
    }
  }
  
  // If it's just text content
  blocks.push({
    id: uuidv4(),
    type: 'text',
    title: 'Texto',
    content: text,
    style: {
      textAlign: 'left',
      color: '#000000',
      fontSize: 'md',
      fontWeight: 'normal',
    }
  });
  
  return blocks;
};

// Helper function to customize block types based on templates
export const customizeBlockTypes = (template: Template, targetType: string): Template => {
  // Create a deep copy to avoid modifying the original
  const modifiedTemplate: Template = {
    ...template,
    blocks: JSON.parse(JSON.stringify(template.blocks || [])),
  };
  
  // Modify blocks based on target type
  if (targetType === 'product') {
    // Add product-specific blocks
    modifiedTemplate.blocks.push({
      id: uuidv4(),
      type: 'specifications',
      title: 'Especificações',
      specs: [
        { name: 'Marca', value: 'Exemplo' },
        { name: 'Material', value: 'Premium' },
        { name: 'Dimensões', value: '10 x 20 x 5 cm' },
      ],
      style: {
        textAlign: 'left',
        color: '#000000',
        fontSize: 'md',
      }
    });
  }
  
  return modifiedTemplate;
};
