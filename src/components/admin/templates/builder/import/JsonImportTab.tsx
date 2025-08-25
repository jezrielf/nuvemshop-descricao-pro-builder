import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Upload } from 'lucide-react';
import { Template } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';

interface JsonImportTabProps {
  onImport: (template: Template) => void;
  isImporting: boolean;
}

export const JsonImportTab: React.FC<JsonImportTabProps> = ({ onImport, isImporting }) => {
  const [jsonInput, setJsonInput] = useState('');
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json') {
      toast({
        title: 'Erro',
        description: 'Por favor, selecione um arquivo JSON válido',
        variant: 'destructive'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setJsonInput(content);
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!jsonInput.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, cole o JSON ou selecione um arquivo',
        variant: 'destructive'
      });
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      
      // Validate template structure
      if (!parsed.id || !parsed.name || !parsed.category || !Array.isArray(parsed.blocks)) {
        throw new Error('Estrutura de template inválida');
      }

      // Create new ID to avoid conflicts
      const template: Template = {
        ...parsed,
        id: crypto.randomUUID(),
        name: `${parsed.name} (Importado)`
      };

      onImport(template);
      
      toast({
        title: 'Template importado',
        description: 'Arquivo JSON importado com sucesso'
      });
    } catch (error) {
      console.error('Error importing JSON:', error);
      toast({
        title: 'Erro na importação',
        description: 'JSON inválido ou estrutura incorreta',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="file-upload">Arquivo JSON</Label>
        <div className="mt-1">
          <input
            id="file-upload"
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Selecione um arquivo JSON exportado anteriormente
        </p>
      </div>

      <div className="relative">
        <Label htmlFor="json-input">Ou cole o JSON aqui</Label>
        <Textarea
          id="json-input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"id": "...", "name": "...", "category": "...", "blocks": [...]}'
          className="min-h-32 font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Cole o JSON de um template exportado
        </p>
      </div>

      <Button
        onClick={handleImport}
        disabled={!jsonInput.trim() || isImporting}
        className="w-full"
      >
        {isImporting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Importando...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Importar JSON
          </>
        )}
      </Button>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <p className="text-xs text-blue-800">
          <strong>Formato esperado:</strong> O JSON deve conter as propriedades: id, name, category e blocks.
          Use a função "Exportar" para gerar um JSON no formato correto.
        </p>
      </div>
    </div>
  );
};