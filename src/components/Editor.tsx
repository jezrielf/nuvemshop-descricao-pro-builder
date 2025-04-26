
import React, { useState, useMemo, memo } from 'react';
import { useEditorStore } from '@/store/editor';
import BlockRenderer from './blocks/BlockRenderer';
import AddBlock from './AddBlock';
import TemplateSelector from './TemplateSelector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Plus } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { SEOToolsMenu } from './SEO/menu/SEOToolsMenu';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { updateBlockImage } from './SEO/utils/imageUtils';
import { Template } from '@/types/editor';
import { useTemplateStore } from '@/store/templates';

// Component for rendering individual blocks with memoization
const MemoizedBlockRenderer = memo(({ block, index }: any) => {
  return (
    <Draggable key={block.id} draggableId={block.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3"
        >
          <BlockRenderer block={block} />
        </div>
      )}
    </Draggable>
  );
});

// Empty state component
const EmptyEditorState = memo(({ onStartDescription, onOpenTemplateSelector }: any) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 overflow-auto">
      <Alert className="max-w-md mb-5">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Nenhuma descrição selecionada</AlertTitle>
        <AlertDescription>
          Crie uma nova descrição ou selecione uma existente para começar a editar.
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col items-center space-y-5 max-w-md w-full">
        <div className="w-full bg-white border rounded-lg overflow-hidden">
          <div className="p-3 border-b">
            <h3 className="font-medium text-sm">Comece com um template</h3>
            <p className="text-xs text-gray-500">Escolha um de nossos templates prontos</p>
          </div>
          <div className="p-3">
            <Button 
              onClick={onOpenTemplateSelector}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full text-xs"
              size="sm"
            >
              Selecionar Template
            </Button>
          </div>
        </div>
        
        <div className="w-full bg-white border rounded-lg overflow-hidden">
          <div className="p-3 border-b">
            <h3 className="font-medium text-sm">Ou crie uma descrição vazia</h3>
            <p className="text-xs text-gray-500">Comece do zero e adicione os blocos que desejar</p>
          </div>
          <div className="p-3 flex justify-center">
            <Button 
              onClick={onStartDescription}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
              size="sm"
            >
              <Plus className="h-3 w-3 mr-1" />
              Iniciar Descrição
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

// BlocksList component with memoization
const BlocksList = memo(({ blocks }: { blocks: any[] }) => {
  if (!blocks?.length) {
    return (
      <div className="text-center p-6 text-gray-500 text-sm">
        <p>Nenhum bloco adicionado ainda. Comece adicionando um bloco abaixo.</p>
      </div>
    );
  }

  return blocks.map((block, index) => (
    <MemoizedBlockRenderer key={block.id} block={block} index={index} />
  ));
});

const Editor: React.FC = () => {
  const { description, reorderBlocks, updateBlock, createNewDescription } = useEditorStore();
  const { isPremium, isBusiness } = useAuth();
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { applyTemplate } = useTemplateStore();
  
  // Calculate these values once per render
  const isPremiumUser = isPremium();
  const isBusinessUser = isBusiness();
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const fromIndex = result.source.index;
    const toIndex = result.destination.index;
    
    if (fromIndex === toIndex) return;
    
    reorderBlocks(fromIndex, toIndex);
  };
  
  const handleStartDescription = () => {
    createNewDescription("Nova descrição");
  };
  
  const handleUpdateImage = (blockId: string, imageType: string, newImageUrl: string) => {
    if (description) {
      updateBlockImage(blockId, imageType, newImageUrl, updateBlock, description);
    }
  };
  
  const handleSelectTemplate = (template: Template) => {
    applyTemplate(template);
    setIsTemplateSelectorOpen(false);
  };
  
  // Memoize the SEO tools component to prevent unnecessary re-renders
  const seoToolsComponent = useMemo(() => {
    if (description && (isPremiumUser || isBusinessUser)) {
      return <SEOToolsMenu description={description} onUpdateImage={handleUpdateImage} />;
    }
    return null;
  }, [description, isPremiumUser, isBusinessUser, handleUpdateImage]);
  
  if (!description) {
    return (
      <>
        <EmptyEditorState 
          onStartDescription={handleStartDescription}
          onOpenTemplateSelector={() => setIsTemplateSelectorOpen(true)}
        />
        <TemplateSelector 
          isOpen={isTemplateSelectorOpen} 
          onClose={() => setIsTemplateSelectorOpen(false)} 
          onSelectTemplate={handleSelectTemplate} 
        />
      </>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-2 sm:p-3 border-b bg-gray-50 flex flex-wrap justify-between items-center gap-2">
        <Button 
          onClick={() => setIsTemplateSelectorOpen(true)}
          variant="outline" 
          size="sm"
          className="text-xs"
        >
          Selecionar Template
        </Button>
        <TemplateSelector 
          isOpen={isTemplateSelectorOpen} 
          onClose={() => setIsTemplateSelectorOpen(false)} 
          onSelectTemplate={handleSelectTemplate} 
        />
        {seoToolsComponent}
      </div>
      
      <ScrollArea className="flex-1 p-2 sm:p-3 h-[calc(100%-52px)]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-h-[100px]"
              >
                <BlocksList blocks={description.blocks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
        <AddBlock />
      </ScrollArea>
    </div>
  );
};

export default Editor;
