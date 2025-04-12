
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateHeroSection = (addBlock: (block: Block) => void) => {
  // Create the hero block with a strong headline
  const heroBlock = createBlock('hero', 1);
  if (heroBlock && heroBlock.type === 'hero') {
    heroBlock.heading = 'Um corpo são, é sinônimo de uma vida mais feliz, produtiva, próspera e duradoura';
    heroBlock.subheading = 'Sua alimentação determina em muito a qualidade de sua rotina';
    heroBlock.buttonText = 'Conheça nosso protocolo';
    heroBlock.buttonUrl = '#protocolo';
    heroBlock.style = {
      backgroundColor: '#f8f9fa',
      headingColor: '#5A2D82',
      textColor: '#333',
    };
    addBlock(heroBlock);
  }
};
