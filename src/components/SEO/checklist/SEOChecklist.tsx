
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSEOChecklist } from './hooks/useSEOChecklist';
import { CategoryChecks } from './components/CategoryChecks';
import { X } from 'lucide-react';

interface SEOChecklistProps {
  description: ProductDescription | null;
}

const SEOChecklist: React.FC<SEOChecklistProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const { checklistItems, progress } = useSEOChecklist(description);
  
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
          Checklist SEO
        </button>
      </DialogTrigger>
      <DialogContent 
        className="max-w-md p-0 overflow-visible border rounded-md shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Checklist SEO</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
            <Progress value={progress} className="w-24 h-2" />
          </div>
        </div>
        
        <div className="p-4">
          {checklistItems.map((section) => (
            <div key={section.title} className="mb-4">
              <h3 className="font-medium text-sm text-gray-700 mb-2">{section.title}</h3>
              {section.items.map((item) => (
                <CategoryChecks key={item.id} check={item} />
              ))}
            </div>
          ))}
        </div>
        
        <div className="border-t p-3 flex justify-end">
          <Button variant="default" className="px-4" onClick={() => setOpen(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SEOChecklist;
