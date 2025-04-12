
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const createProductBlock = (
  title: string,
  content: string, 
  backgroundColor: string
): Block | null => {
  const productBlock = createBlock('text', 1);
  
  if (productBlock && productBlock.type === 'text') {
    productBlock.heading = title;
    productBlock.content = `<p>${content}</p>`;
    productBlock.style = {
      backgroundColor,
      headingColor: '#5A2D82',
      padding: 'md',
      borderRadius: 'md',
    };
    
    return productBlock;
  }
  
  return null;
};
