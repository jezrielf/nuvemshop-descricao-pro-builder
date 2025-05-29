
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const shoesTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Calçados Premium',
    category: 'shoes',
    thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    blocks: [
      // Banner Principal
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f8f9fa',
          padding: '80px 20px',
          textAlign: 'center'
        },
        heading: 'Passos em Direção à Excelência',
        subheading: 'Calçados que combinam conforto excepcional com design sofisticado para cada momento do seu dia',
        buttonText: 'Explorar Coleção',
        buttonUrl: '#'
      },
      
      // Galeria em 3 colunas
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria da Coleção',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Nossa Coleção Premium',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
            alt: 'Sapato social premium',
            caption: 'Linha Executiva'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43',
            alt: 'Tênis esportivo de luxo',
            caption: 'Linha Esportiva'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f',
            alt: 'Sapato feminino elegante',
            caption: 'Linha Feminina'
          }
        ]
      },
      
      // Benefícios em 3 colunas
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Benefícios dos Nossos Calçados',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa'
        },
        heading: 'Por Que Escolher Nossos Calçados',
        benefits: [
          {
            id: uuidv4(),
            icon: '👟',
            title: 'Conforto Supremo',
            description: 'Tecnologia de amortecimento avançada para máximo conforto durante todo o dia'
          },
          {
            id: uuidv4(),
            icon: '🏆',
            title: 'Qualidade Premium',
            description: 'Materiais selecionados e acabamento artesanal que garantem durabilidade excepcional'
          },
          {
            id: uuidv4(),
            icon: '✨',
            title: 'Design Exclusivo',
            description: 'Modelos únicos criados por designers renomados que elevam seu estilo pessoal'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Artesanato Tradicional',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Tradição e Inovação em Cada Passo',
        content: 'Nossos calçados são resultado de décadas de experiência em sapataria tradicional combinada com as mais modernas tecnologias de produção. Cada par passa por mais de 50 etapas de fabricação, garantindo que você receba um produto de qualidade incomparável que durará por anos.',
        image: {
          src: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9',
          alt: 'Artesão trabalhando em sapato'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Tecnologia Avançada',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa'
        },
        heading: 'Tecnologia que Faz a Diferença',
        content: 'Incorporamos as mais avançadas tecnologias em nossos calçados: solas com retorno de energia, materiais respiráveis, sistemas de amortecimento personalizado e tratamentos antibacterianos. Tudo isso para proporcionar uma experiência única aos seus pés.',
        image: {
          src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
          alt: 'Tecnologia em calçados'
        }
      },
      
      // Recursos em 3 colunas
      {
        id: uuidv4(),
        type: 'features',
        title: 'Recursos Técnicos',
        visible: true,
        columns: '3',
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Características Técnicas Avançadas',
        features: [
          {
            id: uuidv4(),
            icon: '🌬️',
            title: 'Respirabilidade',
            description: 'Sistema de ventilação que mantém os pés secos e frescos'
          },
          {
            id: uuidv4(),
            icon: '🛡️',
            title: 'Proteção',
            description: 'Reforços estratégicos para maior durabilidade'
          },
          {
            id: uuidv4(),
            icon: '⚖️',
            title: 'Leveza',
            description: 'Materiais ultralight para conforto durante todo o dia'
          }
        ]
      },
      
      // Especificações
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações Técnicas',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa'
        },
        heading: 'Detalhes Técnicos',
        specs: [
          { name: 'Material Superior', value: 'Couro Premium Full Grain' },
          { name: 'Forro', value: 'Tecido Respirável Antimicrobiano' },
          { name: 'Solado', value: 'Borracha Premium com Tecnologia de Retorno de Energia' },
          { name: 'Amortecimento', value: 'Sistema Multicamadas de Absorção de Impacto' },
          { name: 'Peso', value: '320g (por pé - tamanho 42)' },
          { name: 'Garantia', value: '2 anos contra defeitos de fabricação' }
        ]
      },
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Sustentabilidade',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Compromisso com o Meio Ambiente',
        content: 'Nosso compromisso vai além da qualidade. Utilizamos processos de produção sustentáveis, materiais eco-friendly e apoiamos programas de reflorestamento. Cada par de sapatos contribui para um futuro mais verde.',
        image: {
          src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
          alt: 'Sustentabilidade na produção'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Detalhe da Qualidade',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
        alt: 'Detalhe da costura e acabamento',
        caption: 'Atenção aos mínimos detalhes em cada acabamento'
      },
      
      // Perguntas Frequentes
      {
        id: uuidv4(),
        type: 'faq',
        title: 'Perguntas Frequentes',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Dúvidas Comuns',
        questions: [
          {
            question: 'Como escolher o tamanho ideal?',
            answer: 'Recomendamos medir os pés no final do dia quando estão ligeiramente inchados. Use nossa tabela de medidas ou visite uma de nossas lojas para experimentar.'
          },
          {
            question: 'Qual o período de amaciamento?',
            answer: 'Nossos calçados são projetados para conforto imediato, mas recomendamos uso gradual nos primeiros 3-5 dias para adaptação perfeita.'
          },
          {
            question: 'Como cuidar dos meus calçados?',
            answer: 'Use produtos específicos para couro, evite umidade excessiva e permita que sequem naturalmente. Fornecemos um kit de cuidados com cada compra.'
          }
        ]
      },
      
      // Chamada para Ação
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Chamada Final',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#2c3e50',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Dê o Próximo Passo com Confiança',
        content: 'Experimente a diferença de calçados verdadeiramente premium. Frete grátis e devolução sem custo em 30 dias.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  }
];
