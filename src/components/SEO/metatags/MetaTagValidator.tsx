
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';

interface MetaTagValidatorProps {
  description: ProductDescription | null;
}

const MetaTagValidator: React.FC<MetaTagValidatorProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className="w-full text-left py-1.5 px-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={handleClick}
        >
          Meta Tags
        </button>
      </DialogTrigger>
      <DialogContent 
        className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Validador de Meta Tags</h2>
        {/* Content of the Meta Tag Validator */}
      </DialogContent>
    </Dialog>
  );
};

export default MetaTagValidator;
