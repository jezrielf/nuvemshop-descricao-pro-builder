
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Template, ProductCategory } from '@/types/editor';

interface TemplatePreviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template | null;
  getCategoryName: (category: ProductCategory) => string;
}

const TemplatePreviewDialog: React.FC<TemplatePreviewDialogProps> = ({
  isOpen,
  onOpenChange,
  template,
  getCategoryName
}) => {
  if (!isOpen || !template) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Visualização do Template</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span>{template.name}</span>
            <Badge variant="outline">
              {getCategoryName(template.category)}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Estrutura de Blocos</h3>
            <ul className="space-y-2">
              {template.blocks.map((block, index) => (
                <li key={block.id} className="flex items-center">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
                    {index + 1}
                  </span>
                  <span className="font-medium">{block.type}</span>
                  {block.title && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {block.title}
                    </span>
                  )}
                </li>
              ))}
              {template.blocks.length === 0 && (
                <li className="text-muted-foreground">
                  Este template não possui blocos.
                </li>
              )}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewDialog;
