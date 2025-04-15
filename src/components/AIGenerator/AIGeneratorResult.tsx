import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, RotateCcw, Sparkles } from 'lucide-react';
import { ProductDescription, Block } from '@/types/editor';
import BlockRenderer from '../blocks/BlockRenderer';
import { ensureBlockType } from '@/utils/typeConversion';

interface AIGeneratorResultProps {
  description: ProductDescription;
  onApply: () => void;
  onReset: () => void;
}

const AIGeneratorResult: React.FC<AIGeneratorResultProps> = ({
  description,
  onApply,
  onReset,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Descrição Gerada</h3>
          <p className="text-sm text-muted-foreground">
            Revise a descrição gerada antes de aplicar ao editor
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Gerar Nova
          </Button>
          <Button size="sm" onClick={onApply}>
            <Check className="h-4 w-4 mr-2" />
            Aplicar Descrição
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Nome da Descrição: {description.name}</h4>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{description.blocks.length} blocos</span>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] w-full rounded-md border">
              <div className="p-4 space-y-4">
                {description.blocks.map((block) => (
                  <div key={block.id} className="border rounded-md overflow-hidden">
                    <div className="bg-gray-50 px-3 py-2 text-sm font-medium border-b">
                      {block.title || block.type}
                    </div>
                    <div className="p-3">
                      <BlockRenderer block={ensureBlockType(block)} isPreview={true} />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Gerar Nova Descrição
        </Button>
        <Button onClick={onApply}>
          <Check className="h-4 w-4 mr-2" />
          Aplicar ao Editor
        </Button>
      </div>
    </div>
  );
};

export default AIGeneratorResult;
