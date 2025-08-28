import React, { useState, useRef, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Template, Block } from '@/types/editor';
import { TemplateBuilderHeader } from './TemplateBuilderHeader';
import { BlockLibrary } from './BlockLibrary';
import { OutlinePanel } from './OutlinePanel';
import { TemplateCanvas } from './TemplateCanvas';
import { BlockPropertiesPanel } from './BlockPropertiesPanel';
import { TemplateSEOPanel } from './seo/TemplateSEOPanel';
import { generateUniqueId } from '@/utils/idGenerator';
import { useToast } from '@/hooks/use-toast';
import { useUndoRedo } from './hooks/useUndoRedo';
import { templateBuilderLogger } from '@/utils/logger';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [viewportWidth, setViewportWidth] = useState<'mobile' | 'tablet' | 'laptop' | 'full'>('full');
  const [leftPanelTab, setLeftPanelTab] = useState<'library' | 'outline'>('library');
  const [rightPanelTab, setRightPanelTab] = useState<'properties' | 'seo'>('properties');
  const [showSEOPanel, setShowSEOPanel] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize empty template if new
  const currentTemplate: Template = template || {
    id: generateUniqueId(),
    name: 'Novo Template',
    category: 'other',
    blocks: []
  };

  // Initialize undo/redo system
  const {
    canUndo,
    canRedo,
    undo,
    redo,
    pushToHistory,
    reset
  } = useUndoRedo(currentTemplate, onTemplateChange);

  // Update history when template changes from outside
  useEffect(() => {
    if (template) {
      reset(template);
    }
  }, [template?.id, reset]);

  // Handle template changes with history tracking
  const handleTemplateChange = useCallback((updatedTemplate: Template) => {
    onTemplateChange(updatedTemplate);
    pushToHistory(updatedTemplate);
  }, [onTemplateChange, pushToHistory]);

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

    handleTemplateChange(updatedTemplate);
    setSelectedBlockId(newBlock.id);
    
    templateBuilderLogger.blockAdded(blockType, newBlock.id);
    
    toast({
      title: 'Bloco adicionado',
      description: `Bloco ${blockType} foi adicionado ao template`
    });
  };

  const handleBlockUpdate = useCallback((blockId: string, updates: Partial<Block>) => {
    const updatedBlocks = currentTemplate.blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    );

    const updatedTemplate = {
      ...currentTemplate,
      blocks: updatedBlocks
    };

    handleTemplateChange(updatedTemplate);
    templateBuilderLogger.blockUpdated(blockId, updates);
  }, [currentTemplate, handleTemplateChange]);

  const handleBlockDelete = useCallback((blockId: string) => {
    const updatedBlocks = currentTemplate.blocks.filter(block => block.id !== blockId);
    
    const updatedTemplate = {
      ...currentTemplate,
      blocks: updatedBlocks
    };

    handleTemplateChange(updatedTemplate);
    
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }

    templateBuilderLogger.blockDeleted(blockId);

    toast({
      title: 'Bloco removido',
      description: 'O bloco foi removido do template'
    });
  }, [currentTemplate, selectedBlockId, handleTemplateChange, toast]);

  const handleBlockReorder = useCallback((dragIndex: number, hoverIndex: number) => {
    const draggedBlock = currentTemplate.blocks[dragIndex];
    const updatedBlocks = [...currentTemplate.blocks];
    updatedBlocks.splice(dragIndex, 1);
    updatedBlocks.splice(hoverIndex, 0, draggedBlock);

    const updatedTemplate = {
      ...currentTemplate,
      blocks: updatedBlocks
    };

    handleTemplateChange(updatedTemplate);
    templateBuilderLogger.blockReordered(dragIndex, hoverIndex);
  }, [currentTemplate, handleTemplateChange]);

  // Handle block duplication
  const handleBlockDuplicate = useCallback((blockId: string) => {
    const blockToDuplicate = currentTemplate.blocks.find(block => block.id === blockId);
    if (!blockToDuplicate) return;

    const duplicatedBlock = {
      ...blockToDuplicate,
      id: generateUniqueId(),
      title: `${blockToDuplicate.title || blockToDuplicate.type} (Cópia)`
    };

    const blockIndex = currentTemplate.blocks.findIndex(block => block.id === blockId);
    const updatedBlocks = [...currentTemplate.blocks];
    updatedBlocks.splice(blockIndex + 1, 0, duplicatedBlock);

    const updatedTemplate = {
      ...currentTemplate,
      blocks: updatedBlocks
    };

    handleTemplateChange(updatedTemplate);
    setSelectedBlockId(duplicatedBlock.id);

    toast({
      title: 'Bloco duplicado',
      description: 'O bloco foi duplicado com sucesso'
    });
  }, [currentTemplate, handleTemplateChange, toast]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focus is in an input field
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || 
          (e.target as HTMLElement)?.tagName === 'TEXTAREA' ||
          (e.target as HTMLElement)?.contentEditable === 'true') {
        return;
      }

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      if (isCtrlOrCmd && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
        templateBuilderLogger.undoAction();
      } else if (isCtrlOrCmd && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
        templateBuilderLogger.redoAction();
      } else if (isCtrlOrCmd && e.key === 's') {
        e.preventDefault();
        // Save action handled by header
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedBlockId) {
        e.preventDefault();
        handleBlockDelete(selectedBlockId);
      } else if (isCtrlOrCmd && e.key === 'd' && selectedBlockId) {
        e.preventDefault();
        handleBlockDuplicate(selectedBlockId);
      } else if (isCtrlOrCmd && e.key === 'ArrowUp' && selectedBlockId) {
        e.preventDefault();
        const currentIndex = currentTemplate.blocks.findIndex(block => block.id === selectedBlockId);
        if (currentIndex > 0) {
          handleBlockReorder(currentIndex, currentIndex - 1);
        }
      } else if (isCtrlOrCmd && e.key === 'ArrowDown' && selectedBlockId) {
        e.preventDefault();
        const currentIndex = currentTemplate.blocks.findIndex(block => block.id === selectedBlockId);
        if (currentIndex < currentTemplate.blocks.length - 1) {
          handleBlockReorder(currentIndex, currentIndex + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedBlockId, handleBlockDelete, handleBlockDuplicate, handleBlockReorder, currentTemplate.blocks]);

  // Viewport width styles
  const getCanvasMaxWidth = () => {
    switch (viewportWidth) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'laptop': return '1024px';
      default: return '100%';
    }
  };

  const selectedBlock = selectedBlockId 
    ? currentTemplate.blocks.find(block => block.id === selectedBlockId) 
    : null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full">
        <TemplateBuilderHeader 
          template={currentTemplate}
          onTemplateUpdate={handleTemplateChange}
          isNewTemplate={isNewTemplate}
          previewMode={previewMode}
          onPreviewToggle={() => setPreviewMode(!previewMode)}
          viewportWidth={viewportWidth}
          onViewportChange={setViewportWidth}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
          showSEOPanel={showSEOPanel}
          onToggleSEO={() => setShowSEOPanel(!showSEOPanel)}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Library/Outline */}
          {!previewMode && (
            <div className="w-64 border-r border-border bg-background flex-shrink-0">
              <Tabs value={leftPanelTab} onValueChange={(value) => setLeftPanelTab(value as any)}>
                <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
                  <TabsTrigger value="library">Biblioteca</TabsTrigger>
                  <TabsTrigger value="outline">Estrutura</TabsTrigger>
                </TabsList>
                <TabsContent value="library" className="mt-0">
                  <BlockLibrary onAddBlock={handleAddBlock} />
                </TabsContent>
                <TabsContent value="outline" className="mt-0">
                  <OutlinePanel
                    template={currentTemplate}
                    selectedBlockId={selectedBlockId}
                    onBlockSelect={setSelectedBlockId}
                    onBlockUpdate={handleBlockUpdate}
                    onBlockDelete={handleBlockDelete}
                    onBlockReorder={handleBlockReorder}
                    onBlockDuplicate={handleBlockDuplicate}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          {/* Template Canvas */}
          <div className="flex-1 overflow-auto" style={{
            background: previewMode && viewportWidth !== 'full' 
              ? 'linear-gradient(45deg, #f1f5f9 25%, transparent 25%), linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f1f5f9 75%), linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)'
              : undefined,
            backgroundSize: previewMode && viewportWidth !== 'full' ? '20px 20px' : undefined,
            backgroundPosition: previewMode && viewportWidth !== 'full' ? '0 0, 0 10px, 10px -10px, -10px 0px' : undefined
          }}>
            <div 
              className="mx-auto"
              style={{ 
                maxWidth: previewMode ? getCanvasMaxWidth() : '100%',
                transition: 'max-width 0.3s ease'
              }}
            >
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
          </div>
          
          {/* Right Panel - Properties/SEO */}
          {!previewMode && (selectedBlock || showSEOPanel) && (
            <div className="w-80 border-l border-border bg-background flex-shrink-0">
              {showSEOPanel ? (
                <TemplateSEOPanel 
                  template={currentTemplate}
                  onQuickFix={(action, data) => {
                    // Handle SEO quick fixes
                    console.log('SEO Quick Fix:', action, data);
                  }}
                />
              ) : selectedBlock ? (
                <Tabs value={rightPanelTab} onValueChange={(value) => setRightPanelTab(value as any)}>
                  <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
                    <TabsTrigger value="properties">Propriedades</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                  </TabsList>
                  <TabsContent value="properties" className="mt-0">
                    <BlockPropertiesPanel
                      block={selectedBlock}
                      onBlockUpdate={(updates) => handleBlockUpdate(selectedBlock.id, updates)}
                    />
                  </TabsContent>
                  <TabsContent value="seo" className="mt-0">
                    <TemplateSEOPanel 
                      template={currentTemplate}
                      onQuickFix={(action, data) => {
                        // Handle SEO quick fixes
                        console.log('SEO Quick Fix:', action, data);
                      }}
                    />
                  </TabsContent>
                </Tabs>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};