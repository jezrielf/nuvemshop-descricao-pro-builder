
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { List } from 'lucide-react';
import { ProductDescription } from '@/types/editor';
import { ScoreCard } from './components/ScoreCard';
import { CategoryChecks } from './components/CategoryChecks';
import { ResourcesList } from './components/ResourcesList';
import { EmptyState } from './components/EmptyState';
import { useSEOChecks } from './hooks/useSEOChecks';

interface SEOChecklistProps {
  description: ProductDescription | null;
}

const SEOChecklist: React.FC<SEOChecklistProps> = ({ description }) => {
  const [open, setOpen] = React.useState(false);
  const { scoreItem, checksByCategory } = useSEOChecks(description);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <List className="h-4 w-4 mr-1" />
          Checklist SEO
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Checklist de SEO</DialogTitle>
          <DialogDescription>
            Verifique se sua descrição de produto atende às melhores práticas de SEO.
          </DialogDescription>
        </DialogHeader>
        
        {!description ? (
          <EmptyState />
        ) : (
          <ScrollArea className="h-[60vh]">
            <div className="space-y-6 p-1">
              {/* Overall score */}
              {scoreItem && <ScoreCard check={scoreItem} />}
              
              {/* Categorized checks */}
              {checksByCategory.map(({ category, items }) => (
                <CategoryChecks 
                  key={category} 
                  category={category} 
                  checks={items} 
                />
              ))}
              
              {/* Resources */}
              <ResourcesList />
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SEOChecklist;
