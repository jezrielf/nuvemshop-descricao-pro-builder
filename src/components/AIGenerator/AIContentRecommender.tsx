import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';

interface AIContentRecommenderProps {
  description: ProductDescription | null;
}

const AIContentRecommender: React.FC<AIContentRecommenderProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Recomendações de IA</span>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Recomendações de Conteúdo por IA</DialogTitle>
          <DialogDescription>
            Sugestões inteligentes para melhorar o conteúdo da sua descrição de produto.
          </DialogDescription>
        </DialogHeader>
        
        {/* Content for AI recommender would go here */}
        <div className="py-4">
          {!description ? (
            <p className="text-center text-muted-foreground">
              Crie uma descrição primeiro para receber recomendações de IA.
            </p>
          ) : (
            <p className="text-center">
              Análise de conteúdo e recomendações seriam exibidas aqui.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIContentRecommender;
