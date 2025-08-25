import React from 'react';
import { useDrag } from 'react-dnd';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { 
  Type, 
  Image, 
  Star, 
  CheckCircle, 
  Settings, 
  Camera, 
  Play, 
  Users,
  FileText,
  HelpCircle,
  MousePointer
} from 'lucide-react';

interface BlockLibraryProps {
  onAddBlock: (blockType: string) => void;
}

interface BlockDefinition {
  type: string;
  label: string;
  description: string;
  icon: React.ElementType;
  category: 'content' | 'media' | 'layout';
}

const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: 'hero',
    label: 'Hero',
    description: 'Seção principal com título e CTA',
    icon: Star,
    category: 'layout'
  },
  {
    type: 'text',
    label: 'Texto',
    description: 'Bloco de texto simples',
    icon: Type,
    category: 'content'
  },
  {
    type: 'features',
    label: 'Características',
    description: 'Lista de características',
    icon: CheckCircle,
    category: 'content'
  },
  {
    type: 'benefits',
    label: 'Benefícios',
    description: 'Lista de benefícios',
    icon: Users,
    category: 'content'
  },
  {
    type: 'specifications',
    label: 'Especificações',
    description: 'Tabela de especificações',
    icon: Settings,
    category: 'content'
  },
  {
    type: 'image',
    label: 'Imagem',
    description: 'Imagem única',
    icon: Image,
    category: 'media'
  },
  {
    type: 'gallery',
    label: 'Galeria',
    description: 'Galeria de imagens',
    icon: Camera,
    category: 'media'
  },
  {
    type: 'imageText',
    label: 'Imagem + Texto',
    description: 'Imagem à esquerda, texto à direita',
    icon: FileText,
    category: 'layout'
  },
  {
    type: 'textImage',
    label: 'Texto + Imagem',
    description: 'Texto à esquerda, imagem à direita',
    icon: FileText,
    category: 'layout'
  },
  {
    type: 'video',
    label: 'Vídeo',
    description: 'Player de vídeo',
    icon: Play,
    category: 'media'
  },
  {
    type: 'faq',
    label: 'FAQ',
    description: 'Perguntas frequentes',
    icon: HelpCircle,
    category: 'content'
  },
  {
    type: 'cta',
    label: 'Call to Action',
    description: 'Botão de ação',
    icon: MousePointer,
    category: 'layout'
  }
];

const CATEGORY_LABELS = {
  content: 'Conteúdo',
  media: 'Mídia',
  layout: 'Layout'
};

interface DraggableBlockProps {
  block: BlockDefinition;
  onAddBlock: (blockType: string) => void;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ block, onAddBlock }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { blockType: block.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const Icon = block.icon;

  return (
    <Card
      ref={drag}
      className={`p-3 cursor-pointer transition-all hover:bg-accent/50 border-dashed border-2 ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={() => onAddBlock(block.type)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 bg-primary/10 rounded-md">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium truncate">{block.label}</h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {block.description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export const BlockLibrary: React.FC<BlockLibraryProps> = ({ onAddBlock }) => {
  const blocksByCategory = BLOCK_DEFINITIONS.reduce((acc, block) => {
    if (!acc[block.category]) acc[block.category] = [];
    acc[block.category].push(block);
    return acc;
  }, {} as Record<string, BlockDefinition[]>);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-sm">Biblioteca de Blocos</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Arraste os blocos para o canvas ou clique para adicionar
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {Object.entries(blocksByCategory).map(([category, blocks]) => (
            <div key={category}>
              <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
                {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
              </h4>
              <div className="space-y-2">
                {blocks.map((block) => (
                  <DraggableBlock
                    key={block.type}
                    block={block}
                    onAddBlock={onAddBlock}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};