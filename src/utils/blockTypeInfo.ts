
import { BlockType } from '@/types/editor';
import { 
  Layout,
  Type,
  ImageIcon,
  ListChecks,
  CheckCircle2,
  Table2,
  Images,
  ImageDown,
  DownloadIcon,
  HelpCircle,
  ArrowRightCircle,
  Video
} from 'lucide-react';

interface BlockTypeInfo {
  name: string;
  icon: React.ReactNode;
  description: string;
}

export const blockTypeInfo: Record<BlockType, BlockTypeInfo> = {
  hero: {
    name: 'Banner Principal',
    icon: <Layout size={16} />,
    description: 'Banner de destaque com título, subtítulo e call-to-action'
  },
  text: {
    name: 'Texto',
    icon: <Type size={16} />,
    description: 'Bloco de texto formatado para descrição de produtos'
  },
  image: {
    name: 'Imagem',
    icon: <ImageIcon size={16} />,
    description: 'Imagem única com legenda opcional'
  },
  gallery: {
    name: 'Galeria',
    icon: <Images size={16} />,
    description: 'Coleção de imagens em grade'
  },
  features: {
    name: 'Recursos',
    icon: <ListChecks size={16} />,
    description: 'Lista de recursos ou características do produto'
  },
  benefits: {
    name: 'Benefícios',
    icon: <CheckCircle2 size={16} />,
    description: 'Seção destacando os principais benefícios do produto'
  },
  specifications: {
    name: 'Especificações',
    icon: <Table2 size={16} />,
    description: 'Detalhes técnicos e especificações do produto'
  },
  imageText: {
    name: 'Imagem + Texto',
    icon: <ImageDown size={16} />,
    description: 'Imagem à esquerda com texto à direita'
  },
  textImage: {
    name: 'Texto + Imagem',
    icon: <DownloadIcon size={16} />,
    description: 'Texto à esquerda com imagem à direita'
  },
  faq: {
    name: 'Perguntas Frequentes',
    icon: <HelpCircle size={16} />,
    description: 'Lista de perguntas e respostas comuns'
  },
  cta: {
    name: 'Chamada para Ação',
    icon: <ArrowRightCircle size={16} />,
    description: 'Botão de chamada para ação com texto destacado'
  },
  video: {
    name: 'Vídeo',
    icon: <Video size={16} />,
    description: 'Reprodutor de vídeo incorporado'
  }
};

export default blockTypeInfo;
