import React from 'react';
import { Block } from '@/types/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlockContentEditor } from './properties/BlockContentEditor';
import { BlockStyleEditor } from './properties/BlockStyleEditor';
import { BlockSettingsEditor } from './properties/BlockSettingsEditor';

interface BlockPropertiesPanelProps {
  block: Block;
  onBlockUpdate: (updates: Partial<Block>) => void;
}

export const BlockPropertiesPanel: React.FC<BlockPropertiesPanelProps> = ({
  block,
  onBlockUpdate
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-sm">Propriedades do Bloco</h3>
        <p className="text-xs text-muted-foreground mt-1 capitalize">
          {block.type} - {block.title}
        </p>
      </div>
      
      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-full grid-cols-3">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="style">Estilo</TabsTrigger>
          <TabsTrigger value="settings">Config</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1">
          <TabsContent value="content" className="p-4 space-y-4">
            <BlockContentEditor block={block} onUpdate={onBlockUpdate} />
          </TabsContent>
          
          <TabsContent value="style" className="p-4 space-y-4">
            <BlockStyleEditor block={block} onUpdate={onBlockUpdate} />
          </TabsContent>
          
          <TabsContent value="settings" className="p-4 space-y-4">
            <BlockSettingsEditor block={block} onUpdate={onBlockUpdate} />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};