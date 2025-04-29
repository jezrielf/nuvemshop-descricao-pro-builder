
import { ProductDescription, Block } from '@/types/editor';

/**
 * Generates meta description based on product description content
 */
export const generateMetaDescription = (description: ProductDescription, productTitle?: string): string => {
  // Start with the product title if available
  let metaContent = productTitle ? `${productTitle}: ` : '';
  
  // Extract text content from blocks
  const textBlocks = description.blocks.filter(block => 
    block.type === 'text' || block.type === 'hero' || block.type === 'features' || 
    block.type === 'benefits' || block.type === 'cta'
  );
  
  for (const block of textBlocks) {
    if (block.type === 'text' && 'content' in block) {
      // Extract plain text from HTML content
      const plainText = block.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      metaContent += plainText + ' ';
    } else if (block.type === 'hero' && 'heading' in block) {
      metaContent += block.heading + ' ';
      if ('subheading' in block && block.subheading) {
        metaContent += block.subheading + ' ';
      }
    } else if ((block.type === 'features' || block.type === 'benefits') && 'heading' in block) {
      metaContent += block.heading + ' ';
    } else if (block.type === 'cta' && 'heading' in block) {
      metaContent += block.heading + ' ';
      if ('content' in block && block.content) {
        metaContent += block.content + ' ';
      }
    }
    
    // Limit meta description to approximately 155 characters (standard SEO recommendation)
    if (metaContent.length > 130) {
      break;
    }
  }
  
  // Clean up and limit to 155 characters
  metaContent = metaContent.trim();
  if (metaContent.length > 155) {
    metaContent = metaContent.substring(0, 152) + '...';
  }
  
  return metaContent;
};

/**
 * Extracts potential keywords from description content
 */
export const extractKeywords = (description: ProductDescription): string[] => {
  // Get all text content
  let allText = '';
  
  description.blocks.forEach(block => {
    if (block.type === 'text' && 'content' in block) {
      const plainText = block.content.replace(/<[^>]+>/g, ' ');
      allText += plainText + ' ';
    } else if ('heading' in block && block.heading) {
      allText += block.heading + ' ';
    }
    
    if (block.type === 'features' && 'features' in block && Array.isArray(block.features)) {
      block.features.forEach(feature => {
        if (feature.title) allText += feature.title + ' ';
        if (feature.description) allText += feature.description + ' ';
      });
    }
    
    if (block.type === 'benefits' && 'benefits' in block && Array.isArray(block.benefits)) {
      block.benefits.forEach(benefit => {
        if (benefit.title) allText += benefit.title + ' ';
        if (benefit.description) allText += benefit.description + ' ';
      });
    }
  });
  
  // Split text into words
  const words = allText.toLowerCase()
    .replace(/[^\w\sáàâãéèêíìîóòôõúùûç]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  
  // Count word frequency
  const wordCount: { [word: string]: number } = {};
  const stopWords = new Set(['o', 'a', 'os', 'as', 'um', 'uma', 'e', 'é', 'de', 'do', 'da', 'dos', 'das', 'no', 'na', 'nos', 'nas', 'para', 'com', 'que', 'por', 'em']);
  
  words.forEach(word => {
    if (word.length > 3 && !stopWords.has(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });
  
  // Sort by frequency
  const sortedWords = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]);
  
  // Return top 5 keywords
  return sortedWords.slice(0, 5);
};

/**
 * Generates schema.org JSON-LD for products
 */
export const generateProductSchema = (product: any, description?: ProductDescription): string => {
  if (!product) return '';
  
  // Get product name
  const name = product.name && typeof product.name === 'object' && product.name.pt 
    ? product.name.pt 
    : (typeof product.name === 'string' ? product.name : '');
  
  // Get product images if available
  const images = product.images && Array.isArray(product.images) 
    ? product.images.map((img: any) => img.src || img.url).filter(Boolean)
    : [];
  
  // Get product description
  let desc = '';
  if (description) {
    desc = generateMetaDescription(description, name);
  }
  
  // Create schema object
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "description": desc
  };
  
  // Add images if available
  if (images.length > 0) {
    Object.assign(schema, { "image": images });
  }
  
  // Add price if available
  if (product.price) {
    const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    if (!isNaN(price)) {
      Object.assign(schema, {
        "offers": {
          "@type": "Offer",
          "price": price.toFixed(2),
          "priceCurrency": product.currency_code || "BRL"
        }
      });
    }
  }
  
  return JSON.stringify(schema, null, 2);
};
