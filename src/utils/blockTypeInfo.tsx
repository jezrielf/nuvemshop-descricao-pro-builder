
import { BlockType } from '@/types/editor';
import React from 'react';
import {
  Type, 
  ImageIcon, 
  Columns, 
  Image, 
  Grid, 
  LayoutGrid,
  HelpCircle,
  Award,
  ClipboardList,
  CircleDollarSign,
  Video,
  MessageSquare,
} from 'lucide-react';

// Define block type information for UI display
export const blockTypeInfo: Record<BlockType, { name: string; icon: React.ReactNode; description: string }> = {
  hero: {
    name: 'Hero',
    icon: <LayoutGrid />,
    description: 'Seção principal com título, subtítulo e imagem de destaque'
  },
  text: {
    name: 'Texto',
    icon: <Type />,
    description: 'Bloco de texto rico para conteúdo detalhado'
  },
  features: {
    name: 'Características',
    icon: <Columns />,
    description: 'Lista de características do produto em colunas'
  },
  benefits: {
    name: 'Benefícios',
    icon: <Award />,
    description: 'Destaque os principais benefícios do produto'
  },
  specifications: {
    name: 'Especificações',
    icon: <ClipboardList />,
    description: 'Lista detalhada de especificações técnicas'
  },
  image: {
    name: 'Imagem',
    icon: <ImageIcon />,
    description: 'Imagem única com legenda opcional'
  },
  gallery: {
    name: 'Galeria',
    icon: <Grid />,
    description: 'Múltiplas imagens em uma galeria'
  },
  imageText: {
    name: 'Imagem + Texto',
    icon: <Image />,
    description: 'Imagem à esquerda com texto à direita'
  },
  textImage: {
    name: 'Texto + Imagem',
    icon: <Image />,
    description: 'Texto à esquerda com imagem à direita'
  },
  faq: {
    name: 'Perguntas Frequentes',
    icon: <HelpCircle />,
    description: 'Lista de perguntas e respostas comuns'
  },
  cta: {
    name: 'Chamada para Ação',
    icon: <CircleDollarSign />,
    description: 'Seção com botão de ação destacado'
  },
  video: {
    name: 'Vídeo',
    icon: <Video />,
    description: 'Incorporar um vídeo do YouTube ou Vimeo'
  },
  videoText: {
    name: 'Vídeo + Texto',
    icon: <Video />,
    description: 'Vídeo à esquerda com texto à direita'
  },
  textVideo: {
    name: 'Texto + Vídeo',
    icon: <MessageSquare />,
    description: 'Texto à esquerda com vídeo à direita'
  }
};
