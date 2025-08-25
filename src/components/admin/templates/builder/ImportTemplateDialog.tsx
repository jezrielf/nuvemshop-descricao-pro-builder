import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Template } from '@/types/editor';
import { HtmlImportTab } from './import/HtmlImportTab';
import { ProductImportTab } from './import/ProductImportTab';
import { UrlImportTab } from './import/UrlImportTab';
import { JsonImportTab } from './import/JsonImportTab';

interface ImportTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (template: Template) => void;
}

export const ImportTemplateDialog: React.FC<ImportTemplateDialogProps> = ({
  open,
  onOpenChange,
  onImport
}) => {
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async (template: Template) => {
    setIsImporting(true);
    try {
      onImport(template);
      onOpenChange(false);
    } catch (error) {
      console.error('Error importing template:', error);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Importar Template</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="html" className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="product">Produto</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>
          
          <TabsContent value="html" className="space-y-4">
            <HtmlImportTab 
              onImport={handleImport}
              isImporting={isImporting}
            />
          </TabsContent>
          
          <TabsContent value="product" className="space-y-4">
            <ProductImportTab 
              onImport={handleImport}
              isImporting={isImporting}
            />
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <UrlImportTab 
              onImport={handleImport}
              isImporting={isImporting}
            />
          </TabsContent>
          
          <TabsContent value="json" className="space-y-4">
            <JsonImportTab 
              onImport={handleImport}
              isImporting={isImporting}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};