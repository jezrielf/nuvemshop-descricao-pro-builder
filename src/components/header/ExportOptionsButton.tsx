
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useEditorStore } from '@/store/editor';
import { useToast } from '@/hooks/use-toast';

const ExportOptionsButton: React.FC = () => {
  const { getHtmlOutput } = useEditorStore();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  
  const handleCopyHtml = () => {
    const html = getHtmlOutput();
    navigator.clipboard.writeText(html);
    toast({
      title: "HTML copiado",
      description: "O código HTML foi copiado para a área de transferência",
    });
  };
  
  const handleExportHtml = () => {
    const html = getHtmlOutput();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'descricao-produto.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "HTML exportado",
      description: "O arquivo HTML foi baixado com sucesso",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyHtml}>
          Copiar HTML
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportHtml}>
          Baixar arquivo HTML
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptionsButton;
