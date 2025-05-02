
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const waterFilterPremiumTemplate: Template = {
  id: uuidv4(),
  name: 'Refil de Água Premium',
  category: 'Casa e decoração',
  blocks: [
    // Hero Block
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Banner Principal',
      visible: true,
      columns: 'full',
      heading: 'Refil IBBL CZ+7 Original',
      subheading: 'Tecnologia avançada para água pura e saudável',
      buttonText: '',
      buttonUrl: '',
      style: {
        backgroundColor: '#0088cc',
        backgroundGradient: 'linear-gradient(135deg, #0088cc 0%, #005580 100%)',
        textColor: 'white',
        padding: '30px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }
    },
    
    // Text Block - Introdução
    {
      id: uuidv4(),
      type: 'text',
      title: 'Introdução',
      visible: true,
      columns: 'full',
      heading: 'A Escolha Ideal para Sua Família',
      content: '<p style="font-size: 18px; color: #555; line-height: 1.7;">Se você está em busca de um refil de alto desempenho, qualidade comprovada e máxima eficiência na purificação da água, o <strong style="color: #0088cc;">Refil IBBL CZ+7 Original</strong> é a escolha ideal. Projetado com tecnologia avançada e compatível com diversos modelos da linha IBBL, ele garante água pura, livre de impurezas e pronta para o consumo diário de toda a sua família.</p>',
      style: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        margin: '40px auto',
        border: '1px solid rgba(0,0,0,0.06)'
      }
    },
    
    // Features Block
    {
      id: uuidv4(),
      type: 'features',
      title: 'Características Principais',
      visible: true,
      columns: 3,
      heading: 'Características Principais',
      features: [
        {
          id: uuidv4(),
          title: 'Etapas de Filtragem',
          description: 'Processo completo de purificação',
          icon: '7'
        },
        {
          id: uuidv4(),
          title: 'Original',
          description: 'Garantia de autenticidade',
          icon: '100%'
        },
        {
          id: uuidv4(),
          title: 'Durabilidade',
          description: 'Até 6 meses de uso',
          icon: '6m'
        }
      ],
      style: {
        backgroundColor: 'transparent',
        padding: '20px',
        textAlign: 'center'
      }
    },
    
    // Text Block - Descrição do Produto
    {
      id: uuidv4(),
      type: 'text',
      title: 'Descrição do Produto',
      visible: true,
      columns: 'full',
      heading: 'Descrição do Produto',
      content: '<p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">O Refil IBBL CZ+7 Original foi desenvolvido com a mais alta tecnologia em purificação de água, proporcionando um consumo mais seguro, saudável e com excelente qualidade. Ideal para ambientes residenciais, corporativos e comerciais, este refil atende aos consumidores que valorizam desempenho, saúde e praticidade.</p><p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">Sua principal característica está no sistema de sete etapas de filtragem, que atua de forma sequencial e progressiva, garantindo uma água extremamente limpa e agradável ao paladar. Cada etapa cumpre um papel fundamental, como a retenção de partículas sólidas (areia, barro, ferrugem), a redução do cloro livre presente na água, e o controle de odores e sabores que comprometem a qualidade do consumo.</p><p style="font-size: 16px; line-height: 1.8;">Além disso, o CZ+7 conta com ação bacteriostática, que evita a proliferação de bactérias no interior do refil, tornando-o ainda mais seguro e durável. O sistema Girou Trocou, exclusivo da IBBL, facilita a instalação e troca do refil sem necessidade de ferramentas ou assistência técnica. Com um simples movimento, você substitui o refil e já pode utilizar seu purificador com total segurança.</p>',
      style: {
        backgroundColor: 'white',
        padding: '60px 20px',
        textAlign: 'left'
      }
    },
    
    // Benefits Block
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Benefícios',
      visible: true,
      columns: 'full',
      heading: 'Principais Benefícios',
      benefits: [
        {
          id: uuidv4(),
          title: 'Purificação em 7 etapas',
          description: 'Proporciona uma água cristalina, livre de impurezas e com sabor natural.',
          icon: '7'
        },
        {
          id: uuidv4(),
          title: 'Redução de cloro',
          description: 'Melhora o gosto e o odor da água, além de proteger a saúde da sua família.',
          icon: 'Cl'
        },
        {
          id: uuidv4(),
          title: 'Ação bacteriostática',
          description: 'Previne a proliferação de micro-organismos no interior do refil.',
          icon: 'B'
        },
        {
          id: uuidv4(),
          title: 'Troca fácil',
          description: 'O sistema Girou Trocou permite substituição prática, sem ferramentas.',
          icon: '↻'
        },
        {
          id: uuidv4(),
          title: 'Alta durabilidade',
          description: 'Com até 6 meses de uso contínuo ou 3.000 litros de água, reduz a necessidade de manutenções frequentes.',
          icon: '6m'
        }
      ],
      style: {
        backgroundColor: '#f5f5f7',
        backgroundGradient: 'linear-gradient(to bottom, #f5f5f7, #ffffff)',
        padding: '60px 20px',
        borderRadius: '0'
      }
    },
    
    // Specifications Block - Compatibilidade
    {
      id: uuidv4(),
      type: 'specifications',
      title: 'Compatibilidade',
      visible: true,
      columns: 2,
      heading: 'Compatibilidade com Purificadores IBBL',
      specifications: [
        { label: 'FR600 Expert', value: 'Compatível' },
        { label: 'FR600 Speciale', value: 'Compatível' },
        { label: 'FRQ600', value: 'Compatível' },
        { label: 'Evolux', value: 'Compatível' },
        { label: 'Immaginare', value: 'Compatível' },
        { label: 'Atlantis', value: 'Compatível' },
        { label: 'PDF', value: 'Compatível' },
        { label: 'E-due', value: 'Compatível' },
        { label: 'FR600 Exclusive', value: 'Compatível' },
        { label: 'FR600 Refrigeração Eletrônica', value: 'Compatível' }
      ],
      style: {
        backgroundColor: 'white',
        padding: '40px 20px',
        borderRadius: '24px',
        marginTop: '40px',
        marginBottom: '40px'
      }
    },
    
    // Specifications Block - Especificações Técnicas
    {
      id: uuidv4(),
      type: 'specifications',
      title: 'Especificações Técnicas',
      visible: true,
      columns: 2,
      heading: 'Especificações Técnicas',
      specifications: [
        { label: 'Modelo', value: 'CZ+7' },
        { label: 'Marca', value: 'IBBL' },
        { label: 'Etapas de Filtragem', value: '7' },
        { label: 'Tecnologia de Troca', value: 'Girou Trocou' },
        { label: 'Eficiência na Retenção de Partículas', value: 'Classe C (≥ 5 a < 15 micra)' },
        { label: 'Eficiência na Redução de Cloro', value: 'Aprovado segundo norma NBR 16098' },
        { label: 'Certificação', value: 'INMETRO' },
        { label: 'Vida útil', value: 'até 6 meses ou 3.000 litros' },
        { label: 'Dimensões', value: '21 cm (altura) x 7,5 cm (largura)' },
        { label: 'Temperatura de operação', value: 'de 5°C a 50°C' }
      ],
      style: {
        backgroundColor: 'white',
        backgroundGradient: 'linear-gradient(to bottom, #f5f5f7, #ffffff)',
        padding: '40px 20px',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }
    },
    
    // FAQ Block
    {
      id: uuidv4(),
      type: 'faq',
      title: 'Perguntas Frequentes',
      visible: true,
      columns: 'full',
      heading: 'Perguntas Frequentes',
      questions: [
        {
          id: uuidv4(),
          question: 'Esse refil é original da IBBL?',
          answer: 'Sim. O CZ+7 vendido pela H2O é 100% original, com selo IBBL e certificado pelo INMETRO.'
        },
        {
          id: uuidv4(),
          question: 'Como sei se o CZ+7 serve no meu purificador?',
          answer: 'Verifique o modelo no corpo do seu purificador ou consulte nosso atendimento. Listamos todos os modelos compatíveis nesta descrição.'
        },
        {
          id: uuidv4(),
          question: 'Posso trocar o refil sozinho?',
          answer: 'Sim. Com o sistema Girou Trocou, basta girar e encaixar o novo refil – sem ferramentas.'
        },
        {
          id: uuidv4(),
          question: 'Quanto tempo o refil dura?',
          answer: 'A vida útil é de até 6 meses ou 3.000 litros de água, variando de acordo com a qualidade da água da sua região.'
        },
        {
          id: uuidv4(),
          question: 'Esse refil reduz bactérias?',
          answer: 'Sim. O CZ+7 possui ação bacteriostática, impedindo a proliferação de bactérias no interior do filtro.'
        }
      ],
      style: {
        backgroundColor: '#f5f5f7',
        backgroundGradient: 'linear-gradient(135deg, #f5f5f7 0%, #e5e5e7 100%)',
        padding: '40px 20px',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }
    },
    
    // Text Block - Por Que Escolher
    {
      id: uuidv4(),
      type: 'text',
      title: 'Por Que Escolher',
      visible: true,
      columns: 'full',
      heading: 'Por Que Escolher a H2O Purificadores?',
      content: '<p style="font-size: 16px; color: #333; line-height: 1.8; margin-bottom: 30px;">A H2O Purificadores é uma empresa especializada em soluções para tratamento de água, com anos de experiência no mercado e compromisso com a qualidade. Trabalhamos com as melhores marcas e os produtos mais confiáveis do setor, sempre com foco em oferecer uma experiência de compra segura, rápida e transparente.</p><p style="font-size: 16px; color: #333; line-height: 1.8; margin-bottom: 30px;">Ao escolher a H2O, você conta com:</p><ul style="list-style-type: none; padding-left: 0;"><li style="display: flex; align-items: center; margin-bottom: 15px;"><span style="background-color: #0088cc; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">✓</span>Equipe técnica para orientações pré e pós-venda</li><li style="display: flex; align-items: center; margin-bottom: 15px;"><span style="background-color: #0088cc; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">✓</span>Produtos com garantia e procedência</li><li style="display: flex; align-items: center; margin-bottom: 15px;"><span style="background-color: #0088cc; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">✓</span>Frete ágil e seguro</li><li style="display: flex; align-items: center; margin-bottom: 15px;"><span style="background-color: #0088cc; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">✓</span>Suporte para lojistas e revendedores</li><li style="display: flex; align-items: center;"><span style="background-color: #0088cc; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">✓</span>Diversas formas de pagamento</li></ul>',
      style: {
        backgroundColor: 'white',
        backgroundGradient: 'linear-gradient(to bottom, #f5f5f7, #ffffff)',
        padding: '60px 20px',
        borderRadius: '24px',
        marginBottom: '40px',
        marginTop: '40px'
      }
    },
    
    // Text Block - Cuidados com a Peça
    {
      id: uuidv4(),
      type: 'text',
      title: 'Cuidados com a Peça',
      visible: true,
      columns: 'full',
      heading: 'Cuidados com a Peça',
      content: '<div style="background: linear-gradient(135deg, #f5f5f7 0%, #e5e5e7 100%); border-radius: 24px; padding: 40px;"><div style="display: flex; flex-wrap: wrap; justify-content: center;"><div style="flex: 1 1 300px; margin-bottom: 30px; display: flex; align-items: flex-start;"><div style="width: 50px; height: 50px; background-color: #0088cc; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;"><div style="font-size: 24px; color: white;">1</div></div><div><p style="margin: 0; line-height: 1.6;">Faça a troca do refil a cada 6 meses ou conforme indicado no manual do purificador.</p></div></div><div style="flex: 1 1 300px; margin-bottom: 30px; display: flex; align-items: flex-start;"><div style="width: 50px; height: 50px; background-color: #0088cc; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;"><div style="font-size: 24px; color: white;">2</div></div><div><p style="margin: 0; line-height: 1.6;">Evite expor o refil ao sol e ao calor excessivo.</p></div></div><div style="flex: 1 1 300px; margin-bottom: 30px; display: flex; align-items: flex-start;"><div style="width: 50px; height: 50px; background-color: #0088cc; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;"><div style="font-size: 24px; color: white;">3</div></div><div><p style="margin: 0; line-height: 1.6;">Armazene o produto em local seco, limpo e protegido.</p></div></div><div style="flex: 1 1 300px; display: flex; align-items: flex-start;"><div style="width: 50px; height: 50px; background-color: #0088cc; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;"><div style="font-size: 24px; color: white;">4</div></div><div><p style="margin: 0; line-height: 1.6;">Após a troca, descarte o refil usado de forma correta, respeitando o meio ambiente.</p></div></div></div></div>',
      style: {
        backgroundColor: 'white',
        padding: '60px 20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }
    },
    
    // CTA Block
    {
      id: uuidv4(),
      type: 'cta',
      title: 'Chamada para Ação',
      visible: true,
      columns: 'full',
      heading: 'Garanta Água Pura e Saudável para Sua Família',
      content: 'Invista em qualidade e segurança com o Refil IBBL CZ+7 Original. Produto 100% original com garantia de procedência.',
      buttonText: 'COMPRAR AGORA',
      buttonUrl: '#',
      style: {
        backgroundColor: '#0088cc',
        backgroundGradient: 'linear-gradient(135deg, #0088cc 0%, #005580 100%)',
        textColor: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }
    },
  ]
};
