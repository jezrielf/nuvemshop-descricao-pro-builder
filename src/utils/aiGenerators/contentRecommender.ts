
import { ProductDescription } from '@/types/editor';

export interface ContentRecommendation {
  id: string;
  title: string;
  description: string;
  confidence: number;
  action?: {
    type: 'add' | 'replace' | 'update';
    blockId?: string;
    blockType?: string;
  };
}

export const getContentRecommendations = async (
  description: ProductDescription,
  productType: string
): Promise<ContentRecommendation[]> => {
  // This is a mock implementation
  // In a real app, this would call an AI service to analyze the description
  
  const mockRecommendations: ContentRecommendation[] = [
    {
      id: '1',
      title: 'Adicionar mais imagens',
      description: 'Descrições com mais imagens têm melhor engajamento e conversão.',
      confidence: 85,
      action: {
        type: 'add',
        blockType: 'gallery'
      }
    },
    {
      id: '2',
      title: 'Melhorar a chamada para ação',
      description: 'Sua CTA poderia ser mais persuasiva. Adicione um senso de urgência.',
      confidence: 75,
      action: {
        type: 'update',
        blockId: description.blocks.find(b => b.type === 'cta')?.id
      }
    },
    {
      id: '3',
      title: 'Incluir informações de garantia',
      description: 'Mencionar a garantia aumenta a confiança do cliente.',
      confidence: 90
    },
    {
      id: '4',
      title: 'Adicionar vídeo demonstrativo',
      description: 'Vídeos aumentam o tempo de permanência e explicam melhor os benefícios.',
      confidence: 70,
      action: {
        type: 'add',
        blockType: 'video'
      }
    }
  ];
  
  // Return the mock recommendations after a small delay to simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRecommendations), 800);
  });
};

export const generateContentSuggestion = async (
  productType: string,
  productName: string
): Promise<string> => {
  // Mock implementation for content suggestion
  const suggestions = {
    electronics: `<h3>Por que escolher o ${productName}?</h3>
                  <p>O ${productName} representa o que há de mais avançado em tecnologia atual, combinando design elegante com desempenho excepcional.</p>
                  <p>Com processamento ultrarrápido e bateria de longa duração, este dispositivo foi projetado para acompanhar seu ritmo de vida sem interrupções.</p>
                  <h4>Especificações que impressionam</h4>
                  <ul>
                    <li>Tela de alta resolução com cores vibrantes</li>
                    <li>Processador de última geração</li>
                    <li>Memória expansível</li>
                    <li>Resistente à água e poeira</li>
                  </ul>`,
    clothing: `<h3>${productName} - Estilo e Conforto em Perfeito Equilíbrio</h3>
              <p>Confeccionado com tecidos premium selecionados, o ${productName} oferece o equilíbrio perfeito entre estilo contemporâneo e conforto durante todo o dia.</p>
              <p>Cada peça é cuidadosamente produzida com atenção aos detalhes, garantindo durabilidade e um caimento impecável que valoriza qualquer tipo de corpo.</p>
              <h4>Por que vai adorar</h4>
              <ul>
                <li>Tecido respirável que se adapta ao seu corpo</li>
                <li>Durabilidade mesmo após várias lavagens</li>
                <li>Design versátil para diversas ocasiões</li>
              </ul>`,
    default: `<h3>Descubra o ${productName}</h3>
              <p>O ${productName} foi desenvolvido pensando em você, combinando qualidade, inovação e praticidade em um único produto.</p>
              <p>Cada detalhe foi cuidadosamente planejado para proporcionar a melhor experiência possível aos nossos clientes.</p>
              <h4>Diferenciais exclusivos</h4>
              <ul>
                <li>Qualidade superior em cada detalhe</li>
                <li>Design inovador que se destaca</li>
                <li>Facilidade de uso no dia a dia</li>
                <li>Suporte técnico especializado</li>
              </ul>`
  };
  
  // Return the appropriate suggestion based on product type after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (productType in suggestions) {
        resolve(suggestions[productType as keyof typeof suggestions]);
      } else {
        resolve(suggestions.default);
      }
    }, 1200);
  });
};

export const getSuggestedKeywords = async (
  productType: string,
  productName: string
): Promise<string[]> => {
  // Mock implementation for keyword suggestions
  const keywordSets = {
    electronics: [
      productName.toLowerCase(),
      `comprar ${productName}`,
      'melhor preço',
      'lançamento tecnologia',
      'gadget premium',
      'desconto eletrônicos',
      'especificações técnicas',
      'avaliação produto',
      'comparativo modelos',
      'garantia estendida'
    ],
    clothing: [
      productName.toLowerCase(),
      `${productName} original`,
      'moda atual',
      'tendência',
      'promoção roupas',
      'estilo casual',
      'look completo',
      'peça versátil',
      'moda sustentável',
      'tamanhos disponíveis'
    ],
    default: [
      productName.toLowerCase(),
      'comprar online',
      'melhor qualidade',
      'preço promocional',
      'entrega rápida',
      'avaliações clientes',
      'comparativo produtos',
      'desconto especial',
      'lançamento produto',
      'garantia produto'
    ]
  };
  
  // Return the appropriate keywords based on product type after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (productType in keywordSets) {
        resolve(keywordSets[productType as keyof typeof keywordSets]);
      } else {
        resolve(keywordSets.default);
      }
    }, 800);
  });
};
