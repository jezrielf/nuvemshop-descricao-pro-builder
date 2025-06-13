
export interface HelpItem {
  id: string;
  question: string;
  answer: string;
  actionButton?: {
    text: string;
    action: string;
  };
  tags?: string[];
}

export interface HelpCategory {
  id: string;
  title: string;
  icon: string;
  items: HelpItem[];
}

export const helpContent: HelpCategory[] = [
  {
    id: 'primeiros-passos',
    title: 'Primeiros Passos',
    icon: '🚀',
    items: [
      {
        id: 'criar-primeira-descricao',
        question: 'Como criar minha primeira descrição?',
        answer: 'Para criar sua primeira descrição: 1) Clique em "Nova Descrição" no topo da tela, 2) Escolha um nome para sua descrição, 3) Selecione um template pronto ou comece do zero, 4) Comece a adicionar blocos clicando em "Adicionar Bloco".',
        actionButton: {
          text: 'Criar Nova Descrição',
          action: 'new-description'
        },
        tags: ['iniciante', 'novo', 'criar']
      },
      {
        id: 'salvar-descricao',
        question: 'Como salvar uma descrição?',
        answer: 'Para salvar sua descrição: 1) Clique no botão "Salvar" no topo da tela, 2) Digite um nome para sua descrição, 3) Clique em "Salvar". Sua descrição ficará disponível na lista de descrições salvas.',
        actionButton: {
          text: 'Salvar Descrição Atual',
          action: 'save-description'
        },
        tags: ['salvar', 'guardar']
      },
      {
        id: 'encontrar-descricoes-salvas',
        question: 'Como encontrar descrições salvas?',
        answer: 'Para acessar suas descrições salvas: 1) Clique em "Descrições Salvas" no topo da tela, 2) Navegue pela lista das suas descrições, 3) Clique em "Carregar" na descrição que deseja editar.',
        actionButton: {
          text: 'Ver Descrições Salvas',
          action: 'saved-descriptions'
        },
        tags: ['salvas', 'buscar', 'encontrar']
      },
      {
        id: 'usar-templates',
        question: 'Como usar templates prontos?',
        answer: 'Os templates são descrições pré-prontas para diferentes tipos de produtos: 1) Na tela inicial, escolha a categoria do seu produto, 2) Clique no template que mais combina, 3) Personalize o conteúdo com as informações do seu produto.',
        tags: ['template', 'pronto', 'categoria']
      }
    ]
  },
  {
    id: 'nuvemshop',
    title: 'Conectar com Nuvemshop',
    icon: '🛒',
    items: [
      {
        id: 'conectar-loja',
        question: 'Como conectar minha loja Nuvemshop?',
        answer: 'Para conectar sua loja: 1) Clique em "Conectar Nuvemshop" na parte superior, 2) Você será redirecionado para autorizar o acesso, 3) Após autorizar, volte para o editor - sua loja estará conectada e você verá o nome dela no topo.',
        actionButton: {
          text: 'Conectar Nuvemshop',
          action: 'connect-nuvemshop'
        },
        tags: ['conectar', 'autorizar', 'loja']
      },
      {
        id: 'buscar-produto',
        question: 'Como buscar um produto específico para editar?',
        answer: 'Com sua loja conectada: 1) Use a barra de busca no topo para digitar o nome do produto, 2) Clique no produto desejado na lista que aparecer, 3) O produto será carregado e você pode editar sua descrição.',
        tags: ['buscar', 'produto', 'encontrar']
      },
      {
        id: 'editar-descricao-produto',
        question: 'Como editar a descrição de um produto?',
        answer: 'Após selecionar um produto: 1) A descrição atual aparecerá no editor (se existir), 2) Edite os blocos existentes ou adicione novos, 3) Use a pré-visualização para ver como ficará, 4) Quando estiver satisfeito, salve de volta na loja.',
        tags: ['editar', 'modificar', 'produto']
      },
      {
        id: 'salvar-na-loja',
        question: 'Como salvar a nova descrição na minha loja?',
        answer: 'Para salvar na loja: 1) Com o produto selecionado e a descrição editada, 2) Clique em "Salvar na Nuvemshop", 3) Aguarde a confirmação, 4) A descrição será atualizada automaticamente na sua loja.',
        actionButton: {
          text: 'Salvar na Nuvemshop',
          action: 'save-to-nuvemshop'
        },
        tags: ['salvar', 'loja', 'atualizar']
      }
    ]
  },
  {
    id: 'escala',
    title: 'Trabalhar em Escala',
    icon: '⚡',
    items: [
      {
        id: 'selecionar-multiplos-produtos',
        question: 'Como selecionar vários produtos de uma vez?',
        answer: 'Para trabalhar com múltiplos produtos: 1) Conecte sua loja Nuvemshop, 2) Na busca, use filtros por categoria ou busque por termos gerais, 3) Marque os produtos que deseja editar usando as caixas de seleção.',
        tags: ['múltiplos', 'vários', 'seleção']
      },
      {
        id: 'aplicar-mesma-descricao',
        question: 'Como aplicar a mesma descrição em vários produtos?',
        answer: 'Para aplicar em lote: 1) Crie ou carregue a descrição modelo, 2) Selecione os produtos desejados, 3) Use a função "Aplicar em Lote" (disponível para usuários Premium), 4) Confirme a aplicação.',
        tags: ['lote', 'mesmo', 'aplicar']
      },
      {
        id: 'substituicoes-lote',
        question: 'Como fazer substituições em lote?',
        answer: 'A função de substituição em lote permite: 1) Definir um template base, 2) Selecionar múltiplos produtos, 3) Aplicar automaticamente adaptando informações específicas de cada produto, 4) Revisar e confirmar as alterações.',
        tags: ['substituição', 'automático', 'lote']
      },
      {
        id: 'gerenciar-atualizacoes',
        question: 'Como gerenciar atualizações em massa?',
        answer: 'Para gerenciar atualizações: 1) Use o painel de produtos conectados, 2) Veja o status de cada atualização, 3) Reaplique descrições se necessário, 4) Monitore os produtos que foram atualizados com sucesso.',
        tags: ['gerenciar', 'massa', 'status']
      }
    ]
  },
  {
    id: 'problemas',
    title: 'Problemas Comuns',
    icon: '🔧',
    items: [
      {
        id: 'nao-conecta-loja',
        question: 'Não consigo conectar minha loja',
        answer: 'Se não conseguir conectar: 1) Verifique se você é administrador da loja, 2) Tente desconectar e conectar novamente, 3) Verifique se não há bloqueadores de popup ativos, 4) Entre em contato conosco se o problema persistir.',
        tags: ['erro', 'conexão', 'problema']
      },
      {
        id: 'nao-encontra-produtos',
        question: 'Não encontro meus produtos',
        answer: 'Se não encontrar produtos: 1) Verifique se a loja está realmente conectada, 2) Tente buscar com termos mais simples, 3) Verifique se os produtos estão publicados na loja, 4) Aguarde alguns minutos após conectar a loja.',
        tags: ['produtos', 'busca', 'não encontra']
      },
      {
        id: 'descricao-nao-salvou',
        question: 'A descrição não salvou na loja',
        answer: 'Se a descrição não salvou: 1) Verifique sua conexão com a internet, 2) Confirme se a loja ainda está conectada, 3) Tente salvar novamente, 4) Verifique se você tem permissões para editar o produto.',
        tags: ['não salvou', 'erro', 'falha']
      },
      {
        id: 'desfazer-mudancas',
        question: 'Como desfazer mudanças?',
        answer: 'Para desfazer alterações: 1) Se ainda não salvou na loja, simplesmente recarregue o produto, 2) Se já salvou, você pode restaurar uma versão anterior das suas descrições salvas, 3) Ou criar uma nova descrição baseada no backup automático.',
        tags: ['desfazer', 'voltar', 'restaurar']
      }
    ]
  }
];

export const searchInHelpContent = (query: string): HelpItem[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  const results: HelpItem[] = [];
  
  helpContent.forEach(category => {
    category.items.forEach(item => {
      const searchableText = `${item.question} ${item.answer} ${item.tags?.join(' ') || ''}`.toLowerCase();
      if (searchableText.includes(normalizedQuery)) {
        results.push(item);
      }
    });
  });

  return results;
};
