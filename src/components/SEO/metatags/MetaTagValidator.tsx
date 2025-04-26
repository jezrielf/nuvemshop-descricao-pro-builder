
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface MetaTagValidatorProps {
  description: ProductDescription | null;
}

interface MetaTag {
  name: string;
  content: string;
  status: 'success' | 'warning' | 'info';
  message: string;
}

const MetaTagValidator: React.FC<MetaTagValidatorProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description_, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [metaTags, setMetaTags] = useState<MetaTag[]>([]);
  
  useEffect(() => {
    if (description && open) {
      // Extract title from the first heading in the description
      const firstHeadingBlock = description.blocks.find(block => 
        block.type === 'hero' || 
        (block.type === 'text' && 'heading' in block)
      );
      
      let titleText = description.name;
      if (firstHeadingBlock && 'heading' in firstHeadingBlock) {
        titleText = firstHeadingBlock.heading as string;
      }
      setTitle(titleText);
      
      // Extract description from the first text block
      const firstTextBlock = description.blocks.find(block => 
        block.type === 'text' && 'content' in block
      );
      
      let descriptionText = '';
      if (firstTextBlock && 'content' in firstTextBlock) {
        const content = firstTextBlock.content as string;
        // Extract plain text from HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        descriptionText = tempDiv.textContent || '';
        if (descriptionText.length > 160) {
          descriptionText = descriptionText.substring(0, 157) + '...';
        }
      }
      setDescription(descriptionText);
      
      // Extract keywords from all text blocks
      const allTextBlocks = description.blocks.filter(block => 
        block.type === 'text' && 'content' in block
      );
      
      const allText = allTextBlocks.map(block => {
        if ('content' in block) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = block.content as string;
          return tempDiv.textContent || '';
        }
        return '';
      }).join(' ');
      
      // Simple keyword extraction (just an example)
      const words = allText.toLowerCase().split(/\s+/);
      const wordCount: { [key: string]: number } = {};
      words.forEach(word => {
        if (word.length > 4) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });
      
      const sortedWords = Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(entry => entry[0]);
      
      setKeywords(sortedWords.join(', '));
      
      // Generate meta tag validation
      validateMetaTags(titleText, descriptionText, sortedWords.join(', '));
    }
  }, [description, open]);
  
  const validateMetaTags = (title: string, description: string, keywords: string) => {
    const tags: MetaTag[] = [];
    
    // Title validation
    if (!title) {
      tags.push({
        name: 'title',
        content: '',
        status: 'warning',
        message: 'O título está vazio'
      });
    } else if (title.length < 10) {
      tags.push({
        name: 'title',
        content: title,
        status: 'warning',
        message: 'O título é muito curto (menos de 10 caracteres)'
      });
    } else if (title.length > 60) {
      tags.push({
        name: 'title',
        content: title,
        status: 'warning',
        message: 'O título é muito longo (mais de 60 caracteres)'
      });
    } else {
      tags.push({
        name: 'title',
        content: title,
        status: 'success',
        message: 'O título tem um bom comprimento'
      });
    }
    
    // Description validation
    if (!description) {
      tags.push({
        name: 'description',
        content: '',
        status: 'warning',
        message: 'A descrição está vazia'
      });
    } else if (description.length < 50) {
      tags.push({
        name: 'description',
        content: description,
        status: 'warning',
        message: 'A descrição é muito curta (menos de 50 caracteres)'
      });
    } else if (description.length > 160) {
      tags.push({
        name: 'description',
        content: description,
        status: 'warning',
        message: 'A descrição é muito longa (mais de 160 caracteres)'
      });
    } else {
      tags.push({
        name: 'description',
        content: description,
        status: 'success',
        message: 'A descrição tem um bom comprimento'
      });
    }
    
    // Keywords validation
    if (!keywords) {
      tags.push({
        name: 'keywords',
        content: '',
        status: 'info',
        message: 'Palavras-chave não definidas'
      });
    } else {
      tags.push({
        name: 'keywords',
        content: keywords,
        status: 'success',
        message: 'Palavras-chave definidas'
      });
    }
    
    setMetaTags(tags);
  };
  
  const handleUpdateMetaTags = () => {
    validateMetaTags(title, description_, keywords);
  };
  
  const getStatusIcon = (status: 'success' | 'warning' | 'info') => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Meta Tags</span>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Validador de Meta Tags</DialogTitle>
          <DialogDescription>
            Analise e otimize suas meta tags para melhorar o SEO.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meta Tags Sugeridas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta-title">Título (title)</Label>
                    <Input
                      id="meta-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Título da página"
                    />
                    <div className="text-xs text-gray-500">
                      Recomendado: 10-60 caracteres | Atual: {title.length}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meta-description">Descrição (description)</Label>
                    <Textarea
                      id="meta-description"
                      value={description_}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descrição da página"
                      rows={3}
                    />
                    <div className="text-xs text-gray-500">
                      Recomendado: 50-160 caracteres | Atual: {description_.length}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meta-keywords">Palavras-chave (keywords)</Label>
                    <Input
                      id="meta-keywords"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="palavra1, palavra2, palavra3"
                    />
                  </div>
                  
                  <Button onClick={handleUpdateMetaTags} className="w-full">
                    Validar Meta Tags
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resultados da Validação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metaTags.map((tag, index) => (
                    <Alert key={index} className={`border-${tag.status === 'success' ? 'green' : tag.status === 'warning' ? 'yellow' : 'blue'}-500`}>
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5">
                          {getStatusIcon(tag.status)}
                        </div>
                        <div>
                          <h4 className="font-medium">{tag.name}</h4>
                          <AlertDescription>
                            <div className="text-sm text-gray-700 mt-1">
                              {tag.message}
                            </div>
                            {tag.content && (
                              <div className="mt-2 p-2 bg-gray-100 rounded text-sm font-mono overflow-auto">
                                {tag.content}
                              </div>
                            )}
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  ))}
                  
                  {metaTags.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <InfoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2">Clique em "Validar Meta Tags" para ver os resultados</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MetaTagValidator;
