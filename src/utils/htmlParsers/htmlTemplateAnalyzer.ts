
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Function to sanitize HTML input
const sanitizeHTML = (html: string): string => {
  // Implement sanitization as needed
  return html;
};

// Function to extract main content from HTML
const extractContent = (html: string): string => {
  const sanitizedHtml = sanitizeHTML(html);
  
  // In a real implementation, we would use a proper HTML parser
  // For now, use a simple extraction approach
  const bodyContent = sanitizedHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || sanitizedHtml;
  
  return bodyContent;
};

// Generate template blocks from HTML content
const generateBlocks = (htmlContent: string) => {
  // Here we would parse the HTML and convert it into blocks
  // For now, return a simple structure
  
  return [
    {
      id: uuidv4(),
      type: 'text',
      title: 'HTML Content',
      content: htmlContent,
      columns: 'full',
      visible: true,
    },
  ];
};

// Main function to analyze HTML and convert to template
export const analyzeHtmlToTemplate = (html: string, name: string = 'Imported HTML Template'): Template => {
  const content = extractContent(html);
  const blocks = generateBlocks(content);
  
  return {
    id: uuidv4(),
    name,
    description: 'Template importado de HTML',
    category: 'other',
    blocks,
    thumbnailUrl: '/templates/imported.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Function to analyze product page and extract template
export const analyzeProductPageToTemplate = (html: string, productName: string): Template => {
  const content = extractContent(html);
  
  // You would implement more sophisticated extraction for product pages
  const blocks = generateBlocks(content);
  
  return {
    id: uuidv4(),
    name: `Template de ${productName}`,
    description: `Template gerado a partir da página do produto ${productName}`,
    category: 'other',
    blocks,
    thumbnailUrl: '/templates/product.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};
