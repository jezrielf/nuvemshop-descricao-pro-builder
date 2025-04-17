
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useEditorStore } from '@/store/editor';
import { HtmlOutputTab } from './HtmlOutputTab';
import SEOTools from '@/components/SEO/SEOTools';

const HtmlOutputDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { description, getHtmlOutput } = useEditorStore();

  const htmlOutput = getHtmlOutput();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-2">
        <DialogTrigger asChild>
          <Button variant="default" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Ver HTML
          </Button>
        </DialogTrigger>
        
        {description && (
          <SEOTools description={description} />
        )}
      </div>
      
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Visualização do HTML</DialogTitle>
          <DialogDescription>
            Visualize o HTML da descrição.
          </DialogDescription>
        </DialogHeader>
        
        <HtmlOutputTab htmlOutput={htmlOutput} />
      </DialogContent>
    </Dialog>
  );
};

export default HtmlOutputDialog;
