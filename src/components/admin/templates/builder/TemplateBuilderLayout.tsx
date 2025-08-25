import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Template, Block } from '@/types/editor';
import { TemplateBuilderHeader } from './TemplateBuilderHeader';
import { BlockLibrary } from './BlockLibrary';
import { TemplateCanvas } from './TemplateCanvas';
import { BlockPropertiesPanel } from './BlockPropertiesPanel';
import { generateUniqueId } from '@/utils/idGenerator';
import { useToast } from '@/hooks/use-toast';

interface TemplateBuilderLayoutProps {
  template: Template | null;
  onTemplateChange: (template: Template) => void;
  isNewTemplate: boolean;
}

export const TemplateBuilderLayout: React.FC<TemplateBuilderLayoutProps> = ({
  template,
  onTemplateChange,
  isNewTemplate
}) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize empty template if new
  const currentTemplate: Template = template || {
    id: generateUniqueId(),
    name: 'Novo Template',
    category: 'other',
    blocks: []
  };

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

    const updatedTemplate = {
      ...currentTemplate,
      blocks: [...currentTemplate.blocks, newBlock]
    };

    onTemplateChange(updatedTemplate);
    setSelectedBlockId(newBlock.id);
    
    toast({
      title: 'Bloco adicionado',
      description: `Bloco ${blockType} foi adicionado ao template`
    });
  };

  const handleBlockUpdate = (blockId: string, updates: Partial<Block>) => {
    const updatedBlocks = currentTemplate.blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    );

    const updatedTemplate = {
      ...currentTemplate,
      blocks: updatedBlocks
    };

    onTemplateChange(updatedTemplate);
  };

  const handleBlockDelete = (blockId: string) => {
    const updatedBlocks = currentTemplate.blocks.filter(block => block.id !== blockId);
    
    const updatedTemplate = {
      ...currentTemplate,
      blocks: updatedBlocks
    };

    onTemplateChange(updatedTemplate);
    
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }

    toast({
      title: 'Bloco removido',
      description: 'O bloco foi removido do template'
    });
  };

  const handleBlockReorder = (dragIndex: number, hoverIndex: number) => {
    const draggedBlock = currentTemplate.blocks[dragIndex];
    const updatedBlocks = [...currentTemplate.blocks];
    updatedBlocks.splice(dragIndex, 1);
    updatedBlocks.splice(hoverIndex, 0, draggedBlock);

    const updatedTemplate = {
      ...currentTemplate,
      blocks: updatedBlocks
    };

    onTemplateChange(updatedTemplate);
  };

  const selectedBlock = selectedBlockId 
    ? currentTemplate.blocks.find(block => block.id === selectedBlockId) 
    : null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full">
        <TemplateBuilderHeader 
          template={currentTemplate}
          onTemplateUpdate={onTemplateChange}
          isNewTemplate={isNewTemplate}
          previewMode={previewMode}
          onPreviewToggle={() => setPreviewMode(!previewMode)}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Block Library */}
          {!previewMode && (
            <div className="w-64 border-r border-border bg-background flex-shrink-0">
              <BlockLibrary onAddBlock={handleAddBlock} />
            </div>
          )}
          
          {/* Template Canvas */}
          <div className="flex-1 overflow-auto">
            <TemplateCanvas
              ref={canvasRef}
              template={currentTemplate}
              selectedBlockId={selectedBlockId}
              onBlockSelect={setSelectedBlockId}
              onBlockUpdate={handleBlockUpdate}
              onBlockDelete={handleBlockDelete}
              onBlockReorder={handleBlockReorder}
              previewMode={previewMode}
            />
          </div>
          
          {/* Properties Panel */}
          {!previewMode && selectedBlock && (
            <div className="w-80 border-l border-border bg-background flex-shrink-0">
              <BlockPropertiesPanel
                block={selectedBlock}
                onBlockUpdate={(updates) => handleBlockUpdate(selectedBlock.id, updates)}
              />
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};