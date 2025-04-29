
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useEditorStore } from '@/store/editor';
import { HtmlOutputTab } from './HtmlOutputTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { extractKeywords } from '@/utils/seoUtils';
import { Badge } from '@/components/ui/badge';

const HtmlOutputDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { getHtmlOutput, description } = useEditorStore();

  const htmlOutput = getHtmlOutput();
  
  // Extract keywords when the dialog is opened
  const keywords = description ? extractKeywords(description) : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Ver HTML
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Visualização do HTML</DialogTitle>
          <DialogDescription>
            Visualize o HTML da descrição e análise SEO.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="seo">Análise SEO</TabsTrigger>
          </TabsList>
          
          <TabsContent value="html">
            <HtmlOutputTab htmlOutput={htmlOutput} />
          </TabsContent>
          
          <TabsContent value="seo">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Palavras-chave Detectadas</h3>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="outline">{keyword}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Recomendações SEO</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Adicione o título do produto como principal H1 ao salvar na Nuvemshop</li>
                  <li>• Use as palavras-chave acima nos primeiros parágrafos</li>
                  <li>• Adicione texto ALT em todas as imagens</li>
                  <li>• Mantenha uma densidade de palavras-chave entre 1-2%</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HtmlOutputDialog;
