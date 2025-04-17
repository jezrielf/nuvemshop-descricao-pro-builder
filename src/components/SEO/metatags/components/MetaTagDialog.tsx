
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductDescription } from '@/types/editor';
import { MetaTagForm } from './MetaTagForm';
import { MetaTagPreview } from './MetaTagPreview';

interface MetaTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: ProductDescription | null;
  title: string;
  setTitle: (value: string) => void;
  metaDescription: string;
  setMetaDescription: (value: string) => void;
  canonical: string;
  setCanonical: (value: string) => void;
  onGenerateRecommendations: () => void;
}

export const MetaTagDialog: React.FC<MetaTagDialogProps> = ({
  open,
  onOpenChange,
  description,
  title,
  setTitle,
  metaDescription,
  setMetaDescription,
  canonical,
  setCanonical,
  onGenerateRecommendations,
}) => {
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Validação de Meta Tags</DialogTitle>
        <DialogDescription>
          Otimize suas meta tags para melhorar o SEO e a apresentação nos resultados de busca.
        </DialogDescription>
      </DialogHeader>
      
      <Tabs defaultValue="editor">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-4 py-4">
          <MetaTagForm
            title={title}
            setTitle={setTitle}
            description={metaDescription}
            setDescription={setMetaDescription}
            canonical={canonical}
            setCanonical={setCanonical}
            onGenerateRecommendations={onGenerateRecommendations}
          />
        </TabsContent>
        
        <TabsContent value="preview" className="py-4">
          <MetaTagPreview
            title={title}
            description={metaDescription}
            canonical={canonical}
          />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};
