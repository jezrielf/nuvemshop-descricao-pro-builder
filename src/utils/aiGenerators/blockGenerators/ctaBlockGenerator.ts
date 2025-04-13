
import { CTABlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateCTABlock = (
  productName: string,
  hasModelImage: boolean
): CTABlock => {
  const ctaBlock = createBlock('cta', 1) as CTABlock;
  ctaBlock.visible = true;
  ctaBlock.title = 'Chamada para Ação';
  ctaBlock.heading = `Adquira seu ${productName} hoje mesmo!`;
  ctaBlock.content = `Não perca a oportunidade de aproveitar todos os benefícios que o ${productName} pode oferecer. Faça seu pedido agora mesmo!`;
  ctaBlock.buttonText = 'Comprar Agora';
  ctaBlock.buttonUrl = '#';
  ctaBlock.style = {
    backgroundColor: hasModelImage ? '#f0f9ff' : '#f3f4f6',
    headingColor: '#1f2937',
    padding: 'lg' as any,
    blockSpacing: 'lg' as any
  };
  
  return ctaBlock;
};
