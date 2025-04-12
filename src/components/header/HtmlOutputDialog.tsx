
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Copy, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { Alert, AlertDescription } from '@/components/ui/alert';

const HtmlOutputDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { getHtmlOutput } = useEditorStore();
  const { toast } = useToast();
  
  const htmlOutput = getHtmlOutput();
  
  const copyHtmlToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput);
    toast({
      title: "HTML copiado!",
      description: "O código HTML foi copiado para a área de transferência.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Ver HTML
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Código HTML para Nuvemshop</DialogTitle>
          <DialogDescription>
            Copie este código HTML e cole diretamente na descrição do seu produto na Nuvemshop.
          </DialogDescription>
        </DialogHeader>
        
        <Alert variant="default" className="my-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Este HTML inclui tudo necessário para funcionar corretamente na Nuvemshop, incluindo estilos e scripts. 
            Cole o código completo sem alterações.
          </AlertDescription>
        </Alert>
        
        <div className="py-4">
          <div className="relative">
            <Textarea
              className="min-h-[300px] font-mono text-xs"
              readOnly
              value={htmlOutput}
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-2"
              onClick={copyHtmlToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HtmlOutputDialog;
