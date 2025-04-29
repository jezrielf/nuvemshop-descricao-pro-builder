
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Template } from '@/types/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { generateCompleteHtml } from '@/store/editor/outputActions/htmlOutputGenerator';
import { Badge } from '@/components/ui/badge';
import { getCategoryName } from '../utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code } from 'lucide-react';

interface PreviewTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  template: Template;
}

export const PreviewTemplateDialog: React.FC<PreviewTemplateDialogProps> = ({
  open,
  onClose,
  template,
}) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [showHtml, setShowHtml] = useState(false);
  
  // Generate HTML preview if needed - structure the EditorState properly for the function
  const htmlPreview = showHtml ? generateCompleteHtml({
    description: {
      blocks: template.blocks,
      id: template.id,
      name: template.name,
      createdAt: '',
      updatedAt: ''
    }
  }, template.name) : '';
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Visualizar Template</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            {template.name} 
            <Badge variant="outline">{getCategoryName(template.category)}</Badge>
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Visualização</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-4">
            <ScrollArea className="h-[500px] border rounded-md p-4">
              {template.blocks && template.blocks.length > 0 ? (
                <div className="space-y-6">
                  {template.blocks.map((block) => (
                    <div key={block.id} className="border-b pb-6">
                      <BlockRenderer block={block} isPreview={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <p className="text-muted-foreground">Este template não possui blocos para exibir.</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="html" className="mt-4">
            <div className="flex justify-end mb-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowHtml(true)}
                disabled={showHtml}
              >
                <Code className="h-4 w-4 mr-2" />
                Gerar HTML
              </Button>
            </div>
            
            <ScrollArea className="h-[500px] border rounded-md">
              {showHtml ? (
                <pre className="p-4 text-xs bg-muted overflow-x-auto">{htmlPreview}</pre>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Clique em "Gerar HTML" para ver o código HTML deste template.</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
