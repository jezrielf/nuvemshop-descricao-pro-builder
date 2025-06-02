
import React from 'react';
import { Block, BlockType } from '@/types/editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2 } from 'lucide-react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { BlockTypeSelector } from './BlockTypeSelector';

interface BlockPreviewCardProps {
  block: Block;
  index: number;
  isEditing: boolean;
  blockTypeMap: Record<string, BlockType>;
  onEditStart: () => void;
  onTypeChange: (type: BlockType) => void;
  onSaveType: () => void;
  onCancelEdit: () => void;
}

export const BlockPreviewCard: React.FC<BlockPreviewCardProps> = ({
  block,
  index,
  isEditing,
  blockTypeMap,
  onEditStart,
  onTypeChange,
  onSaveType,
  onCancelEdit,
}) => {
  return (
    <Card key={block.id} className="overflow-hidden">
      <CardHeader className="p-3 bg-muted/30 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">
          Bloco {index + 1}: {block.title || block.type}
        </CardTitle>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <BlockTypeSelector 
              blockType={blockTypeMap[block.id] || block.type}
              onTypeChange={onTypeChange}
              onSave={onSaveType}
              onCancel={onCancelEdit}
            />
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditStart}
              className="h-8"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {blockTypeMap[block.id] ? 'Mudar tipo' : 'Alterar tipo'}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="border rounded-md p-2 bg-white">
          <BlockRenderer 
            block={
              blockTypeMap[block.id] 
                ? { ...block, type: blockTypeMap[block.id] } as Block
                : block
            }
            isPreview={true} 
          />
        </div>
      </CardContent>
    </Card>
  );
};
