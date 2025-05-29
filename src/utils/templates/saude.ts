
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

console.log('Loading saude templates...');

export const saudeTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Saúde Premium',
    category: 'health',
    thumbnail: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    blocks: [
      // Banner Principal
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f0fdf4',
          textColor: '#15803d',
          padding: '80px 20px',
          textAlign: 'center'
        },
        heading: 'Sua Saúde em Primeiro Lugar',
        subheading: 'Produtos e suplementos premium desenvolvidos com a mais alta tecnologia para cuidar da sua saúde e bem-estar com segurança e eficácia',
        buttonText: 'Ver Produtos',
        buttonUrl: '#'
      },
      
      // Galeria em 3 colunas
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria de Produtos',
        visible: true,
        columns: 3,
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Nossa Linha de Saúde',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
            alt: 'Suplementos naturais',
            caption: 'Suplementos Naturais'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
            alt: 'Vitaminas e minerais',
            caption: 'Vitaminas e Minerais'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
            alt: 'Produtos terapêuticos',
            caption: 'Produtos Terapêuticos'
          }
        ]
      },
      
      // Benefícios em 3 colunas
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens dos Nossos Produtos',
        visible: true,
        columns: 3,
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8fafc'
        },
        heading: 'Por Que Escolher Nossa Linha de Saúde',
        benefits: [
          {
            id: uuidv4(),
            icon: '🧬',
            title: 'Base Científica',
            description: 'Todos os produtos são formulados com base em pesquisas científicas rigorosas e estudos clínicos'
          },
          {
            id: uuidv4(),
            icon: '✅',
            title: 'Certificado ANVISA',
            description: 'Produtos aprovados e certificados pelos órgãos regulamentadores de saúde brasileiros'
          },
          {
            id: uuidv4(),
            icon: '🌿',
            title: 'Ingredientes Puros',
            description: 'Utilizamos apenas ingredientes naturais de alta pureza, livres de contaminantes'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Qualidade Farmacêutica',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Qualidade Farmacêutica em Cada Produto',
        content: 'Nossos laboratórios seguem os mais rigorosos padrões de qualidade farmacêutica (GMP - Good Manufacturing Practices). Cada lote passa por múltiplos testes de pureza, potência e segurança antes de chegar até você, garantindo máxima eficácia e confiabilidade.',
        image: {
          src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
          alt: 'Laboratório de qualidade farmacêutica'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Acompanhamento Profissional',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8fafc'
        },
        heading: 'Suporte de Profissionais Qualificados',
        content: 'Nossa equipe inclui farmacêuticos, nutricionistas e profissionais de saúde especializados que oferecem orientação gratuita para o uso correto dos produtos. Tire suas dúvidas e receba recomendações personalizadas para otimizar seus resultados.',
        image: {
          src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
          alt: 'Profissional de saúde consultando'
        }
      },
      
      // Recursos em 2 colunas
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características dos Produtos',
        visible: true,
        columns: 2,
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Diferenciais da Nossa Linha',
        features: [
          {
            id: uuidv4(),
            icon: '💊',
            title: 'Formulação Avançada',
            description: 'Tecnologia de liberação controlada para máxima absorção e biodisponibilidade'
          },
          {
            id: uuidv4(),
            icon: '🔬',
            title: 'Testado Clinicamente',
            description: 'Produtos validados em estudos clínicos com resultados comprovados'
          },
          {
            id: uuidv4(),
            icon: '🏥',
            title: 'Aprovação Médica',
            description: 'Recomendado por médicos e profissionais de saúde especializados'
          },
          {
            id: uuidv4(),
            icon: '📋',
            title: 'Rastreabilidade Total',
            description: 'Controle completo da origem dos ingredientes até o produto final'
          }
        ]
      },
      
      // Especificações
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Informações Técnicas',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8fafc'
        },
        heading: 'Especificações Técnicas dos Produtos',
        specs: [
          { name: 'Certificações', value: 'ANVISA, ISO 9001, GMP (Boas Práticas de Fabricação)' },
          { name: 'Tipo de Produto', value: 'Suplementos, Vitaminas, Minerais, Fitoterápicos' },
          { name: 'Apresentação', value: 'Cápsulas, Comprimidos, Pós, Líquidos' },
          { name: 'Dosagem', value: 'Conforme recomendação profissional ou bula' },
          { name: 'Conservação', value: 'Local seco e arejado, temperatura ambiente' },
          { name: 'Validade', value: '24-36 meses a partir da data de fabricação' },
          { name: 'Registro', value: 'Produtos registrados no Ministério da Saúde' },
          { name: 'Origem', value: 'Laboratórios nacionais certificados' }
        ]
      },
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Resultados Comprovados',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Resultados Reais e Mensuráveis',
        content: 'Mais de 95% dos nossos clientes relatam melhora significativa em sua qualidade de vida após 30 dias de uso regular. Nossos produtos são formulados para entregar resultados visíveis e duradouros, sempre respeitando a individualidade biológica de cada pessoa.',
        image: {
          src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
          alt: 'Pessoa saudável e ativa'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Vida Saudável',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8fafc',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
        alt: 'Estilo de vida saudável',
        caption: 'Investindo na sua saúde para uma vida plena'
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
        heading: 'Dúvidas Mais Comuns',
        questions: [
          {
            question: 'Os produtos precisam de receita médica?',
            answer: 'Nossos suplementos não precisam de receita, mas recomendamos consultar um profissional de saúde antes do uso, especialmente se você toma medicamentos.'
          },
          {
            question: 'Quanto tempo leva para ver resultados?',
            answer: 'Os primeiros resultados podem ser percebidos entre 2-4 semanas, mas o tempo varia conforme o produto e organismo individual. Para resultados ótimos, recomendamos uso contínuo.'
          },
          {
            question: 'Os produtos têm efeitos colaterais?',
            answer: 'Nossos produtos são formulados para serem seguros quando usados conforme orientação. Efeitos adversos são raros, mas suspenda o uso em caso de reações alérgicas.'
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
          backgroundColor: '#15803d',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Invista na Sua Saúde Hoje',
        content: 'Comece sua jornada para uma vida mais saudável. Consulta nutricional gratuita e primeira compra com desconto especial.',
        buttonText: 'Começar Agora',
        buttonUrl: '#'
      }
    ]
  }
];

console.log(`saude templates loaded: ${saudeTemplates.length} templates`);
saudeTemplates.forEach((template, index) => {
  console.log(`  ${index + 1}. ${template.name} - ${template.blocks.length} blocks`);
});
