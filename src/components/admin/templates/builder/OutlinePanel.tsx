import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Search, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  GripVertical,
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
import { Template, Block } from '@/types/editor';

interface OutlinePanelProps {
  template: Template;
  selectedBlockId: string | null;
  onBlockSelect: (blockId: string) => void;
  onBlockUpdate: (blockId: string, updates: Partial<Block>) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockReorder: (dragIndex: number, hoverIndex: number) => void;
  onBlockDuplicate: (blockId: string) => void;
}

const BLOCK_ICONS: Record<string, React.ElementType> = {
  text: Type,
  hero: Star,
  features: CheckCircle,
  benefits: Users,
  specifications: Settings,
  image: Image,
  gallery: Camera,
  imageText: FileText,
  textImage: FileText,
  video: Play,
  faq: HelpCircle,
  cta: MousePointer
};

interface DraggableOutlineItemProps {
  block: Block;
  index: number;
  isSelected: boolean;
  searchQuery: string;
  onSelect: () => void;
  onToggleVisible: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableOutlineItem: React.FC<DraggableOutlineItemProps> = ({
  block,
  index,
  isSelected,
  searchQuery,
  onSelect,
  onToggleVisible,
  onDuplicate,
  onDelete,
  onMove
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'outline-item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'outline-item',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        onMove(item.index, index);
        item.index = index;
      }
    },
  }));

  const Icon = BLOCK_ICONS[block.type] || Type;
  
  // Filter by search query
  const blockTitle = block.title || `${block.type} block`;
  const matchesSearch = searchQuery === '' || 
    blockTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.type.toLowerCase().includes(searchQuery.toLowerCase());

  if (!matchesSearch) return null;

  return (
    <Card
      ref={(node) => drag(drop(node))}
      className={`p-3 cursor-pointer transition-all border ${
        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent/50'
      } ${isDragging ? 'opacity-50' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2">
        <GripVertical className="h-3 w-3 text-muted-foreground" />
        <div className="flex-shrink-0 p-1 bg-primary/10 rounded">
          <Icon className="h-3 w-3 text-primary" />
        </div>
        <span className="flex-1 text-sm font-medium truncate">
          {blockTitle}
        </span>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisible();
            }}
          >
            {block.visible ? (
              <Eye className="h-3 w-3" />
            ) : (
              <EyeOff className="h-3 w-3 text-muted-foreground" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const OutlinePanel: React.FC<OutlinePanelProps> = ({
  template,
  selectedBlockId,
  onBlockSelect,
  onBlockUpdate,
  onBlockDelete,
  onBlockReorder,
  onBlockDuplicate
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b space-y-3">
        <h3 className="font-semibold text-sm">Estrutura do Template</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar blocos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-8"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {template.blocks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                Nenhum bloco adicionado ainda
              </p>
            </div>
          ) : (
            template.blocks.map((block, index) => (
              <DraggableOutlineItem
                key={block.id}
                block={block}
                index={index}
                isSelected={selectedBlockId === block.id}
                searchQuery={searchQuery}
                onSelect={() => onBlockSelect(block.id)}
                onToggleVisible={() => 
                  onBlockUpdate(block.id, { visible: !block.visible })
                }
                onDuplicate={() => onBlockDuplicate(block.id)}
                onDelete={() => onBlockDelete(block.id)}
                onMove={onBlockReorder}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};