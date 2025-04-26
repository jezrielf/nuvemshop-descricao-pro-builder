
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import TemplateSelection from '@/components/Templates/TemplateSelection';
import { Template } from '@/types/editor';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ isOpen, onClose, onSelectTemplate }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="relative">
          <DialogTitle>Selecionar Template</DialogTitle>
          <DialogDescription>
            Escolha um template para sua descrição de produto
          </DialogDescription>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="flex-1 overflow-auto py-4">
          <TemplateSelection onSelectTemplate={onSelectTemplate} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
