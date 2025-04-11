
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlockType, ProductCategory, Block } from '@/types/editor';
import BasicInfo from './BasicInfo';
import BlockTypeSelector from './BlockTypeSelector';
import BlocksList from './BlocksList';

interface NewTemplateDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  template: {
    name: string;
    category: string;
    blocks: Block[];
  };
  onTemplateChange: (template: Partial<{
    name: string;
    category: string;
    blocks: Block[];
  }>) => void;
  onCreateTemplate: () => void;
  onAddBlock: (type: BlockType) => void;
  onRemoveBlock: (blockId: string) => void;
  blockTypes: BlockType[];
  categories: string[];
  getCategoryName: (category: ProductCategory) => string;
}

const NewTemplateDialog: React.FC<NewTemplateDialogProps> = ({
  isOpen,
  onOpenChange,
  template,
  onTemplateChange,
  onCreateTemplate,
  onAddBlock,
  onRemoveBlock,
  blockTypes,
  categories,
  getCategoryName
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Criar Novo Template</DialogTitle>
          <DialogDescription>
            Defina as informações básicas e estrutura do novo template.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="info">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="blocks">Blocos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <BasicInfo
              name={template.name}
              category={template.category}
              onNameChange={(name) => onTemplateChange({...template, name})}
              onCategoryChange={(category) => onTemplateChange({...template, category})}
              categories={categories}
              getCategoryName={getCategoryName}
            />
          </TabsContent>
          
          <TabsContent value="blocks" className="space-y-4 pt-4">
            <BlockTypeSelector 
              blockTypes={blockTypes} 
              onAddBlock={onAddBlock}
            />
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Blocos no Template ({template.blocks?.length || 0})</h4>
              <BlocksList 
                blocks={template.blocks} 
                onRemoveBlock={onRemoveBlock}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onCreateTemplate}>
            Criar Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewTemplateDialog;
