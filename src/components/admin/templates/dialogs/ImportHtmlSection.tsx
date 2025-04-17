
import React, { useState } from 'react';
import { Template, ProductCategory, Block, BlockType } from '@/types/editor';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { analyzeHtmlForTemplate, customizeBlockTypes } from '@/utils/htmlParsers/htmlTemplateAnalyzer';
import { HtmlInputTab } from './import/HtmlInputTab';
import { ReviewBlocksTab } from './import/ReviewBlocksTab';

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

  const handleGenerateFromHtml = () => {
    if (!htmlInput.trim()) return;

    setIsGenerating(true);
    try {
      const template = analyzeHtmlForTemplate(htmlInput, selectedCategory);
      setGeneratedTemplate(template);
      setActiveTab('review');
      setBlockTypeMap({});
    } catch (error) {
      console.error('Error generating template from HTML:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyTemplate = () => {
    if (!generatedTemplate) return;
    
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
          <TabsTrigger value="review" disabled={!generatedTemplate}>
            Revisar Blocos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="input">
          <HtmlInputTab
            htmlInput={htmlInput}
            isGenerating={isGenerating}
            onHtmlChange={setHtmlInput}
            onGenerate={handleGenerateFromHtml}
          />
        </TabsContent>
        
        <TabsContent value="review">
          <ReviewBlocksTab
            template={generatedTemplate}
            editingBlockId={editingBlockId}
            blockTypeMap={blockTypeMap}
            onEditBlock={setEditingBlockId}
            onChangeBlockType={(id, type) => setBlockTypeMap(prev => ({ ...prev, [id]: type }))}
            onSaveBlockType={() => setEditingBlockId(null)}
            onCancelBlockEdit={(id) => {
              if (blockTypeMap[id]) {
                const newMap = { ...blockTypeMap };
                delete newMap[id];
                setBlockTypeMap(newMap);
              }
              setEditingBlockId(null);
            }}
            onBack={() => setActiveTab('input')}
            onApply={handleApplyTemplate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
