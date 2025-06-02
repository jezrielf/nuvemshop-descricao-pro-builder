
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Template } from '@/types/editor';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ViewTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template;
}

export const ViewTemplateDialog: React.FC<ViewTemplateDialogProps> = ({
  open,
  onOpenChange,
  template,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Visualizar Template</DialogTitle>
          <DialogDescription>
            Detalhes do template selecionado
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              <p className="text-sm">{template.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Categoria</label>
              <div className="mt-1">
                <Badge variant="secondary">{template.category}</Badge>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">ID</label>
            <p className="text-sm font-mono">{template.id}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Criado por</label>
            <p className="text-sm">{template.user_id || 'Sistema'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Blocos ({template.blocks?.length || 0})
            </label>
            <ScrollArea className="h-32 w-full border rounded-md p-3 mt-2">
              {template.blocks && template.blocks.length > 0 ? (
                <div className="space-y-2">
                  {template.blocks.map((block: any, index: number) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{block.type || 'Tipo desconhecido'}</span>
                      <Badge variant="outline" className="text-xs">
                        {block.title || `Bloco ${index + 1}`}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum bloco definido</p>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
