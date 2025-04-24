
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSEOChecklist } from './hooks/useSEOChecklist';
import { CategoryChecks } from './components/CategoryChecks';
import { ResourcesList } from './components/ResourcesList';
import { ScoreCard } from './components/ScoreCard';
import { EmptyState } from './components/EmptyState';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SEOChecklistProps {
  description: ProductDescription | null;
}

const SEOChecklist: React.FC<SEOChecklistProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const { checklistItems, progress, checklistData, runChecklist } = useSEOChecklist(description);
  
  useEffect(() => {
    if (open && description) {
      runChecklist();
    }
  }, [open, description, runChecklist]);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Checklist SEO</span>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Checklist de SEO</DialogTitle>
          <DialogDescription>
            Verifique se sua descrição atende às melhores práticas de SEO.
          </DialogDescription>
        </DialogHeader>
        
        {!description ? (
          <div className="p-4">
            <EmptyState message="Crie uma descrição para utilizar o checklist de SEO" />
          </div>
        ) : (
          <div className="flex-grow flex flex-col h-full overflow-hidden">
            <Tabs defaultValue="checklist" className="flex flex-col h-full">
              <div className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="checklist" className="flex-1">Checklist</TabsTrigger>
                  <TabsTrigger value="resources" className="flex-1">Recursos</TabsTrigger>
                </TabsList>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <TabsContent value="checklist" className="mt-0 m-0 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <ScoreCard 
                      title="Score Geral" 
                      score={checklistData.overallScore} 
                      maxScore={100} 
                    />
                    <ScoreCard 
                      title="Conteúdo" 
                      score={checklistData.contentScore} 
                      maxScore={100} 
                    />
                    <ScoreCard 
                      title="Técnico" 
                      score={checklistData.technicalScore} 
                      maxScore={100} 
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <CategoryChecks 
                      title="content"
                      checks={checklistData.contentChecks}
                    />
                    
                    <CategoryChecks 
                      title="technical"
                      checks={checklistData.technicalChecks}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="resources" className="mt-0 m-0">
                  <ResourcesList />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SEOChecklist;
