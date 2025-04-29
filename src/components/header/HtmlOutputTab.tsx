
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HtmlOutputTabProps {
  htmlOutput: string;
}

export const HtmlOutputTab: React.FC<HtmlOutputTabProps> = ({ htmlOutput }) => {
  const { toast } = useToast();

  const copyHtmlToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput);
    toast({
      title: "HTML copiado!",
      description: "O código HTML foi copiado para a área de transferência.",
    });
  };
  
  const downloadHtml = () => {
    const blob = new Blob([htmlOutput], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'descricao-produto.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "HTML baixado!",
      description: "O arquivo HTML foi baixado com sucesso.",
    });
  };

  return (
    <>
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Este HTML é 100% compatível com a Nuvemshop, usando apenas HTML e CSS inline (sem JavaScript).
          Ao salvar na Nuvemshop, o título do produto será automaticamente inserido como H1 principal.
        </AlertDescription>
      </Alert>
      
      <div className="relative mt-4">
        <Textarea
          className="min-h-[300px] font-mono text-xs"
          readOnly
          value={htmlOutput}
        />
        <div className="absolute right-2 top-2 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadHtml}
            title="Baixar HTML"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyHtmlToClipboard}
            title="Copiar HTML"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};
