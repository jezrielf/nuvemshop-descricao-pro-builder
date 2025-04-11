
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AIContentGeneratorProps {
  onGeneratedContent: (content: string) => void;
  type: 'title' | 'description' | 'benefits' | 'features';
  placeholder?: string;
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({
  onGeneratedContent,
  type,
  placeholder = 'Descreva seu produto...'
}) => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  
  const generatePrompt = () => {
    let systemPrompt = '';
    
    switch (type) {
      case 'title':
        systemPrompt = 'Gere um título atrativo e conciso para um produto com base na descrição.';
        break;
      case 'description':
        systemPrompt = 'Crie uma descrição detalhada e persuasiva para um produto com base nas informações fornecidas.';
        break;
      case 'benefits':
        systemPrompt = 'Liste 3-5 benefícios principais deste produto em formato de lista, com títulos e descrições curtas.';
        break;
      case 'features':
        systemPrompt = 'Liste 3-5 características técnicas ou recursos deste produto em formato de lista, com títulos e descrições curtas.';
        break;
      default:
        systemPrompt = 'Gere conteúdo de qualidade baseado na descrição do produto.';
    }
    
    return `${systemPrompt}\n\nInformações do produto: ${prompt}`;
  };
  
  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, descreva seu produto para gerar conteúdo.",
        variant: "destructive"
      });
      return;
    }
    
    // Check premium status for certain features
    if (!auth.isPremium() && (type === 'benefits' || type === 'features')) {
      toast({
        title: "Recurso Premium",
        description: "A geração de benefícios e características está disponível apenas para contas premium.",
        variant: "destructive"
      });
      return;
    }
    
    setGenerating(true);
    
    try {
      // Simulating API call for demo purposes
      // In a real implementation, you would call an AI service API here
      setTimeout(() => {
        let result = '';
        
        switch (type) {
          case 'title':
            result = `${prompt.split(' ').slice(0, 2).join(' ')} Premium - Nova Versão 2025`;
            break;
          case 'description':
            result = `Este produto incrível foi projetado para oferecer o máximo de desempenho e conforto. 
            Fabricado com materiais de alta qualidade, ele garante durabilidade e resistência. 
            Ideal para uso diário, este ${prompt.toLowerCase()} vai transformar sua experiência.`;
            break;
          case 'benefits':
            result = JSON.stringify([
              { title: "Durabilidade Superior", description: "Construído para durar, com materiais premium." },
              { title: "Desempenho Otimizado", description: "Resultados excepcionais em todas as condições." },
              { title: "Conforto Garantido", description: "Design ergonômico para maior conforto." }
            ]);
            break;
          case 'features':
            result = JSON.stringify([
              { title: "Material Premium", description: "Fabricado com componentes de alta qualidade." },
              { title: "Tecnologia Avançada", description: "Incorpora os mais recentes avanços tecnológicos." },
              { title: "Design Inovador", description: "Desenvolvimento pensando na melhor experiência." }
            ]);
            break;
          default:
            result = `Conteúdo gerado para: ${prompt}`;
        }
        
        setGeneratedContent(result);
        setGenerating(false);
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Erro ao gerar conteúdo",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
      setGenerating(false);
    }
  };
  
  const handleApply = () => {
    onGeneratedContent(generatedContent);
    setOpen(false);
    
    toast({
      title: "Conteúdo aplicado",
      description: "O conteúdo gerado foi aplicado com sucesso.",
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 flex items-center text-blue-600">
          <Sparkles className="h-4 w-4 mr-1" />
          Gerar com IA
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Gerar conteúdo com IA</DialogTitle>
          <DialogDescription>
            Descreva seu produto para gerar {
              type === 'title' ? 'um título' :
              type === 'description' ? 'uma descrição' :
              type === 'benefits' ? 'benefícios' :
              'características'
            } automaticamente.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição do produto</label>
            <Textarea
              placeholder={placeholder}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={generating || !prompt}
            className="w-full"
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Gerar conteúdo
              </>
            )}
          </Button>
          
          {generatedContent && (
            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium">Conteúdo gerado</label>
              <div className="p-3 bg-gray-50 border rounded-md max-h-40 overflow-y-auto">
                {type === 'benefits' || type === 'features' ? (
                  <ul className="list-disc list-inside space-y-1">
                    {JSON.parse(generatedContent).map((item: any, index: number) => (
                      <li key={index}>
                        <strong>{item.title}</strong>: {item.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{generatedContent}</p>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleApply}>
                  Aplicar
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIContentGenerator;
