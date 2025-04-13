
import { v4 as uuidv4 } from 'uuid';
import { FAQBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateFAQBlock = (
  productName: string,
  targetAudience: string,
  mainFeatures: string,
  hasModelImage: boolean
): FAQBlock => {
  const faqBlock = createBlock('faq', 1) as FAQBlock;
  faqBlock.visible = true;
  faqBlock.title = 'Perguntas Frequentes';
  faqBlock.heading = 'Perguntas Frequentes';
  
  // Generate dynamic FAQs based on input
  faqBlock.questions = [
    {
      id: uuidv4(),
      question: `Qual a garantia do ${productName}?`,
      answer: 'Oferecemos 12 meses de garantia para todos os nossos produtos.'
    },
    {
      id: uuidv4(),
      question: 'Como funciona o envio?',
      answer: 'Enviamos para todo o Brasil com os melhores serviços de entrega. Prazo médio de 3 a 7 dias úteis.'
    },
    {
      id: uuidv4(),
      question: `Para quem é indicado o ${productName}?`,
      answer: `${targetAudience.split('.')[0]}.`
    },
    {
      id: uuidv4(),
      question: 'Quais são os principais diferenciais deste produto?',
      answer: `${mainFeatures.split('.')[0]}.`
    }
  ];
  
  faqBlock.style = {
    backgroundColor: hasModelImage ? '#f8fafc' : '#f9fafb',
    padding: 'md' as any,
    blockSpacing: 'md' as any
  };
  
  return faqBlock;
};
