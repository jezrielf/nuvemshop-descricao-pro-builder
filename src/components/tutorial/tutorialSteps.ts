
export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  image?: string;
  video?: string;
  actionText?: string;
  onAction?: () => void;
  tips?: string[];
  isOptional?: boolean;
}

export const firstAccessTutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Bem-vindo ao DescriçãoPro! 🎉',
    description: 'Este é o editor de descrições mais avançado do Brasil. Você está vendo a interface principal: à esquerda o editor, à direita a visualização em tempo real.',
    targetSelector: 'header',
    position: 'bottom',
    image: '/tutorial/welcome-screen.png',
    tips: [
      'Toda mudança aparece instantaneamente na visualização',
      'Use os atalhos do teclado para trabalhar mais rápido',
      'Você pode redimensionar os painéis arrastando a divisória'
    ]
  },
  {
    id: 'interface-overview',
    title: 'Conhecendo a Interface',
    description: 'À esquerda temos o editor onde você constrói sua descrição. À direita, a visualização mostra exatamente como ficará na sua loja. Tudo em tempo real!',
    targetSelector: '.editor-area',
    position: 'right',
    image: '/tutorial/interface-overview.png',
    tips: [
      'O painel pode ser ajustado para mobile ou desktop',
      'Use F11 para modo tela cheia',
      'Clique duas vezes na divisória para centralizar'
    ]
  },
  {
    id: 'new-description',
    title: 'Criar Nova Descrição ✨',
    description: 'Clique aqui para começar uma nova descrição. Você pode escolher um template pronto da nossa biblioteca ou começar do zero com blocos personalizados.',
    targetSelector: '[data-action="new-description"]',
    position: 'bottom',
    actionText: 'Criar Nova Descrição',
    onAction: () => {
      (document.querySelector('[data-action="new-description"]') as HTMLElement)?.click();
    },
    tips: [
      'Templates são organizados por categoria de produto',
      'Você pode modificar qualquer template',
      'Comece sempre pelo template mais próximo ao seu produto'
    ]
  },
  {
    id: 'add-block',
    title: 'Adicionar Blocos 🧱',
    description: 'Os blocos são os elementos da sua descrição. Clique em "Adicionar Bloco" para inserir texto, imagens, especificações, perguntas frequentes e muito mais.',
    targetSelector: '[data-testid="add-block-button"]',
    position: 'bottom',
    image: '/tutorial/add-blocks.png',
    tips: [
      'Existem mais de 10 tipos de blocos diferentes',
      'Cada bloco tem configurações específicas',
      'Você pode reordenar blocos arrastando e soltando'
    ]
  },
  {
    id: 'block-editing',
    title: 'Editando Conteúdo ✏️',
    description: 'Clique em qualquer bloco para editá-lo. Você pode alterar textos, cores, tamanhos, adicionar imagens e personalizar completamente cada elemento.',
    targetSelector: '.block-wrapper',
    position: 'right',
    image: '/tutorial/block-editing.png',
    tips: [
      'Use Ctrl+Z para desfazer mudanças',
      'Copie blocos com Ctrl+C e Ctrl+V',
      'Clique no ícone de lixeira para remover blocos'
    ]
  },
  {
    id: 'style-controls',
    title: 'Personalizar Estilos 🎨',
    description: 'Use os controles de estilo para personalizar cores, fontes, espaçamentos e deixar sua descrição com a identidade visual da sua marca.',
    targetSelector: '.style-controls',
    position: 'left',
    image: '/tutorial/style-controls.png',
    tips: [
      'Salve suas cores de marca para reusar',
      'Use gradientes para efeitos modernos',
      'Teste diferentes fontes para ver qual combina'
    ]
  },
  {
    id: 'preview',
    title: 'Visualização em Tempo Real 👀',
    description: 'Aqui você vê exatamente como sua descrição ficará na loja. Toda alteração aparece instantaneamente. Teste em mobile e desktop!',
    targetSelector: '.preview-area',
    position: 'left',
    image: '/tutorial/preview-panel.png',
    tips: [
      'Use os botões de device para testar responsividade',
      'Scroll na preview para ver toda a descrição',
      'A preview mostra o HTML final que será gerado'
    ]
  },
  {
    id: 'save-description',
    title: 'Salvar Descrição 💾',
    description: 'Sempre salve seu trabalho! Suas descrições ficam guardadas na nuvem e você pode editá-las quando quiser. Organize com nomes descritivos.',
    targetSelector: '[data-action="save-description"]',
    position: 'bottom',
    actionText: 'Salvar Descrição',
    tips: [
      'Use nomes descritivos como "Tênis Nike Air Max"',
      'Descrições salvas aparecem na lista',
      'Você pode duplicar descrições existentes'
    ]
  },
  {
    id: 'nuvemshop-connection',
    title: 'Conectar Nuvemshop 🛒',
    description: 'Conecte sua loja Nuvemshop para aplicar as descrições diretamente nos seus produtos com um clique. Sem copiar e colar!',
    targetSelector: '[data-action="connect-nuvemshop"]',
    position: 'bottom',
    image: '/tutorial/nuvemshop-connect.png',
    tips: [
      'A conexão é segura e pode ser removida a qualquer momento',
      'Você pode editar produtos existentes ou criar novos',
      'Funciona com qualquer plano da Nuvemshop'
    ]
  }
];

export const quickTutorialSteps: TutorialStep[] = [
  {
    id: 'quick-welcome',
    title: 'Tour Rápido - Vamos começar! ⚡',
    description: 'Este tour mostra o essencial em 4 passos. Perfeito para quem quer começar a usar já!',
    targetSelector: 'header',
    position: 'bottom',
    tips: ['Leva apenas 3 minutos', 'Foca no que é mais importante']
  },
  {
    id: 'quick-new-description',
    title: 'Passo 1: Nova Descrição',
    description: 'Comece sempre aqui. Escolha um template ou crie do zero.',
    targetSelector: '[data-action="new-description"]',
    position: 'bottom',
    actionText: 'Criar Descrição'
  },
  {
    id: 'quick-add-content',
    title: 'Passo 2: Adicionar Conteúdo',
    description: 'Use blocos para construir sua descrição. Texto, imagens, especificações...',
    targetSelector: '[data-testid="add-block-button"]',
    position: 'bottom'
  },
  {
    id: 'quick-save',
    title: 'Passo 3: Salvar Trabalho',
    description: 'Sempre salve! Suas descrições ficam seguras na nuvem.',
    targetSelector: '[data-action="save-description"]',
    position: 'bottom',
    actionText: 'Salvar Agora'
  },
  {
    id: 'quick-complete',
    title: 'Pronto! Você já sabe o básico! 🎉',
    description: 'Agora explore livremente. Use o botão "Ajuda" para acessar tutoriais completos quando precisar.',
    targetSelector: '[data-action="start-tutorial"]',
    position: 'bottom',
    tips: [
      'Explore os templates para se inspirar',
      'Use o tutorial completo para funcionalidades avançadas',
      'A central de ajuda tem respostas para tudo'
    ]
  }
];

export const advancedTutorialSteps: TutorialStep[] = [
  {
    id: 'template-selection',
    title: 'Biblioteca de Templates 📚',
    description: 'Explore nossa biblioteca com mais de 100 templates profissionais organizados por categoria de produto. Cada template é otimizado para conversão.',
    targetSelector: '.template-grid',
    position: 'top',
    image: '/tutorial/templates.png',
    tips: [
      'Templates são atualizados mensalmente',
      'Cada categoria tem templates específicos',
      'Você pode modificar qualquer template'
    ]
  },
  {
    id: 'product-search',
    title: 'Buscar Produtos 🔍',
    description: 'Com a loja conectada, busque produtos específicos para editar suas descrições. Funciona com título, SKU ou categoria.',
    targetSelector: '.product-search',
    position: 'bottom',
    image: '/tutorial/product-search.png',
    tips: [
      'Use filtros para encontrar produtos rapidamente',
      'Busque por categoria para edições em massa',
      'Produtos sem descrição aparecem destacados'
    ]
  },
  {
    id: 'bulk-operations',
    title: 'Operações em Lote 🚀',
    description: 'Selecione múltiplos produtos e aplique a mesma descrição em todos de uma vez. Ideal para produtos similares (recurso Premium).',
    targetSelector: '.bulk-selection',
    position: 'top',
    image: '/tutorial/bulk-operations.png',
    tips: [
      'Economiza horas de trabalho',
      'Funciona bem para variações de produto',
      'Sempre faça backup antes de operações em massa'
    ]
  },
  {
    id: 'seo-analysis',
    title: 'Análise SEO 📈',
    description: 'Use nossas ferramentas de SEO para otimizar suas descrições e rankear melhor no Google. Análise de palavras-chave, estrutura e mais.',
    targetSelector: '[href="/description-analysis"]',
    position: 'bottom',
    image: '/tutorial/seo-analysis.png',
    tips: [
      'Foque em 1-2 palavras-chave principais',
      'Use headings (H2, H3) para estruturar o conteúdo',
      'Descrições entre 300-500 palavras performam melhor'
    ]
  }
];

export const nuvemshopTutorialSteps: TutorialStep[] = [
  {
    id: 'nuvemshop-intro',
    title: 'Integração Nuvemshop 🛒',
    description: 'A integração com Nuvemshop permite sincronizar automaticamente suas descrições com sua loja. Sem copiar e colar, sem stress!',
    targetSelector: '.nuvemshop-panel',
    position: 'top',
    image: '/tutorial/nuvemshop-intro.png',
    tips: [
      'Funciona com qualquer plano da Nuvemshop',
      'Conexão segura via OAuth',
      'Suas credenciais nunca são armazenadas'
    ]
  },
  {
    id: 'authorize-connection',
    title: 'Autorizar Conexão 🔐',
    description: 'Clique para conectar e autorizar o acesso à sua loja Nuvemshop de forma segura. Você será redirecionado para o painel da Nuvemshop.',
    targetSelector: '[data-action="connect-nuvemshop"]',
    position: 'bottom',
    actionText: 'Conectar Agora',
    tips: [
      'O processo é rápido e seguro',
      'Você pode revogar acesso a qualquer momento',
      'Funciona com lojas de teste e produção'
    ]
  },
  {
    id: 'product-loading',
    title: 'Carregar Produtos 📦',
    description: 'Após conectar, seus produtos aparecerão automaticamente na busca. Você pode filtrar por categoria, status ou buscar por nome.',
    targetSelector: '.product-search',
    position: 'bottom',
    image: '/tutorial/product-loading.png',
    tips: [
      'Produtos são sincronizados em tempo real',
      'Use filtros para encontrar produtos rapidamente',
      'Produtos destacados precisam de descrição'
    ]
  },
  {
    id: 'edit-product-description',
    title: 'Editar Produto 📝',
    description: 'Selecione um produto para carregar sua descrição atual e começar a editar. A descrição existente (se houver) será importada automaticamente.',
    targetSelector: '.product-item',
    position: 'right',
    image: '/tutorial/edit-product.png',
    tips: [
      'Descrições existentes são preservadas',
      'Você pode fazer backup antes de alterar',
      'Use templates para acelerar o processo'
    ]
  },
  {
    id: 'save-to-store',
    title: 'Publicar na Loja 🚀',
    description: 'Quando terminar, publique a nova descrição diretamente na sua loja com um clique. A mudança é instantânea e você pode ver o resultado na sua loja.',
    targetSelector: '[data-action="save-to-nuvemshop"]',
    position: 'bottom',
    actionText: 'Publicar na Loja',
    tips: [
      'Mudanças são aplicadas instantaneamente',
      'Você pode desfazer se não gostar do resultado',
      'Teste sempre em produtos de baixo volume primeiro'
    ]
  }
];
