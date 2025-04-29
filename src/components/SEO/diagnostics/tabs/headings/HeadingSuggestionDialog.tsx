
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HeadingSuggestion } from '../../types/headingTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Heading1, Heading2, Heading3, Heading4 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HeadingSuggestionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  suggestedHeadings: HeadingSuggestion[];
  isUpdating: boolean;
  onApply: () => void;
  currentProductTitle?: string;
}

export const HeadingSuggestionDialog: React.FC<HeadingSuggestionDialogProps> = ({
  isOpen,
  onOpenChange,
  suggestedHeadings,
  isUpdating,
  onApply,
  currentProductTitle
}) => {
  const [headings, setHeadings] = useState<HeadingSuggestion[]>(suggestedHeadings);
  
  // Atualizar headings quando suggestedHeadings mudar
  React.useEffect(() => {
    setHeadings(suggestedHeadings);
  }, [suggestedHeadings]);
  
  const handleHeadingTextChange = (index: number, text: string) => {
    const updatedHeadings = [...headings];
    updatedHeadings[index] = { ...updatedHeadings[index], text };
    setHeadings(updatedHeadings);
  };
  
  // Renderiza o ícone apropriado para o nível do heading
  const renderHeadingIcon = (level: number) => {
    switch (level) {
      case 1: return <Heading1 className="h-4 w-4" />;
      case 2: return <Heading2 className="h-4 w-4" />;
      case 3: return <Heading3 className="h-4 w-4" />;
      case 4: return <Heading4 className="h-4 w-4" />;
      default: return <Heading4 className="h-4 w-4" />;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Sugestões de Estrutura de Headings</DialogTitle>
          <DialogDescription>
            Revise e edite as sugestões para melhorar a estrutura de headings do seu conteúdo.
            {currentProductTitle && (
              <div className="mt-2">
                <Badge variant="outline" className="bg-green-50">
                  Título do produto: {currentProductTitle}
                </Badge>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[350px] pr-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nível</TableHead>
                  <TableHead>Texto</TableHead>
                  <TableHead className="w-20">Original?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {headings.map((heading, index) => (
                  <TableRow key={index}>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-1">
                        {renderHeadingIcon(heading.level)}
                        <span>H{heading.level}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input 
                        value={heading.text} 
                        onChange={(e) => handleHeadingTextChange(index, e.target.value)}
                        className={heading.level === 1 ? "border-green-300" : ""}
                      />
                      {heading.level === 1 && (
                        <p className="text-xs text-green-600 mt-1">
                          Este será o título principal do produto
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {heading.original ? (
                        <Badge variant="outline" className="bg-yellow-50">Sim</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-50">Novo</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUpdating}>
            Cancelar
          </Button>
          <Button 
            onClick={onApply} 
            disabled={isUpdating || headings.length === 0}
          >
            {isUpdating ? "Aplicando..." : "Aplicar Sugestões"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
