
import { BlockType } from '@/types/editor';

export function getBlockTypeDisplayName(type: BlockType): string {
  const displayNames: Record<BlockType, string> = {
    hero: 'Banner Principal',
    text: 'Texto',
    features: 'Recursos',
    benefits: 'Benefícios',
    specifications: 'Especificações',
    image: 'Imagem',
    gallery: 'Galeria',
    imageText: 'Imagem e Texto',
    textImage: 'Texto e Imagem',
    faq: 'Perguntas Frequentes',
    cta: 'Chamada para Ação',
    video: 'Vídeo',
    videoText: 'Vídeo e Texto',
    textVideo: 'Texto e Vídeo',
    carousel: 'Carrossel'
  };
  
  return displayNames[type] || type;
}

export function getBlockDescription(type: BlockType): string {
  const descriptions: Record<BlockType, string> = {
    hero: 'Banner principal com imagem, título e chamada para ação',
    text: 'Bloco de texto para conteúdo informativo',
    features: 'Lista de recursos do produto',
    benefits: 'Lista de benefícios do produto',
    specifications: 'Especificações técnicas do produto',
    image: 'Imagem única em destaque',
    gallery: 'Galeria de múltiplas imagens',
    imageText: 'Imagem seguida de texto',
    textImage: 'Texto seguido de imagem',
    faq: 'Perguntas frequentes em formato acordeão',
    cta: 'Chamada para ação com botão',
    video: 'Vídeo incorporado',
    videoText: 'Vídeo seguido de texto',
    textVideo: 'Texto seguido de vídeo',
    carousel: 'Carrossel de imagens animado'
  };
  
  return descriptions[type] || '';
}
