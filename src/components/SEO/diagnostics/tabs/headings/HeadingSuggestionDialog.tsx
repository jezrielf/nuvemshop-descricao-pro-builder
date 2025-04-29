
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { HeadingSuggestion } from '../../types/headingTypes';

interface HeadingSuggestionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  suggestedHeadings: HeadingSuggestion[];
  isUpdating: boolean;
  onApply: () => void;
}

export const HeadingSuggestionDialog: React.FC<HeadingSuggestionDialogProps> = ({
  isOpen,
  onOpenChange,
  suggestedHeadings,
  isUpdating,
  onApply,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Otimização de Headings</DialogTitle>
          <DialogDescription>
            Revise e aprove as sugestões de tags de cabeçalho para melhorar o SEO da sua descrição.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="text-sm font-medium mb-2">Cabeçalhos sugeridos:</h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {suggestedHeadings.map((heading, index) => (
              <div 
                key={index} 
                className={`flex flex-col border-l-4 pl-3 py-1 ${
                  heading.level === 1 ? 'border-blue-500' : 
                  heading.level === 2 ? 'border-green-500' :
                  heading.level === 3 ? 'border-yellow-500' :
                  heading.level === 4 ? 'border-orange-500' :
                  heading.level === 5 ? 'border-red-500' :
                  'border-purple-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline">H{heading.level}</Badge>
                  <span className="font-medium">{heading.text}</span>
                </div>
                {heading.original && heading.original !== heading.text && (
                  <span className="text-xs text-muted-foreground mt-1">
                    Original: {heading.original}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onApply} disabled={isUpdating}>
            {isUpdating ? 'Aplicando...' : 'Aplicar Mudanças'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
