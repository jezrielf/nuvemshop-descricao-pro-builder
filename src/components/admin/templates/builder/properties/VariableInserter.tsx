import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Variable, Copy } from 'lucide-react';

interface VariableInserterProps {
  onInsert: (variable: string) => void;
}

interface VariableDefinition {
  key: string;
  label: string;
  description: string;
  category: 'product' | 'store' | 'system';
}

const VARIABLES: VariableDefinition[] = [
  // Product variables
  { key: '{{product.name}}', label: 'Nome do Produto', description: 'Nome completo do produto', category: 'product' },
  { key: '{{product.description}}', label: 'Descrição', description: 'Descrição original do produto', category: 'product' },
  { key: '{{product.price}}', label: 'Preço', description: 'Preço atual do produto', category: 'product' },
  { key: '{{product.compare_price}}', label: 'Preço Comparativo', description: 'Preço "de" do produto', category: 'product' },
  { key: '{{product.brand}}', label: 'Marca', description: 'Marca do produto', category: 'product' },
  { key: '{{product.category}}', label: 'Categoria', description: 'Categoria do produto', category: 'product' },
  { key: '{{product.sku}}', label: 'SKU', description: 'Código SKU do produto', category: 'product' },
  { key: '{{product.weight}}', label: 'Peso', description: 'Peso do produto', category: 'product' },
  { key: '{{product.dimensions}}', label: 'Dimensões', description: 'Dimensões do produto', category: 'product' },
  
  // Store variables
  { key: '{{store.name}}', label: 'Nome da Loja', description: 'Nome da loja', category: 'store' },
  { key: '{{store.url}}', label: 'URL da Loja', description: 'URL principal da loja', category: 'store' },
  { key: '{{store.phone}}', label: 'Telefone', description: 'Telefone da loja', category: 'store' },
  { key: '{{store.email}}', label: 'Email', description: 'Email de contato da loja', category: 'store' },
  
  // System variables
  { key: '{{current_date}}', label: 'Data Atual', description: 'Data atual formatada', category: 'system' },
  { key: '{{current_time}}', label: 'Hora Atual', description: 'Hora atual formatada', category: 'system' }
];

const CATEGORY_LABELS = {
  product: 'Produto',
  store: 'Loja',
  system: 'Sistema'
};

export const VariableInserter: React.FC<VariableInserterProps> = ({ onInsert }) => {
  const [open, setOpen] = useState(false);

  const handleInsert = (variable: string) => {
    onInsert(variable);
    setOpen(false);
  };

  const variablesByCategory = VARIABLES.reduce((acc, variable) => {
    if (!acc[variable.category]) acc[variable.category] = [];
    acc[variable.category].push(variable);
    return acc;
  }, {} as Record<string, VariableDefinition[]>);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 flex items-center gap-2"
        >
          <Variable className="h-3 w-3" />
          Inserir Variável
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm">Variáveis Dinâmicas</h4>
            <p className="text-xs text-muted-foreground">
              Clique para inserir variáveis que serão substituídas pelos dados reais
            </p>
          </div>
          
          <ScrollArea className="h-64">
            <div className="space-y-4">
              {Object.entries(variablesByCategory).map(([category, variables]) => (
                <div key={category}>
                  <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
                  </h5>
                  <div className="space-y-1">
                    {variables.map((variable) => (
                      <button
                        key={variable.key}
                        onClick={() => handleInsert(variable.key)}
                        className="w-full text-left p-2 rounded-md hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs font-mono">
                                {variable.key}
                              </Badge>
                            </div>
                            <p className="text-xs font-medium mt-1">{variable.label}</p>
                            <p className="text-xs text-muted-foreground">{variable.description}</p>
                          </div>
                          <Copy className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};