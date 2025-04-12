
import { BlockType } from '@/types/editor';
import { 
  LayoutDashboard, 
  Text, 
  Image, 
  Columns, 
  ListChecks, 
  ListOrdered, 
  ImagePlus, 
  LayoutList, 
  HelpCircle,
  Lightbulb,
  Sparkles
} from 'lucide-react';

interface BlockTypeInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultColumns: number;
  name: string; // Add this property
}

export const blockTypeInfo: Record<BlockType, BlockTypeInfo> = {
  text: {
    title: 'Texto',
    description: 'Adicione um bloco de texto',
    icon: <Text className="h-6 w-6 text-gray-500" />,
    defaultColumns: 1,
    name: 'Texto'
  },
  hero: {
    title: 'Hero',
    description: 'Adicione um bloco de hero',
    icon: <LayoutDashboard className="h-6 w-6 text-blue-500" />,
    defaultColumns: 1,
    name: 'Hero'
  },
  features: {
    title: 'Recursos',
    description: 'Adicione um bloco de recursos',
    icon: <ListChecks className="h-6 w-6 text-green-500" />,
    defaultColumns: 3,
    name: 'Recursos'
  },
  benefits: {
    title: 'Benefícios',
    description: 'Adicione um bloco de benefícios',
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
    defaultColumns: 2,
    name: 'Benefícios'
  },
  image: {
    title: 'Imagem',
    description: 'Adicione um bloco de imagem',
    icon: <Image className="h-6 w-6 text-orange-500" />,
    defaultColumns: 1,
    name: 'Imagem'
  },
  gallery: {
    title: 'Galeria',
    description: 'Adicione um bloco de galeria de imagens',
    icon: <Columns className="h-6 w-6 text-purple-500" />,
    defaultColumns: 2,
    name: 'Galeria'
  },
  imageText: {
    title: 'Imagem com Texto',
    description: 'Adicione um bloco com imagem e texto lado a lado',
    icon: <ImagePlus className="h-6 w-6 text-red-500" />,
    defaultColumns: 1,
    name: 'Imagem com Texto'
  },
  textImage: {
    title: 'Texto com Imagem',
    description: 'Adicione um bloco com texto e imagem lado a lado',
    icon: <LayoutList className="h-6 w-6 text-teal-500" />,
    defaultColumns: 1,
    name: 'Texto com Imagem'
  },
  faq: {
    title: 'FAQ',
    description: 'Adicione um bloco de perguntas frequentes',
    icon: <HelpCircle className="h-6 w-6 text-indigo-500" />,
    defaultColumns: 1,
    name: 'FAQ'
  },
  cta: {
    title: 'CTA',
    description: 'Adicione um bloco de chamada para ação',
    icon: <ListOrdered className="h-6 w-6 text-pink-500" />,
    defaultColumns: 1,
    name: 'CTA'
  },
  specifications: {
    title: 'Especificações',
    description: 'Adicione um bloco de especificações técnicas',
    icon: <ListChecks className="h-6 w-6 text-gray-500" />,
    defaultColumns: 1,
    name: 'Especificações'
  },
  ai: {
    title: 'Conteúdo com IA',
    description: 'Crie conteúdo automaticamente com IA',
    icon: <Sparkles className="h-6 w-6 text-purple-500" />,
    defaultColumns: 1,
    name: 'Conteúdo com IA'
  },
};
