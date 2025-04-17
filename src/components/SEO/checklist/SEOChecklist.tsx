import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSEOChecklist } from '../hooks/useSEOChecklist';

interface SEOChecklistProps {
  description: ProductDescription | null;
}

const SEOChecklist: React.FC<SEOChecklistProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const { checklistItems, progress } = useSEOChecklist(description);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Checklist SEO</span>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Checklist SEO</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
            <Progress value={progress} className="w-24 h-2" />
          </div>
        </div>
        
        <Separator className="mb-4" />
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {checklistItems.map((section, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-md">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className={cn(
                        "flex items-start p-3 rounded-md border",
                        item.status === 'complete' && "bg-green-50 border-green-200",
                        item.status === 'warning' && "bg-yellow-50 border-yellow-200",
                        item.status === 'error' && "bg-red-50 border-red-200",
                        item.status === 'pending' && "bg-gray-50 border-gray-200"
                      )}
                    >
                      <div className="mt-0.5 mr-3">
                        {item.status === 'complete' && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {item.status === 'warning' && (
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        )}
                        {item.status === 'error' && (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                        {item.status === 'pending' && (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        {item.suggestion && (
                          <div className="mt-2 p-2 bg-white rounded border text-sm">
                            <span className="font-medium">Sugestão: </span>
                            {item.suggestion}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="mt-4 pt-4 border-t flex justify-end">
          <Button onClick={() => setOpen(false)}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SEOChecklist;
