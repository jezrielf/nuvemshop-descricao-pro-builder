
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductDescription } from '@/types/editor';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { generateMetaDescription, extractKeywords, generateProductSchema } from '@/utils/seoUtils';

interface TechnicalTabProps {
  description: ProductDescription;
}

export const TechnicalTab: React.FC<TechnicalTabProps> = ({ description }) => {
  // Generate sample meta description
  const metaDescription = generateMetaDescription(description);
  
  // Extract keywords for meta tags
  const keywords = extractKeywords(description);
  
  // Generate sample schema JSON-LD
  const schemaCode = generateProductSchema({ name: description.name }, description);
  
  // Technical SEO checks
  const hasProperHeadings = description.blocks.some(block => 
    (block.type === 'hero' && 'heading' in block) || 
    (block.type === 'text' && 'content' in block && /<h1|<h2|<h3/i.test(block.content))
  );
  
  const hasImages = description.blocks.some(block => 
    block.type === 'image' || block.type === 'gallery' || 
    (block.type === 'hero' && 'imageUrl' in block && block.imageUrl)
  );
  
  const hasImageAltText = description.blocks.every(block => {
    if (block.type === 'image' && 'altText' in block) {
      return !!block.altText;
    }
    if (block.type === 'gallery' && 'images' in block && Array.isArray(block.images)) {
      return block.images.every(img => !!img.altText);
    }
    return true;
  });
  
  const hasVideoEmbeds = description.blocks.some(block => 
    block.type === 'video'
  );
  
  const metaDescriptionLength = metaDescription.length;
  const isMetaLengthGood = metaDescriptionLength >= 120 && metaDescriptionLength <= 155;
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Meta Tags Geradas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Meta Descrição</h4>
            <div className="bg-gray-100 rounded p-2 text-sm">
              {metaDescription}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{metaDescriptionLength} caracteres</span>
              <span className={isMetaLengthGood ? "text-green-600" : "text-amber-600"}>
                {isMetaLengthGood ? "Tamanho ideal" : metaDescriptionLength < 120 ? "Muito curta" : "Muito longa"}
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Meta Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {keywords.map((keyword, idx) => (
                <Badge key={idx} variant="outline">{keyword}</Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Nota: Meta keywords têm pouca influência no SEO moderno, mas ainda podem ser úteis para organização interna.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verificações Técnicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            {hasProperHeadings ? 
              <CheckCircle2 className="text-green-500 h-5 w-5" /> : 
              <XCircle className="text-red-500 h-5 w-5" />
            }
            <div>
              <p className="font-medium">Estrutura de Cabeçalhos</p>
              <p className="text-sm text-muted-foreground">
                {hasProperHeadings ? 
                  "A descrição possui uma estrutura adequada de cabeçalhos." : 
                  "A descrição não possui cabeçalhos claros (H1, H2, H3)."}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {hasImages ? 
              <CheckCircle2 className="text-green-500 h-5 w-5" /> : 
              <AlertCircle className="text-amber-500 h-5 w-5" />
            }
            <div>
              <p className="font-medium">Conteúdo Visual</p>
              <p className="text-sm text-muted-foreground">
                {hasImages ? 
                  "A descrição inclui imagens para melhor engajamento." : 
                  "A descrição não possui imagens, o que pode reduzir o engajamento."}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {hasImages && !hasImageAltText ? 
              <XCircle className="text-red-500 h-5 w-5" /> : 
              <CheckCircle2 className="text-green-500 h-5 w-5" />
            }
            <div>
              <p className="font-medium">Texto Alternativo</p>
              <p className="text-sm text-muted-foreground">
                {hasImages && !hasImageAltText ? 
                  "Algumas imagens não possuem texto alternativo (alt text)." : 
                  "Todas as imagens possuem texto alternativo adequado."}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isMetaLengthGood ? 
              <AlertCircle className="text-amber-500 h-5 w-5" /> : 
              <CheckCircle2 className="text-green-500 h-5 w-5" />
            }
            <div>
              <p className="font-medium">Meta Descrição</p>
              <p className="text-sm text-muted-foreground">
                {!isMetaLengthGood ? 
                  `A meta descrição tem ${metaDescriptionLength} caracteres. O ideal é entre 120-155.` : 
                  "A meta descrição tem comprimento ideal."}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {hasVideoEmbeds ? 
              <CheckCircle2 className="text-green-500 h-5 w-5" /> : 
              <AlertCircle className="text-amber-500 h-5 w-5" />
            }
            <div>
              <p className="font-medium">Conteúdo Multimídia</p>
              <p className="text-sm text-muted-foreground">
                {hasVideoEmbeds ? 
                  "A descrição inclui vídeos, o que melhora o engajamento." : 
                  "A descrição não possui vídeos. Considere adicionar para aumentar o engajamento."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Schema.org (Dados Estruturados)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>JSON-LD para Produtos</AlertTitle>
            <AlertDescription>
              Os dados estruturados ajudam os mecanismos de busca a entender o conteúdo da página
              e podem resultar em rich snippets nos resultados de busca.
            </AlertDescription>
          </Alert>
          
          <div className="bg-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="text-xs">{schemaCode}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
