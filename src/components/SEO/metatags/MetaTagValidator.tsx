import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
        <h2 className="text-xl font-bold mb-4">Validador de Meta Tags</h2>
        {/* Content of the Meta Tag Validator */}
      </DialogContent>
    </Dialog>
  );
};

export default MetaTagValidator;
