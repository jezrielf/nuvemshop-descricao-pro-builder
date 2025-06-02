
import React from 'react';
import { Template, Block, BlockType } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BlockPreviewCard } from './BlockPreviewCard';
import { ArrowLeft, Check } from 'lucide-react';

interface ReviewBlocksTabProps {
  template: Template | null;
  editingBlockId: string | null;
  blockTypeMap: Record<string, BlockType>;
  onEditBlock: (id: string) => void;
  onChangeBlockType: (id: string, type: BlockType) => void;
  onSaveBlockType: () => void;
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
  if (!template) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="text-muted-foreground">Nenhum template gerado</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">
          Revisar blocos ({template.blocks.length})
        </h3>
        <p className="text-xs text-muted-foreground">
          Você pode modificar o tipo de cada bloco antes de aplicar o template
        </p>
      </div>

      <ScrollArea className="h-[300px] border rounded-md p-2">
        <div className="space-y-4">
          {template.blocks.length > 0 ? (
            template.blocks.map((block, index) => (
              <BlockPreviewCard
                key={block.id}
                block={block}
                index={index}
                isEditing={editingBlockId === block.id}
                blockTypeMap={blockTypeMap}
                onEditStart={() => onEditBlock(block.id)}
                onTypeChange={(type) => onChangeBlockType(block.id, type)}
                onSaveType={onSaveBlockType}
                onCancelEdit={() => onCancelBlockEdit(block.id)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-[200px]">
              <p className="text-muted-foreground">Nenhum bloco identificado no HTML</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Button onClick={onApply} size="sm">
          <Check className="h-4 w-4 mr-2" />
          Aplicar Template
        </Button>
      </div>
    </div>
  );
};
