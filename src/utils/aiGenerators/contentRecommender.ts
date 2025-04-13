
import { ProductDescription, Block, BlockType } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Simulated AI recommendation system for content
export interface ContentRecommendation {
  id: string;
  type: 'block' | 'content' | 'image' | 'keyword';
  title: string;
  description: string;
  confidence: number; // 0-100
  action?: {
    type: 'add' | 'replace' | 'update';
    blockType?: BlockType;
    blockId?: string;
    data?: any;
  };
}

// This is a simulated AI recommendation engine
// In a real implementation, this would call an API
export const getContentRecommendations = async (
  description: ProductDescription,
  industry?: string
): Promise<ContentRecommendation[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const recommendations: ContentRecommendation[] = [];
  
  // Analyze the description blocks to find common patterns and missing elements
  const blockTypes = description.blocks.map(block => block.type);
  
  // Check if there's a hero block
  if (!blockTypes.includes('hero')) {
    recommendations.push({
      id: uuidv4(),
      type: 'block',
      title: 'Adicionar banner principal',
      description: 'As descrições de produtos com banner principal têm taxas de conversão 30% maiores.',
      confidence: 85,
      action: {
        type: 'add',
        blockType: 'hero'
      }
    });
  }
  
  // Check if there's a CTA block
  if (!blockTypes.includes('cta')) {
    recommendations.push({
      id: uuidv4(),
      type: 'block',
      title: 'Adicionar chamada para ação',
      description: 'Páginas sem CTA (Call-to-Action) perdem oportunidades de conversão.',
      confidence: 90,
      action: {
        type: 'add',
        blockType: 'cta'
      }
    });
  }
  
  // Check if there's a FAQ block
  if (!blockTypes.includes('faq')) {
    recommendations.push({
      id: uuidv4(),
      type: 'block',
      title: 'Adicionar perguntas frequentes',
      description: 'Blocos de FAQ melhoram SEO e podem aparecer em resultados de busca avançados.',
      confidence: 75,
      action: {
        type: 'add',
        blockType: 'faq'
      }
    });
  }
  
  // Check if there are enough images
  const imageBlocks = description.blocks.filter(block => 
    ['image', 'gallery', 'hero', 'imageText', 'textImage'].includes(block.type)
  );
  
  if (imageBlocks.length < 2) {
    recommendations.push({
      id: uuidv4(),
      type: 'image',
      title: 'Adicionar mais imagens',
      description: 'Descrições com várias imagens de produto têm taxas de engajamento maiores.',
      confidence: 80,
      action: {
        type: 'add',
        blockType: 'image'
      }
    });
  }
  
  // Check content length in text blocks
  const textBlocks = description.blocks.filter(block => 
    block.type === 'text' || block.type === 'textImage' || block.type === 'imageText'
  );
  
  let totalTextLength = 0;
  textBlocks.forEach(block => {
    if (block.type === 'text' && block.content) {
      // Strip HTML
      const plainText = block.content.replace(/<[^>]+>/g, '');
      totalTextLength += plainText.length;
    } else if ((block.type === 'textImage' || block.type === 'imageText') && block.content) {
      const plainText = block.content.replace(/<[^>]+>/g, '');
      totalTextLength += plainText.length;
    }
  });
  
  if (totalTextLength < 500) {
    recommendations.push({
      id: uuidv4(),
      type: 'content',
      title: 'Adicionar mais conteúdo textual',
      description: 'Seu conteúdo textual parece curto. Google tende a favorecer conteúdo mais completo.',
      confidence: 70,
      action: {
        type: 'add',
        blockType: 'text'
      }
    });
  }
  
  // Industry-specific recommendations
  if (industry === 'supplements' || industry === 'health') {
    recommendations.push({
      id: uuidv4(),
      type: 'keyword',
      title: 'Incluir termos de "benefícios para saúde"',
      description: 'Produtos de saúde com termos específicos de benefícios têm maior conversão.',
      confidence: 85
    });
  } else if (industry === 'clothing' || industry === 'fashion') {
    recommendations.push({
      id: uuidv4(),
      type: 'keyword',
      title: 'Incluir termos de "estilo" e "tendência"',
      description: 'Produtos de moda convertem melhor com termos relacionados a estilo.',
      confidence: 85
    });
  }
  
  return recommendations;
};

// Generate a complete content suggestion based on product type
export const generateContentSuggestion = async (
  productType: string,
  productName: string
): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This would be replaced with a real AI call in production
  // Using templates for demonstration
  
  if (productType.includes('saúde') || productType.includes('suplemento')) {
    return `<p>O <strong>${productName}</strong> foi desenvolvido para apoiar seu bem-estar diário de forma natural e eficaz. Rico em nutrientes essenciais, este suplemento auxilia no fortalecimento do sistema imunológico e proporciona mais energia para suas atividades diárias.</p>
<p>Nosso produto passa por rigorosos testes de qualidade, garantindo a pureza e eficácia de cada ingrediente. Livre de aditivos artificiais, o ${productName} é a escolha ideal para quem busca um estilo de vida mais saudável.</p>
<p>Recomendamos o consumo diário para resultados mais consistentes. Em poucas semanas, você poderá notar a diferença na sua disposição e bem-estar geral.</p>`;
  } 
  else if (productType.includes('moda') || productType.includes('roupa')) {
    return `<p>O <strong>${productName}</strong> é a peça essencial que não pode faltar no seu guarda-roupa. Combinando estilo contemporâneo com excelente acabamento, esta peça foi desenhada para valorizar sua silhueta e garantir conforto durante todo o dia.</p>
<p>Confeccionado com materiais de alta qualidade, o ${productName} mantém suas características mesmo após várias lavagens, garantindo durabilidade e preservando o caimento perfeito que você merece.</p>
<p>Versátil e atemporal, esta peça pode ser combinada de diversas formas, criando looks para diferentes ocasiões, do casual ao mais sofisticado.</p>`;
  }
  else if (productType.includes('acessório')) {
    return `<p>O <strong>${productName}</strong> é o acessório perfeito para complementar seu visual com sofisticação e personalidade. Cada detalhe foi cuidadosamente trabalhado para criar uma peça única que expressa estilo e bom gosto.</p>
<p>Produzido com materiais selecionados, este acessório garante durabilidade sem abrir mão da beleza e do acabamento refinado. O design equilibra tendências atuais com elementos clássicos, resultando em uma peça atemporal.</p>
<p>Ideal para diversas ocasiões, o ${productName} pode transformar um look básico em algo memorável, demonstrando sua atenção aos detalhes.</p>`;
  }
  else {
    return `<p>O <strong>${productName}</strong> foi desenvolvido pensando nas suas necessidades, combinando funcionalidade, qualidade e design em um só produto. Cada detalhe foi cuidadosamente planejado para oferecer a melhor experiência possível.</p>
<p>Utilizando materiais de primeira linha e tecnologias avançadas, garantimos um produto durável e eficiente que supera as expectativas. O ${productName} se destaca pela facilidade de uso e pelos resultados consistentes.</p>
<p>Nosso compromisso com a excelência se reflete em cada aspecto deste produto, desde sua concepção até o momento em que chega às suas mãos. Experimente e comprove a diferença.</p>`;
  }
};

// This function returns suggested keywords based on product type
export const getSuggestedKeywords = async (
  productType: string,
  productName: string
): Promise<string[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Common keywords for all products
  const commonKeywords = [
    'qualidade premium',
    'melhor preço',
    'entrega rápida',
    'satisfação garantida',
    productName.toLowerCase()
  ];
  
  // Specific keywords based on product type
  if (productType.includes('saúde') || productType.includes('suplemento')) {
    return [
      ...commonKeywords,
      'saúde natural',
      'bem-estar',
      'suplemento natural',
      'vitaminas essenciais',
      'energia diária',
      'fortalecimento imunológico',
      'qualidade de vida',
      'nutrição balanceada'
    ];
  } 
  else if (productType.includes('moda') || productType.includes('roupa')) {
    return [
      ...commonKeywords,
      'tendência de moda',
      'estilo único',
      'conforto premium',
      'tecido de qualidade',
      'caimento perfeito',
      'look moderno',
      'peça versátil',
      'moda sustentável'
    ];
  }
  else if (productType.includes('acessório')) {
    return [
      ...commonKeywords,
      'acessório elegante',
      'design exclusivo',
      'acabamento premium',
      'peça artesanal',
      'presente perfeito',
      'estilo pessoal',
      'acabamento refinado',
      'acessório versátil'
    ];
  }
  else {
    return [
      ...commonKeywords,
      'produto inovador',
      'alto desempenho',
      'tecnologia avançada',
      'design ergonômico',
      'fácil utilização',
      'garantia estendida',
      'multifuncional',
      'custo-benefício'
    ];
  }
};
