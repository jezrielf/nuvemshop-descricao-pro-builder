import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, XCircle, AlertCircle, List, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Block, ProductDescription } from '@/types/editor';

interface SEOChecklistProps {
  description: ProductDescription | null;
}

// SEO check item interface
interface SEOCheckItem {
  id: string;
  title: string;
  description: string;
  status: 'pass' | 'fail' | 'warning';
  category: 'content' | 'images' | 'structure' | 'metatags';
}

const SEOChecklist: React.FC<SEOChecklistProps> = ({ description }) => {
  const [open, setOpen] = React.useState(false);
  
  // Run SEO checks on the description
  const runSEOChecks = (): SEOCheckItem[] => {
    if (!description) return [];
    
    const checks: SEOCheckItem[] = [];
    
    // Content checks
    checks.push({
      id: 'content-length',
      title: 'Comprimento do conteúdo',
      description: getContentLength(description) > 300 
        ? 'Bom comprimento de conteúdo (superior a 300 palavras)' 
        : 'Conteúdo muito curto (menos de 300 palavras)',
      status: getContentLength(description) > 300 ? 'pass' : 'fail',
      category: 'content'
    });
    
    checks.push({
      id: 'content-headings',
      title: 'Uso de cabeçalhos',
      description: countHeadings(description) > 3 
        ? 'Bom uso de cabeçalhos para estruturar o conteúdo' 
        : 'Poucos cabeçalhos. Considere adicionar mais para melhorar a estrutura',
      status: countHeadings(description) > 3 ? 'pass' : 'warning',
      category: 'content'
    });
    
    // Image checks
    const hasImages = description.blocks.some(block => 
      ['image', 'gallery', 'hero', 'imageText', 'textImage'].includes(block.type)
    );
    
    checks.push({
      id: 'images-present',
      title: 'Presença de imagens',
      description: hasImages 
        ? 'A descrição contém imagens, o que é ótimo para SEO' 
        : 'Nenhuma imagem encontrada. Imagens melhoram o engajamento e SEO',
      status: hasImages ? 'pass' : 'fail',
      category: 'images'
    });
    
    const allImagesHaveAlt = checkImagesAlt(description);
    checks.push({
      id: 'images-alt',
      title: 'Textos alternativos',
      description: allImagesHaveAlt 
        ? 'Todas as imagens possuem textos alternativos (alt)' 
        : 'Algumas imagens não possuem texto alternativo (alt)',
      status: allImagesHaveAlt ? 'pass' : 'warning',
      category: 'images'
    });
    
    // Structure checks
    checks.push({
      id: 'structure-cta',
      title: 'Chamada para ação',
      description: description.blocks.some(block => block.type === 'cta') 
        ? 'Contém chamada para ação, excelente para conversão' 
        : 'Nenhuma chamada para ação encontrada',
      status: description.blocks.some(block => block.type === 'cta') ? 'pass' : 'warning',
      category: 'structure'
    });
    
    checks.push({
      id: 'structure-faq',
      title: 'Perguntas frequentes',
      description: description.blocks.some(block => block.type === 'faq') 
        ? 'Contém seção de FAQ, excelente para SEO e rich snippets' 
        : 'Nenhuma seção de FAQ encontrada',
      status: description.blocks.some(block => block.type === 'faq') ? 'pass' : 'warning',
      category: 'structure'
    });
    
    // Calculate score
    const totalChecks = checks.length;
    const passedChecks = checks.filter(check => check.status === 'pass').length;
    const percentage = Math.round((passedChecks / totalChecks) * 100);
    
    // Add overall score
    checks.unshift({
      id: 'overall-score',
      title: `Score geral: ${percentage}%`,
      description: `${passedChecks} de ${totalChecks} verificações passaram`,
      status: percentage >= 80 ? 'pass' : percentage >= 60 ? 'warning' : 'fail',
      category: 'content'
    });
    
    return checks;
  };
  
  // Helper functions
  const getContentLength = (desc: ProductDescription): number => {
    let wordCount = 0;
    desc.blocks.forEach(block => {
      switch (block.type) {
        case 'text':
          if (block.content) {
            // Strip HTML tags and count words
            const content = block.content.replace(/<[^>]+>/g, ' ');
            wordCount += content.split(/\s+/).filter(Boolean).length;
          }
          break;
        case 'hero':
          if ('heading' in block && block.heading) wordCount += block.heading.split(/\s+/).filter(Boolean).length;
          if ('subheading' in block && block.subheading) wordCount += block.subheading.split(/\s+/).filter(Boolean).length;
          break;
        case 'cta':
          if ('heading' in block && block.heading) wordCount += block.heading.split(/\s+/).filter(Boolean).length;
          if ('content' in block && block.content) wordCount += block.content.split(/\s+/).filter(Boolean).length;
          break;
        case 'textImage':
        case 'imageText':
          if ('heading' in block && block.heading) wordCount += block.heading.split(/\s+/).filter(Boolean).length;
          if ('content' in block && block.content) {
            const content = block.content.replace(/<[^>]+>/g, ' ');
            wordCount += content.split(/\s+/).filter(Boolean).length;
          }
          break;
        // Add other block types as needed
      }
    });
    return wordCount;
  };
  
  const countHeadings = (desc: ProductDescription): number => {
    let headingCount = 0;
    desc.blocks.forEach(block => {
      // Count block headings
      if ('heading' in block && block.heading) headingCount++;
      
      // Count headings in HTML content
      if (block.type === 'text' && 'content' in block && block.content) {
        const h1Count = (block.content.match(/<h1[^>]*>/g) || []).length;
        const h2Count = (block.content.match(/<h2[^>]*>/g) || []).length;
        const h3Count = (block.content.match(/<h3[^>]*>/g) || []).length;
        const h4Count = (block.content.match(/<h4[^>]*>/g) || []).length;
        headingCount += h1Count + h2Count + h3Count + h4Count;
      }
    });
    return headingCount;
  };
  
  const checkImagesAlt = (desc: ProductDescription): boolean => {
    let allHaveAlt = true;
    
    desc.blocks.forEach(block => {
      if (block.type === 'image' && 'alt' in block && block.alt === '') {
        allHaveAlt = false;
      }
      else if (block.type === 'hero' && 'image' in block && block.image && (!block.image.alt || block.image.alt === '')) {
        allHaveAlt = false;
      }
      else if (block.type === 'gallery' && 'images' in block && block.images) {
        block.images.forEach(img => {
          if (!img.alt || img.alt === '') allHaveAlt = false;
        });
      }
      else if ((block.type === 'imageText' || block.type === 'textImage') && 
               'image' in block && block.image && (!block.image.alt || block.image.alt === '')) {
        allHaveAlt = false;
      }
    });
    
    return allHaveAlt;
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
  
  const getStatusColor = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800';
      case 'fail':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  
  const checks = runSEOChecks();
  const categories = Array.from(new Set(checks.map(check => check.category)));
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <List className="h-4 w-4 mr-1" />
          Checklist SEO
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Checklist de SEO</DialogTitle>
          <DialogDescription>
            Verifique se sua descrição de produto atende às melhores práticas de SEO.
          </DialogDescription>
        </DialogHeader>
        
        {!description ? (
          <div className="flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-10 w-10 text-gray-400 mb-4" />
            <p className="text-center text-gray-500">
              Selecione ou crie uma descrição para analisar.
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[60vh]">
            <div className="space-y-6 p-1">
              {/* Overall score from first item */}
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{checks[0].title}</h3>
                      <p className="text-sm text-gray-500">{checks[0].description}</p>
                    </div>
                    <div className={`px-3 py-2 rounded-full ${getStatusColor(checks[0].status)}`}>
                      {getStatusIcon(checks[0].status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Categorized checks */}
              {categories.filter(cat => cat !== 'content' || true).map(category => (
                <div key={category} className="space-y-2">
                  <h3 className="text-md font-medium capitalize px-1">
                    {category === 'content' ? 'Conteúdo' : 
                     category === 'images' ? 'Imagens' : 
                     category === 'structure' ? 'Estrutura' : 
                     category === 'metatags' ? 'Meta Tags' : category}
                  </h3>
                  
                  {checks.filter(check => check.category === category && check.id !== 'overall-score').map(check => (
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
              ))}
              
              <div className="pt-4">
                <h3 className="text-md font-medium px-1 mb-2">Recursos para melhorar seu SEO</h3>
                <div className="space-y-2">
                  <a href="https://moz.com/learn/seo/on-page-factors" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                    <ExternalLink className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Guia de SEO On-Page da Moz</span>
                  </a>
                  <a href="https://developers.google.com/search/docs/beginner/seo-starter-guide" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                    <ExternalLink className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Guia de Início para SEO do Google</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SEOChecklist;
