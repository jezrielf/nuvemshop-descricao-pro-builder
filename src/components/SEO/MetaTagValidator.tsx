
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle, AlertCircle, Tag, Info, Copy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ProductDescription } from '@/types/editor';

interface MetaTagValidatorProps {
  description: ProductDescription | null;
}

const MetaTagValidator: React.FC<MetaTagValidatorProps> = ({ description }) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description_, setDescription] = React.useState('');
  const [canonical, setCanonical] = React.useState('');
  const { toast } = useToast();
  
  // Generate recommended meta tags based on description
  const generateRecommendedMetaTags = () => {
    if (!description) return;
    
    // Generate title from description name
    const generatedTitle = description.name;
    setTitle(generatedTitle);
    
    // Generate description from content
    let contentText = '';
    description.blocks.forEach(block => {
      if (block.type === 'text' && 'content' in block) {
        const plainText = block.content.replace(/<[^>]+>/g, ' ');
        contentText += plainText + ' ';
      }
      else if (block.type === 'hero' && 'subheading' in block) {
        contentText += block.subheading + ' ';
      }
    });
    
    // Trim and limit to 160 characters
    contentText = contentText.trim();
    if (contentText.length > 160) {
      contentText = contentText.substring(0, 157) + '...';
    }
    
    setDescription(contentText);
  };
  
  // Sample meta tag validation checks
  const validateMetaTags = () => {
    const checks = [
      {
        id: 'title-present',
        title: 'Meta título presente',
        status: title ? 'pass' : 'fail',
        description: title ? 'A página tem um meta título definido' : 'A página não tem um meta título definido'
      },
      {
        id: 'title-length',
        title: 'Comprimento do título',
        status: title.length > 10 && title.length <= 60 ? 'pass' : title.length > 60 ? 'fail' : 'warning',
        description: title.length > 60 
          ? `O título tem ${title.length} caracteres, o ideal é até 60` 
          : title.length <= 10 && title.length > 0
            ? 'O título é muito curto, o ideal é entre 50-60 caracteres'
            : title.length === 0
              ? 'Título não definido'
              : `O título tem ${title.length} caracteres, bom comprimento`
      },
      {
        id: 'description-present',
        title: 'Meta descrição presente',
        status: description_ ? 'pass' : 'fail',
        description: description_ ? 'A página tem uma meta descrição definida' : 'A página não tem uma meta descrição definida'
      },
      {
        id: 'description-length',
        title: 'Comprimento da descrição',
        status: description_.length > 50 && description_.length <= 160 ? 'pass' : description_.length > 160 ? 'warning' : 'fail',
        description: description_.length > 160 
          ? `A descrição tem ${description_.length} caracteres, o ideal é até 160` 
          : description_.length <= 50 && description_.length > 0
            ? 'A descrição é muito curta, o ideal é entre 120-160 caracteres'
            : description_.length === 0
              ? 'Descrição não definida'
              : `A descrição tem ${description_.length} caracteres, bom comprimento`
      },
      {
        id: 'canonical-present',
        title: 'Link canônico',
        status: canonical ? 'pass' : 'warning',
        description: canonical 
          ? 'A página tem um link canônico definido' 
          : 'Recomendamos definir um link canônico para evitar conteúdo duplicado'
      },
      {
        id: 'canonical-valid',
        title: 'URL canônica válida',
        status: canonical && isValidUrl(canonical) ? 'pass' : canonical ? 'fail' : 'warning',
        description: canonical 
          ? isValidUrl(canonical)
            ? 'A URL canônica é válida'
            : 'A URL canônica não parece ser válida'
          : 'URL canônica não definida'
      }
    ];
    
    return checks;
  };
  
  // Helper function to check if a URL is valid
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  // Function to copy meta tags to clipboard
  const copyMetaTags = () => {
    const metaTags = `<title>${title}</title>
<meta name="description" content="${description_}" />
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
  
  const getStatusIcon = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  // Effect to auto-generate meta tags when the dialog opens
  React.useEffect(() => {
    if (open && description) {
      generateRecommendedMetaTags();
    }
  }, [open, description]);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Tag className="h-4 w-4 mr-1" />
          Meta Tags
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Validação de Meta Tags</DialogTitle>
          <DialogDescription>
            Otimize suas meta tags para melhorar o SEO e a apresentação nos resultados de busca.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="editor">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="space-y-4 py-4">
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
                  value={description_}
                  onChange={(e) => setDescription(e.target.value)}
                  className="resize-none"
                  rows={4}
                />
                <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                  {description_.length}/160
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
              <Button onClick={generateRecommendedMetaTags}>
                Gerar Recomendações
              </Button>
              <Button variant="outline" onClick={copyMetaTags}>
                <Copy className="h-4 w-4 mr-2" />
                Copiar Meta Tags
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="py-4">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Validação</h3>
                    {validateMetaTags().map(check => (
                      <div key={check.id} className="flex items-start space-x-2 py-2 border-b last:border-0">
                        <div className="pt-0.5">
                          {getStatusIcon(check.status)}
                        </div>
                        <div>
                          <h4 className="font-medium">{check.title}</h4>
                          <p className="text-sm text-gray-600">{check.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Pré-visualização no Google</h3>
                    <div className="border rounded-md p-4 space-y-1">
                      <div className="text-blue-800 text-xl font-medium line-clamp-1">
                        {title || 'Título da sua página'}
                      </div>
                      <div className="text-green-700 text-sm">
                        {canonical || 'www.seusite.com/sua-pagina'}
                      </div>
                      <div className="text-gray-600 text-sm line-clamp-2">
                        {description_ || 'A descrição da sua página aparecerá aqui. Uma boa descrição resume o conteúdo da página e inclui palavras-chave relevantes.'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Dicas para otimização:</h3>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                      <li>Inclua palavras-chave relevantes no início do título e da descrição</li>
                      <li>Cada página deve ter um título e descrição únicos</li>
                      <li>O título deve descrever com precisão o conteúdo da página</li>
                      <li>A descrição deve resumir o conteúdo e incentivar o clique</li>
                      <li>Use URLs descritivas que incluam palavras-chave</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MetaTagValidator;
