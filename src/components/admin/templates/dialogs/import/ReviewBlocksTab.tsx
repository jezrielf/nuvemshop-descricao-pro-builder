
import React from 'react';
import { Template, Block, BlockType } from '@/types/editor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { BlockPreviewCard } from './BlockPreviewCard';

interface ReviewBlocksTabProps {
  template: Template | null;
  editingBlockId: string | null;
  blockTypeMap: Record<string, BlockType>;
  onEditBlock: (id: string) => void;
  onChangeBlockType: (id: string, type: BlockType) => void;
  onSaveBlockType: (id: string) => void;
  onCancelBlockEdit: (id: string) => void;
  onBack: () => void;
  onApply: () => void;
}

export const ReviewBlocksTab: React.FC<ReviewBlocksTabProps> = ({
  template,
  editingBlockId,
  blockTypeMap,
  onEditBlock,
  onChangeBlockType,
  onSaveBlockType,
  onCancelBlockEdit,
  onBack,
  onApply,
}) => {
  if (!template) return null;

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription>
          Revise os blocos gerados a partir do HTML. Você pode alterar o tipo de cada bloco se necessário.
        </AlertDescription>
      </Alert>
      
      <ScrollArea className="h-[350px] pr-4">
        <div className="space-y-4">
          {template.blocks.map((block, index) => (
            <BlockPreviewCard
              key={block.id}
              block={block}
              index={index}
              isEditing={editingBlockId === block.id}
              blockTypeMap={blockTypeMap}
              onEditStart={() => onEditBlock(block.id)}
              onTypeChange={(type) => onChangeBlockType(block.id, type)}
              onSaveType={() => onSaveBlockType(block.id)}
              onCancelEdit={() => onCancelBlockEdit(block.id)}
            />
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={onApply}>
          Aplicar Template
        </Button>
      </div>
    </div>
  );
};
