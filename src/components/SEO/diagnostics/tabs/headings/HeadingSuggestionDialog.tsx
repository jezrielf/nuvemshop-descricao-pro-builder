
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HeadingSuggestion } from '../../types/headingTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Heading1, Heading2, Heading3, Heading4, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [headings, setHeadings] = useState<HeadingSuggestion[]>(
    suggestedHeadings.filter(h => h.level !== 1) // Excluir H1 das edições
  );
  
  // Atualizar headings quando suggestedHeadings mudar
  React.useEffect(() => {
    setHeadings(suggestedHeadings.filter(h => h.level !== 1));
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
  
  // Combinar o título do produto como H1 com os outros headings para exibição
  const allHeadings = currentProductTitle 
    ? [{ level: 1, text: currentProductTitle, locked: true }, ...headings]
    : headings;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Sugestões de Estrutura de Headings</DialogTitle>
          <DialogDescription>
            Revise e edite as sugestões para melhorar a estrutura de headings do seu conteúdo.
          </DialogDescription>
        </DialogHeader>
        
        {currentProductTitle && (
          <Alert className="bg-blue-50 border-blue-200 mb-4">
            <AlertDescription className="text-blue-800 text-sm">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" /> 
                <span>
                  <strong>O título do produto será sempre usado como H1.</strong> Isso melhora o SEO e mantém a consistência da sua loja.
                </span>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[350px] pr-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nível</TableHead>
                  <TableHead>Texto</TableHead>
                  <TableHead className="w-20">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allHeadings.map((heading, index) => (
                  <TableRow key={index}>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-1">
                        {renderHeadingIcon(heading.level)}
                        <span>H{heading.level}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {heading.locked ? (
                        <div className="flex items-center gap-2">
                          <Input 
                            value={heading.text} 
                            className="border-blue-300 bg-blue-50"
                            readOnly
                          />
                          <Lock className="h-4 w-4 text-blue-500" />
                        </div>
                      ) : (
                        <Input 
                          value={heading.text} 
                          onChange={(e) => {
                            // O índice precisa ser ajustado se temos um H1 fixo
                            const adjustedIndex = currentProductTitle ? index - 1 : index;
                            handleHeadingTextChange(adjustedIndex, e.target.value);
                          }}
                        />
                      )}
                      {heading.level === 1 && (
                        <p className="text-xs text-blue-600 mt-1">
                          Este é o título do produto (H1) - fixo para SEO
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {heading.locked ? (
                        <Badge variant="success" className="bg-blue-100 text-blue-800">Fixo</Badge>
                      ) : heading.original ? (
                        <Badge variant="outline" className="bg-yellow-50">Existente</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-50">Novo</Badge>
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
