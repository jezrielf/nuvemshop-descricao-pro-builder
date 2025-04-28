
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ScrollArea } from '@/components/ui/scroll-area';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import AddBlock from '@/components/AddBlock';
import TemplateSelector from '@/components/templates/TemplateSelector';
import { SEOToolsMenu } from '@/components/SEO/menu/SEOToolsMenu';
import { ProductDescription } from '@/types/editor';

interface EditorContentProps {
  description: ProductDescription;
  isPremiumUser: boolean;
  isBusinessUser: boolean;
  onDragEnd: (result: any) => void;
  onUpdateImage: (blockId: string, imageType: string, newImageUrl: string) => void;
}

const EditorContent: React.FC<EditorContentProps> = ({
  description,
  isPremiumUser,
  isBusinessUser,
  onDragEnd,
  onUpdateImage,
}) => {
  const seoToolsComponent = React.useMemo(() => {
    if (description && (isPremiumUser || isBusinessUser)) {
      return <SEOToolsMenu description={description} onUpdateImage={onUpdateImage} />;
    }
    return null;
  }, [description, isPremiumUser, isBusinessUser, onUpdateImage]);

  return (
    <div className="h-full flex flex-col text-[10px]">
      <div className="p-1.5 sm:p-2 border-b bg-gray-50 flex flex-wrap justify-between items-center gap-1">
        <TemplateSelector />
        {seoToolsComponent}
      </div>
      
      <ScrollArea className="flex-1 p-1.5 sm:p-2 h-[calc(100%-52px)]">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-h-[200px]"
              >
                {description.blocks.map((block, index) => (
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
                ))}
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

export default EditorContent;
