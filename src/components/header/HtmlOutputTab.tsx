
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Copy } from 'lucide-react';
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

  return (
    <>
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Este HTML é 100% compatível com a Nuvemshop, usando apenas HTML e CSS inline (sem JavaScript).
          Cole o código completo sem alterações ou recortes para evitar tags HTML não fechadas.
        </AlertDescription>
      </Alert>
      
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
    </>
  );
};
