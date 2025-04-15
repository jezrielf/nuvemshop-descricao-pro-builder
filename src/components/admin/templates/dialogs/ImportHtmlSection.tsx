
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { analyzeHtmlForTemplate, customizeBlockTypes } from '@/utils/htmlParsers';
import { ProductCategory, Template, Block, BlockType } from '@/types/editor';
import { Loader2, Edit2, Check, X } from 'lucide-react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ImportHtmlSectionProps {
  onTemplateGenerated: (template: Template) => void;
  selectedCategory: ProductCategory;
}

export const ImportHtmlSection: React.FC<ImportHtmlSectionProps> = ({
  onTemplateGenerated,
  selectedCategory,
}) => {
  const [htmlInput, setHtmlInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState<Template | null>(null);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [blockTypeMap, setBlockTypeMap] = useState<Record<string, BlockType>>({});
  const [activeTab, setActiveTab] = useState<string>('input');

  // Define available block types for selection
  const availableBlockTypes: {type: BlockType, label: string}[] = [
    { type: 'hero', label: 'Banner Principal' },
    { type: 'text', label: 'Texto' },
    { type: 'features', label: 'Recursos' },
    { type: 'benefits', label: 'Benefícios' },
    { type: 'specifications', label: 'Especificações' },
    { type: 'image', label: 'Imagem' },
    { type: 'gallery', label: 'Galeria' },
    { type: 'imageText', label: 'Imagem + Texto' },
    { type: 'textImage', label: 'Texto + Imagem' },
    { type: 'faq', label: 'Perguntas Frequentes' },
    { type: 'cta', label: 'Chamada para Ação' },
    { type: 'video', label: 'Vídeo' },
  ];

  const handleGenerateFromHtml = () => {
    if (!htmlInput.trim()) return;

    setIsGenerating(true);
    try {
      const template = analyzeHtmlForTemplate(htmlInput, selectedCategory);
      setGeneratedTemplate(template);
      setActiveTab('review');
      
      // Reset block type map
      setBlockTypeMap({});
    } catch (error) {
      console.error('Error generating template from HTML:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditBlockType = (blockId: string) => {
    setEditingBlockId(blockId);
  };

  const handleChangeBlockType = (blockId: string, newType: BlockType) => {
    setBlockTypeMap(prev => ({
      ...prev,
      [blockId]: newType
    }));
  };

  const handleSaveBlockType = (blockId: string) => {
    setEditingBlockId(null);
  };

  const handleCancelBlockEdit = (blockId: string) => {
    // Remove this block from the map if it was just added
    if (blockTypeMap[blockId]) {
      const newMap = { ...blockTypeMap };
      delete newMap[blockId];
      setBlockTypeMap(newMap);
    }
    setEditingBlockId(null);
  };

  const handleApplyTemplate = () => {
    if (!generatedTemplate) return;
    
    // Apply any block type customizations
    const finalTemplate = Object.keys(blockTypeMap).length > 0 
      ? customizeBlockTypes(generatedTemplate, blockTypeMap)
      : generatedTemplate;
    
    onTemplateGenerated(finalTemplate);
    
    // Reset state
    setHtmlInput('');
    setGeneratedTemplate(null);
    setBlockTypeMap({});
    setEditingBlockId(null);
    setActiveTab('input');
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="input">Entrada HTML</TabsTrigger>
          <TabsTrigger value="review" disabled={!generatedTemplate}>Revisar Blocos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input" className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="html-input" className="text-sm font-medium">
              Cole o HTML aqui
            </label>
            <Textarea
              id="html-input"
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Cole o código HTML aqui para gerar um template automaticamente..."
              className="min-h-[200px]"
            />
          </div>
          <Button
            onClick={handleGenerateFromHtml}
            disabled={!htmlInput.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando template...
              </>
            ) : (
              'Gerar template do HTML'
            )}
          </Button>
        </TabsContent>
        
        <TabsContent value="review">
          {generatedTemplate && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Revise os blocos gerados a partir do HTML. Você pode alterar o tipo de cada bloco se necessário.
                </AlertDescription>
              </Alert>
              
              <ScrollArea className="h-[350px] pr-4">
                <div className="space-y-4">
                  {generatedTemplate.blocks.map((block, index) => (
                    <Card key={block.id} className="overflow-hidden">
                      <CardHeader className="p-3 bg-muted/30 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium">
                          Bloco {index + 1}: {block.title || block.type}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          {editingBlockId === block.id ? (
                            <>
                              <Select 
                                value={blockTypeMap[block.id] || block.type}
                                onValueChange={(value) => handleChangeBlockType(block.id, value as BlockType)}
                              >
                                <SelectTrigger className="h-8 w-[180px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableBlockTypes.map(blockType => (
                                    <SelectItem key={blockType.type} value={blockType.type}>
                                      {blockType.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleSaveBlockType(block.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCancelBlockEdit(block.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditBlockType(block.id)}
                              className="h-8"
                            >
                              <Edit2 className="h-4 w-4 mr-2" />
                              {blockTypeMap[block.id] ? 'Mudar tipo' : 'Alterar tipo'}
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="border rounded-md p-2 bg-white">
                          <BlockRenderer 
                            block={
                              blockTypeMap[block.id] 
                                ? { ...block, type: blockTypeMap[block.id] } as Block
                                : block
                            }
                            isPreview={true} 
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="flex justify-between pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('input')}
                >
                  Voltar
                </Button>
                <Button onClick={handleApplyTemplate}>
                  Aplicar Template
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
