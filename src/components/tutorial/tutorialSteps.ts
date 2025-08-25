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
}

export const firstAccessTutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Bem-vindo ao DescriçãoPro!',
    description: 'Este é o editor de descrições mais avançado do Brasil. Vamos te mostrar como criar descrições incríveis em poucos minutos.',
    targetSelector: 'header',
    position: 'bottom',
    image: '/tutorial/welcome-screen.png'
  },
  {
    id: 'interface-overview',
    title: 'Interface Principal',
    description: 'À esquerda temos o editor onde você constrói sua descrição. À direita, a visualização em tempo real de como ficará na sua loja.',
    targetSelector: '.editor-area',
    position: 'right',
    image: '/tutorial/interface-overview.png'
  },
  {
    id: 'new-description',
    title: 'Criar Nova Descrição',
    description: 'Clique aqui para começar uma nova descrição. Você pode escolher um template pronto ou começar do zero.',
    targetSelector: '[data-action="new-description"]',
    position: 'bottom',
    actionText: 'Criar Nova Descrição',
    onAction: () => {
      (document.querySelector('[data-action="new-description"]') as HTMLElement)?.click();
    }
  },
  {
    id: 'add-block',
    title: 'Adicionar Blocos',
    description: 'Clique em "Adicionar Bloco" para inserir diferentes tipos de conteúdo: texto, imagens, especificações, perguntas frequentes e muito mais.',
    targetSelector: '[data-testid="add-block-button"]',
    position: 'bottom',
    image: '/tutorial/add-blocks.png'
  },
  {
    id: 'block-editing',
    title: 'Editar Conteúdo',
    description: 'Clique em qualquer bloco para editá-lo. Você pode alterar textos, cores, tamanhos e muito mais.',
    targetSelector: '.block-wrapper',
    position: 'right',
    image: '/tutorial/block-editing.png'
  },
  {
    id: 'style-controls',
    title: 'Personalizar Estilos',
    description: 'Use os controles de estilo para personalizar cores, fontes, espaçamentos e deixar sua descrição com a cara da sua marca.',
    targetSelector: '.style-controls',
    position: 'left',
    image: '/tutorial/style-controls.png'
  },
  {
    id: 'preview',
    title: 'Visualização em Tempo Real',
    description: 'Aqui você vê exatamente como sua descrição ficará na loja. Toda alteração aparece instantaneamente.',
    targetSelector: '.preview-area',
    position: 'left',
    image: '/tutorial/preview-panel.png'
  },
  {
    id: 'save-description',
    title: 'Salvar Descrição',
    description: 'Sempre salve seu trabalho! Suas descrições ficam guardadas e você pode editá-las quando quiser.',
    targetSelector: '[data-action="save-description"]',
    position: 'bottom',
    actionText: 'Salvar Descrição'
  },
  {
    id: 'nuvemshop-connection',
    title: 'Conectar Nuvemshop',
    description: 'Conecte sua loja Nuvemshop para aplicar as descrições diretamente nos seus produtos com um clique.',
    targetSelector: '[data-action="connect-nuvemshop"]',
    position: 'bottom',
    image: '/tutorial/nuvemshop-connect.png'
  }
];

export const advancedTutorialSteps: TutorialStep[] = [
  {
    id: 'template-selection',
    title: 'Escolher Templates',
    description: 'Explore nossa biblioteca de templates profissionais organizados por categoria de produto.',
    targetSelector: '.template-grid',
    position: 'top',
    image: '/tutorial/templates.png'
  },
  {
    id: 'product-search',
    title: 'Buscar Produtos',
    description: 'Com a loja conectada, busque produtos específicos para editar suas descrições.',
    targetSelector: '.product-search',
    position: 'bottom',
    image: '/tutorial/product-search.png'
  },
  {
    id: 'bulk-operations',
    title: 'Operações em Lote',
    description: 'Selecione múltiplos produtos e aplique a mesma descrição em todos de uma vez (recurso Premium).',
    targetSelector: '.bulk-selection',
    position: 'top',
    image: '/tutorial/bulk-operations.png'
  },
  {
    id: 'seo-analysis',
    title: 'Análise SEO',
    description: 'Use nossas ferramentas de SEO para otimizar suas descrições e rankear melhor no Google.',
    targetSelector: '[href="/description-analysis"]',
    position: 'bottom',
    image: '/tutorial/seo-analysis.png'
  }
];

export const nuvemshopTutorialSteps: TutorialStep[] = [
  {
    id: 'nuvemshop-intro',
    title: 'Integração Nuvemshop',
    description: 'A integração com Nuvemshop permite sincronizar automaticamente suas descrições com sua loja.',
    targetSelector: '.nuvemshop-panel',
    position: 'top',
    image: '/tutorial/nuvemshop-intro.png'
  },
  {
    id: 'authorize-connection',
    title: 'Autorizar Conexão',
    description: 'Clique para conectar e autorizar o acesso à sua loja Nuvemshop de forma segura.',
    targetSelector: '[data-action="connect-nuvemshop"]',
    position: 'bottom',
    actionText: 'Conectar Agora'
  },
  {
    id: 'product-loading',
    title: 'Carregar Produtos',
    description: 'Após conectar, seus produtos aparecerão automaticamente na busca para edição.',
    targetSelector: '.product-search',
    position: 'bottom',
    image: '/tutorial/product-loading.png'
  },
  {
    id: 'edit-product-description',
    title: 'Editar Produto',
    description: 'Selecione um produto para carregar sua descrição atual e começar a editar.',
    targetSelector: '.product-item',
    position: 'right',
    image: '/tutorial/edit-product.png'
  },
  {
    id: 'save-to-store',
    title: 'Publicar na Loja',
    description: 'Quando terminar, publique a nova descrição diretamente na sua loja com um clique.',
    targetSelector: '[data-action="save-to-nuvemshop"]',
    position: 'bottom',
    actionText: 'Publicar na Loja'
  }
];
