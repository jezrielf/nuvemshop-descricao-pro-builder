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
  const handleAddItem = (arrayType: string) => {
    const currentItems = (block as any)[arrayType] || [];
    let newItem: any;
    
    switch (arrayType) {
      case 'features':
      case 'benefits':
        newItem = { id: crypto.randomUUID(), title: '', description: '', icon: '' };
        break;
      case 'specs':
        newItem = { id: crypto.randomUUID(), name: '', value: '' };
        break;
      case 'questions':
        newItem = { id: crypto.randomUUID(), question: '', answer: '' };
        break;
      default:
        newItem = '';
    }
    
    const newItems = [...currentItems, newItem];
    onUpdate({ [arrayType]: newItems } as any);
  };

  const handleUpdateItem = (arrayType: string, index: number, field: string, value: string) => {
    const currentItems = (block as any)[arrayType] || [];
    const newItems = [...currentItems];
    if (typeof newItems[index] === 'object') {
      newItems[index] = { ...newItems[index], [field]: value };
    } else {
      newItems[index] = value;
    }
    onUpdate({ [arrayType]: newItems } as any);
  };

  const handleRemoveItem = (arrayType: string, index: number) => {
    const currentItems = (block as any)[arrayType] || [];
    const newItems = currentItems.filter((_: any, i: number) => i !== index);
    onUpdate({ [arrayType]: newItems } as any);
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
        const features = (block as any).features || [];
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Características</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddItem('features')}
                className="flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {features.map((feature: any, index: number) => (
                <div key={feature.id || index} className="p-3 border rounded-md space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      value={feature.title || ''}
                      onChange={(e) => handleUpdateItem('features', index, 'title', e.target.value)}
                      placeholder="Título da característica..."
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem('features', index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <Input
                    value={feature.description || ''}
                    onChange={(e) => handleUpdateItem('features', index, 'description', e.target.value)}
                    placeholder="Descrição..."
                  />
                  <Input
                    value={feature.icon || ''}
                    onChange={(e) => handleUpdateItem('features', index, 'icon', e.target.value)}
                    placeholder="Ícone (ex: check, star, etc)..."
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'benefits':
        const benefits = (block as any).benefits || [];
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Benefícios</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddItem('benefits')}
                className="flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {benefits.map((benefit: any, index: number) => (
                <div key={benefit.id || index} className="p-3 border rounded-md space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      value={benefit.title || ''}
                      onChange={(e) => handleUpdateItem('benefits', index, 'title', e.target.value)}
                      placeholder="Título do benefício..."
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem('benefits', index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <Input
                    value={benefit.description || ''}
                    onChange={(e) => handleUpdateItem('benefits', index, 'description', e.target.value)}
                    placeholder="Descrição..."
                  />
                  <Input
                    value={benefit.icon || ''}
                    onChange={(e) => handleUpdateItem('benefits', index, 'icon', e.target.value)}
                    placeholder="Ícone (ex: check, star, etc)..."
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'specifications':
        const specs = (block as any).specs || [];
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Especificações</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddItem('specs')}
                className="flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-2">
              {specs.map((spec: any, index: number) => (
                <div key={spec.id || index} className="flex items-center gap-2">
                  <Input
                    value={spec.name || ''}
                    onChange={(e) => handleUpdateItem('specs', index, 'name', e.target.value)}
                    placeholder="Nome..."
                    className="flex-1"
                  />
                  <Input
                    value={spec.value || ''}
                    onChange={(e) => handleUpdateItem('specs', index, 'value', e.target.value)}
                    placeholder="Valor..."
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem('specs', index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'faq':
        const questions = (block as any).questions || [];
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Perguntas Frequentes</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddItem('questions')}
                className="flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {questions.map((faq: any, index: number) => (
                <div key={faq.id || index} className="p-3 border rounded-md space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      value={faq.question || ''}
                      onChange={(e) => handleUpdateItem('questions', index, 'question', e.target.value)}
                      placeholder="Pergunta..."
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem('questions', index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <Textarea
                    value={faq.answer || ''}
                    onChange={(e) => handleUpdateItem('questions', index, 'answer', e.target.value)}
                    placeholder="Resposta..."
                    className="min-h-20"
                  />
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
                value={(block as any).src || ''}
                onChange={(e) => onUpdate({ src: e.target.value } as any)}
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