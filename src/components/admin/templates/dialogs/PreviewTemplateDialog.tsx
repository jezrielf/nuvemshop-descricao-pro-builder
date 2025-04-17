
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Template } from '@/types/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { generateCompleteHtml } from '@/store/editor/outputActions/htmlOutputGenerator';
import { Badge } from '@/components/ui/badge';
import { getCategoryName } from '../utils';

interface PreviewTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  template: Template;
}

export const PreviewTemplateDialog: React.FC<PreviewTemplateDialogProps> = ({
  open,
  onClose,
  template,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Visualizar Template</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            {template.name} 
            <Badge variant="outline">{getCategoryName(template.category)}</Badge>
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[500px] border rounded-md p-4">
          <div className="space-y-6">
            {template.blocks.map((block) => (
              <div key={block.id} className="border-b pb-6">
                <BlockRenderer block={block} isPreview={true} />
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
