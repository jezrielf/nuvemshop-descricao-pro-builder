
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

export const gemBlendTemplate: Template = {
  id: uuidv4(),
  name: 'Liquidificador Gem Blend',
  category: 'casa-decoracao',
  blocks: [
    // Hero section
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Banner Principal',
      heading: 'GEM BLEND',
      subheading: 'DESCUBRA O PODER DA MISTURA PERFEITA',
      backgroundImage: '/lovable-uploads/289bdaa9-9763-4c2d-8f8d-a417f1cc8803.png',
      buttonText: 'COMPRAR AGORA',
      buttonUrl: '#',
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#f5f5f5',
        textColor: '#000',
        textAlign: 'center',
        padding: '60px 20px',
      },
    },
    
    // Misture Como um Profissional section
    {
      id: uuidv4(),
      type: 'textImage',
      title: 'Misture Como um Profissional',
      heading: 'MISTURE COMO UM PROFISSIONAL',
      content: '',
      image: {
        src: '/lovable-uploads/289bdaa9-9763-4c2d-8f8d-a417f1cc8803.png',
        alt: 'Liquidificador Gem Blend',
      },
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#fff',
        textColor: '#000',
        padding: '40px 20px',
      },
    },
    
    // Features section
    {
      id: uuidv4(),
      type: 'features',
      title: 'Características',
      heading: '',
      layout: 'horizontal',
      features: [
        {
          id: uuidv4(),
          title: 'Design de Precisão',
          description: 'Design ergonômico para máxima eficiência',
          icon: 'timer',
        },
        {
          id: uuidv4(),
          title: '1200W de Potência',
          description: 'Motor potente para as misturas mais difíceis',
          icon: 'zap',
        },
        {
          id: uuidv4(),
          title: 'Fácil de Limpar',
          description: 'Componentes removíveis para limpeza fácil',
          icon: 'trash',
        },
        {
          id: uuidv4(),
          title: 'Múltiplas Velocidades',
          description: 'Controle preciso para diferentes texturas',
          icon: 'settings',
        },
      ],
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#fff',
        padding: '0 20px 40px 20px',
      },
    },
    
    // 4 Lâminas Afiadas section
    {
      id: uuidv4(),
      type: 'imageText',
      title: 'Lâminas de Aço Inoxidável',
      heading: '4 Lâminas Afiadas de Aço Inoxidável',
      content: 'Lâminas precisas para corte perfeito de ingredientes',
      image: {
        src: '/lovable-uploads/289bdaa9-9763-4c2d-8f8d-a417f1cc8803.png',
        alt: 'Lâminas do Liquidificador Gem Blend',
      },
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#e8f4e4',
        textColor: '#000',
        padding: '40px 20px',
      },
    },
    
    // Misture Como um Profissional - CTA
    {
      id: uuidv4(),
      type: 'imageText',
      title: 'Misture Como um Profissional - CTA',
      heading: 'MISTURE COMO UM PROFISSIONAL',
      content: 'Desempenho premium para suas receitas favoritas. Potência e precisão em cada mistura.',
      image: {
        src: '/lovable-uploads/289bdaa9-9763-4c2d-8f8d-a417f1cc8803.png',
        alt: 'Liquidificador Gem Blend em uso',
      },
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#f5f5f5',
        textColor: '#000',
        padding: '40px 20px',
      },
    },
    
    // CTA Button
    {
      id: uuidv4(),
      type: 'cta',
      title: 'Botão de Compra',
      heading: '',
      content: '',
      buttonText: 'COMPRAR AGORA',
      buttonUrl: '#',
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#f5f5f5',
        textColor: '#000',
        textAlign: 'center',
        padding: '0 20px 40px 20px',
      },
    },
    
    // Acredite no Poder section
    {
      id: uuidv4(),
      type: 'textImage',
      title: 'Acredite no Poder',
      heading: 'ACREDITE NO PODER',
      content: 'O Gem Blend foi projetado para revolucionar sua experiência na cozinha. Com tecnologia de ponta e materiais premium, você pode preparar smoothies, sopas, molhos e muito mais com facilidade e precisão inigualáveis.',
      image: {
        src: '/lovable-uploads/289bdaa9-9763-4c2d-8f8d-a417f1cc8803.png',
        alt: 'Interior do Liquidificador Gem Blend',
      },
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#000',
        textColor: '#fff',
        padding: '40px 20px',
      },
    },
    
    // Transforme sua Experiência na Cozinha
    {
      id: uuidv4(),
      type: 'text',
      title: 'Transforme sua Experiência na Cozinha',
      heading: 'Transforme sua Experiência na Cozinha',
      content: 'Descubra como o Gem Blend pode revolucionar sua forma de cozinhar',
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#fff',
        textColor: '#000',
        textAlign: 'center',
        padding: '40px 20px 20px 20px',
      },
    },
    
    // Recursos da Cozinha
    {
      id: uuidv4(),
      type: 'features',
      title: 'Recursos da Cozinha',
      heading: '',
      layout: 'horizontal',
      features: [
        {
          id: uuidv4(),
          title: 'Preparo Rápido',
          description: 'Economize tempo com nosso motor de alta performance',
          icon: 'clock',
        },
        {
          id: uuidv4(),
          title: 'Mistura Perfeita',
          description: 'Resultados consistentes em cada uso',
          icon: 'check-circle',
        },
        {
          id: uuidv4(),
          title: 'Processamento Preciso',
          description: 'Controle fino sobre a consistência dos alimentos',
          icon: 'sliders',
        },
        {
          id: uuidv4(),
          title: 'Uso Simples',
          description: 'Interface intuitiva para todos os tipos de receitas',
          icon: 'thumbs-up',
        },
      ],
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#fff',
        padding: '20px',
      },
    },
    
    // Amado por Outros
    {
      id: uuidv4(),
      type: 'textImage',
      title: 'Amado por Outros',
      heading: 'Amado por Outros',
      content: '"O Gem Blend transformou minha rotina na cozinha. As receitas ficam prontas em minutos e com uma textura perfeita. Recomendo para todos que buscam qualidade e eficiência!" - Ana Silva',
      image: {
        src: '/lovable-uploads/289bdaa9-9763-4c2d-8f8d-a417f1cc8803.png',
        alt: 'Cliente satisfeito com Gem Blend',
      },
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#fff',
        textColor: '#000',
        padding: '40px 20px',
      },
    },
    
    // Comparação com Concorrência
    {
      id: uuidv4(),
      type: 'text',
      title: 'Comparação com Concorrência',
      heading: 'NÃO NOS PREOCUPAMOS COM A CONCORRÊNCIA',
      content: '<table class="w-full border-collapse" style="border: 1px solid #ddd"><thead><tr><th></th><th>Gem Blend</th><th>Outros Liquidificadores</th></tr></thead><tbody><tr><td>Potência</td><td>1200W</td><td>800W</td></tr><tr><td>Lâminas de Aço Inox</td><td>4</td><td>2</td></tr><tr><td>Velocidades</td><td>10</td><td>5</td></tr><tr><td>Garantia</td><td>5 anos</td><td>1 ano</td></tr><tr><td>Durabilidade</td><td class="text-center">✓</td><td class="text-center">✗</td></tr></tbody></table>',
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#fff',
        textColor: '#000',
        textAlign: 'center',
        padding: '40px 20px',
      },
    },
    
    // Compre Hoje section
    {
      id: uuidv4(),
      type: 'imageText',
      title: 'Compre Hoje',
      heading: 'COMPRE HOJE E RECEBA 20% DE DESCONTO',
      content: '<ul><li>Liquidificador Gem Blend</li><li>Copo extra de 500ml</li><li>Livro de receitas</li><li>Espátula exclusiva</li><li>Garantia estendida</li></ul><br/><a href="#" class="bg-green-500 text-white px-4 py-2 rounded">COMPRAR AGORA</a>',
      image: {
        src: '/lovable-uploads/289bdaa9-9763-4c2d-8f8d-a417f1cc8803.png',
        alt: 'Kit Completo Gem Blend',
      },
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#f5f5f5',
        textColor: '#000',
        padding: '40px 20px',
      },
    },
    
    // Rodapé
    {
      id: uuidv4(),
      type: 'text',
      title: 'Rodapé',
      heading: 'GEM BLEND',
      content: 'A perfeição na sua cozinha',
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#f5f5f5',
        textColor: '#000',
        textAlign: 'center',
        padding: '20px',
      },
    },
  ],
  thumbnail: '/lovable-uploads/289bdaa9-9763-4c2d-8f8d-a417f1cc8803.png',
};
