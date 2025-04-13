
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const healthTemplate: Template = {
  id: 'adv-health-01',
  name: 'Saúde e Bem-estar',
  category: 'supplements',
  blocks: [
    // Hero Block with Icons
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Banner Principal com Ícones',
      columns: 1,
      visible: true,
      heading: 'Um corpo são, é sinônimo de uma vida mais feliz, produtiva, próspera e duradoura',
      subheading: 'Sua alimentação determina em muito a qualidade de sua rotina',
      buttonText: 'Saiba Mais',
      buttonUrl: '#benefits',
      image: {
        src: '/lovable-uploads/674dde4f-5b8e-4eab-a76b-3e3c6ef4bb38.png',
        alt: 'Saúde e Bem-estar'
      },
      style: {
        backgroundColor: '#f8f9fa',
        headingColor: '#5A2D82',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Benefits Block
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Benefícios Principais',
      columns: 3,
      visible: true,
      heading: 'Principais Benefícios para sua Saúde',
      benefits: [
        {
          id: uuidv4(),
          title: 'Aumenta a imunidade',
          description: 'Protege contra ameaças externas e fortalece seu sistema imunológico naturalmente.',
          icon: '🛡️'
        },
        {
          id: uuidv4(),
          title: 'Efeito Detox',
          description: 'Proporciona uma limpeza completa, eliminando toxinas do seu organismo.',
          icon: '🌱'
        },
        {
          id: uuidv4(),
          title: 'Saúde do Coração',
          description: 'Melhora a circulação e fortalece seu sistema cardiovascular.',
          icon: '❤️'
        },
        {
          id: uuidv4(),
          title: 'Mais Energia',
          description: 'Combate o cansaço e melhora seus níveis de energia e libido.',
          icon: '⚡'
        },
        {
          id: uuidv4(),
          title: 'Sono Reparador',
          description: 'Proporciona noites de sono profundas e verdadeiramente revigorantes.',
          icon: '😴'
        },
        {
          id: uuidv4(),
          title: 'Controle de Peso',
          description: 'Ajuda a regular o metabolismo e contribui para o gerenciamento do peso.',
          icon: '⚖️'
        }
      ],
      style: {
        backgroundColor: '#5A2D82',
        headingColor: '#ffffff',
        textColor: '#ffffff',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // TextImage Block
    {
      id: uuidv4(),
      type: 'textImage',
      title: 'Sobre o Produto',
      columns: 2,
      visible: true,
      heading: 'A Solução Completa para uma Vida Saudável e Equilibrada',
      content: '<p>Manter a saúde em dia não precisa ser um desafio impossível. Sabemos que, com a rotina agitada, encontrar tempo e disposição para cuidar de si parece cada vez mais complicado.</p><p>Mas e se houvesse uma maneira simples, eficaz e acessível de transformar sua saúde de dentro para fora?</p><p>Com o Protocolo, você tem nas mãos o que há de mais avançado para cuidar do seu corpo e da sua mente, sem abrir mão de nada.</p><p>Garanta agora mesmo o seu, contendo Vitamina D, Clorella, Triple Ômega, Feno Grego e Melatonina+.</p>',
      image: {
        src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        alt: 'Produtos de Saúde e Bem-estar'
      },
      style: {
        backgroundColor: '#ffffff',
        headingColor: '#5A2D82',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Features Block
    {
      id: uuidv4(),
      type: 'features',
      title: 'Características do Protocolo',
      columns: 1,
      visible: true,
      heading: 'Com o Protocolo Saúde e Bem-estar você vai:',
      features: [
        {
          id: uuidv4(),
          title: 'Blindar seu sistema imunológico',
          description: 'Fortaleça suas defesas naturais e proteja-se contra infecções e doenças.',
          icon: '✓'
        },
        {
          id: uuidv4(),
          title: 'Eliminar toxinas profundas do organismo',
          description: 'Promova uma desintoxicação completa e restaure o equilíbrio do seu corpo.',
          icon: '✓'
        },
        {
          id: uuidv4(),
          title: 'Limpar veias e artérias',
          description: 'Melhore sua circulação sanguínea e mantenha a saúde cardiovascular.',
          icon: '✓'
        },
        {
          id: uuidv4(),
          title: 'Acabar com o cansaço e aumentar a libido',
          description: 'Recupere sua energia vital e revitalize sua vida íntima.',
          icon: '✓'
        },
        {
          id: uuidv4(),
          title: 'Desfrutar de noites de sono profundas',
          description: 'Garanta um descanso reparador e acorde totalmente revigorado(a).',
          icon: '✓'
        }
      ],
      style: {
        backgroundColor: '#f8f9fa',
        headingColor: '#5A2D82',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Text Block 1
    {
      id: uuidv4(),
      type: 'text',
      title: 'Detalhes dos Produtos - Parte 1',
      columns: 1,
      visible: true,
      heading: 'Sua saúde é seu bem mais valioso, pois sem ela, nenhum outro bem se faz possível',
      content: '<h3 style="color: #69B345; font-weight: bold; margin-bottom: 20px;">Confira como cada um dos produtos estão prestes a transformar sua realidade:</h3><h4 style="color: #5A2D82; font-weight: bold; margin-top: 15px;">Vitamina D</h4><p>A Vitamina D fortalece os ossos, previne doenças como osteoporose e atua na regulação do sistema imunológico, mantendo você protegida contra infecções e doenças. Além disso, a Vitamina D é fundamental para a absorção do cálcio, garantindo que seus ossos permaneçam fortes e saudáveis, mesmo com o passar dos anos.</p><h4 style="color: #5A2D82; font-weight: bold; margin-top: 15px;">Clorella</h4><p>A Clorella é um poderoso desintoxicante natural que auxilia na eliminação de toxinas acumuladas no corpo, promovendo uma limpeza interna que se reflete em mais energia e vitalidade. Rica em clorofila, vitaminas e minerais, ela também contribui para o fortalecimento do sistema imunológico e melhora a digestão, ajudando a manter o corpo em equilíbrio.</p><h4 style="color: #5A2D82; font-weight: bold; margin-top: 15px;">Triple Ômega</h4><p>O Triple Ômega é o único que combina os ácidos graxos essenciais Ômega 3, 6 e 9, que são fundamentais para a saúde cardiovascular e cerebral. Eles ajudam a reduzir inflamações, melhoram a saúde do coração e promovem um funcionamento cerebral mais eficiente, essencial para quem enfrenta um dia a dia intenso.</p>',
      style: {
        backgroundColor: '#ffffff',
        headingColor: '#5A2D82',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Text Block 2
    {
      id: uuidv4(),
      type: 'text',
      title: 'Detalhes dos Produtos - Parte 2',
      columns: 1,
      visible: true,
      heading: '',
      content: '<h4 style="color: #5A2D82; font-weight: bold; margin-top: 15px;">Feno Grego</h4><p>Conhecido por seus benefícios para o equilíbrio hormonal, o Feno Grego é um aliado poderoso para mulheres que desejam manter sua saúde feminina em dia. Ele ajuda a regular os níveis hormonais, reduzindo sintomas desconfortáveis que podem afetar seu humor e energia. Além disso, o Feno Grego também auxilia no controle do apetite e no gerenciamento de peso, proporcionando uma sensação de bem-estar constante.</p><h4 style="color: #5A2D82; font-weight: bold; margin-top: 15px;">Melatonina+ (em gotas)</h4><p>Para fechar o ciclo de cuidados com chave de ouro, a Melatonina+ é o que você precisa para garantir noites de sono reparadoras. A melatonina é o hormônio responsável pela regulação do sono, e sua suplementação ajuda a combater a insônia e a melhorar a qualidade do descanso. Com um sono adequado, seu corpo e mente se recuperam, garantindo que você acorde revigorada.</p><p style="margin-top: 20px;">Com o Protocolo Saúde e Bem-estar, você terá em suas mãos um conjunto completo de produtos que trabalham lado a lado para fortalecer sua saúde em todos os aspectos. De dentro para fora, cada um desses itens foi pensado para promover um bem-estar global, ajudando você a viver com mais energia, disposição e equilíbrio.</p>',
      style: {
        backgroundColor: '#ffffff',
        headingColor: '#5A2D82',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Image Block
    {
      id: uuidv4(),
      type: 'image',
      title: 'Imagem dos Produtos',
      columns: 1,
      visible: true,
      heading: 'Cinco produtos essenciais para transformar sua qualidade de vida',
      image: {
        src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        alt: 'Produtos de Saúde e Bem-estar'
      },
      caption: 'Vitamina D, Clorella, Triple Ômega, Feno Grego e Melatonina+',
      style: {
        backgroundColor: '#f8f9fa',
        headingColor: '#5A2D82',
        textColor: '#333333',
        padding: 'md',
        blockSpacing: 'md'
      }
    },
    // FAQ Block
    {
      id: uuidv4(),
      type: 'faq',
      title: 'Perguntas Frequentes',
      columns: 1,
      visible: true,
      heading: 'Para quem é o Protocolo Saúde?',
      questions: [
        {
          id: uuidv4(),
          question: 'Para quem é indicado o Protocolo Saúde e Bem-estar?',
          answer: 'O kit é destinado a quem busca não apenas tratar sintomas, mas adotar uma abordagem completa para o bem-estar físico e mental. Ideal para pessoas que entendem a importância de um corpo em equilíbrio, ele é o suporte essencial para quem quer viver com mais energia, disposição e serenidade.'
        },
        {
          id: uuidv4(),
          question: 'Os produtos são naturais?',
          answer: 'Sim, todos os produtos são 100% naturais, sem adição de açúcar e não contêm glúten, garantindo uma suplementação limpa e saudável para seu organismo.'
        },
        {
          id: uuidv4(),
          question: 'Como devo tomar os suplementos?',
          answer: 'Cada produto tem sua forma específica de consumo. Recomendamos seguir as instruções contidas nas embalagens para obter os melhores resultados. Em geral, a Vitamina D e o Triple Ômega são de uso diário pela manhã, a Clorella pode ser consumida entre as refeições, o Feno Grego antes do almoço, e a Melatonina+ cerca de 30 minutos antes de dormir.'
        },
        {
          id: uuidv4(),
          question: 'Quanto tempo leva para perceber os resultados?',
          answer: 'Os primeiros benefícios podem ser percebidos em poucas semanas de uso regular. No entanto, para resultados completos e duradouros, recomendamos o uso contínuo por pelo menos 3 meses, permitindo que seu corpo se ajuste e aproveite ao máximo os benefícios de cada produto.'
        }
      ],
      style: {
        backgroundColor: '#f8f9fa',
        headingColor: '#5A2D82',
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
      heading: 'Transforme sua saúde hoje mesmo!',
      content: 'Com o Protocolo Saúde e Bem-estar, você tem ao seu alcance a chave para reequilibrar seu corpo e redescobrir o prazer de viver com plenitude. Não deixe para depois o cuidado que sua saúde merece.',
      buttonText: 'Quero garantir meu Protocolo Saúde',
      buttonUrl: '#',
      style: {
        backgroundColor: '#69B345',
        headingColor: '#ffffff',
        textColor: '#ffffff',
        padding: 'lg',
        blockSpacing: 'none'
      }
    }
  ]
};
