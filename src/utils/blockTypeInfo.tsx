
import React from 'react';
import { BlockType } from '@/types/editor';
import { Layout, Type, Image, ImagePlus, FileText, List, BarChart, MessageSquare, Target } from 'lucide-react';

export const blockTypeInfo: Record<BlockType, { name: string; icon: React.ReactNode; description: string }> = {
  hero: {
    name: 'Banner Principal',
    icon: <Layout className="h-5 w-5" />,
    description: 'Seção de destaque com título, subtítulo e botão opcional'
  },
  features: {
    name: 'Recursos',
    icon: <BarChart className="h-5 w-5" />,
    description: 'Lista de recursos ou características do produto'
  },
  benefits: {
    name: 'Benefícios',
    icon: <List className="h-5 w-5" />,
    description: 'Destaque os principais benefícios do produto'
  },
  specifications: {
    name: 'Especificações',
    icon: <FileText className="h-5 w-5" />,
    description: 'Lista técnica de especificações do produto'
  },
  text: {
    name: 'Texto',
    icon: <Type className="h-5 w-5" />,
    description: 'Bloco de texto com formatação livre'
  },
  image: {
    name: 'Imagem',
    icon: <Image className="h-5 w-5" />,
    description: 'Imagem única com legenda opcional'
  },
  gallery: {
    name: 'Galeria',
    icon: <ImagePlus className="h-5 w-5" />,
    description: 'Conjunto de imagens em formato de galeria'
  },
  imageText: {
    name: 'Imagem + Texto',
    icon: <Layout className="h-5 w-5" />,
    description: 'Imagem à esquerda com texto à direita'
  },
  textImage: {
    name: 'Texto + Imagem',
    icon: <Layout className="h-5 w-5" />,
    description: 'Texto à esquerda com imagem à direita'
  },
  faq: {
    name: 'Perguntas Frequentes',
    icon: <MessageSquare className="h-5 w-5" />,
    description: 'Lista de perguntas e respostas comuns'
  },
  cta: {
    name: 'Chamada para Ação',
    icon: <Target className="h-5 w-5" />,
    description: 'Bloco de conversão com botão de destaque'
  }
};
