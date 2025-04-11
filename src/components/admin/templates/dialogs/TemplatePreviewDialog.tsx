
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Visualizar Template</DialogTitle>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-bold text-lg">{template.name}</h3>
            <Badge variant="outline">
              {getCategoryName(template.category)}
            </Badge>
          </div>
          <div className="space-y-4">
            {template.blocks.map(block => (
              <div key={block.id} className="border rounded p-4">
                <h4 className="font-medium mb-2">{block.type}: {block.title}</h4>
                <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                  {JSON.stringify(block, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewDialog;
