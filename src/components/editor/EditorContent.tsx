
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ScrollArea } from '@/components/ui/scroll-area';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import AddBlock from '@/components/AddBlock';
import TemplateSelector from '@/components/templates/TemplateSelector';
import { SEOToolsMenu } from '@/components/SEO/menu/SEOToolsMenu';
import { ProductDescription } from '@/types/editor';
import SaveToNuvemshopButton from '@/components/Nuvemshop/components/SaveToNuvemshopButton';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';

interface EditorContentProps {
  description: ProductDescription;
  isPremiumUser: boolean;
  isBusinessUser: boolean;
  onDragEnd: (result: any) => void;
  onUpdateImage: (blockId: string, imageType: string, newImageUrl: string) => void;
  selectedProduct?: any; // Added prop for the selected Nuvemshop product
}

const EditorContent: React.FC<EditorContentProps> = ({
  description,
  isPremiumUser,
  isBusinessUser,
  onDragEnd,
  onUpdateImage,
  selectedProduct,
}) => {
  const { success: isNuvemshopConnected } = useNuvemshopAuth();
  
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
        <div className="flex items-center">
          {isNuvemshopConnected && selectedProduct && (
            <SaveToNuvemshopButton product={selectedProduct} />
          )}
          {seoToolsComponent}
        </div>
      </div>
      
      <ScrollArea className="flex-1 h-[calc(100%-52px)]">
        <div className="p-1.5 sm:p-2">
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
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditorContent;
