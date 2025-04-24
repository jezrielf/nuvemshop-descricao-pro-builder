
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSEOChecklist } from './hooks/useSEOChecklist';
import { CategoryChecks } from './components/CategoryChecks';
import { ResourcesList } from './components/ResourcesList';
import { ScoreCard } from './components/ScoreCard';
import { EmptyState } from './components/EmptyState';

interface SEOChecklistProps {
  description: ProductDescription | null;
}

const SEOChecklist: React.FC<SEOChecklistProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const { checklistData, runChecklist } = useSEOChecklist(description);
  
  React.useEffect(() => {
    if (open && description) {
      runChecklist();
    }
  }, [open, description, runChecklist]);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Checklist SEO</span>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden p-4">
        <DialogHeader>
          <DialogTitle>Checklist de SEO</DialogTitle>
          <DialogDescription>
            Verifique se sua descrição atende às melhores práticas de SEO.
          </DialogDescription>
        </DialogHeader>
        
        {!description ? (
          <EmptyState message="Crie uma descrição para utilizar o checklist de SEO" />
        ) : (
          <div className="flex-grow overflow-hidden mt-4">
            <Tabs defaultValue="checklist" className="h-full flex flex-col">
              <TabsList>
                <TabsTrigger value="checklist">Checklist</TabsTrigger>
                <TabsTrigger value="resources">Recursos</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-auto pt-4">
                <TabsContent value="checklist" className="h-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                  
                  <CategoryChecks 
                    title="Conteúdo"
                    checks={checklistData.contentChecks}
                  />
                  
                  <CategoryChecks 
                    title="Técnico"
                    checks={checklistData.technicalChecks}
                  />
                </TabsContent>
                
                <TabsContent value="resources">
                  <ResourcesList />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SEOChecklist;
