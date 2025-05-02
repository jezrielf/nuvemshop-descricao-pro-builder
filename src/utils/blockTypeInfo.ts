
import { BlockType } from '@/types/editor';

interface BlockTypeInfo {
  name: string;
  icon: string; // Changed from React.ReactNode to string
  description: string;
}

export const blockTypeInfo: Record<BlockType, BlockTypeInfo> = {
  hero: {
    name: 'Banner Principal',
    icon: 'layout',
    description: 'Banner de destaque com título, subtítulo e call-to-action'
  },
  text: {
    name: 'Texto',
    icon: 'type',
    description: 'Bloco de texto formatado para descrição de produtos'
  },
  image: {
    name: 'Imagem',
    icon: 'image',
    description: 'Imagem única com legenda opcional'
  },
  gallery: {
    name: 'Galeria',
    icon: 'images',
    description: 'Coleção de imagens em grade'
  },
  features: {
    name: 'Recursos',
    icon: 'list-checks',
    description: 'Lista de recursos ou características do produto'
  },
  benefits: {
    name: 'Benefícios',
    icon: 'check-circle-2',
    description: 'Seção destacando os principais benefícios do produto'
  },
  specifications: {
    name: 'Especificações',
    icon: 'table-2',
    description: 'Detalhes técnicos e especificações do produto'
  },
  imageText: {
    name: 'Imagem + Texto',
    icon: 'image-down',
    description: 'Imagem à esquerda com texto à direita'
  },
  textImage: {
    name: 'Texto + Imagem',
    icon: 'download',
    description: 'Texto à esquerda com imagem à direita'
  },
  faq: {
    name: 'Perguntas Frequentes',
    icon: 'help-circle',
    description: 'Lista de perguntas e respostas comuns'
  },
  cta: {
    name: 'Chamada para Ação',
    icon: 'arrow-right-circle',
    description: 'Botão de chamada para ação com texto destacado'
  },
  video: {
    name: 'Vídeo',
    icon: 'video',
    description: 'Reprodutor de vídeo incorporado'
  }
};

export default blockTypeInfo;

// Add the function that's being imported in BlockHeader.tsx
export const getBlockTypeDisplayName = (type: BlockType): string => {
  return blockTypeInfo[type]?.name || type;
};
