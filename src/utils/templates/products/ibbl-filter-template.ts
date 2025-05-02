
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';
import { createHeroBlock } from '@/utils/blockCreators/blocks/heroBlock';
import { createTextBlock } from '@/utils/blockCreators/blocks/textBlock';
import { createBenefitsBlock } from '@/utils/blockCreators/blocks/benefitsBlock';
import { createSpecificationsBlock } from '@/utils/blockCreators/blocks/specificationsBlock';
import { createFAQBlock } from '@/utils/blockCreators/blocks/faqBlock';
import { createImageTextBlock } from '@/utils/blockCreators/blocks/imageTextBlock';
import { createCTABlock } from '@/utils/blockCreators/blocks/ctaBlock';

export const ibblFilterTemplate: Template = {
  id: uuidv4(),
  name: 'Refil IBBL CZ+7 Original',
  category: 'Casa e decoração',
  thumbnail: '/lovable-uploads/24f4b3e3-7009-42e7-99fb-53afdb90554c.png',
  blocks: [
    // Hero Block - Blue header with product name
    {
      ...createHeroBlock('full'),
      id: uuidv4(),
      title: 'Cabeçalho do Produto',
      heading: 'Refil IBBL CZ+7 Original',
      subheading: 'O Refil Original para Coluna de Purificação IBBL',
      style: {
        backgroundColor: '#0077be',
        padding: '20px',
        textAlign: 'center',
        textColor: '#ffffff',
        backgroundImage: '',
      },
    },
    
    // Family Benefits Block
    {
      ...createTextBlock('full'),
      id: uuidv4(),
      title: 'Benefícios para Família',
      heading: 'A Escolha Ideal para Sua Família',
      content: '<p class="text-center">Seu purificador IBBL merece apenas o melhor. O Refil Original CZ+7 garante água pura e saudável para toda família, mantendo o sabor natural da água e eliminando 99,9% das impurezas.</p>',
      style: {
        backgroundColor: '#ffffff',
        padding: '30px 20px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        margin: '20px 0',
      },
    },
    
    // Benefits Icons
    {
      ...createBenefitsBlock('full'),
      id: uuidv4(),
      title: 'Ícones de Recursos',
      heading: '',
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
      style: {
        backgroundColor: '#ffffff',
        padding: '0 20px 30px 20px',
        textAlign: 'center',
      },
    },
    
    // Product Description
    {
      ...createTextBlock('full'),
      id: uuidv4(),
      title: 'Descrição do Produto',
      heading: 'Descrição do Produto',
      content: '<p>O Refil CZ+7 foi desenvolvido exclusivamente para os purificadores IBBL, garantindo máxima eficiência na purificação da água. Sua tecnologia avançada remove impurezas, cloro, bactérias e outros contaminantes, preservando os minerais benéficos à saúde.</p><p>A troca regular do refil a cada 3 meses ou 3000 litros mantém seu purificador funcionando perfeitamente, garantindo água pura e saudável para toda família.</p><p>Fabricado com materiais de alta qualidade, o Refil CZ+7 Original passa por rigorosos controles de qualidade para assegurar eficiência e durabilidade.</p>',
      style: {
        backgroundColor: '#f5f5f5',
        padding: '40px 20px',
        textAlign: 'left',
      },
    },
    
    // Main Benefits
    {
      ...createBenefitsBlock('full'),
      id: uuidv4(),
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
        {
          id: uuidv4(),
          title: 'Fácil Instalação',
          description: 'Troca simples e rápida, sem ferramentas',
          icon: 'circle-check',
        },
      ],
      style: {
        backgroundColor: '#f5f5f5',
        padding: '20px',
      },
    },
    
    // Compatibility
    {
      ...createTextBlock('full'),
      id: uuidv4(),
      title: 'Compatibilidade',
      heading: 'Compatibilidade com Purificadores IBBL',
      content: '<div class="grid grid-cols-6 gap-4 text-center bg-white p-4 rounded-lg"><div>FR600</div><div>PDF100</div><div>PDF300</div><div>IMAM</div><div>Progágua</div><div>MISTI</div></div><p class="text-center mt-4">*Consulte a compatibilidade completa no manual do produto</p>',
      style: {
        backgroundColor: '#f5f5f5',
        padding: '40px 20px',
      },
    },
    
    // Specifications
    {
      ...createSpecificationsBlock('full'),
      id: uuidv4(),
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
        {
          id: uuidv4(),
          name: 'Eficiência de Retenção de Cloro',
          value: 'Classe C - NBR 16098:2012',
        },
        {
          id: uuidv4(),
          name: 'Vazão',
          value: '60 L/h',
        },
        {
          id: uuidv4(),
          name: 'Pressão',
          value: '39,2 a 392,2 kPa',
        },
        {
          id: uuidv4(),
          name: 'Temperatura de Entrada da Água',
          value: '5°C a 50°C',
        },
      ],
      style: {
        backgroundColor: '#f5f5f5',
        padding: '40px 20px',
      },
    },
    
    // FAQ
    {
      ...createFAQBlock('full'),
      id: uuidv4(),
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
        {
          id: uuidv4(),
          question: 'O que acontece se eu não trocar o refil?',
          answer: 'A não substituição do refil no tempo recomendado compromete a qualidade da filtração, reduz a eficiência na remoção de contaminantes e pode levar à proliferação de bactérias no filtro saturado.',
        },
        {
          id: uuidv4(),
          question: 'Como este refil purifica a água?',
          answer: 'O Refil CZ+7 utiliza um sistema de tripla filtração: filtração mecânica para partículas sólidas, carvão ativado para remoção de cloro e odores, e elemento antibacteriano com prata coloidal para inibir a proliferação de microorganismos.',
        },
      ],
      style: {
        backgroundColor: '#ffffff',
        padding: '40px 20px',
        borderRadius: '8px',
        margin: '20px 0',
      },
    },
    
    // Why Choose Section
    {
      ...createTextBlock('full'),
      id: uuidv4(),
      title: 'Por Que Escolher',
      heading: 'Por Que Escolher a H2O Purificadores?',
      content: '<p class="mb-4">A H2O Purificadores é especializada em soluções de purificação de água há mais de 15 anos. Oferecemos apenas produtos originais com garantia de fábrica e suporte técnico especializado.</p><div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mt-6"><div class="flex flex-col items-center"><span class="text-blue-600 text-3xl mb-2">1</span><p class="text-sm">Produtos Originais</p></div><div class="flex flex-col items-center"><span class="text-blue-600 text-3xl mb-2">2</span><p class="text-sm">Entrega em Todo Brasil</p></div><div class="flex flex-col items-center"><span class="text-blue-600 text-3xl mb-2">3</span><p class="text-sm">Melhor Preço do Mercado</p></div><div class="flex flex-col items-center"><span class="text-blue-600 text-3xl mb-2">4</span><p class="text-sm">Suporte Especializado</p></div><div class="flex flex-col items-center"><span class="text-blue-600 text-3xl mb-2">5</span><p class="text-sm">Garantia de Satisfação</p></div></div>',
      style: {
        backgroundColor: '#ffffff',
        padding: '40px 20px',
      },
    },
    
    // Shipping Info
    {
      ...createTextBlock('full'),
      id: uuidv4(),
      title: 'Cuidados com a Peça',
      heading: 'Cuidados com a Peça',
      content: '<div class="bg-gray-100 p-6 rounded-lg"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="flex items-start"><span class="text-blue-600 font-bold text-xl mr-3">1</span><p>Armazene em local seco e arejado, longe da luz solar direta</p></div><div class="flex items-start"><span class="text-blue-600 font-bold text-xl mr-3">2</span><p>Não utilize ferramentas na instalação, apenas as mãos</p></div><div class="flex items-start"><span class="text-blue-600 font-bold text-xl mr-3">3</span><p>Verifique se há vazamentos após a instalação</p></div><div class="flex items-start"><span class="text-blue-600 font-bold text-xl mr-3">4</span><p>Deixe correr 5 litros de água antes do primeiro uso</p></div></div></div>',
      style: {
        backgroundColor: '#ffffff',
        padding: '40px 20px',
      },
    },
    
    // CTA Footer
    {
      ...createCTABlock('full'),
      id: uuidv4(),
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
    
    // Footer text
    {
      ...createTextBlock('full'),
      id: uuidv4(),
      title: 'Rodapé',
      heading: '',
      content: '<p class="text-center text-sm text-white">H2O Purificadores<br>Distribuidor autorizado IBBL<br>© 2025 Todos os direitos reservados</p>',
      style: {
        backgroundColor: '#0077be',
        padding: '10px 20px 40px 20px',
        textColor: '#ffffff',
      },
    },
  ],
};
