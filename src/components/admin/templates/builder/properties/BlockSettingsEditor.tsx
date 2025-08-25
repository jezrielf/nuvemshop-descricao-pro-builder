import React from 'react';
import { Block } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface BlockSettingsEditorProps {
  block: Block;
  onUpdate: (updates: Partial<Block>) => void;
}

export const BlockSettingsEditor: React.FC<BlockSettingsEditorProps> = ({ block, onUpdate }) => {
  return (
    <div className="space-y-4">
      {/* Visibility */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="visible">Visibilidade</Label>
          <p className="text-xs text-muted-foreground">
            Define se o bloco será exibido no template
          </p>
        </div>
        <Switch
          id="visible"
          checked={block.visible}
          onCheckedChange={(checked) => onUpdate({ visible: checked })}
        />
      </div>

      {/* Layout */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Layout</h4>
        
        <div>
          <Label htmlFor="columns">Largura</Label>
          <Select 
            value={String(block.columns)} 
            onValueChange={(value) => onUpdate({ columns: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Largura" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Largura total</SelectItem>
              <SelectItem value="1/2">Metade (1/2)</SelectItem>
              <SelectItem value="1/3">Um terço (1/3)</SelectItem>
              <SelectItem value="2/3">Dois terços (2/3)</SelectItem>
              <SelectItem value="1/4">Um quarto (1/4)</SelectItem>
              <SelectItem value="3/4">Três quartos (3/4)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Block-specific settings */}
      {block.type === 'image' && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Configurações de Imagem</h4>
          
          <div>
            <Label htmlFor="imageFit">Ajuste da Imagem</Label>
            <Select 
              value={block.style.imageFit || 'cover'} 
              onValueChange={(value) => onUpdate({ 
                style: { ...block.style, imageFit: value as any } 
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ajuste" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cover">Cobrir (cover)</SelectItem>
                <SelectItem value="contain">Conter (contain)</SelectItem>
                <SelectItem value="fill">Preencher (fill)</SelectItem>
                <SelectItem value="none">Nenhum</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {block.type === 'video' && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Configurações de Vídeo</h4>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoplay">Reprodução Automática</Label>
              <p className="text-xs text-muted-foreground">
                Inicia o vídeo automaticamente
              </p>
            </div>
            <Switch
              id="autoplay"
              checked={(block as any).autoplay || false}
              onCheckedChange={(checked) => onUpdate({ autoplay: checked } as any)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="muted">Silenciado</Label>
              <p className="text-xs text-muted-foreground">
                Inicia o vídeo sem som
              </p>
            </div>
            <Switch
              id="muted"
              checked={(block as any).muted || false}
              onCheckedChange={(checked) => onUpdate({ muted: checked } as any)}
            />
          </div>
        </div>
      )}

      {(block.type === 'hero' || block.type === 'cta') && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Configurações do Botão</h4>
          
          <div>
            <Label htmlFor="buttonStyle">Estilo do Botão</Label>
            <Select 
              value={(block as any).buttonStyle || 'primary'} 
              onValueChange={(value) => onUpdate({ buttonStyle: value } as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Estilo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primário</SelectItem>
                <SelectItem value="secondary">Secundário</SelectItem>
                <SelectItem value="outline">Contorno</SelectItem>
                <SelectItem value="ghost">Fantasma</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="buttonSize">Tamanho do Botão</Label>
            <Select 
              value={(block as any).buttonSize || 'default'} 
              onValueChange={(value) => onUpdate({ buttonSize: value } as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tamanho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Pequeno</SelectItem>
                <SelectItem value="default">Padrão</SelectItem>
                <SelectItem value="lg">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};