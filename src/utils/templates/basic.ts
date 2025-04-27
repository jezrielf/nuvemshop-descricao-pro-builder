
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

// Basic Template Collection
export const basicTemplates: Template[] = [
  // TEMPLATE 1: Basic Template
  {
    id: uuidv4(),
    name: "Template Básico",
    category: "other",
    thumbnail: "https://images.unsplash.com/photo-1553531384-411a247cce73",
    blocks: [
      {
        id: uuidv4(),
        type: "hero",
        title: "Banner Principal",
        columns: 1,
        visible: true,
        heading: "Título do Produto",
        subheading: "Descrição chamativa do produto",
        buttonText: "Compre Agora",
        buttonUrl: "#",
        backgroundImage: "https://images.unsplash.com/photo-1553531384-411a247cce73",
        style: {}
      },
      {
        id: uuidv4(),
        type: "text",
        title: "Descrição Detalhada",
        columns: 1,
        visible: true,
        heading: "Sobre o Produto",
        content: "Uma descrição completa e informativa sobre o produto, destacando seus benefícios e características.",
        style: {}
      },
      {
        id: uuidv4(),
        type: "features",
        title: "Recursos",
        columns: 3,
        visible: true,
        heading: "Características Principais",
        features: [
          {
            id: uuidv4(),
            title: "Recurso 1",
            description: "Descrição do recurso 1",
            icon: "✓"
          },
          {
            id: uuidv4(),
            title: "Recurso 2",
            description: "Descrição do recurso 2",
            icon: "✓"
          },
          {
            id: uuidv4(),
            title: "Recurso 3",
            description: "Descrição do recurso 3",
            icon: "✓"
          }
        ],
        style: {}
      },
      {
        id: uuidv4(),
        type: "cta",
        title: "Chamada para Ação",
        columns: 1,
        visible: true,
        heading: "Não perca tempo!",
        content: "Aproveite esta oferta exclusiva por tempo limitado.",
        buttonText: "Compre Agora",
        buttonUrl: "#",
        style: {}
      }
    ]
  },
  
  // TEMPLATE 2: Complete Product Template
  {
    id: uuidv4(),
    name: "Template Completo de Produto",
    category: "other",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    blocks: [
      {
        id: uuidv4(),
        type: "hero",
        title: "Banner Principal",
        columns: 1,
        visible: true,
        heading: "Nome do Produto Premium",
        subheading: "A solução definitiva para suas necessidades",
        buttonText: "Ver Detalhes",
        buttonUrl: "#detalhes",
        backgroundImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        style: {
          backgroundColor: "#f8f9fa",
          headingColor: "#212529",
          textColor: "#495057",
          padding: "lg",
          blockSpacing: "md"
        }
      },
      {
        id: uuidv4(),
        type: "text",
        title: "Introdução ao Produto",
        columns: 1,
        visible: true,
        heading: "Conheça Nossa Inovação",
        content: "<p>Este produto foi desenvolvido após anos de pesquisa e desenvolvimento, utilizando as mais avançadas tecnologias do mercado. Criado para atender às necessidades mais exigentes dos consumidores modernos, ele combina praticidade, durabilidade e design elegante.</p><p>Cada unidade passa por rigorosos testes de qualidade antes de chegar às suas mãos, garantindo um produto que excede expectativas e oferece uma experiência superior.</p>",
        style: {
          backgroundColor: "#ffffff",
          headingColor: "#212529",
          textColor: "#212529",
          padding: "lg",
          blockSpacing: "md"
        }
      },
      {
        id: uuidv4(),
        type: "benefits",
        title: "Benefícios",
        columns: 3,
        visible: true,
        heading: "Vantagens Exclusivas",
        benefits: [
          {
            id: uuidv4(),
            title: "Alta Durabilidade",
            description: "Construído para durar com materiais de alta qualidade",
            icon: "🛡️"
          },
          {
            id: uuidv4(),
            title: "Fácil Utilização",
            description: "Interface intuitiva que não requer manuais complexos",
            icon: "👌"
          },
          {
            id: uuidv4(),
            title: "Economia",
            description: "Reduz custos operacionais em até 35%",
            icon: "💰"
          },
          {
            id: uuidv4(),
            title: "Suporte Premium",
            description: "Atendimento personalizado 24/7",
            icon: "🔧"
          },
          {
            id: uuidv4(),
            title: "Garantia Estendida",
            description: "3 anos de garantia total contra defeitos",
            icon: "📝"
          },
          {
            id: uuidv4(),
            title: "Sustentável",
            description: "Processos e materiais eco-friendly",
            icon: "♻️"
          }
        ],
        style: {
          backgroundColor: "#f8f9fa",
          headingColor: "#212529",
          textColor: "#495057",
          padding: "lg",
          blockSpacing: "md"
        }
      },
      {
        id: uuidv4(),
        type: "gallery",
        title: "Galeria do Produto",
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            alt: "Produto - Vista Frontal",
            caption: "Design elegante e moderno"
          },
          {
            id: uuidv4(),
            src: "https://images.unsplash.com/photo-1581092335397-9583eb92d232",
            alt: "Produto em uso",
            caption: "Praticidade no dia a dia"
          },
          {
            id: uuidv4(),
            src: "https://images.unsplash.com/photo-1562313366-7534f8a39456",
            alt: "Detalhes do produto",
            caption: "Acabamento premium"
          }
        ],
        style: {
          backgroundColor: "#ffffff",
          headingColor: "#212529",
          textColor: "#495057",
          padding: "lg",
          blockSpacing: "md",
          imageFit: "cover"
        }
      },
      {
        id: uuidv4(),
        type: "features",
        title: "Recursos Avançados",
        columns: 2,
        visible: true,
        heading: "Funcionalidades Exclusivas",
        features: [
          {
            id: uuidv4(),
            title: "Conectividade Total",
            description: "Integração perfeita com todos os seus dispositivos",
            icon: "✓"
          },
          {
            id: uuidv4(),
            title: "Proteção Avançada",
            description: "Sistema de segurança de última geração",
            icon: "✓"
          },
          {
            id: uuidv4(),
            title: "Desempenho Superior",
            description: "50% mais eficiente que a concorrência",
            icon: "✓"
          },
          {
            id: uuidv4(),
            title: "Atualizações Automáticas",
            description: "Sempre com as últimas novidades tecnológicas",
            icon: "✓"
          }
        ],
        style: {
          backgroundColor: "#f8f9fa",
          headingColor: "#212529",
          textColor: "#495057",
          padding: "lg",
          blockSpacing: "md"
        }
      },
      {
        id: uuidv4(),
        type: "specifications",
        title: "Especificações Técnicas",
        columns: 1,
        visible: true,
        heading: "Detalhes Técnicos",
        specs: [
          { id: uuidv4(), name: "Dimensões", value: "10 x 15 x 5 cm" },
          { id: uuidv4(), name: "Peso", value: "250g" },
          { id: uuidv4(), name: "Material", value: "Alumínio e polímero avançado" },
          { id: uuidv4(), name: "Bateria", value: "Até 10 horas de uso contínuo" },
          { id: uuidv4(), name: "Conectividade", value: "Bluetooth 5.0, Wi-Fi" },
          { id: uuidv4(), name: "Certificações", value: "ISO 9001, CE, RoHS" }
        ],
        style: {
          backgroundColor: "#ffffff",
          headingColor: "#212529",
          textColor: "#495057",
          padding: "lg",
          blockSpacing: "md"
        }
      },
      {
        id: uuidv4(),
        type: "faq",
        title: "Perguntas Frequentes",
        columns: 1,
        visible: true,
        heading: "Dúvidas Comuns",
        questions: [
          {
            id: uuidv4(),
            question: "Quanto tempo dura a bateria?",
            answer: "A bateria tem duração média de 10 horas em uso contínuo e até 3 dias em standby. O tempo de carregamento completo é de aproximadamente 2 horas."
          },
          {
            id: uuidv4(),
            question: "O produto tem garantia?",
            answer: "Sim, oferecemos 3 anos de garantia contra defeitos de fabricação, uma das mais extensas do mercado."
          },
          {
            id: uuidv4(),
            question: "É compatível com todos os dispositivos?",
            answer: "Nosso produto é compatível com a maioria dos dispositivos modernos que suportam Bluetooth 4.0 ou superior, incluindo Android, iOS e Windows."
          },
          {
            id: uuidv4(),
            question: "Como funciona a assistência técnica?",
            answer: "Contamos com uma rede de assistência técnica em todo o país. Em caso de problemas, basta entrar em contato com nosso suporte ao cliente que direcionaremos você ao centro mais próximo."
          }
        ],
        style: {
          backgroundColor: "#f8f9fa",
          headingColor: "#212529",
          textColor: "#495057",
          padding: "lg",
          blockSpacing: "md"
        }
      },
      {
        id: uuidv4(),
        type: "cta",
        title: "Chamada Final",
        columns: 1,
        visible: true,
        heading: "Transforme Sua Experiência Hoje",
        content: "Junte-se a milhares de clientes satisfeitos que já descobriram a diferença que nosso produto pode fazer.",
        buttonText: "Adquira Agora",
        buttonUrl: "#comprar",
        style: {
          backgroundColor: "#343a40",
          headingColor: "#ffffff",
          textColor: "#f8f9fa",
          padding: "lg",
          blockSpacing: "none"
        }
      }
    ]
  },
  
  // TEMPLATE 3: Minimalist Product Description
  {
    id: uuidv4(),
    name: "Descrição Minimalista",
    category: "other",
    thumbnail: "https://images.unsplash.com/photo-1555421689-d68471e189f2",
    blocks: [
      {
        id: uuidv4(),
        type: "hero",
        title: "Banner Minimalista",
        columns: 1,
        visible: true,
        heading: "Design Essencial",
        subheading: "Menos é mais",
        buttonText: "Explorar",
        buttonUrl: "#explore",
        backgroundImage: "https://images.unsplash.com/photo-1555421689-d68471e189f2",
        style: {
          backgroundColor: "#f8f8f8",
          headingColor: "#2d2d2d",
          textColor: "#4d4d4d",
          padding: "lg",
          blockSpacing: "md"
        }
      },
      {
        id: uuidv4(),
        type: "text",
        title: "Conceito do Produto",
        columns: 1,
        visible: true,
        heading: "Criado com Propósito",
        content: "<p>Este produto foi concebido a partir da filosofia de que a simplicidade é o último grau de sofisticação. Cada detalhe foi cuidadosamente considerado, mantendo apenas o que é essencial para uma experiência excepcional.</p>",
        style: {
          backgroundColor: "#ffffff",
          headingColor: "#2d2d2d",
          textColor: "#4d4d4d",
          padding: "lg",
          blockSpacing: "md"
        }
      },
      {
        id: uuidv4(),
        type: "image",
        title: "Imagem do Produto",
        columns: 1,
        visible: true,
        src: "https://images.unsplash.com/photo-1523539693385-4faecf539745",
        alt: "Produto minimalista",
        caption: "Simplicidade elegante em cada detalhe",
        style: {
          backgroundColor: "#f8f8f8",
          headingColor: "#2d2d2d",
          textColor: "#4d4d4d",
          padding: "lg",
          blockSpacing: "md",
          imageFit: "cover"
        }
      },
      {
        id: uuidv4(),
        type: "features",
        title: "Atributos Essenciais",
        columns: 2,
        visible: true,
        heading: "Características Fundamentais",
        features: [
          {
            id: uuidv4(),
            title: "Design Intemporal",
            description: "Estética que transcende tendências passageiras",
            icon: "✓"
          },
          {
            id: uuidv4(),
            title: "Funcionalidade Pura",
            description: "Desempenho sem distrações desnecessárias",
            icon: "✓"
          },
          {
            id: uuidv4(),
            title: "Intuitividade",
            description: "Uso natural que dispensa instruções complexas",
            icon: "✓"
          },
          {
            id: uuidv4(),
            title: "Qualidade Duradoura",
            description: "Construção sólida que resiste ao teste do tempo",
            icon: "✓"
          }
        ],
        style: {
          backgroundColor: "#ffffff",
          headingColor: "#2d2d2d",
          textColor: "#4d4d4d",
          padding: "lg",
          blockSpacing: "md"
        }
      },
      {
        id: uuidv4(),
        type: "cta",
        title: "Chamada Final",
        columns: 1,
        visible: true,
        heading: "Simplifique",
        content: "Experimente a diferença que um design consciente pode fazer em sua vida.",
        buttonText: "Adquirir",
        buttonUrl: "#buy",
        style: {
          backgroundColor: "#2d2d2d",
          headingColor: "#ffffff",
          textColor: "#e0e0e0",
          padding: "lg",
          blockSpacing: "none"
        }
      }
    ]
  }
];

// For backward compatibility with existing code that might expect a single template
export const basicTemplate = basicTemplates[0];
