
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';
import { v4 as uuidv4 } from 'uuid';

interface FormData {
  productName: string;
  productDescription: string;
  keyFeatures: string;
  companyInfo: string;
  targetAudience: string;
}

export const generateDescriptionBlocks = (formData: FormData, addBlock: (block: Block) => void) => {
  // Hero block com design mais impactante
  const heroBlock = createBlock('hero', 1);
  if (heroBlock && heroBlock.type === 'hero') {
    heroBlock.heading = formData.productName;
    heroBlock.subheading = `Solução ideal para ${formData.targetAudience}`;
    heroBlock.backgroundImage = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&q=80';
    heroBlock.buttonText = 'Descubra mais';
    addBlock(heroBlock);
  }
  
  // Bloco de texto com descrição rica
  const textBlock = createBlock('text', 1);
  if (textBlock && textBlock.type === 'text') {
    textBlock.heading = 'Sobre o Produto';
    textBlock.content = `<p class="text-lg leading-relaxed">${formData.productDescription}</p>
    <p class="mt-4">Desenvolvido com as mais avançadas tecnologias do mercado, este produto foi criado pensando nas necessidades específicas de ${formData.targetAudience}.</p>`;
    addBlock(textBlock);
  }
  
  // Bloco de imagem para ilustrar o produto
  const imageBlock = createBlock('image', 1);
  if (imageBlock && imageBlock.type === 'image') {
    imageBlock.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80';
    imageBlock.alt = `Imagem ilustrativa de ${formData.productName}`;
    imageBlock.caption = 'Visualize o poder da inovação';
    addBlock(imageBlock);
  }
  
  // Features com ícones e design elaborado
  const featuresData = formData.keyFeatures.split('\n').filter(f => f.trim());
  if (featuresData.length > 0) {
    const featuresBlock = createBlock('features', 3);
    if (featuresBlock && featuresBlock.type === 'features') {
      featuresBlock.heading = 'Recursos Exclusivos';
      featuresBlock.features = featuresData.map((feature, index) => ({
        id: `feature-${index}`,
        title: feature.trim(),
        description: 'Funcionalidade projetada para maximizar seu desempenho e resultados.',
        icon: ['zap', 'star', 'check', 'award', 'shield'][index % 5]
      }));
      addBlock(featuresBlock);
    }
  }
  
  // Bloco de benefícios com design colorido
  const benefitsData = [
    'Economia de tempo',
    'Facilidade de uso',
    'Resultados comprovados',
    'Suporte premium'
  ];
  
  const benefitsBlock = createBlock('benefits', 2);
  if (benefitsBlock && benefitsBlock.type === 'benefits') {
    benefitsBlock.heading = 'Benefícios Transformadores';
    benefitsBlock.benefits = benefitsData.map((benefit, index) => ({
      id: `benefit-${index}`,
      title: benefit,
      description: `Experimente ${benefit.toLowerCase()} como nunca antes com nossa solução inovadora.`,
      icon: ['heart', 'thumbs-up', 'trending-up', 'smile'][index % 4]
    }));
    addBlock(benefitsBlock);
  }
  
  // Adicionar galeria de imagens
  const galleryBlock = createBlock('gallery', 2);
  if (galleryBlock && galleryBlock.type === 'gallery') {
    galleryBlock.images = [
      {
        id: uuidv4(),
        src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80',
        alt: 'Tecnologia avançada',
        caption: 'Tecnologia de ponta'
      },
      {
        id: uuidv4(),
        src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
        alt: 'Facilidade de uso',
        caption: 'Interface intuitiva'
      },
      {
        id: uuidv4(),
        src: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80',
        alt: 'Ideias inovadoras',
        caption: 'Inovação constante'
      },
      {
        id: uuidv4(),
        src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80',
        alt: 'Tecnologia do futuro',
        caption: 'Pronto para o futuro'
      }
    ];
    addBlock(galleryBlock);
  }
  
  // Bloco de imagem com texto (alternado)
  const imageTextBlock = createBlock('imageText', 1);
  if (imageTextBlock && imageTextBlock.type === 'imageText') {
    imageTextBlock.heading = 'Design Pensado Para Você';
    imageTextBlock.content = '<p>Nossa solução foi desenvolvida após extensas pesquisas com usuários reais, garantindo uma experiência que atende perfeitamente às suas necessidades.</p>';
    imageTextBlock.image = {
      src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80',
      alt: 'Design centrado no usuário'
    };
    addBlock(imageTextBlock);
  }
  
  // FAQ para sanar dúvidas
  const faqBlock = createBlock('faq', 1);
  if (faqBlock && faqBlock.type === 'faq') {
    faqBlock.heading = 'Perguntas Frequentes';
    faqBlock.questions = [
      {
        id: uuidv4(),
        question: `Como o ${formData.productName} pode melhorar minha produtividade?`,
        answer: 'Nossa solução automatiza processos complexos, permitindo que você foque no que realmente importa para seu negócio.'
      },
      {
        id: uuidv4(),
        question: 'Quanto tempo leva para implementar?',
        answer: 'A implementação é rápida e descomplicada, com a maioria dos clientes conseguindo utilizar em menos de 24 horas.'
      },
      {
        id: uuidv4(),
        question: 'Oferecem suporte técnico?',
        answer: 'Sim, contamos com uma equipe dedicada de especialistas disponíveis 24/7 para ajudar com qualquer necessidade.'
      }
    ];
    addBlock(faqBlock);
  }
  
  // Especificações técnicas
  const specificationsBlock = createBlock('specifications', 1);
  if (specificationsBlock && specificationsBlock.type === 'specifications') {
    specificationsBlock.heading = 'Especificações Técnicas';
    specificationsBlock.specs = [
      {
        id: uuidv4(),
        name: 'Compatibilidade',
        value: 'Windows, Mac, Linux, iOS e Android'
      },
      {
        id: uuidv4(),
        name: 'Requisitos',
        value: 'Conexão com internet e navegador atualizado'
      },
      {
        id: uuidv4(),
        name: 'Atualizações',
        value: 'Automáticas e sem custo adicional'
      },
      {
        id: uuidv4(),
        name: 'Segurança',
        value: 'Criptografia de ponta a ponta'
      }
    ];
    addBlock(specificationsBlock);
  }
  
  // Bloco de texto com imagem (invertido)
  const textImageBlock = createBlock('textImage', 1);
  if (textImageBlock && textImageBlock.type === 'textImage') {
    textImageBlock.heading = 'Tecnologia de Ponta';
    textImageBlock.content = `<p>O ${formData.productName} utiliza algoritmos avançados que se adaptam às suas necessidades, garantindo resultados superiores a cada uso.</p>`;
    textImageBlock.image = {
      src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80',
      alt: 'Tecnologia avançada'
    };
    addBlock(textImageBlock);
  }
  
  // Company info como texto estilizado
  if (formData.companyInfo.trim()) {
    const companyBlock = createBlock('text', 1);
    if (companyBlock && companyBlock.type === 'text') {
      companyBlock.heading = 'Sobre Nossa Empresa';
      companyBlock.content = `
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-800">${formData.companyInfo}</p>
          <p class="mt-3 text-gray-600 italic">Nossa missão é transformar a maneira como você trabalha.</p>
        </div>
      `;
      addBlock(companyBlock);
    }
  }
  
  // CTA block com design chamativo
  const ctaBlock = createBlock('cta', 1);
  if (ctaBlock && ctaBlock.type === 'cta') {
    ctaBlock.heading = `Pronto para revolucionar sua experiência com ${formData.productName}?`;
    ctaBlock.content = '<p>Junte-se a milhares de clientes satisfeitos e transforme sua maneira de trabalhar hoje mesmo.</p>';
    ctaBlock.buttonText = 'Quero Conhecer';
    ctaBlock.buttonUrl = '#contato';
    addBlock(ctaBlock);
  }
};
