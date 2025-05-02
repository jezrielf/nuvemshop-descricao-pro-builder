
import { Template } from '@/types/editor';

// Template for supplements/health products
export const supplementsTemplates: Template[] = [
  {
    id: 'supplements-premium-1',
    name: 'Suplementos Premium',
    category: 'supplements',
    thumbnail: '/placeholder.svg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f8f9fa',
          backgroundGradient: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          padding: '60px 20px',
          borderRadius: '16px',
          textAlign: 'center'
        },
        heading: 'Potencialize seu Desempenho Natural',
        subheading: 'Fórmula avançada com ingredientes naturais para máxima energia e recuperação',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria do Produto',
        visible: true,
        columns: '3',
        style: {
          padding: '40px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Conheça o Produto',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1606889464198-fcb18894cf50',
            alt: 'Frasco de suplemento premium',
            caption: 'Embalagem de 60 cápsulas'
          },
          {
            src: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba',
            alt: 'Ingredientes naturais do suplemento',
            caption: 'Ingredientes selecionados'
          },
          {
            src: 'https://images.unsplash.com/photo-1616279969875-530878644d6c',
            alt: 'Resultado do uso do suplemento',
            caption: 'Resultados em 30 dias'
          }
        ]
      },
      {
        id: 'text-1',
        type: 'text',
        title: 'Descrição do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '16px',
          margin: '40px 0'
        },
        content: '<h2 style="font-size: 28px; color: #212529; margin-bottom: 24px; text-align: center;">Fórmula Avançada de Alta Absorção</h2><p style="font-size: 16px; line-height: 1.6; color: #495057; margin-bottom: 16px;">Nosso suplemento premium foi desenvolvido através de anos de pesquisa científica para fornecer os nutrientes essenciais que seu corpo precisa, na forma mais biodisponível possível. Cada ingrediente foi cuidadosamente selecionado para trabalhar em sinergia, maximizando os benefícios.</p><p style="font-size: 16px; line-height: 1.6; color: #495057;">Diferente de outros suplementos no mercado, nossa fórmula utiliza apenas ingredientes de origem natural, sem aditivos artificiais ou componentes sintéticos, garantindo uma suplementação pura e eficaz.</p>'
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Benefícios Principais',
        visible: true,
        columns: '3',
        style: {
          padding: '40px 20px',
          backgroundColor: '#ffffff',
          margin: '20px 0'
        },
        heading: 'Benefícios Comprovados',
        benefits: [
          {
            icon: '⚡',
            title: 'Mais Energia',
            description: 'Aumento dos níveis de energia logo nas primeiras semanas de uso'
          },
          {
            icon: '🔄',
            title: 'Recuperação Rápida',
            description: 'Reduz significativamente o tempo de recuperação após treinos intensos'
          },
          {
            icon: '💪',
            title: 'Ganho Muscular',
            description: 'Apoia o desenvolvimento muscular quando combinado com exercícios'
          }
        ]
      },
      {
        id: 'imageText-1',
        type: 'imageText',
        title: 'Ingredientes Naturais',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#e9ecef',
          borderRadius: '16px',
          margin: '40px 0'
        },
        heading: 'Ingredientes Naturais Selecionados',
        content: '<p style="font-size: 16px; line-height: 1.6; color: #495057;">Cada frasco contém ingredientes naturais de alta qualidade, cuidadosamente selecionados para fornecer nutrição ideal e apoiar seu desempenho. Extratos botânicos poderosos combinados com vitaminas e minerais essenciais trabalham em sinergia para potencializar seus resultados.</p><ul style="padding-left: 20px; margin-top: 20px;"><li style="margin-bottom: 10px; color: #495057;">Extrato de Ginseng Coreano</li><li style="margin-bottom: 10px; color: #495057;">Proteína Isolada de Whey</li><li style="margin-bottom: 10px; color: #495057;">Complexo de Vitaminas B</li><li style="margin-bottom: 10px; color: #495057;">Minerais Quelados</li></ul>',
        image: {
          src: 'https://images.unsplash.com/photo-1543362906-acfc16c67564',
          alt: 'Ingredientes naturais',
        }
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Características do Produto',
        visible: true,
        columns: '2',
        layout: 'vertical',
        style: {
          padding: '40px 20px',
          backgroundColor: '#ffffff',
          margin: '20px 0'
        },
        heading: 'Diferenciais do Nosso Suplemento',
        features: [
          {
            icon: '🌿',
            title: '100% Natural',
            description: 'Sem aditivos artificiais ou conservantes'
          },
          {
            icon: '🔬',
            title: 'Testado em Laboratório',
            description: 'Qualidade comprovada por testes independentes'
          },
          {
            icon: '⏱️',
            title: 'Absorção Rápida',
            description: 'Tecnologia que garante biodisponibilidade imediata'
          },
          {
            icon: '🥇',
            title: 'Alta Concentração',
            description: 'Fórmula concentrada para resultados superiores'
          }
        ]
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Especificações Técnicas',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '16px',
          margin: '40px 0'
        },
        heading: 'Informação Nutricional',
        specs: [
          { name: 'Porção', value: '2 cápsulas (1g)' },
          { name: 'Porções por embalagem', value: '30' },
          { name: 'Proteína', value: '25g' },
          { name: 'Carboidratos', value: '2g' },
          { name: 'Gorduras', value: '0.5g' },
          { name: 'Vitamina B6', value: '1.7mg' },
          { name: 'Vitamina B12', value: '2.4mcg' },
          { name: 'Magnésio', value: '400mg' }
        ]
      },
      {
        id: 'textImage-1',
        type: 'textImage',
        title: 'Modo de Uso',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '20px 0'
        },
        heading: 'Como Usar para Melhores Resultados',
        content: '<p style="font-size: 16px; line-height: 1.6; color: #495057; margin-bottom: 20px;">Para obter os melhores resultados, recomendamos tomar 2 cápsulas diariamente, preferencialmente pela manhã com o café da manhã. Para atletas de alto desempenho, pode-se adicionar uma dose extra 30 minutos antes do treino.</p><p style="font-size: 16px; line-height: 1.6; color: #495057;">Mantenha a suplementação constante por pelo menos 8 semanas para sentir todos os benefícios. Combine com uma dieta balanceada e exercícios regulares para maximizar os resultados.</p>',
        image: {
          src: 'https://images.unsplash.com/photo-1581009137042-c552e485697a',
          alt: 'Pessoa tomando suplemento',
        }
      },
      {
        id: 'image-1',
        type: 'image',
        title: 'Certificações',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#e9ecef',
          borderRadius: '16px',
          margin: '40px 0',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5',
        alt: 'Certificações e selos de qualidade',
        caption: 'Produto certificado por órgãos reguladores internacionais'
      },
      {
        id: 'faq-1',
        type: 'faq',
        title: 'Perguntas Frequentes',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#ffffff',
          margin: '20px 0'
        },
        heading: 'Dúvidas Comuns',
        questions: [
          {
            question: 'Este suplemento tem contraindicações?',
            answer: 'Nosso suplemento é seguro para a maioria das pessoas, mas recomendamos consultar um médico antes de iniciar qualquer suplementação, especialmente se você estiver grávida, amamentando ou tomando medicamentos.'
          },
          {
            question: 'Em quanto tempo posso ver resultados?',
            answer: 'A maioria dos usuários começa a notar aumento de energia nas primeiras duas semanas, com resultados mais significativos após 4-8 semanas de uso contínuo.'
          },
          {
            question: 'O produto contém alérgenos?',
            answer: 'Nosso suplemento é livre de glúten, laticínios e soja. É produzido em instalações dedicadas para minimizar o risco de contaminação cruzada.'
          }
        ]
      },
      {
        id: 'cta-1',
        type: 'cta',
        title: 'Chamada Final',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#212529',
          color: '#ffffff',
          borderRadius: '16px',
          margin: '40px 0',
          textAlign: 'center'
        },
        heading: 'Pronto para Transformar seu Desempenho?',
        content: 'Experimente nosso suplemento premium por 30 dias e sinta a diferença. Garantia de satisfação ou seu dinheiro de volta.',
        buttonText: 'Comprar com Desconto',
        buttonUrl: '#'
      }
    ]
  }
];
