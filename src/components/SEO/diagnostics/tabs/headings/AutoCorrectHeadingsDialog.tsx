
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { HeadingStructure } from '../../types/headingTypes';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AutoCorrectHeadingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  headingStructure: HeadingStructure;
  onApplyCorrection: () => Promise<void>;
  isProcessing: boolean;
}

export const AutoCorrectHeadingsDialog: React.FC<AutoCorrectHeadingsDialogProps> = ({
  isOpen,
  onOpenChange,
  headingStructure,
  onApplyCorrection,
  isProcessing
}) => {
  // Generate a preview of the corrections to be made
  const currentStructure = headingStructure.headings.map(h => `H${h.level}: ${h.text}`).join('\n');
  
  // Calculate corrections needed
  const hasProperHierarchy = headingStructure.hasProperHierarchy;
  const hasSingleH1 = headingStructure.headings.filter(h => h.level === 1).length <= 1;
  const hasH1 = headingStructure.hasValidH1;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Correção Automática de Estrutura de Headings</DialogTitle>
          <DialogDescription>
            A ferramenta irá ajustar automaticamente a estrutura de headings para melhorar o SEO da página.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <Alert variant={hasProperHierarchy && hasSingleH1 && hasH1 ? "success" : "warning"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {hasProperHierarchy && hasSingleH1 && hasH1 
                ? "A estrutura atual de headings já está bem otimizada."
                : "Identificamos oportunidades de melhorar a estrutura de headings."}
            </AlertDescription>
          </Alert>
          
          <div>
            <h4 className="text-sm font-medium mb-2">A correção automática irá:</h4>
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>Garantir que o título do produto seja o único H1 da página</li>
              {!hasProperHierarchy && (
                <li>Ajustar a hierarquia para evitar saltos (ex: H1 para H3)</li>
              )}
              <li>Organizar os subtítulos em uma estrutura lógica (H2 → H3 → H4)</li>
              <li>Otimizar o conteúdo para mecanismos de busca</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Estrutura atual:</h4>
            <ScrollArea className="h-32 border rounded-md p-2 text-sm font-mono">
              {currentStructure || "Nenhuma estrutura de headings encontrada"}
            </ScrollArea>
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Cancelar
          </Button>
          <Button onClick={onApplyCorrection} disabled={isProcessing}>
            {isProcessing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
            ) : (
              <span className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                Aplicar Correção Automática
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AutoCorrectHeadingsDialog;
