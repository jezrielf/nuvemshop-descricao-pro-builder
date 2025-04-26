
import React, { useState, useMemo } from 'react';
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
import AIContentRecommender from './AIGenerator/AIContentRecommender';
import { SEOToolsMenu } from './SEO/menu/SEOToolsMenu';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { updateBlockImage } from './SEO/utils/imageUtils';
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';
import { useTemplateStore } from '@/store/templates';

const Editor: React.FC = () => {
  const { description, reorderBlocks, updateBlock, createNewDescription } = useEditorStore();
  const { isPremium, isBusiness } = useAuth();
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { applyTemplate } = useTemplateStore();
  
  // Calculate these values once per render
  const isPremiumUser = isPremium();
  const isBusinessUser = isBusiness();
  
  // Only log in development environment
  if (process.env.NODE_ENV === 'development') {
    console.log("Editor component - isPremium:", isPremiumUser);
    console.log("Editor component - isBusiness:", isBusinessUser);
  }
  
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
  };
  
  // Memoize the SEO tools component to prevent unnecessary re-renders
  const seoToolsComponent = useMemo(() => {
    if (description && (isPremiumUser || isBusinessUser)) {
      return <SEOToolsMenu description={description} onUpdateImage={handleUpdateImage} />;
    }
    return null;
  }, [description, isPremiumUser, isBusinessUser]);
  
  if (!description) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8 overflow-auto">
        <Alert className="max-w-md mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Nenhuma descrição selecionada</AlertTitle>
          <AlertDescription>
            Crie uma nova descrição ou selecione uma existente para começar a editar.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col items-center space-y-6 max-w-md w-full">
          <div className="w-full bg-white border rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">Comece com um template</h3>
              <p className="text-sm text-gray-500">Escolha um de nossos templates prontos</p>
            </div>
            <div className="p-4">
              <Button 
                onClick={() => setIsTemplateSelectorOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                Selecionar Template
              </Button>
              <TemplateSelector 
                isOpen={isTemplateSelectorOpen} 
                onClose={() => setIsTemplateSelectorOpen(false)} 
                onSelectTemplate={handleSelectTemplate} 
              />
            </div>
          </div>
          
          <div className="w-full bg-white border rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">Ou crie uma descrição vazia</h3>
              <p className="text-sm text-gray-500">Comece do zero e adicione os blocos que desejar</p>
            </div>
            <div className="p-4 flex justify-center">
              <Button 
                onClick={handleStartDescription}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Iniciar Descrição
              </Button>
            </div>
          </div>
        </div>
        
        <TemplateSelector 
          isOpen={isTemplateSelectorOpen} 
          onClose={() => setIsTemplateSelectorOpen(false)} 
          onSelectTemplate={handleSelectTemplate} 
        />
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 sm:p-4 border-b bg-gray-50 flex flex-wrap justify-between items-center gap-2">
        <Button 
          onClick={() => setIsTemplateSelectorOpen(true)}
          variant="outline" 
          size="sm"
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
      
      <ScrollArea className="flex-1 p-3 sm:p-4 h-[calc(100%-60px)]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-h-[200px]"
              >
                {description && description.blocks.length > 0 ? (
                  description.blocks.map((block, index) => (
                    <Draggable key={block.id} draggableId={block.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4"
                        >
                          <BlockRenderer block={block} />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div className="text-center p-8 text-gray-500">
                    <p>Nenhum bloco adicionado ainda. Comece adicionando um bloco abaixo.</p>
                  </div>
                )}
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
