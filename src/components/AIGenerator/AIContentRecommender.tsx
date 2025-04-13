
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProductDescription } from '@/types/editor';
import { useEditorStore } from '@/store/editor';

interface AIContentRecommenderProps {
  description: ProductDescription | null;
}

const AIContentRecommender: React.FC<AIContentRecommenderProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const { updateBlock } = useEditorStore();
  const { toast } = useToast();

  const generateRecommendations = async () => {
    if (!description) {
      toast({
        title: "Nenhuma descrição",
        description: "Você precisa criar uma descrição primeiro",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setRecommendations([]);

    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock response - in a real implementation, this would come from an AI service
      const mockRecommendations = [
        "Adicione uma seção de FAQ para melhorar o SEO e ajudar a responder dúvidas comuns dos clientes.",
        "Inclua mais detalhes técnicos sobre o produto para usuários que buscam informações específicas.",
        "Considere adicionar depoimentos de clientes para aumentar a credibilidade.",
        "Utilize palavras-chave relacionadas ao produto para melhorar a visibilidade em buscas.",
        "Inclua informações sobre garantia e política de devolução para transmitir confiança."
      ];

      setRecommendations(mockRecommendations);
    } catch (error) {
      // Convert error to string explicitly to avoid the unknown type error
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast({
        title: "Erro ao gerar recomendações",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const applyRecommendation = (recommendation: string) => {
    // Basic implementation: Add a text block with the recommendation
    const newBlock = {
      id: Math.random().toString(36).substring(7),
      type: 'text' as const, // Fixed: Explicitly define as literal type
      title: 'Recomendação IA',
      columns: 1,
      visible: true,
      content: `<p>${recommendation}</p>`
    };

    if (description) {
      updateBlock(newBlock.id, newBlock);
      toast({
        title: "Recomendação aplicada",
        description: "Um novo bloco de texto foi adicionado com a recomendação.",
      });
    } else {
      toast({
        title: "Erro ao aplicar recomendação",
        description: "Nenhuma descrição disponível para adicionar a recomendação.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Lightbulb className="h-4 w-4 mr-1" />
          Recomendações IA
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Recomendações de Conteúdo IA</DialogTitle>
          <DialogDescription>
            Gere recomendações de conteúdo para melhorar sua descrição.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando recomendações...
            </div>
          ) : (
            <>
              {recommendations.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {rec}
                      <Button variant="ghost" size="sm" onClick={() => applyRecommendation(rec)}>
                        Aplicar
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  Clique no botão abaixo para gerar recomendações de conteúdo.
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={generateRecommendations} disabled={loading}>
            Gerar Recomendações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIContentRecommender;
