
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateCtaSection = (addBlock: (block: Block) => void) => {
  // Call to action block
  const ctaBlock = createBlock('cta', 1);
  if (ctaBlock && ctaBlock.type === 'cta') {
    ctaBlock.heading = 'Transforme sua Saúde Hoje Mesmo!';
    ctaBlock.content = `
      <p>Não espere mais para começar a cuidar do que realmente importa: sua saúde e bem-estar. O Protocolo Saúde e Bem-estar da Eleve Life é sua oportunidade de transformar completamente sua qualidade de vida com produtos naturais e eficazes.</p>
      <p>Faça como milhares de pessoas que já experimentaram e aprovaram esta combinação poderosa de suplementos. Invista em você mesmo!</p>
    `;
    ctaBlock.buttonText = 'Quero Garantir Meu Protocolo Agora';
    ctaBlock.buttonUrl = '#comprar';
    ctaBlock.style = {
      backgroundColor: '#f8f9fa',
      headingColor: '#5A2D82',
      padding: 'xl',
      borderRadius: 'lg',
    };
    addBlock(ctaBlock);
  }
};
