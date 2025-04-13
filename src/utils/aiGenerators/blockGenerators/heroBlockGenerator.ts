
import { v4 as uuidv4 } from 'uuid';
import { HeroBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateHeroBlock = (
  productName: string, 
  productPrice: string | undefined,
  imageUrl: string | undefined,
  modelImageUrl: string | undefined,
  layoutStyle: any
): HeroBlock => {
  const heroBlock = createBlock('hero', 1) as HeroBlock;
  
  heroBlock.visible = true;
  heroBlock.title = 'Banner Principal';
  heroBlock.heading = productName;
  heroBlock.subheading = `Descubra porque este é o produto perfeito para você. ${productPrice ? `Apenas ${productPrice}` : ''}`;
  heroBlock.buttonText = 'Saiba Mais';
  heroBlock.buttonUrl = '#features';
  
  // Priorizar a imagem do produto se fornecida, senão usar a imagem modelo
  if (imageUrl) {
    heroBlock.image = {
      src: imageUrl,
      alt: productName
    };
  } else if (modelImageUrl) {
    heroBlock.image = {
      src: modelImageUrl,
      alt: `Inspiração para ${productName}`
    };
  }
  
  heroBlock.style = layoutStyle;
  
  return heroBlock;
};
