import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProductDescription } from '@/types/editor';
import { useEditorStore } from '@/store/editor';
import { BlockType, ColumnLayout } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

interface AIContentRecommenderProps {
  description: ProductDescription | null;
}

const AIContentRecommender: React.FC<AIContentRecommenderProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const { addBlock, updateBlock } = useEditorStore();
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
    // Fixed implementation: Add a text block with the recommendation
    if (!description) {
      toast({
        title: "Erro ao aplicar recomendação",
        description: "Nenhuma descrição disponível para adicionar a recomendação.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new block based on the recommendation content
    const blockId = uuidv4();
    
    // Determine block type based on recommendation content
    let blockType: BlockType = 'text';
    let blockTitle = 'Recomendação IA';
    let blockContent = recommendation;
    
    // Check content to determine if we should create a specialized block
    if (recommendation.toLowerCase().includes('faq') || recommendation.toLowerCase().includes('perguntas')) {
      blockType = 'faq';
      blockTitle = 'Perguntas Frequentes';
      // For FAQ blocks, we need to create a proper structure
      addBlock({
        id: blockId,
        type: blockType,
        title: blockTitle,
        columns: 1 as ColumnLayout,
        visible: true,
        heading: 'Perguntas Frequentes',
        questions: [
          {
            id: uuidv4(),
            question: 'Qual é a garantia deste produto?',
            answer: 'Oferecemos garantia de 12 meses para todos os nossos produtos.'
          },
          {
            id: uuidv4(),
            question: 'Como funciona a entrega?',
            answer: 'Enviamos para todo o Brasil via transportadoras e Correios.'
          }
        ]
      });
    } else {
      // For standard text blocks
      addBlock({
        id: blockId,
        type: blockType,
        title: blockTitle,
        columns: 1 as ColumnLayout,
        visible: true,
        heading: getHeadingFromRecommendation(recommendation),
        content: `<p>${recommendation}</p>`
      });
    }

    toast({
      title: "Recomendação aplicada",
      description: `Um novo bloco do tipo ${blockType} foi adicionado com a recomendação.`,
    });
    
    // Close the dialog after applying
    setOpen(false);
  };
  
  // Helper function to generate a heading from the recommendation
  const getHeadingFromRecommendation = (recommendation: string): string => {
    // Extract first sentence or part of it as heading
    const firstSentence = recommendation.split('.')[0];
    if (firstSentence.length > 50) {
      return firstSentence.substring(0, 50) + '...';
    }
    return firstSentence;
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
                    <li key={index} className="flex items-start justify-between group">
                      <span className="mr-2">{rec}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => applyRecommendation(rec)}
                        className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                      >
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
