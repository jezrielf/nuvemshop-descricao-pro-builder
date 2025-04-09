
import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import BlockRenderer from './blocks/BlockRenderer';
import AddBlock from './AddBlock';
import TemplateSelector from './TemplateSelector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Editor: React.FC = () => {
  const { description, reorderBlocks } = useEditorStore();
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const fromIndex = result.source.index;
    const toIndex = result.destination.index;
    
    if (fromIndex === toIndex) return;
    
    reorderBlocks(fromIndex, toIndex);
  };
  
  if (!description) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Nenhuma descrição selecionada</AlertTitle>
          <AlertDescription>
            Crie uma nova descrição ou selecione uma existente para começar a editar.
          </AlertDescription>
        </Alert>
        <div className="mt-6 max-w-md w-full">
          <TemplateSelector />
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-gray-50">
        <TemplateSelector />
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {description.blocks.length > 0 ? (
                  description.blocks.map((block, index) => (
                    <Draggable key={block.id} draggableId={block.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
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
