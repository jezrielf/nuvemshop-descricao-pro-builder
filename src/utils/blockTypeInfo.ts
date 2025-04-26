
import React from 'react';
import {
  Layout,
  Type,
  ImageIcon,
  AlignLeft,
  ListTodo,
  Columns,
  Table2,
  HelpCircle,
  Award,
  Megaphone,
  Images,
  Image,
  Video,
  FileText,
  SplitSquareVertical
} from 'lucide-react';
import { BlockType } from '@/types/editor';

type BlockTypeInfo = {
  name: string;
  description: string;
  icon: React.ReactNode;
};

export const blockTypeInfo: Record<BlockType, BlockTypeInfo> = {
  hero: {
    name: 'Hero',
    description: 'Seção principal com título, descrição e imagem',
    icon: React.createElement(Layout, { size: 24 })
  },
  text: {
    name: 'Texto',
    description: 'Bloco de texto com formatação rica',
    icon: React.createElement(AlignLeft, { size: 24 })
  },
  features: {
    name: 'Características',
    description: 'Lista de características do produto',
    icon: React.createElement(ListTodo, { size: 24 })
  },
  benefits: {
    name: 'Benefícios',
    description: 'Destaque os benefícios do produto',
    icon: React.createElement(Award, { size: 24 })
  },
  specifications: {
    name: 'Especificações',
    description: 'Detalhes técnicos do produto',
    icon: React.createElement(Table2, { size: 24 })
  },
  image: {
    name: 'Imagem',
    description: 'Uma única imagem com legenda',
    icon: React.createElement(ImageIcon, { size: 24 })
  },
  gallery: {
    name: 'Galeria',
    description: 'Conjunto de imagens em grade',
    icon: React.createElement(Images, { size: 24 })
  },
  imageText: {
    name: 'Imagem + Texto',
    description: 'Imagem com texto ao lado',
    icon: React.createElement(Image, { size: 24 })
  },
  textImage: {
    name: 'Texto + Imagem',
    description: 'Texto com imagem ao lado',
    icon: React.createElement(FileText, { size: 24 })
  },
  faq: {
    name: 'Perguntas Frequentes',
    description: 'Lista de perguntas e respostas',
    icon: React.createElement(HelpCircle, { size: 24 })
  },
  cta: {
    name: 'Chamada para Ação',
    description: 'Botão e texto para conversão',
    icon: React.createElement(Megaphone, { size: 24 })
  },
  video: {
    name: 'Vídeo',
    description: 'Incorpore um vídeo do YouTube',
    icon: React.createElement(Video, { size: 24 })
  },
  videoText: {
    name: 'Vídeo + Texto',
    description: 'Vídeo com texto ao lado',
    icon: React.createElement(SplitSquareVertical, { size: 24 })
  },
  textVideo: {
    name: 'Texto + Vídeo',
    description: 'Texto com vídeo ao lado',
    icon: React.createElement(Columns, { size: 24 })
  },
  carousel: {
    name: 'Carrossel',
    description: 'Imagens em formato de carrossel',
    icon: React.createElement(Images, { size: 24 })
  }
};

// Add backward compatibility functions
export function getBlockTypeDisplayName(type: BlockType): string {
  return blockTypeInfo[type]?.name || type;
}

export function getBlockDescription(type: BlockType): string {
  return blockTypeInfo[type]?.description || '';
}
