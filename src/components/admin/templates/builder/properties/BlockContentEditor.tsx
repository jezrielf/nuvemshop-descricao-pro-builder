import React from 'react';
import { Block } from '@/types/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { VariableInserter } from './VariableInserter';

interface BlockContentEditorProps {
  block: Block;
  onUpdate: (updates: Partial<Block>) => void;
}

export const BlockContentEditor: React.FC<BlockContentEditorProps> = ({ block, onUpdate }) => {
  const handleAddItem = () => {
    const currentItems = (block as any).items || [];
    const newItems = [...currentItems, ''];
    onUpdate({ items: newItems } as any);
  };

  const handleUpdateItem = (index: number, value: string) => {
    const currentItems = (block as any).items || [];
    const newItems = [...currentItems];
    newItems[index] = value;
    onUpdate({ items: newItems } as any);
  };

  const handleRemoveItem = (index: number) => {
    const currentItems = (block as any).items || [];
    const newItems = currentItems.filter((_: any, i: number) => i !== index);
    onUpdate({ items: newItems } as any);
  };

  const renderContentFields = () => {
    switch (block.type) {
      case 'text':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                value={(block as any).content || ''}
                onChange={(e) => onUpdate({ content: e.target.value } as any)}
                placeholder="Digite o conteúdo do texto..."
                className="min-h-32"
              />
              <VariableInserter 
                onInsert={(variable) => {
                  const currentContent = (block as any).content || '';
                  const newContent = currentContent + variable;
                  onUpdate({ content: newContent } as any);
                }}
              />
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="heading">Título Principal</Label>
              <Input
                id="heading"
                value={(block as any).heading || ''}
                onChange={(e) => onUpdate({ heading: e.target.value } as any)}
                placeholder="Título principal do hero..."
              />
              <VariableInserter 
                onInsert={(variable) => {
                  const currentHeading = (block as any).heading || '';
                  const newHeading = currentHeading + variable;
                  onUpdate({ heading: newHeading } as any);
                }}
              />
            </div>
            <div>
              <Label htmlFor="subheading">Subtítulo</Label>
              <Input
                id="subheading"
                value={(block as any).subheading || ''}
                onChange={(e) => onUpdate({ subheading: e.target.value } as any)}
                placeholder="Subtítulo opcional..."
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Texto do Botão</Label>
              <Input
                id="buttonText"
                value={(block as any).buttonText || ''}
                onChange={(e) => onUpdate({ buttonText: e.target.value } as any)}
                placeholder="Clique aqui"
              />
            </div>
            <div>
              <Label htmlFor="buttonUrl">URL do Botão</Label>
              <Input
                id="buttonUrl"
                value={(block as any).buttonUrl || ''}
                onChange={(e) => onUpdate({ buttonUrl: e.target.value } as any)}
                placeholder="https://..."
              />
            </div>
          </div>
        );

      case 'features':
      case 'benefits':
      case 'specifications':
        const items = (block as any).items || [];
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Itens</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddItem}
                className="flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-2">
              {items.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleUpdateItem(index, e.target.value)}
                    placeholder={`Item ${index + 1}...`}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                value={(block as any).image || ''}
                onChange={(e) => onUpdate({ image: e.target.value } as any)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="imageAlt">Texto Alternativo</Label>
              <Input
                id="imageAlt"
                value={(block as any).alt || ''}
                onChange={(e) => onUpdate({ alt: e.target.value } as any)}
                placeholder="Descrição da imagem..."
              />
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="videoUrl">URL do Vídeo</Label>
              <Input
                id="videoUrl"
                value={(block as any).videoUrl || ''}
                onChange={(e) => onUpdate({ videoUrl: e.target.value } as any)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="ctaText">Texto do CTA</Label>
              <Input
                id="ctaText"
                value={(block as any).buttonText || ''}
                onChange={(e) => onUpdate({ buttonText: e.target.value } as any)}
                placeholder="Clique aqui"
              />
            </div>
            <div>
              <Label htmlFor="ctaUrl">URL do CTA</Label>
              <Input
                id="ctaUrl"
                value={(block as any).buttonUrl || ''}
                onChange={(e) => onUpdate({ buttonUrl: e.target.value } as any)}
                placeholder="https://..."
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <p>Configuração de conteúdo não disponível para este tipo de bloco.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Título do Bloco</Label>
        <Input
          id="title"
          value={block.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Título do bloco..."
        />
      </div>
      
      {renderContentFields()}
    </div>
  );
};