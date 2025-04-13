
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const hauteCoutureTemplate: Template = {
  id: 'adv-haute-01',
  name: 'Alta Costura',
  category: 'clothing',
  blocks: [
    // Hero Block
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Banner Principal',
      columns: 1,
      visible: true,
      heading: 'A excelência da Alta Costura',
      subheading: 'Criações exclusivas que redefinem os padrões de sofisticação',
      buttonText: 'Descobrir Coleção',
      buttonUrl: '#collection',
      image: {
        src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
        alt: 'Coleção de Alta Costura'
      },
      style: {
        backgroundColor: '#f0f0f0',
        headingColor: '#1a1a1a',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Text Block
    {
      id: uuidv4(),
      type: 'text',
      title: 'Introdução à Coleção',
      columns: 1,
      visible: true,
      heading: 'Uma obra de arte vestível',
      content: '<p style="font-size: 1.1em; line-height: 1.8;">A verdadeira Alta Costura transcende o conceito de vestuário. Cada peça é uma expressão artística meticulosamente elaborada, onde tradição e inovação se encontram para criar algo extraordinário.</p><p style="font-size: 1.1em; line-height: 1.8;">Nossa coleção representa o ápice da excelência em design e artesanato, com peças feitas à mão utilizando técnicas ancestrais combinadas com abordagens contemporâneas. Cada detalhe é pensado para criar não apenas uma roupa, mas uma experiência estética única.</p><p style="font-size: 1.1em; line-height: 1.8;">Cada criação é desenvolvida exclusivamente para você, respeitando suas medidas exatas e preferências, em um processo colaborativo que resulta em peças verdadeiramente únicas.</p>',
      style: {
        backgroundColor: '#ffffff',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Gallery Block
    {
      id: uuidv4(),
      type: 'gallery',
      title: 'Ateliê e Processo Criativo',
      columns: 3,
      visible: true,
      heading: 'Do conceito à criação',
      images: [
        {
          id: uuidv4(),
          src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e',
          alt: 'Croqui e design',
          caption: 'Concepção e Design'
        },
        {
          id: uuidv4(),
          src: 'https://images.unsplash.com/photo-1524041255072-7da0525d6b34',
          alt: 'Seleção de materiais',
          caption: 'Seleção de Materiais'
        },
        {
          id: uuidv4(),
          src: 'https://images.unsplash.com/photo-1590401958868-1e21a2f3a363',
          alt: 'Costura artesanal',
          caption: 'Artesanato Refinado'
        }
      ],
      style: {
        backgroundColor: '#f5f5f5',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Benefits Block
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Diferenciais da Alta Costura',
      columns: 3,
      visible: true,
      heading: 'A experiência da Alta Costura',
      benefits: [
        {
          id: uuidv4(),
          title: 'Exclusividade Absoluta',
          description: 'Cada peça é única e exclusiva, criada especificamente para você, com garantia de que não existirá outra igual.',
          icon: '🌟'
        },
        {
          id: uuidv4(),
          title: 'Ateliê Dedicado',
          description: 'Consultas privadas em nosso ateliê, onde você participa ativamente do processo criativo.',
          icon: '🏛️'
        },
        {
          id: uuidv4(),
          title: 'Mestres Artesãos',
          description: 'Nossas peças são criadas por mestres com décadas de experiência em técnicas refinadas de costura.',
          icon: '✂️'
        },
        {
          id: uuidv4(),
          title: 'Materiais Raros',
          description: 'Utilizamos apenas os tecidos e materiais mais nobres, selecionados das melhores fontes ao redor do mundo.',
          icon: '🧵'
        },
        {
          id: uuidv4(),
          title: 'Ajustes Perpétuos',
          description: 'Oferecemos ajustes e manutenção vitalícios para todas as peças adquiridas.',
          icon: '♾️'
        },
        {
          id: uuidv4(),
          title: 'Identidade Preservada',
          description: 'Seu estilo pessoal é respeitado e incorporado em cada criação, resultando em peças que refletem sua essência.',
          icon: '👑'
        }
      ],
      style: {
        backgroundColor: '#ffffff',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // TextImage Block
    {
      id: uuidv4(),
      type: 'textImage',
      title: 'Processo de Criação',
      columns: 2,
      visible: true,
      heading: 'Um processo artesanal incomparável',
      content: '<p>A criação de uma peça de Alta Costura é um processo meticuloso que pode exigir centenas de horas de trabalho manual.</p><p>Tudo começa com uma consulta detalhada, onde entendemos suas preferências, estilo e necessidades. A partir daí, desenvolvemos croquis e propostas que serão refinadas com sua colaboração.</p><p>A seleção de materiais é um passo crucial, onde escolhemos entre os mais finos tecidos, rendas, sedas e acabamentos disponíveis no mercado global.</p><p>O processo de confecção envolve técnicas tradicionais preservadas por gerações, com grande parte do trabalho sendo realizado à mão para garantir perfeição em cada detalhe.</p><p>Múltiplas provas são realizadas para assegurar que o caimento e o conforto sejam impecáveis, resultando em uma peça que parece ter sido esculpida diretamente sobre seu corpo.</p>',
      image: {
        src: 'https://images.unsplash.com/photo-1577900232427-18219b8349fd',
        alt: 'Processo de criação de Alta Costura'
      },
      style: {
        backgroundColor: '#f8f9fa',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // CTA Block
    {
      id: uuidv4(),
      type: 'cta',
      title: 'Chamada para Ação',
      columns: 1,
      visible: true,
      heading: 'Agende uma consulta exclusiva',
      content: 'Dê o primeiro passo para possuir uma criação verdadeiramente única, que transcende tendências e permanece atemporal.',
      buttonText: 'Solicitar Consulta',
      buttonUrl: '#contact',
      style: {
        backgroundColor: '#1a1a1a',
        headingColor: '#ffffff',
        textColor: '#ffffff',
        padding: 'lg',
        blockSpacing: 'none'
      }
    }
  ]
};
