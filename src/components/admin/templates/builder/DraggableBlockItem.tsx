import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Block } from '@/types/editor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, Eye, EyeOff, Trash2, Copy } from 'lucide-react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { generateUniqueId } from '@/utils/idGenerator';

interface DraggableBlockItemProps {
  block: Block;
  index: number;
  isSelected: boolean;
  previewMode: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<Block>) => void;
  onDelete: () => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const DraggableBlockItem: React.FC<DraggableBlockItemProps> = ({
  block,
  index,
  isSelected,
  previewMode,
  onSelect,
  onUpdate,
  onDelete,
  onMove
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: string | symbol | null }>({
    accept: 'blockItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'blockItem',
    item: () => {
      return { id: block.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDuplicate = () => {
    const duplicatedBlock = {
      ...block,
      id: generateUniqueId(),
      title: `${block.title} (Cópia)`
    };
    
    // This would need to be handled by parent component
    console.log('Duplicate block:', duplicatedBlock);
  };

  const handleToggleVisibility = () => {
    onUpdate({ visible: !block.visible });
  };

  drag(drop(ref));

  if (previewMode) {
    return (
      <div className={block.visible ? '' : 'opacity-50'}>
        <BlockRenderer block={block} isPreview={true} />
      </div>
    );
  }

  return (
    <Card 
      ref={ref}
      className={`relative transition-all ${
        isSelected ? 'ring-2 ring-primary' : ''
      } ${isDragging ? 'opacity-50' : ''} ${!block.visible ? 'opacity-60' : ''}`}
      onClick={onSelect}
      data-handler-id={handlerId}
    >
      {/* Block Controls */}
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleToggleVisibility();
          }}
          className="h-8 w-8 p-0"
        >
          {block.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDuplicate();
          }}
          className="h-8 w-8 p-0"
        >
          <Copy className="h-3 w-3" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Drag Handle */}
      <div className="absolute left-2 top-2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="p-1 bg-background/90 backdrop-blur-sm rounded">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Block Content */}
      <div className="group p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {block.type}
          </span>
        </div>
        
        <div className="pointer-events-none">
          <BlockRenderer block={block} isPreview={true} />
        </div>
      </div>
    </Card>
  );
};