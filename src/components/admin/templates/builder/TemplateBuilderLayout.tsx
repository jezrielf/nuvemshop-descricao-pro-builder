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
    const newBlock: Block = {
      id: generateUniqueId(),
      type: blockType as any,
      title: `Novo ${blockType}`,
      visible: true,
      columns: 'full',
      style: {},
      content: blockType === 'text' ? 'Adicione seu conteúdo aqui...' : undefined,
      heading: blockType === 'hero' ? 'Título Principal' : undefined,
      subheading: blockType === 'hero' ? 'Subtítulo opcional' : undefined,
      items: ['hero', 'features', 'benefits', 'specifications', 'faq'].includes(blockType) ? [] : undefined,
      images: ['gallery', 'image'].includes(blockType) ? [] : undefined,
      image: ['imageText', 'textImage'].includes(blockType) ? { src: '', alt: '' } : undefined,
      buttonText: ['hero', 'cta'].includes(blockType) ? 'Clique aqui' : undefined,
      buttonUrl: ['hero', 'cta'].includes(blockType) ? '#' : undefined,
      videoUrl: blockType === 'video' ? '' : undefined
    };

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