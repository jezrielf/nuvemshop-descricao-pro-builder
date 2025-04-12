
import React from 'react';
import { ProductDescription } from '@/types/editor';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';

interface PreviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  description: ProductDescription | null;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({
  isOpen,
  onOpenChange,
  description
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Visualizar Descrição</DialogTitle>
        </DialogHeader>
        {description && (
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            <h3 className="font-bold text-lg mb-2">{description.name}</h3>
            <div className="space-y-4">
              {description.blocks.map(block => (
                <div key={block.id} className="border rounded p-4">
                  <h4 className="font-medium mb-2">{block.type}: {block.title}</h4>
                  <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                    {JSON.stringify(block, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
