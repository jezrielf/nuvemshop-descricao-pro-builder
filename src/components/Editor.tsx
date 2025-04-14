
import React from 'react';
import { useEditorStore } from '@/store/editor';
import BlockRenderer from './blocks/BlockRenderer';
import AddBlock from './AddBlock';
import TemplateSelector from './TemplateSelector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Sparkles, Lock } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AIDescriptionGenerator from './AIGenerator/AIDescriptionGenerator';
import SEOTools from './SEO/SEOTools';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Editor: React.FC = () => {
  const { description, reorderBlocks } = useEditorStore();
  const { isPremium, isBusiness } = useAuth();
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Log the role information for debugging
  console.log("Editor component - isPremium:", isPremium());
  console.log("Editor component - isBusiness:", isBusiness());
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const fromIndex = result.source.index;
    const toIndex = result.destination.index;
    
    if (fromIndex === toIndex) return;
    
    reorderBlocks(fromIndex, toIndex);
  };
  
  const handleUpgradePlan = () => {
    navigate('/plans');
  };
  
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
              <TemplateSelector />
            </div>
          </div>
          
          <div className="w-full bg-white border rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">Ou crie uma descrição com IA</h3>
              <p className="text-sm text-gray-500">Deixe nossa IA criar uma descrição completa para você</p>
            </div>
            <div className="p-4 flex justify-center">
              {isPremium() || isBusiness() ? (
                <Button 
                  onClick={() => setIsAIGeneratorOpen(true)}
                  className="border-yellow-400 bg-gradient-to-r from-yellow-50 to-white"
                >
                  <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                  Gerar Descrição com IA
                </Button>
              ) : (
                <Button 
                  onClick={handleUpgradePlan}
                  variant="outline"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Recurso do Plano Premium ou Empresarial
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <AIDescriptionGenerator 
          isOpen={isAIGeneratorOpen} 
          onOpenChange={setIsAIGeneratorOpen} 
        />
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 sm:p-4 border-b bg-gray-50 flex flex-wrap justify-between items-center gap-2">
        <TemplateSelector />
        {description && (isPremium() || isBusiness()) && <SEOTools description={description} />}
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
