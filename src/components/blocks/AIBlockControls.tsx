import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/store/editor';
import { Wand2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AIBlock } from '@/types/editor/blocks/ai';

interface AIBlockControlsProps {
  blockId: string;
  currentBlock: AIBlock;
}

const AIBlockControls: React.FC<AIBlockControlsProps> = ({ blockId, currentBlock }) => {
  const { updateBlock } = useEditorStore();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState(currentBlock.heading || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [open, setOpen] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Prompt vazio",
        description: "Por favor, descreva o conteúdo que deseja gerar.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate API call for now - in a real app this would call an AI service
      setTimeout(() => {
        // Generate placeholder content based on prompt
        const content = `
          <p>Este é um conteúdo de exemplo gerado com base no seu prompt: <strong>${prompt}</strong></p>
          <p>Em uma implementação real, este conteúdo seria gerado por uma API de inteligência artificial.</p>
          <ul>
            <li>Ponto importante 1</li>
            <li>Ponto importante 2</li>
            <li>Ponto importante 3</li>
          </ul>
        `;

        // Update the block with generated content
        updateBlock(blockId, {
          heading: title || 'Conteúdo Gerado por IA',
          content,
          layout: currentBlock.layout || 'modern',
          colorScheme: currentBlock.colorScheme || 'default'
        });

        toast({
          title: "Conteúdo gerado",
          description: "O conteúdo foi gerado com sucesso!",
        });

        setIsGenerating(false);
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Erro ao gerar conteúdo",
        description: "Ocorreu um erro ao gerar o conteúdo. Tente novamente.",
        variant: "destructive"
      });
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Wand2 className="mr-2 h-4 w-4" /> 
          Gerar conteúdo com IA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gerar conteúdo com IA</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Título
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título para o bloco"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-1">
              Descrição do conteúdo
            </label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Descreva o conteúdo que deseja gerar..."
              className="w-full min-h-[100px]"
            />
          </div>
          <Button 
            type="button" 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Gerar conteúdo
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIBlockControls;
