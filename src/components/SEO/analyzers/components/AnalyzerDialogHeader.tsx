
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export const AnalyzerDialogHeader: React.FC = () => {
  return (
    <DialogHeader>
      <DialogTitle>Análise de SEO</DialogTitle>
      <DialogDescription>
        Analise sua descrição para melhorar o posicionamento nos mecanismos de busca.
      </DialogDescription>
    </DialogHeader>
  );
};
