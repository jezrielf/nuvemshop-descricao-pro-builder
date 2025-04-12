
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

interface FormData {
  productName: string;
  productDescription: string;
  keyFeatures: string;
  companyInfo: string;
  targetAudience: string;
}

export const generateDescriptionBlocks = (formData: FormData, addBlock: (block: Block) => void) => {
  // Hero block
  const heroBlock = createBlock('hero', 1);
  if (heroBlock && heroBlock.type === 'hero') {
    heroBlock.heading = formData.productName;
    heroBlock.subheading = `A melhor escolha para ${formData.targetAudience}`;
    addBlock(heroBlock);
  }
  
  // Text block for product description
  const textBlock = createBlock('text', 1);
  if (textBlock && textBlock.type === 'text') {
    textBlock.heading = 'Sobre o Produto';
    textBlock.content = `<p>${formData.productDescription}</p>`;
    addBlock(textBlock);
  }
  
  // Features block
  const featuresData = formData.keyFeatures.split('\n').filter(f => f.trim());
  if (featuresData.length > 0) {
    const featuresBlock = createBlock('features', 2);
    if (featuresBlock && featuresBlock.type === 'features') {
      featuresBlock.heading = 'Recursos Principais';
      featuresBlock.features = featuresData.map((feature, index) => ({
        id: `feature-${index}`,
        title: feature.trim(),
        description: 'Descrição do recurso.',
        icon: 'zap'
      }));
      addBlock(featuresBlock);
    }
  }
  
  // Company info as text block
  if (formData.companyInfo.trim()) {
    const companyBlock = createBlock('text', 1);
    if (companyBlock && companyBlock.type === 'text') {
      companyBlock.heading = 'Sobre a Empresa';
      companyBlock.content = `<p>${formData.companyInfo}</p>`;
      addBlock(companyBlock);
    }
  }
  
  // CTA block
  const ctaBlock = createBlock('cta', 1);
  if (ctaBlock && ctaBlock.type === 'cta') {
    ctaBlock.heading = 'Interessado em nosso produto?';
    ctaBlock.content = '<p>Entre em contato conosco para saber mais ou realizar um pedido.</p>';
    ctaBlock.buttonText = 'Fale Conosco';
    addBlock(ctaBlock);
  }
};
