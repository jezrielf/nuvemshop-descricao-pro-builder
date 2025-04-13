
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle, AlertCircle, Tag, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductDescription } from '@/types/editor';

interface MetaTagValidatorProps {
  description: ProductDescription | null;
}

const MetaTagValidator: React.FC<MetaTagValidatorProps> = ({ description }) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description_, setDescription] = React.useState('');
  const [canonical, setCanonical] = React.useState('');
  
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
  
  // Function to generate recommended meta tags based on description
  const generateRecommendedTags = () => {
    if (!description) return { title: '', description: '' };
    
    // Extract potential title from first hero or heading
    let recommendedTitle = '';
    let recommendedDescription = '';
    
    // Look for a hero block first
    const heroBlock = description.blocks.find(block => block.type === 'hero');
    if (heroBlock && 'heading' in heroBlock) {
      recommendedTitle = heroBlock.heading || '';
      if ('subheading' in heroBlock) {
        recommendedDescription = heroBlock.subheading || '';
      }
    } 
    
    // If no hero, try to find another block with a heading
    if (!recommendedTitle) {
      const blockWithHeading = description.blocks.find(block => 'heading' in block && block.heading);
      if (blockWithHeading && 'heading' in blockWithHeading) {
        recommendedTitle = blockWithHeading.heading || '';
      }
    }
    
    // If still no description, look for a text block
    if (!recommendedDescription) {
      const textBlock = description.blocks.find(block => block.type === 'text');
      if (textBlock && 'content' in textBlock) {
        // Strip HTML and get first 160 chars
        const text = textBlock.content.replace(/<[^>]+>/g, ' ').trim();
        recommendedDescription = text.substring(0, 160);
        if (text.length > 160) recommendedDescription += '...';
      }
    }
    
    return {
      title: recommendedTitle,
      description: recommendedDescription
    };
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800';
      case 'fail':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  // Generate recommended tags
  const recommendedTags = generateRecommendedTags();
  
  // Use recommended tags as default if no user input
  React.useEffect(() => {
    if (recommendedTags.title && !title) {
      setTitle(recommendedTags.title);
    }
    if (recommendedTags.description && !description_) {
      setDescription(recommendedTags.description);
    }
  }, [recommendedTags, title, description_]);
  
  // Validation checks
  const checks = validateMetaTags();
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Tag className="h-4 w-4 mr-1" />
          Validar Meta Tags
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Validação de Meta Tags</DialogTitle>
          <DialogDescription>
            Defina e valide as meta tags essenciais para SEO.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="editor" className="flex flex-col h-[60vh]">
          <TabsList className="w-full">
            <TabsTrigger value="editor" className="flex-1">Editor de Meta Tags</TabsTrigger>
            <TabsTrigger value="validation" className="flex-1">Validação</TabsTrigger>
            <TabsTrigger value="preview" className="flex-1">Pré-visualização</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="flex-grow overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="meta-title">Meta Título</Label>
                    <span className={`text-xs ${title.length > 60 ? 'text-red-500' : 'text-gray-500'}`}>
                      {title.length}/60
                    </span>
                  </div>
                  <Input 
                    id="meta-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Digite o título da página (50-60 caracteres)"
                  />
                  <p className="text-xs text-gray-500">
                    O título aparece nos resultados de busca e na aba do navegador.
                  </p>
                  
                  {recommendedTags.title && (
                    <div className="mt-1">
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-xs"
                        onClick={() => setTitle(recommendedTags.title)}
                      >
                        Usar título recomendado
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="meta-description">Meta Descrição</Label>
                    <span className={`text-xs ${description_.length > 160 ? 'text-yellow-500' : 'text-gray-500'}`}>
                      {description_.length}/160
                    </span>
                  </div>
                  <textarea
                    id="meta-description"
                    value={description_}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Digite a descrição da página (120-160 caracteres)"
                    rows={3}
                    className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500">
                    A descrição aparece nos resultados de busca abaixo do título.
                  </p>
                  
                  {recommendedTags.description && (
                    <div className="mt-1">
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-xs"
                        onClick={() => setDescription(recommendedTags.description)}
                      >
                        Usar descrição recomendada
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="canonical-url">URL Canônica</Label>
                  <Input 
                    id="canonical-url"
                    value={canonical}
                    onChange={(e) => setCanonical(e.target.value)}
                    placeholder="https://www.example.com/product-page"
                  />
                  <p className="text-xs text-gray-500">
                    Define a versão preferencial de uma página para evitar conteúdo duplicado.
                  </p>
                </div>
                
                <div className="p-4 border rounded-md bg-gray-50">
                  <h4 className="font-medium mb-2">Dicas para meta tags eficazes:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Use palavras-chave relevantes no início do título</li>
                    <li>• Inclua sua marca ou nome da empresa no título</li>
                    <li>• Escreva descrições atrativas que incentivem cliques</li>
                    <li>• Cada página deve ter meta tags únicas</li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="validation" className="flex-grow overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4 py-4">
                {checks.map((check) => (
                  <div key={check.id} className="flex items-start p-3 border rounded-md">
                    <div className="mr-3 mt-0.5 flex-shrink-0">
                      {getStatusIcon(check.status)}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{check.title}</h4>
                      <p className="text-sm text-gray-600">{check.description}</p>
                    </div>
                    <Badge className={`ml-2 ${getStatusColor(check.status)}`}>
                      {check.status === 'pass' ? 'OK' : 
                       check.status === 'warning' ? 'Atenção' : 'Erro'}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="preview" className="flex-grow overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm">Como aparecerá nos resultados de busca:</Label>
                  <Card className="overflow-hidden border-gray-200">
                    <CardContent className="p-0">
                      <div className="p-4 border-b bg-gray-50">
                        <div className="flex items-center mb-1">
                          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                          <div className="text-xs text-gray-600 truncate">
                            {canonical || 'example.com'}
                          </div>
                        </div>
                        <h3 className="text-blue-600 text-lg font-medium line-clamp-1">
                          {title || 'Título da página não definido'}
                        </h3>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {description_ || 'Descrição da página não definida...'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">Código HTML gerado:</Label>
                  <div className="bg-gray-900 text-gray-300 p-4 rounded-md overflow-x-auto">
                    <pre className="text-xs">
                      {`<head>
  <!-- Meta tags essenciais -->
  <title>${title || 'Título não definido'}</title>
  <meta name="description" content="${description_ || 'Descrição não definida'}" />
  ${canonical ? `<link rel="canonical" href="${canonical}" />` : '<!-- Link canônico não definido -->'}
  
  <!-- Open Graph para compartilhamento em redes sociais -->
  <meta property="og:type" content="product" />
  <meta property="og:title" content="${title || 'Título não definido'}" />
  <meta property="og:description" content="${description_ || 'Descrição não definida'}" />
  <meta property="og:url" content="${canonical || 'URL não definida'}" />
  <meta property="og:site_name" content="Nome da Loja" />
  
  <!-- Outros meta tags importantes -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="index, follow" />
</head>`}
                    </pre>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MetaTagValidator;
