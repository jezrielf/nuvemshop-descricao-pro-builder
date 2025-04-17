
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MetaTagFormProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  canonical: string;
  setCanonical: (value: string) => void;
  onGenerateRecommendations: () => void;
}

export const MetaTagForm: React.FC<MetaTagFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  canonical,
  setCanonical,
  onGenerateRecommendations,
}) => {
  const { toast } = useToast();

  const copyMetaTags = () => {
    const metaTags = `<title>${title}</title>
<meta name="description" content="${description}" />
${canonical ? `<link rel="canonical" href="${canonical}" />` : ''}`;
    
    navigator.clipboard.writeText(metaTags).then(() => {
      toast({
        title: "Copiado para a área de transferência",
        description: "As meta tags foram copiadas com sucesso.",
      });
    }).catch(err => {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar as meta tags.",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Meta Título</Label>
        <div className="relative">
          <Input
            id="title"
            placeholder="Digite o título da página..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="pr-16"
          />
          <div className="absolute right-3 top-2.5 text-xs text-gray-500">
            {title.length}/60
          </div>
        </div>
        <p className="text-xs text-gray-500">O título ideal tem entre 50-60 caracteres.</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Meta Descrição</Label>
        <div className="relative">
          <Textarea
            id="description"
            placeholder="Digite a descrição da página..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none"
            rows={4}
          />
          <div className="absolute right-3 bottom-3 text-xs text-gray-500">
            {description.length}/160
          </div>
        </div>
        <p className="text-xs text-gray-500">A descrição ideal tem entre 120-160 caracteres.</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="canonical">Link Canônico</Label>
        <Input
          id="canonical"
          placeholder="https://www.seusite.com/pagina-principal"
          value={canonical}
          onChange={(e) => setCanonical(e.target.value)}
        />
        <p className="text-xs text-gray-500">Ajuda a prevenir problemas de conteúdo duplicado.</p>
      </div>
      
      <div className="pt-2 flex gap-2">
        <Button onClick={onGenerateRecommendations}>
          Gerar Recomendações
        </Button>
        <Button variant="outline" onClick={copyMetaTags}>
          <Copy className="h-4 w-4 mr-2" />
          Copiar Meta Tags
        </Button>
      </div>
    </div>
  );
};
