
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';

interface MetaTagValidatorProps {
  description: ProductDescription | null;
}

const MetaTagValidator: React.FC<MetaTagValidatorProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Meta Tags</span>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden p-4">
        <DialogHeader>
          <DialogTitle>Validador de Meta Tags</DialogTitle>
          <DialogDescription>
            Analise e otimize suas meta tags para melhorar o SEO.
          </DialogDescription>
        </DialogHeader>
        {/* Content of the Meta Tag Validator */}
      </DialogContent>
    </Dialog>
  );
};

export default MetaTagValidator;
