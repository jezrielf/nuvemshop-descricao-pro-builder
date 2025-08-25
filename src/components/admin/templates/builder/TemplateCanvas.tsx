import React, { forwardRef } from 'react';
import { useDrop } from 'react-dnd';
import { Template, Block } from '@/types/editor';
import { DraggableBlockItem } from './DraggableBlockItem';
import { generateUniqueId } from '@/utils/idGenerator';

interface TemplateCanvasProps {
  template: Template;
  selectedBlockId: string | null;
  onBlockSelect: (blockId: string) => void;
  onBlockUpdate: (blockId: string, updates: Partial<Block>) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockReorder: (dragIndex: number, hoverIndex: number) => void;
  previewMode: boolean;
}

export const TemplateCanvas = forwardRef<HTMLDivElement, TemplateCanvasProps>(({
  template,
  selectedBlockId,
  onBlockSelect,
  onBlockUpdate,
  onBlockDelete,
  onBlockReorder,
  previewMode
}, ref) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'block',
    drop: (item: { blockType: string }) => {
      handleAddBlock(item.blockType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleAddBlock = (blockType: string) => {
    const baseBlock = {
      id: generateUniqueId(),
      type: blockType as any,
      title: `Novo ${blockType}`,
      visible: true,
      columns: 'full' as const,
      style: {}
    };

    let newBlock: Block;

    switch (blockType) {
      case 'text':
        newBlock = {
          ...baseBlock,
          type: 'text',
          heading: 'Título do Texto',
          content: 'Adicione seu conteúdo aqui...'
        };
        break;
      case 'hero':
        newBlock = {
          ...baseBlock,
          type: 'hero',
          heading: 'Título Principal',
          subheading: 'Subtítulo opcional',
          buttonText: 'Clique aqui',
          buttonUrl: '#'
        };
        break;
      case 'features':
        newBlock = {
          ...baseBlock,
          type: 'features',
          heading: 'Características',
          features: []
        };
        break;
      case 'benefits':
        newBlock = {
          ...baseBlock,
          type: 'benefits',
          heading: 'Benefícios',
          benefits: []
        };
        break;
      case 'specifications':
        newBlock = {
          ...baseBlock,
          type: 'specifications',
          heading: 'Especificações',
          specs: []
        };
        break;
      case 'faq':
        newBlock = {
          ...baseBlock,
          type: 'faq',
          heading: 'Perguntas Frequentes',
          questions: []
        };
        break;
      case 'image':
        newBlock = {
          ...baseBlock,
          type: 'image',
          src: '',
          alt: ''
        };
        break;
      case 'gallery':
        newBlock = {
          ...baseBlock,
          type: 'gallery',
          heading: 'Galeria',
          images: []
        };
        break;
      case 'imageText':
        newBlock = {
          ...baseBlock,
          type: 'imageText',
          heading: 'Imagem e Texto',
          content: 'Adicione seu conteúdo aqui...',
          image: { src: '', alt: '' }
        };
        break;
      case 'textImage':
        newBlock = {
          ...baseBlock,
          type: 'textImage',
          heading: 'Texto e Imagem',
          content: 'Adicione seu conteúdo aqui...',
          image: { src: '', alt: '' }
        };
        break;
      case 'video':
        newBlock = {
          ...baseBlock,
          type: 'video',
          videoUrl: ''
        };
        break;
      case 'cta':
        newBlock = {
          ...baseBlock,
          type: 'cta',
          heading: 'Call to Action',
          content: 'Descrição do CTA',
          buttonText: 'Clique aqui',
          buttonUrl: '#'
        };
        break;
      default:
        newBlock = baseBlock as Block;
    }

    const updatedBlocks = [...template.blocks, newBlock];
    const updatedTemplate = { ...template, blocks: updatedBlocks };
    
    // This would normally call onTemplateChange, but we'll handle it through parent
    console.log('New block added:', newBlock);
  };

  const dropRef = (node: HTMLDivElement) => {
    drop(node);
    if (ref && typeof ref === 'function') {
      ref(node);
    } else if (ref && 'current' in ref) {
      ref.current = node;
    }
  };

  return (
    <div 
      ref={dropRef}
      className={`min-h-full p-6 bg-background transition-colors ${
        isOver && canDrop ? 'bg-primary/5 border-2 border-dashed border-primary' : ''
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {template.blocks.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-muted/30 rounded-lg p-12 border-2 border-dashed border-muted-foreground/25">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Canvas vazio
              </h3>
              <p className="text-sm text-muted-foreground">
                Arraste blocos da biblioteca para começar a construir seu template
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {template.blocks.map((block, index) => (
              <DraggableBlockItem
                key={block.id}
                block={block}
                index={index}
                isSelected={selectedBlockId === block.id}
                previewMode={previewMode}
                onSelect={() => onBlockSelect(block.id)}
                onUpdate={(updates) => onBlockUpdate(block.id, updates)}
                onDelete={() => onBlockDelete(block.id)}
                onMove={onBlockReorder}
              />
            ))}
          </div>
        )}
        
        {/* Drop zone indicator */}
        {isOver && canDrop && (
          <div className="mt-4 p-4 border-2 border-dashed border-primary bg-primary/5 rounded-lg">
            <p className="text-center text-sm text-primary">
              Solte aqui para adicionar o bloco
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

TemplateCanvas.displayName = 'TemplateCanvas';