
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Template, Block } from '@/types/editor';
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
  const getBlockTypeName = (type: string): string => {
    const typeMap: Record<string, string> = {
      'hero': 'Cabeçalho (Hero)',
      'features': 'Características',
      'benefits': 'Benefícios',
      'specifications': 'Especificações',
      'text': 'Texto',
      'image': 'Imagem',
      'gallery': 'Galeria',
      'imageText': 'Imagem e Texto',
      'textImage': 'Texto e Imagem',
      'faq': 'Perguntas Frequentes',
      'cta': 'Chamada para Ação',
      'video': 'Vídeo',
    };
    
    return typeMap[type] || type;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>{template.name}</span>
            <Badge variant="outline">{getCategoryName(template.category)}</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[500px] mt-4">
          <div className="space-y-6 p-1">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Estrutura do Template</h3>
              
              {template.blocks.length === 0 ? (
                <p className="text-muted-foreground text-sm">Este template não possui blocos.</p>
              ) : (
                <div className="space-y-3">
                  {template.blocks.map((block: Block, index: number) => (
                    <div 
                      key={block.id} 
                      className="p-3 border rounded-md bg-muted/30"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{index + 1}. {block.title}</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {getBlockTypeName(block.type)}
                          </span>
                        </div>
                        <Badge variant={block.visible ? "default" : "outline"}>
                          {block.visible ? "Visível" : "Oculto"}
                        </Badge>
                      </div>
                      
                      <div className="mt-2 text-xs text-muted-foreground">
                        {block.columns > 1 ? (
                          <span>{block.columns} colunas</span>
                        ) : (
                          <span>1 coluna</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
