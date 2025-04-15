
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useEditorStore } from '@/store/editor';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { HtmlOutputTab } from './HtmlOutputTab';
import { ProductsTab } from './ProductsTab';
import { useNuvemshopProducts } from '@/hooks/useNuvemshopProducts';

const HtmlOutputDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [viewType, setViewType] = useState<'html' | 'products'>('html');
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const { getHtmlOutput } = useEditorStore();
  
  const {
    products,
    isLoading,
    error
  } = useNuvemshopProducts(selectedStoreId);

  const htmlOutput = getHtmlOutput();

  const handleStoreSelect = (storeId: number) => {
    setSelectedStoreId(storeId);
  };

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
          <DialogTitle>Visualização do Produto na Nuvemshop</DialogTitle>
          <DialogDescription>
            Visualize o HTML da descrição ou os produtos da sua loja.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={viewType} onValueChange={(value) => setViewType(value as 'html' | 'products')} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="html">
            <HtmlOutputTab htmlOutput={htmlOutput} />
          </TabsContent>
          
          <TabsContent value="products">
            <ProductsTab 
              selectedStoreId={selectedStoreId}
              onStoreSelect={handleStoreSelect}
              products={products || []}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HtmlOutputDialog;
