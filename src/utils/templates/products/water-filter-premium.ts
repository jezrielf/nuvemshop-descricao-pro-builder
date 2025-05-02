
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

export const waterFilterPremiumTemplate: Template = {
  id: uuidv4(),
  name: 'Filtro IBBL CZ+7 Premium',
  category: 'Casa e decoração',
  blocks: [
    // Hero section
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Banner Principal',
      heading: 'Filtro IBBL CZ+7 Premium',
      subheading: 'Água pura e saudável para toda sua família',
      backgroundImage: '/lovable-uploads/289bdaa9-9763-4c2d-8f8d-a417f1cc8803.png',
      buttonText: 'Comprar Agora',
      buttonUrl: '#',
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#0077be',
        textColor: '#ffffff',
        textAlign: 'center',
        padding: '40px',
      },
    },
    
    // Benefícios para família
    {
      id: uuidv4(),
      type: 'text',
      title: 'Benefícios para Família',
      heading: 'A Escolha Ideal para Sua Família',
      content: '<p class="text-center">Seu purificador IBBL merece apenas o melhor. O Refil Original CZ+7 garante água pura e saudável para toda família, mantendo o sabor natural da água e eliminando 99,9% das impurezas.</p>',
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#ffffff',
        padding: '30px 20px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        margin: '20px 0',
      },
    },
    
    // Ícones de benefícios
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Ícones de Recursos',
      heading: 'Vantagens Exclusivas',
      benefits: [
        {
          id: uuidv4(),
          title: 'Tempo de Filtragem',
          description: '3 meses de uso',
          icon: 'clock',
        },
        {
          id: uuidv4(),
          title: 'Capacidade',
          description: '3000 litros',
          icon: 'droplet',
        },
        {
          id: uuidv4(),
          title: 'Durabilidade',
          description: 'Alta performance',
          icon: 'star',
        }
      ],
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#ffffff',
        padding: '0 20px 30px 20px',
        textAlign: 'center',
      },
    },
    
    // Descrição do produto
    {
      id: uuidv4(),
      type: 'imageText',
      title: 'Descrição do Produto',
      heading: 'Tecnologia Avançada de Purificação',
      content: '<p>O Refil CZ+7 foi desenvolvido exclusivamente para os purificadores IBBL, garantindo máxima eficiência na purificação da água. Sua tecnologia avançada remove impurezas, cloro, bactérias e outros contaminantes, preservando os minerais benéficos à saúde.</p><p>A troca regular do refil a cada 3 meses ou 3000 litros mantém seu purificador funcionando perfeitamente, garantindo água pura e saudável para toda família.</p>',
      image: {
        src: '/lovable-uploads/05f724f5-3141-4fee-aa9e-d37e9faae0a4.png',
        alt: 'Filtro IBBL CZ+7',
      },
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#f5f5f5',
        padding: '40px 20px',
        textAlign: 'left',
      },
    },
    
    // Principais benefícios
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Principais Benefícios',
      heading: 'Principais Benefícios',
      benefits: [
        {
          id: uuidv4(),
          title: 'Retenção de Impurezas',
          description: 'Elimina partículas sólidas e sedimentos da água',
          icon: 'filter',
        },
        {
          id: uuidv4(),
          title: 'Redução de Cloro',
          description: 'Remove o cloro, melhorando sabor e odor da água',
          icon: 'droplet',
        },
        {
          id: uuidv4(),
          title: 'Ação Antimicrobiana',
          description: 'Impede a proliferação de microorganismos',
          icon: 'shield-check',
        },
        {
          id: uuidv4(),
          title: 'Tripla Ação',
          description: 'Filtração, adsorção e troca iônica',
          icon: 'star',
        },
      ],
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#f5f5f5',
        padding: '20px',
      },
    },
    
    // Compatibilidade
    {
      id: uuidv4(),
      type: 'text',
      title: 'Compatibilidade',
      heading: 'Compatibilidade com Purificadores IBBL',
      content: '<div class="grid grid-cols-2 md:grid-cols-6 gap-4 text-center bg-white p-4 rounded-lg"><div>FR600</div><div>PDF100</div><div>PDF300</div><div>IMAM</div><div>Progágua</div><div>MISTI</div></div><p class="text-center mt-4">*Consulte a compatibilidade completa no manual do produto</p>',
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#f5f5f5',
        padding: '40px 20px',
      },
    },
    
    // Especificações
    {
      id: uuidv4(),
      type: 'specifications',
      title: 'Especificações Técnicas',
      heading: 'Especificações Técnicas',
      specs: [
        {
          id: uuidv4(),
          name: 'Modelo',
          value: 'CZ+7',
        },
        {
          id: uuidv4(),
          name: 'Marca',
          value: 'IBBL',
        },
        {
          id: uuidv4(),
          name: 'Cor',
          value: 'Branco',
        },
        {
          id: uuidv4(),
          name: 'Peso (c/ Embalagem)',
          value: '350g',
        },
        {
          id: uuidv4(),
          name: 'Tecnologia de Filtro',
          value: 'Carvão Ativado + Prata Coloidal',
        },
        {
          id: uuidv4(),
          name: 'Vida Útil',
          value: '3 meses ou 3000 litros',
        },
      ],
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#f5f5f5',
        padding: '40px 20px',
      },
    },
    
    // FAQ
    {
      id: uuidv4(),
      type: 'faq',
      title: 'Perguntas Frequentes',
      heading: 'Perguntas Frequentes',
      questions: [
        {
          id: uuidv4(),
          question: 'Como sei que é hora de trocar o refil?',
          answer: 'O refil deve ser trocado a cada 3 meses ou após a filtragem de 3000 litros, o que ocorrer primeiro. Alguns purificadores possuem indicador luminoso para alertar sobre a troca.',
        },
        {
          id: uuidv4(),
          question: 'O Refil CZ+7 serve para qualquer purificador?',
          answer: 'Não, o Refil CZ+7 foi desenvolvido exclusivamente para os modelos IBBL compatíveis como FR600, PDF100, PDF300, IMAM, Progágua e MISTI. Consulte o manual do seu purificador para confirmar a compatibilidade.',
        },
        {
          id: uuidv4(),
          question: 'Como fazer a troca do refil?',
          answer: 'A troca é simples: feche o registro de entrada de água, gire o refil antigo no sentido anti-horário para remover, insira o novo refil e gire no sentido horário até travar. Abra o registro e deixe a água correr por 5 minutos antes do primeiro uso.',
        },
      ],
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#ffffff',
        padding: '40px 20px',
        borderRadius: '8px',
        margin: '20px 0',
      },
    },
    
    // CTA Footer
    {
      id: uuidv4(),
      type: 'cta',
      title: 'CTA Final',
      heading: 'Garanta Água Pura e Saudável para Sua Família',
      content: 'Adquira agora o Refil Original IBBL CZ+7 e garanta água pura e saudável para toda sua família.',
      buttonText: 'COMPRAR AGORA',
      buttonUrl: '#',
      style: {
        backgroundColor: '#0077be',
        padding: '40px 20px',
        textAlign: 'center',
        textColor: '#ffffff',
      },
    },
  ],
  thumbnail: '/lovable-uploads/05f724f5-3141-4fee-aa9e-d37e9faae0a4.png',
};
