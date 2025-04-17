
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
        className="max-w-sm p-0 overflow-auto max-h-[85vh] border rounded-md shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-base font-semibold">Checklist SEO</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">{Math.round(progress)}%</span>
            <Progress value={progress} className="w-16 h-1.5" />
          </div>
        </div>
        
        <div className="p-3">
          {checklistItems.map((section) => (
            <div key={section.title} className="mb-3">
              <h3 className="font-medium text-xs text-gray-700 mb-1">{section.title}</h3>
              {section.items.map((item) => (
                <CategoryChecks key={item.id} check={item} />
              ))}
            </div>
          ))}
        </div>
        
        <div className="border-t p-2 flex justify-end">
          <Button variant="default" size="sm" className="px-2 py-1 h-auto text-xs" onClick={() => setOpen(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SEOChecklist;
